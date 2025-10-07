import { createContext, useReducer } from "react";
import ListaContactosReducer from "./ListaContactosReducer";

export const ListaContactosContext = createContext();

const initialstate = {
  contacts: [],
  loading: false,
  error: false
};

const URL = "https://playground.4geeks.com";
const USER = "guilleNZ";

const ListaContactosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListaContactosReducer, initialstate);

  const normalizar = (data) => {
    
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.contacts && Array.isArray(data.contacts)) return data.contacts;
    
    if (data.data && Array.isArray(data.data)) return data.data;
    return [];
  };

  const leerContactos = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(`${URL}/contact/agendas/${USER}/contacts`);
      const data = await response.json();
      const contacts = normalizar(data);
      dispatch({ type: "FETCH_OK", payload: contacts });
    } catch (error) {
      dispatch({ type: "FETCH_NOT_OK" });
      console.error("leerContactos error:", error);
    }
  };

  const agregarContacto = async (contact) => {
    dispatch({ type: "FETCH_START" });
    try {
      await fetch(`${URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, agenda_slug: USER })
      });
      
      await leerContactos();
    } catch (error) {
      dispatch({ type: "FETCH_NOT_OK" });
      console.error("agregarContacto error:", error);
    }
  };

  const editarContacto = async (id, contact) => {
    dispatch({ type: "FETCH_START" });
    try {
      await fetch(`${URL}/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, agenda_slug: USER })
      });
      await leerContactos();
    } catch (error) {
      dispatch({ type: "FETCH_NOT_OK" });
      console.error("editarContacto error:", error);
    }
  };

  const eliminarContacto = async (id) => {
    dispatch({ type: "FETCH_START" });
    try {
      await fetch(`${URL}/contact/${id}`, {
        method: "DELETE"
      });
      await leerContactos();
    } catch (error) {
      dispatch({ type: "FETCH_NOT_OK" });
      console.error("eliminarContacto error:", error);
    }
  };

  const getContactLocal = (id) => {
    
    const found = state.contacts.find((c) => String(c.id) === String(id));
    return found ?? null;
  };

  return (
    <ListaContactosContext.Provider value={{
      state,
      leerContactos,
      agregarContacto,
      editarContacto,
      eliminarContacto,
      getContactLocal
    }}>
      {children}
    </ListaContactosContext.Provider>
  );
};

export default ListaContactosProvider;
