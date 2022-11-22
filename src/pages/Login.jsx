import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <div className="flex flex-col">
      <p>username</p>
      <p>password</p>
      <Link to="/game">login</Link>

      <Link to="/">back</Link>
    </div>
  );
};

export default Login;
