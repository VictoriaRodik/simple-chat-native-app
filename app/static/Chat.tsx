import React, { useEffect } from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Avatar } from "@rneui/themed";
import { RouteProp } from "@react-navigation/native";
import { RootState } from "@/app/core/redux/store";
import { addMessage, deleteMessages } from "@/app/core/redux/chatSlice";
import { fetchMessages } from "@/app/core/services/chatService";
import MessageInput from "@/app/shared/MessageInput";

type RootStackParamList = {
  Home: undefined;
  Chat: { chatId: string };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;

type Props = {
  route: ChatScreenRouteProp;
};

interface Message {
  chatId: string;
  messageId: string;
  user: string;
  text: string;
}

const Chat: React.FC<Props> = ({ route }) => {
  const { chatId } = route.params;
  const dispatch = useDispatch();

  const storedMessage = useSelector((state: RootState) => state.chat.messages);
  const messages = useSelector((state: RootState) =>
    state.chat.messages.filter((message) => message.chatId === chatId)
  );
  const currentUser = useSelector((state: RootState) => state.chat.currentUser);

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchMessages(chatId);
      if (storedMessage.length < fetchedMessages.length) {
        dispatch(deleteMessages({ chatId }));
        fetchedMessages.forEach((message: Message) => {
          dispatch(addMessage(message));
        });
      }
    };

    loadMessages();
  }, [dispatch, chatId]);

  const handleSendMessage = (text: string) => {
    const messageId = new Date().toString();
    dispatch(addMessage({ chatId, messageId, user: currentUser, text }));
  };

  const renderItem: ListRenderItem<Message> = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar
        rounded
        source={{
          uri: `https://randomuser.me/api/portraits/women/${Math.round(
            Math.random() * 10
          )}.jpg`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ color: "#2196F3", fontWeight: "bold" }}>
          {item.user}
        </ListItem.Title>
        <ListItem.Subtitle>{item.text}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.messageId}
      />
      <MessageInput onSend={handleSendMessage} />
    </View>
  );
};

export default Chat;
