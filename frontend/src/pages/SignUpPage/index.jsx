import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../providers/AuthProvider.jsx";
import {useState} from "react";

const SignUpPage = () => {
  const { signUp, error } = useAuth();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleSignUp = async() => {
    await signUp(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <form className="w-[90%] md:w-1/2 lg:w-1/4 flex flex-col gap-3">
        <Input onChange={(e) => setData(prev => {
          return { ...prev, email: e.target.value}
        })} label="E-Mail" placeholder="adresa.electronica@gmail.com"/>
        <Input onChange={(e) => setData(prev => {
          return { ...prev, name: e.target.value}
        })} label="Nume" placeholder="Nume Prenume"/>
        <Input onChange={(e) => setData(prev => {
          return { ...prev, password: e.target.value}
        })} label="Parola" placeholder="Parola" type="password"/>
        {error && error.length > 0 && <p className="text-center text-red-500">{error}</p>}
        <Button onClick={handleSignUp} type="button">Inregistrare</Button>
        <Button type="button" onClick={() => navigate("/sign-in")} className="bg-transparent hover:bg-slate-700">Inapoi</Button>
      </form>
    </div>
  )
}

export default SignUpPage;