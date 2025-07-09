// navigation/HomeStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import HomeAppScreen from "../screens/HomeAppScreen";
import AccountScreen from "../screens/account/AccountScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeAppScreen"
      component={HomeAppScreen}
      options={({ navigation }) => ({
        title: "Home",
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Account")}>
            <Text
              style={{ marginRight: 15, color: "#1e88e5", fontWeight: "bold" }}
            >
              Account
            </Text>
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen name="Account" component={AccountScreen} />
  </Stack.Navigator>
);

export default HomeStack;
