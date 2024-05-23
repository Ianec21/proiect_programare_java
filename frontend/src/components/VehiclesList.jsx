const VehiclesList = ({ data }) => {
  return (
    <div className="w-full h-auto">
      <table className="table-fixed w-full border-2 border-orange-500">
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
          </tr>
        </thead>
        <tbody className="text-center border-2 border-orange-500">
        {data.map((vehicle) =>
          <tr key={`vehicle_${vehicle.textPlate}`} className="h-[100px]">
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
          </tr>)}
        </tbody>
      </table>
    </div>
  )
};

export default VehiclesList;