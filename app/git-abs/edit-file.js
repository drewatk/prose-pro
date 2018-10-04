import utils from "./utils";
import path from "path";
import { projCons } from "./constants";

const { editFile } = projCons;

export default class EditFile {
  constructor(projPath) {
    this.repoPath = path.join(projPath, projCons.gitDir);
  }

  createFileJson = async () => {
    const filePath = path.join(this.repoPath, editFile);

    //if file exists, return
    if (utils.pathExist(filePath)) return;

    //create file
    await utils.createFile(filePath);

    //fill file with empty json
    await utils.writeJSONToFile(filePath, {});
  };

  getFileJson = async () => {
    const filePath = path.join(this.repoPath, editFile);
    const obj = await utils.readJSONFromFile(filePath);

    return obj;
  };

  updateFileJson = async obj => {
    const filePath = path.join(this.repoPath, editFile);
    await utils.writeJSONToFile(filePath, obj);
  };
}
