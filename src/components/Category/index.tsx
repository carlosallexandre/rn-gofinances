import { CategoryContainer, CategoryIcon, CategoryName } from "./styles";

interface CategoryProps {
  name: string;
  icon: string;
}

export function Category({ name, icon }: CategoryProps) {
  return (
    <CategoryContainer>
      <CategoryIcon name={icon} />
      <CategoryName>{name}</CategoryName>
    </CategoryContainer>
  );
}
