import React, { useState } from "react";
import { View } from "react-native";

import { Input, Button, Icon } from "@rneui/themed";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Input
        value={text}
        onChangeText={setText}
        placeholder="Type here"
        containerStyle={{
          width: "80%",
        }}
      />
      <Button onPress={handleSend} type="clear">
        <Icon name="send" color="#2196F3" />
      </Button>
    </View>
  );
};

export default MessageInput;
