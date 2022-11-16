import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  isSelected?: boolean;
  activeBackgroundColor: string;
}

export const Container = styled.View<ContainerProps>`
  overflow: hidden;
  width: 100%;

  flex-shrink: 1;

  border-radius: 5px;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};

  ${({ activeBackgroundColor, isSelected }) =>
    isSelected &&
    css`
      border-color: ${activeBackgroundColor};
      background-color: ${activeBackgroundColor};
    `}
`;

export const Button = styled(RectButton)`
  padding: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ name, theme }) => {
    switch (name) {
      case "arrow-up-circle":
        return theme.colors.success;
      case "arrow-down-circle":
        return theme.colors.attention;
      default:
        return theme.colors.text_dark;
    }
  }};
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
