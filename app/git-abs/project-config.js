import utils from './utils';

export default class ProjectConfig {
  constructor(filePath) {
    this.filePath = filePath;
  }

  /**
   * reads project config from json file
   */
  async init() {
    try {
      this.projConfig = await this.getConfigFromFile();
    } catch (err) {
      throw new Error(
        `File Path to project config is incorrect: ${this.filePath}`
      );
    }
  }

  /**
   * Add file to a project
   * @param {String} fileName
   */
  async addFile(fileName, branchName) {
    const { branches } = this.projConfig;
    if (branches[fileName]) {
      throw new Error('File Already exists');
    }

    this.branches[fileName] = branchName;

    return this.updateConfigFile();
  }

  /**
   * To set up an empty config file
   * @param {String} filePath
   */
  static initEmptyConfig(filePath) {
    const emptyObj = {
      branches: {}
    };
    return utils.writeJSONToFile(filePath, emptyObj);
  }

  /**
   * write the current state of the project config to config file
   */
  updateConfigFile() {
    return utils.writeJSONToFil(this.filePath, this.projConfig);
  }

  /**
   * read config file to get the object
   */
  getConfigFromFile() {
    return utils.readJSONFromFile(this.filePath);
  }
}
