import { ReactNode } from "react";
import { Container, CategoryName, CategoryAmount } from "./styles";

interface CategoryResumeProps {
  name: string;
  amount: string;
  color: string;
}

export function CategoryResume({ name, amount, color }: CategoryResumeProps) {
  return (
    <Container color={color}>
      <CategoryName>{name}</CategoryName>
      <CategoryAmount>{amount}</CategoryAmount>
    </Container>
  );
}
