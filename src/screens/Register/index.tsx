import { useTheme } from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { Radio } from "../../components/Form/Radio";
import { Select } from "../../components/Form/Select";

import { RadioGroup } from "../../contexts/RadioGroup";
import { categories } from "../../utils/categories";

import { Container, Form, Fields, RadioContainer, Separator } from "./styles";
import { Category } from "../../components/Category";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTransactions } from "../../contexts/transactions.context";

interface Category {
  key: string;
  name: string;
  color: string;
  icon: string;
}

interface NewTransactionData {
  name: string;
  amount: number;
  type: "income" | "outcome";
  category: Category;
}

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  amount: yup
    .number()
    .typeError("Informe o valor")
    .positive("Valor invalido")
    .required("O valor é obrigatório"),
  type: yup.string().oneOf(["income", "outcome"]),
  category: yup
    .object()
    .typeError("Selecione a categoria")
    .required("Selecione uma categoria"),
});

export function Register() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { addTransaction } = useTransactions();

  const methods = useForm<NewTransactionData>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  async function onSubmit(data: NewTransactionData) {
    try {
      await addTransaction({
        name: data.name,
        amount: data.amount,
        type: data.type,
        category: data.category.key,
      });

      reset();
      // @ts-ignore
      navigation.navigate("Listagem");
    } catch {
      Alert.alert("Não foi possível salvar a transação.");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>Cadastro</Header>

        <FormProvider {...methods}>
          <Form>
            <Fields>
              <Input
                name="name"
                placeholder="Nome"
                autoCapitalize="sentences"
                autoCorrect={false}
              />
              <Input name="amount" placeholder="Preço" keyboardType="numeric" />

              <RadioGroup asChild name="type" defaultValue="income">
                <RadioContainer>
                  <Radio
                    value="income"
                    style={{ marginRight: 8 }}
                    activeBackgroundColor={theme.colors.success_light}
                  >
                    <Radio.Icon name="arrow-up-circle" />
                    <Radio.Label>Entrada</Radio.Label>
                  </Radio>
                  <Radio
                    value="outcome"
                    activeBackgroundColor={theme.colors.attention_light}
                  >
                    <Radio.Icon name="arrow-down-circle" />
                    <Radio.Label>Saída</Radio.Label>
                  </Radio>
                </RadioContainer>
              </RadioGroup>

              <Select
                name="category"
                placeholder="Categoria"
                data={categories}
                keyExtractor={(item) => item.key}
                valueExtractor={(item) => item.name}
                renderItem={({ item }) => <Category {...item} />}
                ItemSeparatorComponent={Separator}
              />
            </Fields>

            <Button onPress={handleSubmit(onSubmit)}>Enviar</Button>
          </Form>
        </FormProvider>
      </Container>
    </TouchableWithoutFeedback>
  );
}
