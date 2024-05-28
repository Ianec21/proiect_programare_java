import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../../utils/api";
import UsersList from "../../../components/UsersList";

export const UsersPage = () => {
  const [users, setUsers] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setError] = useState();
  
  useEffect(() => {
    if(user.role == "ROLE_USER"){
      return navigate("/");
    }

    (async() => {
      const { data, error, loading } = await fetchData("/users");
      setUsers(data);
    })();
  }, []);

  const refreshTable = async() => {
    const { data, error, loading } = await fetchData(`/users`);
    setUsers(data);
  }

  const handleDelete = async(userID) => {
    const { data, error, loading } = await fetchData(`/user/${userID}`, null, true);
    setError(error);
    console.log(data);

    refreshTable();
  }

  const handleUpdate = async(userID) => {
    //const { data, error, loading } = await fetchData(`/vehicle/update`, editData, false);
    //setError(error);
    //console.log(data);

    navigate(`/admin/users/edit/${userID}`)
  }

  return (
    <div className="p-10">
      {users && users.length > 0 && <UsersList data={users} admin={true} handleDelete={handleDelete} handleUpdate={handleUpdate}/>}
    </div>
  )
}

export default UsersPage;