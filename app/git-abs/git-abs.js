import git from "app/git-abs/git";
import Metadata from "app/git-abs/metadata";
import EditFile from "app/git-abs/edit-file.js";
import getProjectPath from "./projectPath";

/* eslint-disable */

class GitAbs {
  /**
   *
   * @param {Metadata (./metadata.js)} metadata
   * @param {Repository (nodegit)} repository
   */
  constructor(metadata, repository, editFile) {
    this.metadata = metadata;
    this.repository = repository;
    this.editFile = editFile;
  }

  /**
   * Creates a branch for the given file name
   * @param {String} fileName
   */
  createFile = async fileName => {
    // create branch
    const branchName = fileName; //TODO create unique branch name

    await git.branch.create(this.repository)(branchName); // create a branch
    await this.metadata.addFile(fileName, branchName); // update metadata
  };

  /**
   * Deletes branch for the given file name
   * @param {String} fileName
   */
  deleteFile = async fileName => {
    // if filename is not given, current branch is deleted
    let branchName;
    const currentBranch = await git.getCurrentBranch(this.repository);

    if (fileName) {
      branchName = this.metadata.getBranchName(fileName);
    } else {
      branchName = currentBranch;
    }

    this.metadata.removeFile(
      fileName
    ); /* don't need to wait for async to return */

    /* if deleting current file, switch to master branch */
    if (branchName === currentBranch) {
      await git.addAndCommit(this.repository)("deleting branch");
      await git.branch.checkOutMasterBranch();
    }

    await git.branch.remove(this.repository)(branchName);
  };

  /**
   * Switches branch to the one mapped to the given file name
   * @param {String} fileName
   */
  openFile = async fileName => {
    // save current state of branch
    await git.addAndCommit(this.repository)("switching file");

    // get branch from project.json
    const branchName = this.metadata.getBranchName(fileName);

    // switch to branch for fileName
    await git.branch.checkOut(this.repository)(branchName);

    // if file hasn't been created, create it (can be made more efficient)
    await this.editFile.createFileJson(this.repository);

    // return json content
    const fileObj = await this.editFile.getFileJson();
    return fileObj;
  };

  /**
   * Saves the current state of the file
   * @param {String} fileName
   * @param {String} versionName
   */
  saveFile = async (fileName, obj, versionName) => {
    // check if in right branch

    //Don't allow save if current state of branch not at head commit
    if (git.branch.isDetachedHead(this.repository)) {
      throw new Error("Cannot save while in previous version.");
    }

    //update the edit file
    await this.editFile.updateFileJson(obj);

    // save current state as a commit
    const commitMessage = "placeholder message 💎";
    const commitHash = await git.addAndCommit(this.repository)(commitMessage);

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
   * @param {String} versionName
   */
  switchVersion = async (fileName, versionName) => {
    // TODO: ensure current branch is fileName's branch
    // get commit for version from project.json
    // const versions = await this.metadata.getAllVersions(fileName);
    // const commitHash = versions[fileName];
    // if (!commitHash) {
    //   throw new Error(`Version not found: ${commitHash}`);
    // }
    // // save current state of branch
    // await this.saveFile(fileName);
    // checkout to selected commit
    // TODO: implement
  };

  /**
   *
   */
  switchToCurrentVersion = async fileName => {
    if (!git.branch.isDetachedHead(this.repository)) {
      // this means already at head commit
      return;
    }

    return this.openFile(fileName);
  };

  getLatestTime = async fileName => {
    const currentBranch = await git.getCurrentBranch(this.repository);
    const branchName = this.metadata.getBranchName(fileName);

    if (currentBranch !== branchName) {
      throw new Error(
        "requested file's latest time is not currently open file "
      );
    }

    const latest_time = await git.getLatestCommitTime(this.repository)(
      fileName
    );
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

  /**
   * Returns list of files in the project
   */
  getFiles = () => this.metadata.getAllBranches();
}

/* eslint-enable */
const openProject = async projName => {
  const projPath = getProjectPath(projName);

  const metadata = new Metadata(projPath);
  await metadata.init();
  const repo = await git.repository.open(projPath);
  const editFile = new EditFile(projPath);

  // Ensure master branch is checked out when project is opened
  await git.branch.checkOutMasterBranch(repo);

  return new GitAbs(metadata, repo, editFile);
};

export default openProject;
