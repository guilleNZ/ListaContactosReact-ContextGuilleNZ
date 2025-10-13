import { FETCH_START, FETCH_OK, FETCH_NOT_OK } from "./ListaContactosActions";

const ListaContactosReducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true, error: false };
    case FETCH_OK:
      return { ...state, loading: false, contacts: action.payload, error: false };
    case FETCH_NOT_OK:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default ListaContactosReducer;
