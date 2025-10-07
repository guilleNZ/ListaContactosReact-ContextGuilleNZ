import React from "react";

const ContactCard = ({ item, onEdit = () => {}, onDelete = () => {} }) => {
  return (
    <div className="card mb-2" style={{ width: "100%" }}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <h5 className="card-title mb-1">{item.full_name ?? item.name}</h5>
          <h6 className="card-subtitle mb-1 text-muted">{item.address}</h6>
          <div className="small">
            <div>{item.email}</div>
            <div>{item.phone}</div>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(item.id)}>
            Edit
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
