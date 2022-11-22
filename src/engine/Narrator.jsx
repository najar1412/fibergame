import { useEffect, useState } from "react";

import iconFound from "../images/place_item_FILL0_wght400_GRAD0_opsz48.svg";
import iconComment from "../images/group_FILL0_wght400_GRAD0_opsz48.svg";

const Narrator = (props) => {
  function parseItemsToText(items) {
    let str = "";
    items.forEach((item) => (str += `${item.name} (${item.quantity}) `));

    return str;
  }

  return (
    <div className="absolute right-0 top-0 flex flex-col h-screen pt-8 w-full max-w-[300px] overflow-hidden select-none">
      {props.narratorMessage.map((message) => {
        if (message.type === "general") {
          return (
            <div key={message.id} className="flex items-center  mb-8">
              <img
                className="opacity-50 max-h-[12px] max-w-[12px] mr-2"
                src={iconComment}
              />{" "}
              <p className="text-black text-xs">{message.message}</p>
            </div>
          );
        } else if (message.type === "found") {
          return (
            <div key={message.id} className="flex items-center  mb-8">
              <img
                className="opacity-50 max-h-[12px] max-w-[12px] mr-2"
                src={iconFound}
              />{" "}
              <p className="text-[#870000] text-xs">
                Found{" "}
                <span className="font-bold capitalize">
                  {parseItemsToText(message.items)}
                </span>{" "}
                at{" "}
                <span className="font-bold capitalize">{message.activity}</span>
              </p>
            </div>
          );
        } else {
          return (
            <div key={message.id} className="flex items-center  mb-8">
              <img className="max-h-[20px] max-w-[20px] mr-2" src={iconFound} />{" "}
              <p className="text-black text-xs">{message.message}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Narrator;
