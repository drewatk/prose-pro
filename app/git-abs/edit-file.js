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

    //create file
    await utils.createFile(this.filePath);

    //initialize file with given json obj
    await utils.writeJSONToFile(this.filePath, initObj);
  };

  getFileJson = async () => {
    const obj = await utils.readJSONFromFile(this.filePath);
    return obj;
  };

  updateFileJson = async obj => {
    await utils.writeJSONToFile(this.filePath, obj);
  };
}
