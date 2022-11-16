import { ReactNode } from "react";
import {
  Modal as NativeModal,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface ModalProps {
  isOpen: boolean;
  onClose(): void;
  onCloseComplete?(): void;
  children: ReactNode;
  statusBarTranslucent?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  onCloseComplete,
  statusBarTranslucent = true,
  children,
}: ModalProps) {
  return (
    <NativeModal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={statusBarTranslucent}
      visible={isOpen}
      onRequestClose={onClose}
      onDismiss={onCloseComplete}
    >
      <ModalOverlay isOpen={isOpen} onClose={onClose}>
        <ModalContent>{children}</ModalContent>
      </ModalOverlay>
    </NativeModal>
  );
}

interface ModalOverlayProps {
  isOpen: boolean;
  onClose(): void;
  children: ReactNode;
}

function ModalOverlay({ isOpen, onClose, children }: ModalOverlayProps) {
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

interface ModalContentProps {
  children: ReactNode;
}

function ModalContent({ children }: ModalContentProps) {
  return (
    <TouchableWithoutFeedback style={{ zIndex: 1 }}>
      <View
        style={{
          marginTop: "auto",
          height: "auto",
          maxHeight: "75%",
          backgroundColor: "#fff",
          padding: 24,
        }}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
