import { Link } from "react-router-dom";

const Welcome = (props) => {
  return (
    <div className="flex flex-col">
      <p>welcome</p>
      <Link to="/login">login</Link>
      <Link to="/game">create character</Link>
    </div>
  );
};

export default Welcome;
