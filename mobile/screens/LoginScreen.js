// screens/LoginScreen.js
import React, { useContext } from "react";
import { View, Button, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Login Page</Text>
      <Button
        title="Login"
        onPress={() => {
          setLoggedIn(true);
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export default LoginScreen;
