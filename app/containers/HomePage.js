import React from "react";
import Home from "app/components/Home";
import Menu from "app/components/Menu";

const HomePage = () => {
  return (
    <div>
      <Menu />
      <Home />
    </div>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
