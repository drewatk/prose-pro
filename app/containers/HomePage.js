import React from "react";
import Home from "app/components/Home";
import TitleBar from "app/components/TitleBar";

const HomePage = () => {
  return (
    <div>
      <TitleBar />
      <Home />
    </div>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
