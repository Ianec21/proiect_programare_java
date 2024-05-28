import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../providers/AuthProvider";
import { fetchData } from "../../../../utils/api";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

export const EditUserPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [errorMessage, setError] = useState();
	const	nameRef = useRef();
	const	emailRef = useRef();
	const	roleRef = useRef();

  const [editData, setData] = useState({
    name: "",
		email: "",
		role: ""
  })

  useEffect(() => {
    if(user.role == "ROLE_USER"){
      return navigate("/");
    }

		//fetch data from backend based by userID
		(async() => {
			const { data, error, loading } = await fetchData(`/user/${id}`);
			console.log(data);

			if(error){
				return navigate("/admin/users");
			}

			setData(data);
		})();
  }, []);

	useEffect(() => {
		nameRef.current.value = editData.name;
		emailRef.current.value = editData.email;
		roleRef.current.value = editData.role;
	}, [editData]);

  const handleUpdate = async() => {
    const { data, error, loading } = await fetchData("/user/update", editData, null);

		if(!error){
			navigate("/admin/users");
		} else setError(error);
  }

  return (
    <div className="w-screen h-auto flex items-center justify-center p-10 flex-col gap-10">
      <p className="font-bold text-4xl">Editare utilizator</p>
      <form className="w-[500px] flex flex-col gap-2">
        <Input ref={nameRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, name: e.target.value}
            })
        }} label="Nume"/>
        <Input ref={emailRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, email: e.target.value}
            })
        }} label="E-Mail"/>
        
        <div className="flex flex-col">
            <label>Rol</label>
            <select ref={roleRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, role: e.target.value}
            })
        }} name="fuelType" className="p-2 bg-slate-700 rounded-md mt-2">
            <option value="ROLE_USER">User</option>
            <option value="ROLE_EDITOR">Editor</option>
            <option value="ROLE_ADMIN">Admin</option>
            </select>
        </div>
        {errorMessage && errorMessage.length > 0 && <p className="text-red-500 text-center">{errorMessage}</p>}
        <Button type="button" onClick={handleUpdate}>Actualizeaza</Button>
        <Button type="button" onClick={() => navigate("/admin")}>Inapoi</Button>
      </form>
    </div>
  )
}

export default EditUserPage;