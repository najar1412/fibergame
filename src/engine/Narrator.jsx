import { useEffect, useState } from "react";

import iconComment from "../images/group_FILL0_wght400_GRAD0_opsz48.svg";

const Narrator = (props) => {
  const [messageStack, setMessageStack] = useState([]);

  useEffect(() => {
    if (Math.random() > 0.9) {
      let newMessage =
        props.messages[Math.floor(Math.random() * props.messages.length)];

      setMessageStack([...messageStack, newMessage]);
    }
  }, [props.narratorTick]);

  return (
    <div className="absolute right-0 top-0 flex flex-col h-screen pt-8 w-full max-w-[300px] overflow-hidden select-none z-50 pointer-events-none">
      {messageStack.map((message) => {
        if (message.type === "general") {
          return (
            <div key={message.id} className="flex items-center  mb-2">
              <img
                className="opacity-50 max-h-[12px] max-w-[12px] mr-2"
                src={iconComment}
              />{" "}
              <p className="text-black text-xs">{message.message}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Narrator;
