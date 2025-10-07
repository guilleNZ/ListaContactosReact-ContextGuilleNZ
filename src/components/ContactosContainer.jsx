import { useContext, useEffect } from "react";
import { ListaContactosContext } from "./Context/ListaContactosContext";
import ContactCard from "./ContactCard";
import { Link, useNavigate } from "react-router-dom";

const ContactosContainer = () => {
  const { state, leerContactos, eliminarContacto } = useContext(ListaContactosContext);
  const navigate = useNavigate();

  useEffect(() => {
    leerContactos();
    
  }, []);

  const handleEdit = (id) => {
    navigate(`/addcontact/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar contacto?")) return;
    await eliminarContacto(id);
  };

  const contactsArray = Array.isArray(state.contacts) ? state.contacts : [];

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contacts</h2>
        <Link to="/addcontact" className="btn btn-success">Add new contact</Link>
      </div>

      {state.loading ? (
        <h4 className="text-danger">Cargando...</h4>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {contactsArray.length === 0 ? (
              <p>No hay contactos.</p>
            ) : (
              contactsArray.map((item) => (
                <ContactCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ContactosContainer;
