import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const InputGroup = styled.View`
  margin-bottom: 8px;
`;

export const Container = styled(TextInput)`
  width: 100%;

  padding: 16px 18px;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Caption = styled.Text`
  margin-top: 4px;
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.attention};
`;
