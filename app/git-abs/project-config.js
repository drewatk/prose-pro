import utils from "./utils";

export default class ProjectConfig {
  constructor(filePath) {
    this.filePath = filePath;
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

    this.branches[fileName] = branchName;

    return this.updateConfigFile();
  }

  /**
   * To set up an empty config file
   * @param {String} filePath
   */
  static async initEmptyConfig(filePath) {
    const emptyObj = ProjectConfig.genEmptyConfig();
    return utils.writeJSONToFile(filePath, emptyObj);
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
   * write the current state of the project config to config file
   */
  async updateConfigFile() {
    return utils.writeJSONToFile(this.filePath, this.projConfig);
  }

  /**
   * read config file to get the object
   */
  async getConfigFromFile() {
    return utils.readJSONFromFile(this.filePath);
  }
}
