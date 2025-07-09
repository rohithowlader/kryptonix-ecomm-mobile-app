// screens/HomeAppScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeAppScreen = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://kryptonix-ecomm.onrender.com/api/products"
      );
      const data = await res.json();
      setProducts(data);
      const defaultQuantities = {};
      data.forEach((product) => {
        defaultQuantities[product._id] = "1";
      });
      setQuantities(defaultQuantities);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://kryptonix-ecomm.onrender.com/api/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
            quantity: parseInt(quantities[productId]) || 1,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", data.message || "Product added to cart.");
      } else {
        Alert.alert("Error", data.message || "Could not add to cart.");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://kryptonix-ecomm.onrender.com${item.image}` }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantities[item._id]}
        onChangeText={(text) =>
          setQuantities((prev) => ({ ...prev, [item._id]: text }))
        }
        placeholder="Quantity"
      />
      <Button title="Add to Cart" onPress={() => handleAddToCart(item._id)} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    height: 150,
    width: "100%",
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: "cover",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default HomeAppScreen;
