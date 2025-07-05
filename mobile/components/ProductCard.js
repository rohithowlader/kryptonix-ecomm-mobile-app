import React, { useContext } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import * as Notifications from "expo-notifications";

const ProductCard = ({ product }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Added to Cart 🛒",
        body: `${product.name} has been added to your cart.`,
      },
      trigger: null, // sends immediately
    });
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://kryptonix-ecomm.onrender.com${product.image}` }}
        style={styles.image}
      />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      {isLoggedIn ? (
        <Button title="Add to Cart" onPress={sendNotification} />
      ) : (
        <Button
          title="Login to add to cart"
          onPress={() => navigation.navigate("Login")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  image: { height: 150, resizeMode: "cover", borderRadius: 10 },
  name: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  price: { fontSize: 14, marginBottom: 10 },
});

export default ProductCard;
