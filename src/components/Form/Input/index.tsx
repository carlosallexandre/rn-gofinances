import { TextInputProps } from "react-native";
import { useController } from "react-hook-form";

import { InputGroup, Container, Caption } from "./styles";

interface Props extends TextInputProps {
  name: string;
}

export function Input({ name, ...rest }: Props) {
  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({ name });
  const error = errors[name]?.message as string;

  return (
    <InputGroup>
      <Container {...rest} value={value} onChangeText={onChange} />
      {!!error && <Caption>{error}</Caption>}
    </InputGroup>
  );
}
