import {useAuth} from "../../providers/AuthProvider.jsx";
import {useEffect, useState} from "react";
import {fetchData} from "../../utils/api.js";
import VehiclesList from "../../components/VehiclesList.jsx";

const HomePage = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    (async() => {
      const { data, error, loading } = await fetchData("/vehicles");
      setVehicles(data);
    })();
  }, []);

  return (
    <div className="p-10">
      <p className="text-5xl font-bold text-center mt-10 mb-10">Bine ai venit, {user.name}</p>
      {vehicles && vehicles.length > 0 && (
        <VehiclesList data={vehicles}/>
      )}
    </div>
  )
}

export default HomePage;