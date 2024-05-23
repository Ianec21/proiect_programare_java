import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import {FaDoorOpen} from "react-icons/fa";
import {useAuth} from "../providers/AuthProvider.jsx";

export const LogoutButton = props => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  return <Button onClick={() => logOut()} className={"bg-slate-500 flex flex-row gap-2 items-center"}><FaDoorOpen/> Log Out</Button>
}

export default LogoutButton;