import React, { useContext, useEffect, useState } from "react";
import { ListaContactosContext } from "./Context/ListaContactosContext";
import { useNavigate, useParams, Link } from "react-router-dom";

const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarContacto, editarContacto, getContactLocal } =
    useContext(ListaContactosContext);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const contacto = getContactLocal(id);
      if (contacto) setForm(contacto);
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await editarContacto(id, form);
    else await agregarContacto(form);
    navigate("/contact");
  };

  return (
    <div className="container my-5">
      <h2>{id ? "Editar contacto" : "Agregar contacto"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="full_name"
          placeholder="Nombre completo"
          value={form.full_name}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="address"
          placeholder="Dirección"
          value={form.address}
          onChange={handleChange}
        />
        <button className="btn btn-primary me-2" type="submit">
          Guardar
        </button>
        <Link to="/contact" className="btn btn-secondary">
          Volver
        </Link>
      </form>
    </div>
  );
};

export default AddContact;
