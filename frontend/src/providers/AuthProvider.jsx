import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children, initialData }) => {
  const [user, setUser] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(initialData);
  }, [initialData]);

  useEffect(() => {
    if(!user){
      localStorage.clear();
      navigate("/sign-in");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const signIn = async(data) => {
    setLoading(true);

    if(data.email < 5){
      return setError("Va rugam sa introduceti un email.");
    } else if(data.password < 6){
      return setError("Va rugam sa introduceti o parola mai lunga decat 6 caractere.");
    }

    await axios.post("http://localhost:8081/users/sign-in", data).then(res => {
      console.log(res.data);
      setUser({ id: res.data.id, name: res.data.name, email: res.data.email, role: res.data.role });
      setError("");
      navigate("/");
    }).catch(err => {
      setError(err.response.data);
    })

    setLoading(false);
  }

  const signUp = async(data) => {
    setLoading(true);

    if(data.email < 5){
      return setError("Va rugam sa introduceti un email.");
    }else if(data.name < 5){
      return setError("Va rugam sa introduceti un nume.");
    }else if(data.password < 6){
      return setError("Va rugam sa introduceti o parola mai lunga decat 6 caractere.");
    }

    await axios.post("http://localhost:8081/users/sign-up", data).then(res => {
      setUser({ id:res.data.id, name: res.data.name, email: res.data.email, role: res.data.role });
      setError("");
    }).catch(err => {
      setError(err.response.data);
    });

    setLoading(false);
  }

  const logOut = () => {
    localStorage.clear();
    setUser(null);
    navigate("/sign-in");
  }

  return (
    <AuthContext.Provider value={{ user, error, signIn, signUp, logOut }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);