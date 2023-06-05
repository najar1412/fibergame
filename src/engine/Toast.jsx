import { useEffect, useState } from "react";

import iconFound from "../images/place_item_FILL0_white_wght400_GRAD0_opsz48.svg";

const Toast = (props) => {
  const [currentToast, setCurrentToast] = useState(false);
  const [show, setShow] = useState(false);

  function parseItemsToText(items) {
    let str = "";
    items.forEach((item) => (str += `${item.name} (${item.quantity}) `));

    return str;
  }

  const startTimer = () => {
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  useEffect(() => {
    setCurrentToast(props.narratorMessage[0]);
    startTimer();
  }, [props.narratorMessage]);

  return currentToast ? (
    <div className="absolute flex flex-col h-full pb-8 w-full overflow-hidden select-none items-center">
      <div
        key={currentToast.id}
        className={`transition flex mb-8 max-w-[300px] mt-auto bg-black px-4 py-2 rounded items-center duration-500 opacity-0 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          className="opacity-50 max-h-[12px] max-w-[12px] mr-2"
          src={iconFound}
        />{" "}
        <p className="text-white text-xs">
          Found{" "}
          <span className="font-bold capitalize">
            {parseItemsToText(currentToast.items)}
          </span>{" "}
          at{" "}
          <span className="font-bold capitalize">{currentToast.activity}</span>
        </p>
      </div>
    </div>
  ) : null;
};

export default Toast;
