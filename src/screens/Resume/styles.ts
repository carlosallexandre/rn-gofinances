import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 24px;
`;

export const MonthContainer = styled.View`
  margin-top: 40px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.text_dark};
`;

export const MonthButton = styled(RectButton)`
  padding: 6px;

  align-items: center;
  justify-content: center;

  border-radius: 9999px;
`;

export const MonthIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.text_dark};
`;

export const ChartContainer = styled.View`
  align-items: center;
  justify-content: center;

  margin-top: 32px;
`;

export const CategoryList = styled.View`
  margin-top: 32px;
`;
