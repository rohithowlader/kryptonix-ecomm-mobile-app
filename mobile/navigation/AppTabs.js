// navigation/AppTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import CartScreen from "../screens/CartScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import PaymentScreen from "../screens/PaymentScreen";
import OrdersScreen from "../screens/OrdersScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Cart" component={CartScreen} />
    {/* <Stack.Screen name="Payment" component={PaymentScreen} /> */}
    <Tab.Screen name="Orders" component={OrdersScreen} />
  </Tab.Navigator>
);

export default AppTabs;
