import { readdirSync, statSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { projCons } from "./constants";
import { rootDir } from "./constants";

/**
 * Lists the projects in the given directory name
 */
export default function listProjects() {
  if (!existsSync(rootDir)) {
    mkdirSync(rootDir);
  }

  return readdirSync(rootDir)
    .filter(file => statSync(path.join(rootDir, file)).isDirectory())
    .filter(dir =>
      existsSync(
        path.join(rootDir, dir, projCons.metadataDir, projCons.projFile)
      )
    );
}
