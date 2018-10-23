import utils from "app/git-abs/utils";
import path from "path";
import { FileObject, Version } from "app/git-abs/metadata/file-object";
import CfgObject from "app/git-abs/metadata/cfg-object";
import { projCons } from "app/git-abs/constants";

export default class Metadata {
  constructor(projPath) {
    this.dirPath = path.join(projPath, projCons.metadataDir);
    this.cfgPath = path.join(this.dirPath, projCons.projFile);
    this.cfgObj = null; /* stores the config from file */
  }

  /**
   * reads project config from json file
   */
  async init() {
    this.cfgObj = await this.getCfgFromFile();
    console.log(this.cfgObj);
  }

  /**
   * Add file to a project
   * @param {String} fileName
   */
  async addFile(fileName, branchName) {
    if (!this.cfgObj) {
      throw new Error("Project Config not initialized");
    }

    if (this.cfgObj.hasFile(fileName)) {
      throw new Error("File Already exists");
    }

    /* create filename - branch mapping */
    this.cfgObj.addFile(fileName, branchName);

    await this.updateCfgFile();

    /* create metadata file for version - commit mapping */
    const filePath = path.join(this.dirPath, branchName);
    await utils.createFile(filePath);

    const emptyObj = Metadata.genEmptyFileObj().getObject();
    await utils.writeJSONToFile(filePath, emptyObj);
  }

  /**
   * Stores the mapping of version to commit for the given file in the metadata folder
   * @param {String} fileName
   * @param {String} versionName
   * @param {String} commitHash
   */
  async addVersion(fileName, versionName, commitHash) {
    const filePath = path.join(
      this.dirPath,
      this.cfgObj.getBranchForFile(fileName)
    );
    // read object from metadata file
    const obj = await utils.readJSONFromFile(filePath);
    const fileObj = new FileObject(obj);

    // update object
    const newVersion = new Version(versionName, commitHash, Date.now());
    fileObj.addVersion(newVersion);

    console.log(newVersion);

    // write object back to metadata file
    await utils.writeJSONToFile(filePath, fileObj.getObject());

    // return new object?
    return fileObj;
  }

  async getAllVersions(fileName) {
    const filePath = path.join(this.dirPath, fileName);

    const obj = await utils.readJSONFromFile(filePath);
    return new FileObject(obj);
  }

  getAllBranches() {
    return this.cfgObj.getFileNames();
  }

  /**
   * Get branch name corresponding to given file
   * @param {String} fileName
   */
  getBranchName(fileName) {
    if (!this.cfgObj.hasFile(fileName)) {
      throw new Error("File doesn't exist");
    }

    return this.cfgObj.getBranchForFile(fileName);
  }

  /**
   * To set up an empty config file
   * @param {String} filePath
   */
  static async initEmptyConfig(filePath) {
    const emptyObj = Metadata.getEmptyCfgObj();
    console.log(emptyObj);
    await utils.writeJSONToFile(filePath, emptyObj.getObject());
  }

  /**
   * Generates empty config object
   */
  static getEmptyCfgObj() {
    return new CfgObject();
  }

  /**
   * Generates empty file metadata object
   */
  static genEmptyFileObj() {
    return new FileObject();
  }

  /**
   * write the current state of the project config to config file
   */
  async updateCfgFile() {
    await utils.writeJSONToFile(this.cfgPath, this.cfgObj.getObject());
  }

  /**
   * read config file to get the object
   */
  getCfgFromFile() {
    return new Promise((resolve, reject) =>
      utils
        .readJSONFromFile(this.cfgPath)
        .then(obj => {
          resolve(new CfgObject(obj));
        })
        .catch(e => reject(e))
    );
  }
}
