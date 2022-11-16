import { Container, Title } from "./styles";

interface HeaderProps {
  children: string;
}

export function Header({ children }: HeaderProps) {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
}
