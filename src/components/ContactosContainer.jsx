import React, { useContext, useEffect } from "react";
import { ListaContactosContext } from "./Context/ListaContactosContext.jsx";
import ContactCard from "./ContactCard.jsx";
import { Link } from "react-router-dom";

export default function ContactosContainer() {
  const { state, leerContactos } = useContext(ListaContactosContext);

  useEffect(() => {
    leerContactos();
    
  }, []);

  return (
    <div className="container">
      
      <div className="header">
        <h2>Lista de contactos</h2>
        <Link to="/addcontact" className="btn btn-primary">
          ➕ Añadir nuevo contacto
        </Link>
      </div>

      {state.loading && <p>Cargando...</p>}
      {state.error && <p style={{ color: "red" }}>Error al cargar contactos</p>}

      <div className="row">
        {state.contacts.length === 0 && !state.loading ? (
          <p>No hay contactos todavía.</p>
        ) : (
          state.contacts.map((c) => (
            <div className="col" key={c.id}>
              <ContactCard item={c} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
