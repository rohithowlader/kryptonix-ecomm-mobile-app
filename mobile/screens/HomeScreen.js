// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../utils/api";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  if (!products.length) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default HomeScreen;
