import { createContext, ReactNode, useContext } from "react";

interface SelectContextData<T = any> {
  value: T | null | undefined;
  onChange(newValue: T): void;
}

const SelectContext = createContext<SelectContextData | null>(null);

interface SelectProviderProps<T> {
  children: ReactNode;
  value: SelectContextData<T>;
}

export function SelectProvider<T>({ children, value }: SelectProviderProps<T>) {
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
}

export function useSelect() {
  const ctx = useContext(SelectContext);

  if (!ctx) throw new Error("`useSelect` must be used into SelectProvider");

  return ctx;
}
