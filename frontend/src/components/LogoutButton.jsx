import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";

export const LogoutButton = props => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate("/sign-in")}>Log Out</Button>
}

export default LogoutButton;