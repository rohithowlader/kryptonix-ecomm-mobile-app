import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
const PaymentScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    initializePayment();
  }, []);

  const initializePayment = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        "https://kryptonix-ecomm.onrender.com/api/order/create-payment-intent",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { clientSecret, totalPrice } = await res.json();

      setClientSecret(clientSecret);

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "My Store",
      });

      if (!error) setLoading(false);
    } catch (error) {
      console.error("Payment init error:", error);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Payment failed`, error.message);
    } else {
      await placeOrder(); // Confirm order on success
    }
  };

  const placeOrder = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        "https://kryptonix-ecomm.onrender.com/api/order/place",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: clientSecret.split("_secret")[0],
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Order placed successfully");

        // Reset navigation to AppTabs and open HomeAppScreen tab
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "AppTabs", // Your tab navigator screen
                state: {
                  index: 0, // HomeAppScreen tab index
                  routes: [{ name: "HomeAppScreen" }],
                },
              },
            ],
          })
        );
      } else {
        Alert.alert("Error", data.message || "Order failed");
      }
    } catch (err) {
      console.error("Order placing error:", err);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Payment</Text>
      <Text style={styles.button} onPress={openPaymentSheet}>
        Pay Now
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, marginBottom: 20 },
  button: {
    backgroundColor: "#007AFF",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    overflow: "hidden",
  },
});

export default PaymentScreen;
