import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./AuthStack";
import AppTabs from "./AppTabs";
import { Text, TouchableOpacity } from "react-native";
import PaymentScreen from "../screens/PaymentScreen";
import HomeAppScreen from "../screens/HomeAppScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setInitialRoute(token ? "App" : "Auth");
    };
    checkToken();
  }, []);

  if (!initialRoute) return null; // Or show loading spinner

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppTabs} />
        {/* Payment screen (no bottom bar) */}
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: true }} // or false, your choice
        />
        <Stack.Screen
          name="HomeAppScreen"
          component={HomeAppScreen}
          options={({ navigation }) => ({
            title: "Home",
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                <Text
                  style={{
                    marginRight: 15,
                    color: "#1e88e5",
                    fontWeight: "bold",
                  }}
                >
                  Account
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
}
