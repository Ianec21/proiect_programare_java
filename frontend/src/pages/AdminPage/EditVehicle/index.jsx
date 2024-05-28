import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "../../../utils/api";
import { useAuth } from "../../../providers/AuthProvider";

export const EditVehiclePage = () => {
	const { plateText } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [errorMessage, setError] = useState();
	const	plateRef = useRef();
	const	brandRef = useRef();
	const	modelRef = useRef();
	const	colorRef = useRef();
	const	yearRef = useRef();
	const	engineRef = useRef();
	const	gasRef = useRef();
	const	powerRef = useRef();
	const	torqueRef = useRef();
	const	trunkRef = useRef();
	const	priceRef = useRef();

  const [editData, setData] = useState({
    engineSize: 0,
    power: 0,
    price: 0,
    torque: 0,
    trunkVolume: 0,
    year: 0,
    brand: "",
    color: "",
    fuelType: "benzina",
    model: "",
    textPlate: "",
    creator: user.id
  })

  useEffect(() => {
    if(user.role != "ROLE_ADMIN"){
      return navigate("/");
    }

		//fetch data from backend based by textPlate
		(async() => {
			const { data, error, loading } = await fetchData(`/vehicle/${plateText}`);
			console.log(data);

			if(error){
				return navigate("/admin");
			}

			setData(data);
		})();
  }, []);

	useEffect(() => {
		plateRef.current.value = editData.textPlate;
		brandRef.current.value = editData.brand;
		modelRef.current.value = editData.model;
		colorRef.current.value = editData.color;
		yearRef.current.value = editData.year;
		engineRef.current.value = editData.engineSize;
		gasRef.current.value = editData.fuelType;
		powerRef.current.value = editData.power;
		torqueRef.current.value = editData.torque;
		trunkRef.current.value = editData.trunkVolume;
		priceRef.current.value = editData.price;
	}, [editData]);

  const handleUpdate = async() => {
    const { data, error, loading } = await fetchData("/vehicle/update", editData, null);
		if(!error){
			navigate("/admin");
		} else setError(error);
  }

  return (
    <div className="w-screen h-auto flex items-center justify-center p-10 flex-col gap-10">
      <p className="font-bold text-4xl">Adaugare vehicul nou</p>
      <form className="w-[500px] flex flex-col gap-2">
        <Input ref={plateRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, textPlate: e.target.value}
            })
        }} label="Numar Inmatriculare"/>
        <Input ref={brandRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, brand: e.target.value}
            })
        }} label="Marca"/>
        <Input ref={modelRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, model: e.target.value}
            })
        }} label="Model"/>
        <Input ref={colorRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, color: e.target.value}
            })
        }} label="Culoare"/>
        <Input ref={yearRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, year: e.target.value}
            })
        }} label="An fabricatie"/>
        <Input ref={engineRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, engineSize: e.target.value}
            })
        }} label="Capacitate cilindrica"/>
        <div className="flex flex-col">
            <label>Tipul de combustibil</label>
            <select ref={gasRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, fuelType: e.target.value}
            })
        }} name="fuelType" className="p-2 bg-slate-700 rounded-md mt-2">
            <option value="benzina">Benzina</option>
            <option value="motorina">Motorina</option>
            <option value="electric">Electric</option>
            </select>
        </div>
        <Input ref={powerRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, power: e.target.value}
            })
        }} label="Putere"/>
        <Input ref={torqueRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, torque: e.target.value}
            })
        }} label="Cuplu"/>
        <Input ref={trunkRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, trunkVolume: e.target.value}
            })
        }} label="Volum portbagaj"/>
        <Input ref={priceRef} onChange={(e) => {
            setData((prev) => {
            return {...prev, price: e.target.value}
            })
        }} label="Pret"/>
        {errorMessage && errorMessage.length > 0 && <p className="text-red-500 text-center">{errorMessage}</p>}
        <Button type="button" onClick={handleUpdate}>Actualizeaza</Button>
        <Button type="button" onClick={() => navigate("/admin")}>Inapoi</Button>
      </form>
    </div>
  )
}

export default EditVehiclePage;