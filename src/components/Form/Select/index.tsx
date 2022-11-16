import { ReactElement, useMemo, useState } from "react";
import { FlatList, FlatListProps, TouchableOpacity } from "react-native";
import { useController } from "react-hook-form";

import { SelectProvider } from "../../../contexts/select.context";
import { Modal } from "../../Modal";

import { SelectButton } from "./SelectButton";
import { Title, Caption } from "./styles";

interface SelectProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  name: string;
  defaultValue?: T;
  placeholder: string;
  valueExtractor(item: T): string;
  renderItem(data: { item: T }): ReactElement;
}

export function Select<T = any>({
  name,
  placeholder,
  defaultValue,
  valueExtractor,
  renderItem,
  ...rest
}: SelectProps<T>) {
  const {
    field: { value, onChange: onChangeForm },
    formState: { errors },
  } = useController({ name, defaultValue });
  const error = useMemo(() => errors[name]?.message as string, [errors]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  function onChange(newValue: T) {
    onChangeForm(newValue);
    setIsModalVisible(false);
  }

  return (
    <SelectProvider value={{ value, onChange }}>
      <SelectButton onPress={() => setIsModalVisible(true)}>
        {!!value ? valueExtractor(value) : placeholder}
      </SelectButton>
      {!!error && <Caption>{error}</Caption>}

      <Modal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(!isModalVisible)}
      >
        <Title>{placeholder}</Title>
        <FlatList
          {...rest}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onChange(item)}>
              {renderItem({ item })}
            </TouchableOpacity>
          )}
        />
      </Modal>
    </SelectProvider>
  );
}
