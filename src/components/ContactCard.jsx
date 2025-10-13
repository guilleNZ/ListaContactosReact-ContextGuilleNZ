import React from "react";

const ContactCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h5 className="card-title mb-1">{item.full_name || item.name}</h5>
          <div className="text-muted small">{item.address}</div>
          <div className="small">{item.email}</div>
          <div className="small">{item.phone}</div>
        </div>

        <div className="d-flex flex-column gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(item.id)}>Editar</button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item.id)}>Borrar</button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
