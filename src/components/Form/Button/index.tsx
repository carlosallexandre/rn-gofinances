import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  children: string;
  onPress?(): void;
}

export function Button({ children, onPress, ...rest }: ButtonProps) {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{children}</Title>
    </Container>
  );
}
