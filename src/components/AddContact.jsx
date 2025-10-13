import React, { useContext, useEffect, useState } from "react";
import { ListaContactosContext } from "./Context/ListaContactosContext";
import { useNavigate, useParams, Link } from "react-router-dom";

const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, agregarContacto, editarContacto, getContactLocal } = useContext(ListaContactosContext);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const found = getContactLocal(id);
      if (found) {
        setForm({
          full_name: found.full_name || found.name || "",
          email: found.email || "",
          phone: found.phone || "",
          address: found.address || "",
        });
      }
    }
    
  }, [id, state.contacts]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email) {
      alert("Nombre y email son obligatorios.");
      return;
    }
    if (id) await editarContacto(id, form);
    else await agregarContacto(form);
    navigate("/contact");
  };

  return (
    <div className="container my-5">
      <h2>{id ? "Editar contacto" : "Agregar contacto"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input name="full_name" value={form.full_name} onChange={handleChange} className="form-control" placeholder="Nombre completo" />
        </div>
        <div className="mb-2">
          <input name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Email" />
        </div>
        <div className="mb-2">
          <input name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="Teléfono" />
        </div>
        <div className="mb-2">
          <input name="address" value={form.address} onChange={handleChange} className="form-control" placeholder="Dirección" />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">Guardar</button>
          <Link to="/contact" className="btn btn-link">Volver</Link>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
