import { useReducer, useCallback } from "react";

export default function useGlobalReducer(reducer, initialState) {
  const [state, baseDispatch] = useReducer(reducer, initialState);
  const dispatch = useCallback((action) => baseDispatch(action), []);
  return [state, dispatch];
}
