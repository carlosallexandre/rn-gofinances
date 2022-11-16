import {
  createContext,
  Fragment,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { useController } from "react-hook-form";

interface RadioContextData {
  value: string;
  onChange(newValue: string): void;
}

const RadioContext = createContext({} as RadioContextData);

interface RadioGroupProps {
  name: string;
  asChild?: boolean;
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?(newValue: string): void;
}

export function RadioGroup({
  name,
  children,
  asChild = false,
  defaultValue = "",
  value: valueProp,
  onChange: onChangeProp,
  ...rest
}: RadioGroupProps) {
  const {
    field: { value, onChange },
  } = useController({ name, defaultValue });

  const Container = useMemo(() => (asChild ? Slot : Fragment), [asChild]);

  return (
    <RadioContext.Provider value={{ value, onChange }}>
      <Container {...rest}>{children}</Container>
    </RadioContext.Provider>
  );
}

interface UseRadioProps {
  value: string;
}

export function useRadioProps({ value: valueProp }: UseRadioProps) {
  const ctx = useContext(RadioContext);

  if (!ctx) throw new Error("`useRadioProps` must be used into RadioGroup");

  const { value, onChange } = ctx;

  return {
    onPress: () => onChange(valueProp),
    isSelected: value === valueProp,
  };
}
