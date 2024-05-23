import {Link} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider.jsx";

export const NavigationBar = props => {
  const { user } = useAuth();

  return (
    <nav className="bg-slate-700 min-h-[8vh] flex items-center justify-between p-5">
      <div className="flex flex-row gap-3 items-center">
        <Link to={"/"}>Acasa</Link>
        {
          user.role === "ROLE_ADMIN" && <>
            <Link to={"/"}>Admin</Link>
          </>
        }
      </div>
    </nav>
  )
}

export default NavigationBar;