// TODO decide on where the editor interaction comes in.
import git from "./git";
import { editFile } from "./constants";
/* eslint-disable */

export default class FileHandler {
  /**
   *
   * @param {Metadata (./metadata.js)} metadata
   * @param {Repository (nodegit)} repository
   */
  constructor(metadata, repository) {
    this.metadata = metadata;
    this.repository = repository;
  }

  /**
   * Creates a branch for the given file name
   * @param {String} fileName
   */
  createFile = async fileName => {
    // create branch
    const branchName = ""; //TODO create unique branch name

    await Promise.all([
      git.branch.create(this.repository)(branchName), // create a branch
      this.metadata.addFile(fileName, branchName) // update metadata
    ]);
  };

  /**
   * Deletes branch for the given file name
   * @param {String} fileName
   */
  deleteFile = fileName => {
    // switch branch
    // delete branch
    // update project.json
  };

  /**
   * Switches branch to the one mapped to the given file name
   * @param {String} fileName
   */
  openFile = async fileName => {
    // save current state of branch
    await git.addAndCommit(editFile)("switching file");

    // get branch from project.json
    const branchName = this.metadata.getBranchName(fileName);

    // switch to branch for fileName
    await git.branch.checkOut(this.repository)(branchName);
  };

  /**
   * Saves the current state of the file
   * @param {String} fileName
   * @param {String} versionName
   */
  saveFile = (fileName, versionName) => {
    // if version name is null, save commit as is
    // else save current state as a tagged commit
    // update project.json with new version-commit mapping
  };

  /**
   * Switches fileName's branch to given version's tag
   * @param {String} fileName
   * @param {String} versionName
   */
  switchVersion = (fileName, versionName) => {
    // ensure current branch is fileName's branch
    // get tag name for version from project.json
    // save current state of branch
    // checkout to selected commit
  };

  /**
   * Returns list of versions saved for given file name
   * @param {String} fileName
   */
  getVersions = fileName => {
    // use metedata object to get version names for the given fileName
  };
}

/* eslint-enable */
