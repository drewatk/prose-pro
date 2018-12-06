import utils from "./utils";
import path from "path";

import { projCons } from "./constants";
const { editFile } = projCons;

/**
 * Class to handle interactions with the edit file
 */
export default class EditFile {
  constructor(projPath) {
    this.repoPath = path.join(projPath, projCons.gitDir);
    this.filePath = path.join(this.repoPath, editFile);
  }

  /**
   * Creates the edit file with the given object
   * as the initial json
   * @param {Object} initObj
   */
  createFileJson = async initObj => {
    //overwrites file if aleady exists
    try {
      //create file
      if (!utils.pathExist(this.filePath)) {
        await utils.createFile(this.filePath);
      }

      //initialize file with given json obj
      await utils.writeJSONToFile(this.filePath, initObj);
    } catch (e) {
      try {
        await utils.deleteFile(this.filePath);
      } catch (e) {
        //do nothing
      }
      throw new Error(`edit-file createFileJson: ${e}`);
    }
  };

  /**
   * Returns the object in the edit file
   */
  getFileJson = async () => {
    try {
      const obj = await utils.readJSONFromFile(this.filePath);
      return obj;
    } catch (e) {
      throw new Error(`edit-file getFileJson: ${e}`);
    }
  };

  /**
   * Updates the object in the edit file with given object
   */
  updateFileJson = async obj => {
    try {
      await utils.writeJSONToFile(this.filePath, obj);
    } catch (e) {
      throw new Error(`edit-file updateFileJson: ${e}`);
    }
  };
}
