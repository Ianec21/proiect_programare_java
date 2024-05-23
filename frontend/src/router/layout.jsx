import {Outlet} from "react-router-dom";
import {AuthProvider} from "../providers/AuthProvider.jsx";
import {useEffect, useState} from "react";
import NavigationBar from "../components/NavigationBar.jsx";

const Layout = () => {
  const [initialData, setInitialData] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <main>
      <AuthProvider initialData={initialData}>
        <div className="flex flex-col w-screen min-h-screen">
          <NavigationBar/>
          <Outlet/>
        </div>
      </AuthProvider>
    </main>
  )
}

export default Layout;