import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";

interface NewChatModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({ visible, onClose, onCreate }) => {
  const [chatName, setChatName] = useState("");

  const handleCreate = () => {
    if (chatName.trim()) {
      onCreate(chatName);
      setChatName("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create New Chat</Text>
          <Input
            value={chatName}
            onChangeText={setChatName}
            placeholder="Enter chat name"
            containerStyle={styles.inputContainer}
          />
          <Button title="Create" onPress={handleCreate} />
          <Button title="Cancel" onPress={onClose} type="clear" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
});

export default NewChatModal;
