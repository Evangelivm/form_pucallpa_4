"use client";

import { createContext, useState, useContext } from "react";

// Crear el contexto
const TransactionContext = createContext();

// Proveedor de contexto
export function TransactionProvider({ children }) {
  const [transactionData, setTransactionData] = useState(null);

  return (
    <TransactionContext.Provider
      value={{ transactionData, setTransactionData }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

// Hook para acceder al contexto fácilmente
export function useTransaction() {
  return useContext(TransactionContext);
}
