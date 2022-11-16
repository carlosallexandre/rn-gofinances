import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

interface SelectButtonProps extends TouchableOpacityProps {
  children: string;
}

export function SelectButton({ children, ...rest }: SelectButtonProps) {
  return (
    <Container {...rest}>
      <Title>{children}</Title>
      <Icon name="chevron-down" />
    </Container>
  );
}
