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
    address: ""
  });

  useEffect(() => {
    const load = async () => {
      if (id) {
        
        let found = getContactLocal(id);
        if (!found) {
          
        } else {
          setForm({
            full_name: found.full_name ?? found.name ?? "",
            email: found.email ?? "",
            phone: found.phone ?? "",
            address: found.address ?? ""
          });
        }
      }
    };
    load();
    
  }, [id, state.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email) {
      alert("Nombre y email son obligatorios.");
      return;
    }
    if (id) {
      await editarContacto(id, form);
    } else {
      await agregarContacto(form);
    }
    navigate("/contact");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">{id ? "Edit contact" : "Add a new contact"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input name="full_name" value={form.full_name} onChange={handleChange} className="form-control" placeholder="Full Name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Enter email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="Enter phone" />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="form-control" placeholder="Enter address" />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">Save</button>
          <Link className="btn btn-link" to="/contact">Or get back to contacts</Link>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
