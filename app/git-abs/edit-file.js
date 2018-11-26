import utils from "./utils";
import path from "path";

import { projCons } from "./constants";
const { editFile } = projCons;

export default class EditFile {
  constructor(projPath) {
    this.repoPath = path.join(projPath, projCons.gitDir);
    this.filePath = path.join(this.repoPath, editFile);
  }

  createFileJson = async initObj => {
    //if file exists, return
    if (utils.pathExist(this.filePath)) return;

    try {
      //create file
      await utils.createFile(this.filePath);
      //initialize file with given json obj
      await utils.writeJSONToFile(this.filePath, initObj);
    } catch (e) {
      await utils.deleteFile(this.filePath);
      throw new Error(`edit-file createFileJson: ${e}`);
    }
  };

  getFileJson = async () => {
    try {
      const obj = await utils.readJSONFromFile(this.filePath);
      return obj;
    } catch (e) {
      throw new Error(`edit-file getFileJson: ${e}`);
    }
  };

  updateFileJson = async obj => {
    try {
      await utils.writeJSONToFile(this.filePath, obj);
    } catch (e) {
      throw new Error(`edit-file updateFileJson: ${e}`);
    }
  };
}
