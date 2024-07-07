import React, { useState, useEffect } from "react";
import { View, Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootState } from "@/app/core/redux/store";
import { fetchChats } from "@/app/core/services/chatService";
import { addChat } from "@/app/core/redux/chatSlice";
import ChatListItem from "@/app/shared/ChatListItem";
import NewChatModal from "@/app/shared/NewChatModal";

type RootStackParamList = {
  Home: undefined;
  Chat: { chatId: string };
};

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeNavigationProp;
};

interface Chat {
  id: string;
  name: string;
  createdBy: string;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);

  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = useSelector((state: RootState) => state.chat.currentUser);

  useEffect(() => {
    const loadChats = async () => {
      const fetchedChats = await fetchChats();
      if (chats.length < fetchedChats.length) {
        fetchedChats.forEach((chat: Chat) => dispatch(addChat(chat)));
      }
    };
    loadChats();
  }, [dispatch]);

  const handleCreateChat = (name: string) => {
    const newChat = {
      id: Date.now().toString(),
      name,
      createdBy: currentUser,
    };
    dispatch(addChat(newChat));
  };

  return (
    <View>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ChatListItem
            chat={item}
            onPress={() => navigation.navigate("Chat", { chatId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Create New Chat" onPress={() => setModalVisible(true)} />
      <NewChatModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateChat}
      />
    </View>
  );
};

export default Home;
