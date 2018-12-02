import { Git, repository } from "app/git-abs/git";
import uuid from "uuid/v1";
import Metadata from "app/git-abs/metadata";
import EditFile from "app/git-abs/edit-file.js";
import getProjectPath from "./projectPath";

class GitAbs {
  /**
   *
   * @param {Metadata (./metadata.js)} metadata
   * @param {Repository (nodegit)} repository
   */
  constructor(metadata, editFile, git) {
    this.metadata = metadata;
    this.editFile = editFile;
    this.git = git;
  }

  /**
   * Creates a branch for the given file name
   * @param {String} fileName
   */
  createFile = async (fileName, initObj) => {
    let branchName;
    try {
      // create branch
      const branchList = await this.git.branch.getBranchList();
      branchName = getUniqueBranchName(branchList);
      await this.git.branch.create(branchName);
    } catch (e) {
      throw new Error(`git-abs createFile: Error in creating branch \n ${e}`);
    }

    let currentBranch;
    try {
      // switch branch
      currentBranch = await this.git.getCurrentBranch();
      await this.git.addAndCommit("initializing new file");
      await this.git.branch.checkOut(branchName);

      //create text file
      await this.editFile.createFileJson(initObj);
      await this.git.addAndCommit("first commit for text.json");

      //switch back to currently open file
      await this.git.branch.checkOut(currentBranch);

      //update metadata
      await this.metadata.addFile(fileName, branchName);
    } catch (e) {
      //clean up in case of error
      await this.git.branch.checkOut(currentBranch);
      await this.git.branch.remove(branchName);

      throw new Error(`git-abs createFile: Error in creating file \n ${e}`);
    }
  };

  /**
   * Deletes branch for the given file name
   * @param {String} fileName
   */
  deleteFile = async fileName => {
    // if filename is not given, current branch is deleted
    let branchName;
    const currentBranch = await this.git.getCurrentBranch();

    branchName = this.metadata.getBranchName(fileName);

    /* if deleting current file, switch to master branch */
    if (branchName === currentBranch) {
      await this.git.addAndCommit("deleting branch");
      await this.git.branch.checkOutMasterBranch();
    }

    /* don't need to wait for async to return */
    this.metadata.removeFile(fileName);

    await this.git.branch.remove(branchName);
  };

  /**
   * Switches branch to the one mapped to the given file name
   * @param {String} fileName
   */
  openFile = async fileName => {
    const currentBranch = await this.git.getCurrentBranch();

    try {
      // save current state of branch
      await this.git.addAndCommit("switching file");

      // get branch from project.json
      const branchName = this.metadata.getBranchName(fileName);

      // switch to branch for fileName
      await this.git.branch.checkOut(branchName);

      // return json content
      const fileObj = await this.editFile.getFileJson();
      return fileObj;
    } catch (e) {
      // clean up in case of error
      await this.git.branch.checkOut(currentBranch);
      throw new Error(`git-abs openFile: Error in switching branch \n ${e}`);
    }
  };

  /**
   * Saves the current state of the file
   * @param {String} fileName
   * @param {String} versionName
   */
  saveFile = async (fileName, obj, versionName) => {
    //Don't allow save if current state of branch not at head commit
    if (this.git.branch.isDetachedHead()) {
      throw new Error("Cannot save while in previous version.");
    }

    //update the edit file
    await this.editFile.updateFileJson(obj);

    // save current state as a commit
    const commitMessage = versionName || "placeholder message 💎";
    const commitHash = await this.git.addAndCommit(commitMessage);

    // if version name is given
    if (versionName) {
      // update project.json with new version-commit mapping
      await this.metadata.addVersion(
        fileName,
        versionName,
        commitHash.toString()
      );
    }
  };

  /**
   * Switches fileName's branch to given version's tag
   * @param {String} fileName
   * @param {String} commitID
   */
  switchVersion = async (fileName, commitID) => {
    const currentBranch = await this.git.getCurrentBranch();
    const branchName = this.metadata.getBranchName(fileName);

    if (branchName != currentBranch) {
      throw new Error("Given file is not the current open file");
    }

    // get commit for version from project.json
    const versions = await this.metadata.getAllVersions(fileName);
    const commitExists = versions.versions.reduce(
      (acc, o) => acc || o.getCommitId() === commitID,
      false
    );

    if (!commitExists)
      throw new Error(
        `Given commit ${commitID} does not exist for file ${fileName}`
      );

    try {
      // save current state of branch
      await this.git.addAndCommit("switching version");

      // checkout to selected commit
      await this.git.branch.checkOutCommit(commitID);

      // return file data
      return await this.editFile.getFileJson();
    } catch (e) {
      // clean up in case of error
      this.openFile(fileName);
      throw new Error(`git-abs switchVersion \n ${e}`);
    }
  };

  /**
   *
   */
  switchToCurrentVersion = async fileName => {
    if (!this.git.branch.isDetachedHead(this.repository)) {
      // this means already at head commit
      return await this.editFile.getFileJson();
    }

    try {
      // get branch from project.json
      const branchName = this.metadata.getBranchName(fileName);

      // switch to branch for fileName
      await this.git.branch.checkOut(branchName);

      // return json content
      const fileObj = await this.editFile.getFileJson();
      return fileObj;
    } catch (e) {
      throw new Error(`git-abs switchToCurrentVersion \n ${e}`);
    }
  };

  getLatestTime = async fileName => {
    const currentBranch = await this.git.getCurrentBranch();
    const branchName = this.metadata.getBranchName(fileName);

    if (currentBranch !== branchName) {
      throw new Error(
        "requested file's latest time is not currently open file "
      );
    }

    const latest_time = await this.git.getLatestCommitTime(branchName);
    return latest_time;
  };

  /**
   * Returns list of versions saved for given file name
   * @param {String} fileName
   */
  getVersions = async fileName => {
    // use metedata object to get version names for the given fileName
    return await this.metadata.getAllVersions(fileName);
  };

  updateVersions = async (fileName, fileObj) => {
    return await this.metadata.overwriteVersions(fileName, fileObj);
  };

  /**
   * Returns list of files in the project
   */
  getFiles = () => this.metadata.getAllBranches();

  /**
   * Performs a hard reset on the given file to a previous commit
   * @param {String} fileName
   * @param {String} commitHash
   */
  reset = async (fileName, commitHash) => {
    await this.git.reset(fileName, commitHash);

    // return updated file content
    return await this.editFile.getFileJson();
  };
}

const getUniqueBranchName = branchList => {
  let newName;
  do {
    newName = uuid();
  } while (branchList.indexOf(newName) != -1);

  return newName;
};

const openProject = async projName => {
  const projPath = getProjectPath(projName);

  const metadata = new Metadata(projPath);
  await metadata.init();
  const repo = await repository.open(projPath);
  const editFile = new EditFile(projPath);

  const git = new Git(repo);

  // Ensure master branch is checked out when project is opened
  await git.branch.checkOutMasterBranch(repo);

  return new GitAbs(metadata, editFile, git);
};

export default openProject;
