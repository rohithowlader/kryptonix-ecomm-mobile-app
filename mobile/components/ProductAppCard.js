// components/ProductAppCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductAppCard = ({ product }) => {
  const navigation = useNavigation();

  const goToDetails = () => {
    navigation.navigate("HomeAppScreen");
  };

  return (
    <TouchableOpacity onPress={goToDetails} style={styles.card}>
      <Image
        source={{ uri: `https://kryptonix-ecomm.onrender.com${product.image}` }}
        style={styles.image}
      />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
    </TouchableOpacity>
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
  image: {
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default ProductAppCard;
