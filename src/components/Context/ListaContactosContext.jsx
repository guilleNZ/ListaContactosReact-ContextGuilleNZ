import React, { createContext } from "react";
import useGlobalReducer from "../../../src/hooks/useGlobalReducer";
import ListaContactosReducer from "./ListaContactosReducer";
import { FETCH_START, FETCH_OK, FETCH_NOT_OK } from "./ListaContactosActions";

export const ListaContactosContext = createContext();

const BASE_URL = "https://playground.4geeks.com/contact";
const USER = "guilleNZ";

const initialState = { contacts: [], loading: false, error: false };

export default function ListaContactosProvider({ children }) {
  const [state, dispatch] = useGlobalReducer(ListaContactosReducer, initialState);


  const leerContactos = async () => {
    dispatch({ type: FETCH_START });
    try {
      const res = await fetch(`${BASE_URL}/agendas/${USER}/contacts`);
      const data = await res.json();
      const contacts = Array.isArray(data) ? data : data.contacts || [];
      console.log("GET response:", res.status, contacts);
      dispatch({ type: FETCH_OK, payload: contacts });
    } catch (err) {
      console.error("leerContactos error:", err);
      dispatch({ type: FETCH_NOT_OK });
    }
  };


  const agregarContacto = async (contact) => {
    dispatch({ type: FETCH_START });
    try {
      const body = {
        name: (contact.name || contact.name).trim(),
        email: (contact.email).trim(),
        phone: (contact.phone).trim(),
        address: (contact.address).trim(),
        agenda_slug: USER,
      };
      console.log("POST body:", body);

      const res = await fetch(
        "https://playground.4geeks.com/contact/agendas/guilleNZ/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      console.log("POST response:", res.status, data);

      // Bucle para mostrar los errores de validación por campo
      if (data.detail && Array.isArray(data.detail)) {
        data.detail.forEach((err, idx) => {
          console.warn(
            `Error ${idx + 1}: Campo -> ${err.loc[1]}, Mensaje -> ${err.msg}`
          );
        });
      }

      if (!res.ok) throw new Error(`POST failed ${res.status}`);

      await leerContactos();
      return true;
    } catch (err) {
      console.error("agregarContacto error:", err);
      dispatch({ type: FETCH_NOT_OK });
      return false;
    }
  };

  const editarContacto = async (id, contact) => {
    dispatch({ type: FETCH_START });
    try {
      const body = {
        name: (contact.name || contact.name || "").trim(),
        email: (contact.email || "").trim(),
        phone: (contact.phone || "").trim(),
        address: (contact.address || "").trim(),
        agenda_slug: USER,
      };
      console.log("PUT body:", id, body);

      const res = await fetch(`${BASE_URL}/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("PUT response:", res.status, data);

      if (!res.ok) throw new Error(`PUT failed ${res.status}`);

      await leerContactos();
      return true;
    } catch (err) {
      console.error("editarContacto error:", err);
      dispatch({ type: FETCH_NOT_OK });
      return false;
    }
  };


  const eliminarContacto = async (id) => {
    dispatch({ type: FETCH_START });
    try {
      const res = await fetch(`${BASE_URL}/agendas/${USER}/contacts/${id}`, {
        method: "DELETE",
      });
      console.log("DELETE response:", res.status);
      if (!res.ok) throw new Error(`DELETE failed ${res.status}`);
      await leerContactos();
      return true;
    } catch (err) {
      console.error("eliminarContacto error:", err);
      dispatch({ type: FETCH_NOT_OK });
      return false;
    }
  };

  const getContactLocal = (id) => state.contacts.find((c) => String(c.id) === String(id)) || null;

  return (
    <ListaContactosContext.Provider
      value={{
        state,
        leerContactos,
        agregarContacto,
        editarContacto,
        eliminarContacto,
        getContactLocal,
      }}
    >
      {children}
    </ListaContactosContext.Provider>
  );
}
