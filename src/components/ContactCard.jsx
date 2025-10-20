import React, { useContext } from "react";
import { ListaContactosContext } from "./Context/ListaContactosContext.jsx";
import { Link } from "react-router-dom";

export default function ContactCard({ item }) {
  const { eliminarContacto } = useContext(ListaContactosContext);

  const handleDelete = async () => {
    if (!confirm("Eliminar contacto?")) return;
    await eliminarContacto(item.id);
  };

  return (
    <div className="card">
      <h4>{item.name || item.name}</h4>
      <p><strong>Email:</strong> {item.email}</p>
      <p><strong>Phone:</strong> {item.phone}</p>
      <p><strong>Address:</strong> {item.address}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <Link to={`/edit/${item.id}`} className="btn btn-warning">Editar</Link>
        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
      </div>
    </div>
  );
}
