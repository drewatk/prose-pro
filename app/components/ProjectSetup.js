import React from "react";
import { Link } from "react-router-dom";
import routes from "../constants/routes.json";

const ProjectSetup = () => {
  return (
    <div>
      <Link to={routes.EDITOR}>Go To Editor</Link>
    </div>
  );
};
export default ProjectSetup;
