import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
import VehiclesList from "../../components/VehiclesList";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export const AdminPage = () => {
  const [vehicles, setVehicles] = useState();
  const {user} = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setError] = useState();
  
  useEffect(() => {
    if(user.role != "ROLE_ADMIN"){
      return navigate("/");
    }

    (async() => {
      const { data, error, loading } = await fetchData("/vehicles");
      setVehicles(data);
    })();
  }, []);

  const refreshTable = async() => {
    const { data, error, loading } = await fetchData(`/vehicles`);
    setVehicles(data);
  }

  const handleDelete = async(textPlate) => {
    const { data, error, loading } = await fetchData(`/vehicle/${textPlate}`, null, true);
    setError(error);
    console.log(data);

    refreshTable();
  }

  const handleUpdate = async(textPlate) => {
    //const { data, error, loading } = await fetchData(`/vehicle/update`, editData, false);
    //setError(error);
    //console.log(data);

    navigate(`/admin/edit/${textPlate}`)
  }

  return (
    <div className="p-10">
      {vehicles && vehicles.length > 0 && <VehiclesList data={vehicles} admin={true} handleDelete={handleDelete} handleUpdate={handleUpdate}/>}

      <div className="flex items-center flex-col justify-center mt-10">
        <Button onClick={() => navigate("/admin/new")}>Adauga vehicul nou</Button>
      </div>
    </div>
  )
}

export default AdminPage;