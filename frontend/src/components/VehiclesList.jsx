import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { BiEdit, BiTrash } from "react-icons/bi";

const VehiclesList = ({ data, admin, handleDelete, handleUpdate }) => {
  return (
    <div className="w-full h-auto">
      <table className="table-fixed w-full border-2 border-slate-500">
        <thead className="h-[100px]">
          <tr className="text-center">
            <th>Numar inmatriculare</th>
            <th>Marca</th>
            <th>Model</th>
            <th>Culoare</th>
            <th>An Fabricatie</th>
            <th>Capacitate cilindrica</th>
            <th>Combustibil</th>
            <th>Putere</th>
            <th>Cuplu</th>
            <th>Volum Portbagaj</th>
            <th>Pret</th>
            { admin && <th>Optiuni</th>}
          </tr>
        </thead>
        <tbody className="text-center border-2 border-slate-500">
        {data.map((vehicle) =>
          <tr key={`vehicle_${vehicle.textPlate}`}>
            <td>{vehicle.textPlate}</td>
            <td>{vehicle.brand}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.color}</td>
            <td>{vehicle.year}</td>
            <td>{vehicle.engineSize}</td>
            <td>{vehicle.fuelType}</td>
            <td>{vehicle.power}</td>
            <td>{vehicle.torque}</td>
            <td>{vehicle.trunkVolume}</td>
            <td>{vehicle.price}</td>
            { admin && <td className="flex items-center justify-center items-center h-full space-x-2">
              <BiEdit className="hover:text-slate-700 cursor-pointer" onClick={() => handleUpdate(vehicle.textPlate)}/>
              <BiTrash className="hover:text-slate-700 cursor-pointer" onClick={() => handleDelete(vehicle.textPlate)}/>
              </td>}
          </tr>)}
        </tbody>
      </table>
    </div>
  )
};

export default VehiclesList;