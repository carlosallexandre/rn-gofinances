import { View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserAvatar,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface Transaction {
  id: number;
  type: "income" | "outcome";
  title: string;
  amount: string;
  category: {
    icon: string;
    name: string;
  };
  date: string;
}

export function Dashboard() {
  const transactions: Transaction[] = [
    {
      id: 1,
      type: "income",
      title: "Desenvolvimento de software",
      amount: "R$ 12.000,00",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
      date: "14/11/22",
    },
    {
      id: 2,
      type: "outcome",
      title: "Café",
      amount: "R$ 58,00",
      category: {
        icon: "coffee",
        name: "Alimentação",
      },
      date: "14/11/22",
    },
    {
      id: 3,
      type: "outcome",
      title: "Aluguel",
      amount: "R$ 1.200,00",
      category: {
        icon: "shopping-bag",
        name: "Casa",
      },
      date: "14/11/22",
    },
    {
      id: 4,
      type: "outcome",
      title: "Compras de roupas",
      amount: "R$ 600,00",
      category: {
        icon: "shopping-bag",
        name: "Compras",
      },
      date: "14/11/22",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatar
              source={{ uri: "https://github.com/carlosallexandre.png" }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Carlos</UserName>
            </User>
          </UserInfo>

          <BorderlessButton onPress={() => {}}>
            <View
              accessibilityRole="button"
              style={{
                borderRadius: 99999,
                padding: 4,
              }}
            >
              <Icon name="power" />
            </View>
          </BorderlessButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Útilma entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 17.400,00"
          lastTransaction="Útilma entrada dia 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 17.400,00"
          lastTransaction="Útilma entrada dia 13 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={transactions}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
