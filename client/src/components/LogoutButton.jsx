import { useAuth0 } from "@auth0/auth0-react";
import logoutSvg from "../images/logout.svg";
export default function LogoutButton() {
  const { logout, isAuthenticated, user } = useAuth0();

  return (
    isAuthenticated && (
      <button className="logout" onClick={() => logout()}>
        <img src={logoutSvg} />
      </button>
    )
  );
}
