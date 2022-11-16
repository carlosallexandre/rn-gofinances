import { TouchableOpacityProps } from "react-native";
import { useRadioProps } from "../../../contexts/RadioGroup";

import { Container, Icon, Label } from "./styles";

interface RadioProps extends TouchableOpacityProps {
  value: string;
  activeBackgroundColor: string;
}

function Radio({ value, ...rest }: RadioProps) {
  const { isSelected, onPress } = useRadioProps({ value });

  return <Container isSelected={isSelected} onPress={onPress} {...rest} />;
}

interface RadioIconProps {
  name: "arrow-up-circle" | "arrow-down-circle";
}

function RadioIcon({ name }: RadioIconProps) {
  return <Icon name={name} />;
}

Radio.Icon = RadioIcon;

interface RadioLabelProps {
  children: string;
}

function RadioLabel({ children }: RadioLabelProps) {
  return <Label>{children}</Label>;
}

Radio.Label = RadioLabel;

export { Radio };
