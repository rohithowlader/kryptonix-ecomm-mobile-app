import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity } from "react-native";
import HomeAppScreen from "../screens/HomeAppScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PaymentScreen from "../screens/PaymentScreen";
import AccountScreen from "../screens/AccountScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
const StackNavigator = () => {
  // const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs({ navigation }) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeAppScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
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
            // tabBarIcon: ({ focused }) =>
            //   focused ? (
            //     <Entypo name="home" size={24} color="#008E97" />
            //   ) : (
            //     <AntDesign name="home" size={24} color="black" />
            //   ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            // tabBarIcon: ({ focused }) =>
            //   focused ? (
            //     <Ionicons name="person" size={24} color="#008E97" />
            //   ) : (
            //     <Ionicons name="person-outline" size={24} color="black" />
            //   ),
          }}
        />

        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            // tabBarIcon: ({ focused }) =>
            //   focused ? (
            //     <AntDesign name="shoppingcart" size={24} color="#008E97" />
            //   ) : (
            //     <AntDesign name="shoppingcart" size={24} color="black" />
            //   ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
