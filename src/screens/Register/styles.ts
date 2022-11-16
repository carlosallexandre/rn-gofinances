import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const RadioContainer = styled.View`
  width: 100%;
  flex-direction: row;

  padding: 8px 0 16px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;
