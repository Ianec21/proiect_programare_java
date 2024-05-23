import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
import VehiclesList from "../../components/VehiclesList";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";

export const AdminPage = () => {
  const [vehicles, setVehicles] = useState();
  const {user} = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setError] = useState();
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
    textPlate: ""
  })

  useEffect(() => {
    if(user.role != "ROLE_ADMIN"){
      return navigate("/");
    }

    (async() => {
      const { data, error, loading } = await fetchData("/vehicles");
      setVehicles(data);
    })();
  }, []);

  const handleInsert = async() => {
    if(!parseInt(editData.year) || editData.year <= 0){
      return setError("Introduceti un an valid!");
    }

    if(!parseInt(editData.engineSize) || editData.engineSize <= 0){
      return setError("Introduceti o capacitate cilindrica valida!");
    }

    if(!parseInt(editData.power) || editData.power <= 0){
      return setError("Introduceti o putere valida!");
    }

    if(!parseInt(editData.price) || editData.price <= 0){
      return setError("Introduceti un pret valid!");
    }

    if(!parseInt(editData.torque) || editData.torque <= 0){
      return setError("Introduceti un cuplu valid!");
    }

    if(!parseInt(editData.trunkVolume) || editData.trunkVolume <= 0){
      return setError("Introduceti un volum al portbagajului valid!");
    }

    const { data, error, loading } = await fetchData("/vehicle", editData);
    console.log(error);
    //setVehicles(data);
    setError(error);
  }

  return (
    <div className="p-10">
      {vehicles && vehicles.length > 0 && <VehiclesList data={vehicles}/>}

      <div className="flex items-center flex-col justify-center mt-10">
        <form className="w-[500px] flex flex-col gap-2">
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, textPlate: e.target.value}
            })
          }} label="Numar Inmatriculare"/>
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, brand: e.target.value}
            })
          }} label="Marca"/>
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, model: e.target.value}
            })
          }} label="Model"/>
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, color: e.target.value}
            })
          }} label="Culoare"/>
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, year: e.target.value}
            })
          }} label="An fabricatie"/>
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, engineSize: e.target.value}
            })
          }} label="Capacitate cilindrica"/>
          <div className="flex flex-col">
            <label>Tipul de combustibil</label>
            <select  onChange={(e) => {
            setData((prev) => {
              return {...prev, fuelType: e.target.value}
            })
          }} name="fuelType" className="p-2 bg-slate-700 rounded-md mt-2">
              <option value="benzina">Benzina</option>
              <option value="motorina">Motorina</option>
              <option value="electric">Electric</option>
            </select>
          </div>
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, power: e.target.value}
            })
          }} label="Putere"/>
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, torque: e.target.value}
            })
          }} label="Cuplu"/>
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, trunkVolume: e.target.value}
            })
          }} label="Volum portbagaj"/>
          <Input onChange={(e) => {
            setData((prev) => {
              return {...prev, price: e.target.value}
            })
          }} label="Pret"/>
          {errorMessage && errorMessage.length > 0 && <p className="text-red-500 text-center">{errorMessage}</p>}
          <Button type="button" onClick={handleInsert}>Adaugare</Button>
          <Button type="button" onClick={handleInsert}>Modificare</Button>
          <Button type="button" onClick={handleInsert}>Stergere</Button>
        </form>
      </div>
    </div>
  )
}

export default AdminPage;