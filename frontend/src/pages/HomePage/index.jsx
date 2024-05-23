import {useAuth} from "../../providers/AuthProvider.jsx";
import {useEffect, useState} from "react";
import {fetchData} from "../../utils/api.js";
import VehiclesList from "../../components/VehiclesList.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";

const HomePage = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState(null);
  const [searchData, setSearchData] = useState({
    brand: "",
    color: "",
    fuelType: "",
  });

  useEffect(() => {
    (async() => {
      const { data, error, loading } = await fetchData("/vehicles");
      setVehicles(data);
    })();
  }, []);

  const handleFilter = async() => {
    const { data, error, loading } = await fetchData("/vehicles/filter", searchData);
    setVehicles(data);
  }

  const handleReset = async() => {
    const { data, error, loading } = await fetchData("/vehicles");
    setVehicles(data);
    setSearchData({
      brand: "",
      color: "",
      fuelType: ""
    })
  }

  return (
    <div className="p-10">
      <p className="text-5xl font-bold text-center mt-10 mb-10">Bine ai venit, {user.name}</p>
      {vehicles && vehicles.length > 0 ? <VehiclesList data={vehicles}/> : <p className="font-bold text-4xl text-center">Nu au fost gasite date.</p>}

      <div className="w-full mt-5">
        <p className="font-bold text-center">Filtre</p>
        <div className="mt-5 flex flex-row gap-2 justify-center items-end">
          <Input onChange={(e) => {
            setSearchData((prev) => {
              return {
                ...prev,
                brand: e.target.value
              }
            })
          }} label="Marca"/>
          <Input onChange={(e) => {
            setSearchData((prev) => {
              return {
                ...prev,
                color: e.target.value
              }
            })
          }} label="Culoare"/>
          <Input onChange={(e) => {
            setSearchData((prev) => {
              return {
                ...prev,
                fuelType: e.target.value
              }
            })
          }} label="Combustibil"/>
          <Button onClick={handleFilter}>Filtreaza</Button>
          <Button onClick={handleReset}>Reseteaza</Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage;