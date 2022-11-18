import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { VictoryPie } from "victory-native";
import { ScrollView } from "react-native-gesture-handler";

import { ptBR } from "date-fns/locale";
import { addMonths, format, isSameMonth, subMonths } from "date-fns";

import { useTransactions } from "../../contexts/transactions.context";

import { Header } from "../../components/Header";
import { CategoryResume } from "../../components/CategoryResume";

import { categories } from "../../utils/categories";
import { formatCurrency } from "../../utils/formatCurrency";

import {
  Container,
  Month,
  MonthButton,
  MonthContainer,
  MonthIcon,
  ChartContainer,
  CategoryList,
} from "./styles";

interface CategoryWithTotal {
  color: string;
  key: string;
  name: string;
  total: number;
}

interface Data {
  total: number;
  categories: CategoryWithTotal[];
}

export function Resume() {
  const theme = useTheme();
  const { transactions } = useTransactions();
  const tabBarHeight = useBottomTabBarHeight();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [data, setData] = useState<Data>({
    total: 0,
    categories: [],
  });

  useEffect(() => {
    const totalByCategories = transactions.reduce((acc, transaction) => {
      if (
        transaction.type === "outcome" &&
        isSameMonth(transaction.date, selectedDate)
      ) {
        acc[transaction.category]
          ? (acc[transaction.category] += transaction.amount)
          : (acc[transaction.category] = transaction.amount);
      }
      return acc;
    }, {} as Record<string, number>);

    setData({
      total: Object.values(totalByCategories).reduce(
        (acc, amount) => acc + amount,
        0
      ),

      categories: categories
        .map((category) => ({
          ...category,
          total: totalByCategories[category.key] ?? 0,
        }))
        .filter((category) => category.total > 0),
    });
  }, [transactions, selectedDate]);

  function handleDateChange(actionType: "increment" | "decrement") {
    switch (actionType) {
      case "increment":
        setSelectedDate(addMonths(selectedDate, 1));
        break;
      case "decrement":
        setSelectedDate(subMonths(selectedDate, 1));
        break;
      default:
        throw new Error("Unhandle action type: %s", actionType);
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
    >
      <Header>Resumo por categoria</Header>

      <Container>
        <MonthContainer>
          <MonthButton onPress={() => handleDateChange("decrement")}>
            <MonthIcon name="chevron-left" />
          </MonthButton>
          <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>
          <MonthButton onPress={() => handleDateChange("increment")}>
            <MonthIcon name="chevron-right" />
          </MonthButton>
        </MonthContainer>

        {/* Pie Chart */}
        <ChartContainer>
          <VictoryPie
            data={data.categories.map((category, index) => ({
              x: index + 1,
              y: category.total,
              label: ((category.total / data.total) * 100).toFixed(0) + "%",
            }))}
            colorScale={data.categories.map((c) => c.color)}
            labelRadius={data.categories.length > 1 ? 50 : 1}
            style={{
              labels: {
                fill: theme.colors.shape,
                fontSize: 16,
                fontWeight: "bold",
              },
            }}
          />
        </ChartContainer>

        {/* Resume Category List */}
        <CategoryList>
          {data.categories.map((category) => (
            <CategoryResume
              key={category.key}
              color={category.color}
              name={category.name}
              amount={formatCurrency(category.total)}
            />
          ))}
        </CategoryList>
      </Container>
    </ScrollView>
  );
}
