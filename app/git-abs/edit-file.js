import utils from "./utils";
import path from "path";
import { projCons } from "./constants";
import git from "./git";

const { editFile } = projCons;

export default class EditFile {
  constructor(projPath) {
    this.repoPath = path.join(projPath, projCons.gitDir);
    this.filePath = path.join(this.repoPath, editFile);
  }

  createFileJson = async repo => {
    //if file exists, return
    if (utils.pathExist(this.filePath)) return;

    //create file
    await utils.createFile(this.filePath);

    //fill file with empty json
    await utils.writeJSONToFile(this.filePath, {});

    //add the intitial commit if repo given
    if (repo) {
      await git.addAndCommit(repo)("first commit for text.json");
    }
  };

  getFileJson = async () => {
    const obj = await utils.readJSONFromFile(this.filePath);
    return obj;
  };

  updateFileJson = async obj => {
    await utils.writeJSONToFile(this.filePath, obj);
  };
}
