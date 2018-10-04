import utils from "./utils";
import path from "path";
import { projCons } from "./constants";

const { editFile } = projCons;

export default class EditFile {
  constructor(projPath) {
    this.repoPath = path.join(projPath, projCons.gitDir);
    this.filePath = path.join(this.repoPath, editFile);
  }

  createFileJson = async () => {
    //if file exists, return
    if (utils.pathExist(this.filePath)) return;

    //create file
    await utils.createFile(this.filePath);

    //fill file with empty json
    await utils.writeJSONToFile(this.filePath, {});
  };

  getFileJson = async () => {
    const obj = await utils.readJSONFromFile(this.filePath);
    console.log(this.filePath);
    return obj;
  };

  updateFileJson = async obj => {
    await utils.writeJSONToFile(this.filePath, obj);
  };
}
