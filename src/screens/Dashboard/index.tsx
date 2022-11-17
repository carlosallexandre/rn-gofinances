import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import { useTransactions } from "../../contexts/transactions.context";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

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

export function Dashboard() {
  const theme = useTheme();
  const { transactions, loadTransactions, isLoading, incomes, outcomes } =
    useTransactions();

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <>
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
              amount={formatCurrency(incomes ? incomes.amount : 0)}
              lastTransaction={
                incomes
                  ? `Última entrada dia ${formatDate(incomes.lastTransaction, {
                      day: "2-digit",
                      month: "long",
                    })}`
                  : ""
              }
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={formatCurrency(outcomes ? outcomes.amount : 0)}
              lastTransaction={
                outcomes
                  ? `Última entrada dia ${formatDate(outcomes.lastTransaction, {
                      day: "2-digit",
                      month: "long",
                    })}`
                  : ""
              }
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={formatCurrency(
                incomes && outcomes ? incomes.amount - outcomes.amount : 0
              )}
              lastTransaction={
                outcomes && incomes
                  ? `01 à ${formatDate(outcomes.lastTransaction, {
                      day: "2-digit",
                      month: "long",
                    })}`
                  : ""
              }
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <TransactionCard
                  name={item.name}
                  type={item.type}
                  category={item.category}
                  date={formatDate(item.date)}
                  amount={formatCurrency(item.amount)}
                />
              )}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
