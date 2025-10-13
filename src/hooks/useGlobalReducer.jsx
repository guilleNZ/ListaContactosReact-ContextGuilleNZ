import { useReducer } from "react";


export default function useGlobalReducer(reducer, initialState) {
  return useReducer(reducer, initialState);
}
