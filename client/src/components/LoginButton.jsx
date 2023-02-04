import { useAuth0 } from "@auth0/auth0-react";
import vector from "../images/vector.png";
import reactLogo from "../images/react-logo.png";
import nodeLogo from "../images/nodejs-logo.png";
import expressLogo from "../images/express-icon.png";
import mongoLogo from "../images/mongodb-icon.png";
export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <div className="wrapper">
        <div className="text-wrapper">
          <p>
            Welcome to TaskMate, the to-do web <br /> application that will help
            you stay
            <br />
            organized and productive
          </p>
          <div className="made-with-wrapper">
            <p>Made with:</p>
            <img src={reactLogo} alt="react logo" />
            <img src={nodeLogo} alt="node logo" />
            <img src={expressLogo} alt="express logo" />
            <img src={mongoLogo} alt="mongodb logo" />
          </div>
        </div>

        <div className="img-div">
          <img className="login-img" src={vector} alt="login img" />
          <button className="log" onClick={() => loginWithRedirect()}>
            Let's go
          </button>
        </div>
      </div>
    )
  );
}
