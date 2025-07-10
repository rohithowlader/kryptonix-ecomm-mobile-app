// screens/account/AccountScreen.js
import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      Alert.alert("Logged out", "You have been logged out.");
      //   navigation.reset({
      //     index: 0,
      //     routes: [{ name: "Login" }],
      //   });

      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Account</Text>
      <Button title="Logout" onPress={handleLogout} color="#d32f2f" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default AccountScreen;
