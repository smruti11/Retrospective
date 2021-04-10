import React, { createContext, useState } from "react";
import {typeAll,typeWell,typeAction,typeDone,typeImprove} from '../constants/categoryTypes';
export const NavigationContext = createContext();
export const NavigationProvider = ({ children }) => {
  const [section, setSection] = useState([typeWell,typeAction,typeDone,typeImprove]);
  const [sorting, setSorting] = useState("");

  return (
    <NavigationContext.Provider
      value={{
        section,
        sorting,
        setSection,
        setSorting
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};