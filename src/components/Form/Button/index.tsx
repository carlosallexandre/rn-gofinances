import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  children: string;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Title>{children}</Title>
    </Container>
  );
}
