import { listProjects } from "app/git-abs/";

const defaultState = listProjects("app/TestProjects");

// TODO: much like other recent changes, this is temporary.
const projects = (state = defaultState) => state;

export default projects;
