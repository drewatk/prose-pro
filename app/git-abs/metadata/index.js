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
  }

  checkInit() {
    if (!this.cfgObj) {
      throw new Error("Project Config not initialized");
    }
  }

  /**
   * Add file to a project
   * @param {String} fileName
   */
  async addFile(fileName, branchName) {
    this.checkInit();

    if (this.cfgObj.hasFile(fileName)) {
      throw new Error("File Already exists");
    }

    try {
      /* create metadata file for version - commit mapping */
      const filePath = path.join(this.dirPath, branchName);
      await utils.createFile(filePath);

      const emptyObj = Metadata.genEmptyFileObj().getObject();
      await utils.writeJSONToFile(filePath, emptyObj);
    } catch (e) {
      throw new Error(`Metadata addFile: could not add file. \n ${e}`);
    }

    try {
      /* create filename - branch mapping */
      this.cfgObj.addFile(fileName, branchName);
      await this.updateCfgFile();
    } catch (e) {
      throw new Error(
        `Metadata addFile: could not update config file. \n ${e}`
      );
    }
  }

  async removeFile(fileName) {
    this.checkInit();

    if (!this.cfgObj.hasFile(fileName)) {
      throw new Error("File doesn't exist");
    }

    /* remove metadata file */
    const filePath = path.join(
      this.dirPath,
      this.cfgObj.getBranchForFile(fileName)
    );
    utils.deleteFile(filePath); /* don't need to wait for async to return */

    /* remove file-branch mapping */
    this.cfgObj.removeFile(fileName);
    await this.updateCfgFile();
  }

  /**
   * Stores the mapping of version to commit for the given file in the metadata folder
   * @param {String} fileName
   * @param {String} versionName
   * @param {String} commitHash
   */
  async addVersion(fileName, versionName, commitHash) {
    this.checkInit();

    const filePath = path.join(
      this.dirPath,
      this.cfgObj.getBranchForFile(fileName)
    );

    let fileObj;
    try {
      // read object from metadata file
      const obj = await utils.readJSONFromFile(filePath);
      fileObj = new FileObject(obj);
    } catch (e) {
      throw new Error(`Metadata add Version: reading old versions \n${e}`);
    }

    // update object
    const newVersion = new Version(versionName, commitHash, Date.now());
    fileObj.addVersion(newVersion);

    try {
      // write object back to metadata file
      await utils.writeJSONToFile(filePath, fileObj.getObject());
    } catch (e) {
      throw new Error(`Metadata addVersion: writing new versions \n${e}`);
    }

    // return new object?
    return fileObj;
  }

  /**
   *
   * @param {String} fileName
   * @param {FileObject} fileObj
   */
  async overwriteVersions(fileName, fileObj) {
    this.checkInit();

    const filePath = path.join(
      this.dirPath,
      this.cfgObj.getBranchForFile(fileName)
    );

    try {
      await utils.writeJSONToFile(filePath, fileObj.getObject());
    } catch (e) {
      throw new Error(`Metadata overwriteVersions ${e}`);
    }

    return fileObj;
  }

  async getAllVersions(fileName) {
    this.checkInit();

    const filePath = path.join(
      this.dirPath,
      this.cfgObj.getBranchForFile(fileName)
    );

    try {
      const obj = await utils.readJSONFromFile(filePath);
      return new FileObject(obj);
    } catch (e) {
      throw new Error(`Metadata getAllVersions: ${e}`);
    }
  }

  getAllBranches() {
    this.checkInit();

    return this.cfgObj.getFileNames();
  }

  /**
   * Get branch name corresponding to given file
   * @param {String} fileName
   */
  getBranchName(fileName) {
    this.checkInit();

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
    this.checkInit();

    await utils.writeJSONToFile(this.cfgPath, this.cfgObj.getObject());
  }

  /**
   * read config file to get the object
   */
  async getCfgFromFile() {
    const obj = await utils.readJSONFromFile(this.cfgPath);
    return new CfgObject(obj);
  }
}
