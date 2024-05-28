import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "../../providers/AuthProvider.jsx";
import {useState} from "react";

const SignInPage = () => {
  const { signIn, error } = useAuth();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: ""
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  const handleSignIn = async() => {
    await signIn(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <form className="w-[90%] md:w-1/2 lg:w-1/4 flex flex-col gap-3">
        {message && message.length > 0 && <p>{message}</p>}
        <Input onChange={(e) => setData(prev => {
          return { ...prev, email: e.target.value}
        })} label="E-Mail" placeholder="E-Mail"/>
        <Input onChange={(e) => setData(prev => {
          return { ...prev, password: e.target.value}
        })} label="Parola" placeholder="Parola" type="password"/>
        {error && error.length > 0 && <p className="text-center text-red-500">{error}</p>}
        <Button type="button" onClick={handleSignIn}>Autentificare</Button>
        <Button type="button" onClick={() => navigate("/sign-up")} className="bg-transparent hover:bg-slate-700">Inregistrare</Button>
      </form>
    </div>
  )
}

export default SignInPage;