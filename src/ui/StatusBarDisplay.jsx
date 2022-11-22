import { useState } from "react";

import healthIcon from "../images/favorite_FILL0_wght400_GRAD0_opsz48.svg";
import hungerIcon from "../images/restaurant_FILL0_wght400_GRAD0_opsz48.svg";
import thirstIcon from "../images/water_drop_FILL0_wght400_GRAD0_opsz48.svg";

const StatusBarDisplay = (props) => {
  return (
    <div className="flex flex-col mb-8">
      <div className="flex items-center">
        <img className="max-w-[24px] mr-4" src={healthIcon} />
        <div className="w-[100px] h-[10px] border rounded-full relative overflow-hidden">
          <div
            className="absolute w-full h-full bg-black"
            style={{ width: `${props.health}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center">
        <img className="max-w-[24px] mr-4" src={hungerIcon} />
        <div className="w-[100px] h-[10px] border rounded-full relative overflow-hidden">
          <div
            className="absolute w-full h-full bg-black"
            style={{ width: `${props.hunger}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center">
        <img className="max-w-[24px] mr-4" src={thirstIcon} />
        <div className="w-[100px] h-[10px] border rounded-full relative overflow-hidden">
          <div
            className="absolute w-full h-full bg-black"
            style={{ width: `${props.thirst}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBarDisplay;
