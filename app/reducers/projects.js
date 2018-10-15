import { listProjects } from "app/git-abs/";

const defaultState = listProjects();

// TODO: much like other recent changes, this is temporary.
const projects = (state = defaultState) => state;

export default projects;
