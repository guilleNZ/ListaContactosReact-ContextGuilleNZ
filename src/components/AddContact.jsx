import React, { useContext, useEffect, useState } from "react";
import { ListaContactosContext } from "./Context/ListaContactosContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function AddContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarContacto, editarContacto, getContactLocal } = useContext(ListaContactosContext);

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    if (id) {
      const c = getContactLocal(id);
      if (c) setForm({
        name: c.name || c.name || "",
        email: c.email || "",
        phone: c.phone || "",
        address: c.address || "",
      });
    }
    
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Nombre y email obligatorios");
      return;
    }

    if (id) {
      const ok = await editarContacto(id, form);
      if (!ok) { alert("Error al editar. Revisa consola."); return; }
    } else {
      const ok = await agregarContacto(form);
      if (!ok) { alert("Error al crear. Revisa consola."); return; }
    }
    navigate("/contact");
  };

  return (
    <div className="container">
      <h3>{id ? "Editar contacto" : "Añadir contacto"}</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Nombre completo" value={form.name} onChange={handleChange} />
        <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="form-control mb-2" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} />
        <input className="form-control mb-2" name="address" placeholder="Dirección" value={form.address} onChange={handleChange} />
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="submit" className="btn btn-primary">{id ? "Guardar" : "Crear"}</button>
          <button type="button" className="btn" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
