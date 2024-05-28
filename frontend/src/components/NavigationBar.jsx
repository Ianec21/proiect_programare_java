import {Link} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider.jsx";
import {FaHome, FaUser} from "react-icons/fa";
import LogoutButton from "./LogoutButton.jsx";

export const NavigationBar = props => {
  const { user } = useAuth();

  if(user){
    return (
      <nav className="bg-slate-700 min-h-[8vh] flex items-center justify-between p-5">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-2xl">Parc Auto</p>
          <div className="flex flex-row gap-3 items-center">
            <Link to={"/"} className="flex items-center gap-2"><FaHome/>Acasa</Link>
            {
              user.role === "ROLE_EDITOR" && <>
                <Link to={"/admin"} className="flex items-center gap-2"><FaUser/>Admin</Link>
              </>
            }
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center">
          <p className="font-bold">{user.name}</p>
          <LogoutButton/>
        </div>
      </nav>
    )
  } else return <></>
}

export default NavigationBar;