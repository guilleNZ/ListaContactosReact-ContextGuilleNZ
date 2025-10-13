import React, { createContext } from "react";
import useGlobalReducer from "../../../src/hooks/useGlobalReducer";
import ListaContactosReducer from "./ListaContactosReducer";
import { FETCH_START, FETCH_OK, FETCH_NOT_OK } from "./ListaContactosActions";

export const ListaContactosContext = createContext();

const URL = "https://playground.4geeks.com/contact";
const USER = "guilleNZ";

const initialState = {
  contacts: [],
  loading: false,
  error: false,
};

const ListaContactosProvider = ({ children }) => {
  const [state, dispatch] = useGlobalReducer(ListaContactosReducer, initialState);

  
  const leerContactos = async () => {
    dispatch({ type: FETCH_START });
    try {
      const res = await fetch(`${URL}/agendas/${USER}/contacts`);
      const data = await res.json();
      dispatch({ type: FETCH_OK, payload: data.contacts || [] });
    } catch (err) {
      console.error("Error al leer contactos:", err);
      dispatch({ type: FETCH_NOT_OK });
    }
  };

  
  const agregarContacto = async (contact) => {
    dispatch({ type: FETCH_START });
    try {
      const res = await fetch(`${URL}/agendas/${USER}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Error en POST");
      await leerContactos();
    } catch (err) {
      console.error("Error al crear contacto:", err);
      dispatch({ type: FETCH_NOT_OK });
    }
  };

  
  const editarContacto = async (id, contact) => {
    dispatch({ type: FETCH_START });
    try {
      const res = await fetch(`${URL}/agendas/${USER}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Error en PUT");
      await leerContactos();
    } catch (err) {
      console.error("Error al editar contacto:", err);
      dispatch({ type: FETCH_NOT_OK });
    }
  };


  const eliminarContacto = async (id) => {
    dispatch({ type: FETCH_START });
    try {
      const res = await fetch(`${URL}/agendas/${USER}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error en DELETE");
      await leerContactos();
    } catch (err) {
      console.error("Error al eliminar contacto:", err);
      dispatch({ type: FETCH_NOT_OK });
    }
  };


  const getContactLocal = (id) =>
    state.contacts.find((c) => String(c.id) === String(id)) || null;

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
};

export default ListaContactosProvider;
