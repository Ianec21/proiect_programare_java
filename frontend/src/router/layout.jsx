import {Outlet} from "react-router-dom";
import {AuthProvider} from "../providers/AuthProvider.jsx";
import {useEffect, useState} from "react";

const Layout = () => {
  const [initialData, setInitialData] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <main>
      <AuthProvider initialData={initialData}>
        <Outlet/>
      </AuthProvider>
    </main>
  )
}

export default Layout;