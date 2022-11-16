import { RectButtonProps } from "react-native-gesture-handler";
import { useRadioProps } from "../../../contexts/RadioGroup";

import { Container, Button, Icon, Label } from "./styles";

interface RadioProps extends RectButtonProps {
  value: string;
  activeBackgroundColor: string;
}

function Radio({
  activeBackgroundColor,
  value,
  children,
  style,
  ...rest
}: RadioProps) {
  const { isSelected, onPress } = useRadioProps({ value });

  return (
    <Container
      isSelected={isSelected}
      activeBackgroundColor={activeBackgroundColor}
      style={style}
    >
      <Button onPress={onPress} {...rest}>
        {children}
      </Button>
    </Container>
  );
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
