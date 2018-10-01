import utils from "./utils";
import path from "path";
import projCons from "./constants";

export default class Metadata {
  constructor(dirPath) {
    this.dirPath = dirPath;
    this.cfgPath = path.join(dirPath, projCons.projConfig);
    this.projConfig = null;
  }

  /**
   * reads project config from json file
   */
  async init() {
    this.projConfig = await this.getConfigFromFile();
  }

  /**
   * Add file to a project
   * @param {String} fileName
   */
  async addFile(fileName, branchName) {
    if (!this.projConfig) {
      throw new Error("Project Config not initialized");
    }

    const { branches } = this.projConfig;
    if (branches[fileName]) {
      throw new Error("File Already exists");
    }

    /* create filename - branch mapping */
    this.branches[fileName] = branchName;
    await this.updateConfigFile();

    /* create metadata file for version - commit mapping */
    const filePath = path.join(this.dirPath, branchName);
    await utils.createFile(filePath);
    await utils.writeJSONToFile(filePath, Metadata.genEmptyFileObj());
  }

  /**
   * Stores the mapping of version to commit for the given file in the metadata folder
   * @param {String} fileName
   * @param {String} versionName
   * @param {String} commitHash
   */
  async addVersion(fileName, versionName, commitHash) {
    const filePath = path.join(this.dirPath, this.branches[fileName]);
    // read object from metadata file
    const obj = await utils.readJSONFromFile(filePath);

    // update object
    if (obj[versionName]) {
      throw new Error("Version name already exists");
    }
    obj[versionName] = commitHash;

    // write object back to metadata file
    await utils.writeJSONToFile(filePath, obj);

    // return new object?
    return obj;
  }

  /**
   * Get branch name corresponding to given file
   * @param {String} fileName
   */
  getBranchName(fileName) {
    if (!this.branches[fileName]) {
      throw new Error("File doesn't exist");
    }

    return this.branches[fileName];
  }

  /**
   * To set up an empty config file
   * @param {String} filePath
   */
  static async initEmptyConfig(filePath) {
    const emptyObj = Metadata.genEmptyConfig();
    await utils.writeJSONToFile(filePath, emptyObj);
  }

  /**
   * Generates empty config object
   */
  static genEmptyConfig() {
    return {
      branches: {}
    };
  }

  /**
   * Generates empty file metadata object
   */
  static genEmptyFileObj() {
    return {
      versions: {}
    };
  }

  /**
   * write the current state of the project config to config file
   */
  async updateConfigFile() {
    await utils.writeJSONToFile(this.cfgPath, this.projConfig);
  }

  /**
   * read config file to get the object
   */
  async getConfigFromFile() {
    await utils.readJSONFromFile(this.cfgPath);
  }
}
