import React, { useContext, useEffect } from "react";
import { ListaContactosContext } from "./Context/ListaContactosContext";
import ContactCard from "./ContactCard";
import { Link, useNavigate } from "react-router-dom";

const ContactosContainer = () => {
  const { state, leerContactos, eliminarContacto } = useContext(ListaContactosContext);
  const navigate = useNavigate();

  useEffect(() => {
    leerContactos();
    
  }, []);

  const handleEdit = (id) => navigate(`/addcontact/${id}`);
  const handleDelete = (id) => {
    if (!confirm("¿Eliminar contacto?")) return;
    eliminarContacto(id);
  };

  const contacts = Array.isArray(state.contacts) ? state.contacts : [];

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contactos</h2>
        <Link to="/addcontact" className="btn btn-success">Agregar</Link>
      </div>

      {state.loading && <p>Cargando...</p>}
      {state.error && <p className="text-danger">Error al cargar contactos.</p>}

      {contacts.length === 0 && !state.loading ? (
        <p>No hay contactos.</p>
      ) : (
        contacts.map((c) => (
          <ContactCard key={c.id} item={c} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default ContactosContainer;
