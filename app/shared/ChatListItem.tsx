import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/app/core/redux/store';
import { deleteChat } from "@/app/core/redux/chatSlice";

interface ChatListItemProps {
  chat: { id: string; name: string; createdBy: string };
  onPress: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onPress }) => {
  const currentUser = useSelector((state: RootState) => state.chat.currentUser);
  const dispatch = useDispatch();

  const handleDeleteChat = () => {
    dispatch(deleteChat({ id: chat.id }));
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text h4>{chat.name}</Text>
      {chat.createdBy === currentUser && (
        <Icon
          name="delete"
          color="#2196F3"
          onPress={handleDeleteChat}
          containerStyle={styles.deleteIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteIcon: {
    marginLeft: 10,
  },
});

export default ChatListItem;
