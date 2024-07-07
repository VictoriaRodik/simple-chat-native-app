import "react-native-gesture-handler";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "@/app/core/redux/store";
import Home from "@/app/static/Home";
import Chat from "@/app/static/Chat";

type RootStackParamList = {
  Home: undefined;
  Chat: { chatId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </Provider>
  );
};

export default App;
