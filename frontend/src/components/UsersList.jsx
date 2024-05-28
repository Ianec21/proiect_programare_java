import { BiEdit, BiTrash } from "react-icons/bi";

const UsersList = ({ data, handleDelete, handleUpdate }) => {
  return (
    <div className="w-full h-auto">
      <table className="table-fixed w-full border-2 border-slate-500">
        <thead className="h-[100px]">
          <tr className="text-center">
            <th>ID</th>
            <th>Nume Prenume</th>
            <th>E-Mail</th>
            <th>Rol</th>
            <th>Optiuni</th>
          </tr>
        </thead>
        <tbody className="text-center border-2 border-slate-500">
        {data.map((user) =>
          <tr key={`user_${user.id}`}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td className="flex items-center justify-center items-center h-full space-x-2">
              <BiEdit className="hover:text-slate-700 cursor-pointer" onClick={() => handleUpdate(user.id)}/>
              <BiTrash className="hover:text-slate-700 cursor-pointer" onClick={() => handleDelete(user.id)}/>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
};

export default UsersList;