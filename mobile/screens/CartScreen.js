import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      const res = await fetch("https://kryptonix-ecomm.onrender.com/api/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setCartItems(data.products || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh cart on screen focus
  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const renderItem = ({ item }) => {
    const product = item.product;
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://kryptonix-ecomm.onrender.com${product.image}`,
          }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{product.name}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Price: ₹{product.price}</Text>
        </View>
      </View>
    );
  };

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  return (
    <>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text>Your cart is empty</Text>}
      />
      {cartItems.length > 0 && (
        <Text
          style={styles.proceedButton}
          onPress={() => navigation.navigate("Payment")}
        >
          Proceed to Payment
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    textAlign: "center",
    padding: 14,
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 16,
  },
});

export default CartScreen;
