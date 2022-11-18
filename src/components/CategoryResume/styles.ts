import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 5px;
  padding: 12px 24px;
  margin-bottom: 8px;

  border-left-width: 4px;
  border-left-color: ${({ color }) => color};
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const CategoryAmount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.title};
`;
