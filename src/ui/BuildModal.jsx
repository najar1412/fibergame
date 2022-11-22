import { Link } from "react-router-dom";
import { Fragment } from "react";

const BuildModal = (props) => {
  return (
    <Fragment>
      <div
        onClick={props.closeModal}
        className="absolute top-0 right-0 mr-8 mt-8 cursor-pointer"
      >
        close
      </div>

      <p className="text-xs font-bold">build</p>
      <div>build camp</div>
      <div>build worktop</div>
    </Fragment>
  );
};

export default BuildModal;
