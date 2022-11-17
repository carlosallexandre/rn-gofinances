import { categories } from "../../utils/categories";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryIcon,
  CategoryName,
  Date,
} from "./styles";

interface Category {
  name: string;
  icon: string;
}

interface Props {
  type: "income" | "outcome";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export function TransactionCard(data: Props) {
  const category = categories.find((c) => c.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === "outcome" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <CategoryIcon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
