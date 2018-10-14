import { push } from "connected-react-router";
import routes from "app/constants/routes.json";
import { openProject } from "app/git-abs";
import initGitAbs from "app/actions/git_abs";
import updateFiles from "app/actions/files";

export const SELECT_PROJECT = "SELECT_PROJECT";

const projectSelect = project => dispatch => {
  openProject("app/TestProjects/" + project)
    .then(git_abs =>
      dispatch([initGitAbs(git_abs), updateFiles(git_abs.getFiles())])
    )
    .then(() =>
      dispatch([
        {
          type: SELECT_PROJECT,
          payload: project
        },
        push(routes.EDITOR)
      ])
    )
    .catch(err =>
      console.error("Error in project select action creator: ", err)
    );
};

export default projectSelect;
