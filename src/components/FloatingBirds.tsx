import React from "react";
import birdImage from "@/assets/harrier-big-blue-shadow.svg";

const FloatingBirds: React.FC = () => {
  return (
    <div className="bird-wrapper">
      <img src={birdImage} alt="Floating Bird" className="bird" />
    </div>
  );
};

export default FloatingBirds;
