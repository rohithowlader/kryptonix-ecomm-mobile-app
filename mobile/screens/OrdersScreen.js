import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://kryptonix-ecomm.onrender.com/api"; // 🔁 Replace with your actual backend URL

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/orders?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.orders || []);
      setPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const openModal = (order) => {
    setModalOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalOrder(null);
    setModalVisible(false);
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <Text style={styles.cardTitle}>Order ID: {item._id}</Text>
      <Text>Date: {new Date(item.createdAt).toLocaleString()}</Text>
      <Text>Total: ${item.totalPrice?.toFixed(2)}</Text>
      <Text>Status: {item.paymentStatus}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : orders.length === 0 ? (
        <Text style={styles.empty}>No orders found.</Text>
      ) : (
        <>
          <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={renderOrderItem}
            contentContainerStyle={{ paddingBottom: 80 }}
          />

          {/* Pagination */}
          <View style={styles.pagination}>
            <Button
              title="Prev"
              disabled={page <= 1}
              onPress={() => setPage((prev) => prev - 1)}
            />
            <Text style={styles.pageNumber}>
              Page {page} of {totalPages}
            </Text>
            <Button
              title="Next"
              disabled={page >= totalPages}
              onPress={() => setPage((prev) => prev + 1)}
            />
          </View>
        </>
      )}

      {/* Invoice Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <ScrollView style={styles.modalContent}>
          {modalOrder && (
            <>
              <Text style={styles.modalTitle}>Order Invoice</Text>
              <Text>Order ID: {modalOrder._id}</Text>
              <Text>
                Date: {new Date(modalOrder.createdAt).toLocaleString()}
              </Text>
              <Text>Total: ${modalOrder.totalPrice?.toFixed(2)}</Text>
              <Text>Status: {modalOrder.paymentStatus}</Text>

              <Text style={styles.sectionTitle}>Products:</Text>
              {modalOrder.products.map((item, index) => (
                <View key={index} style={styles.productItem}>
                  <Text>Product: {item.product?.name || "N/A"}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>
                    Price: ${Number(item.product?.price || 0).toFixed(2)}
                  </Text>
                  <Text>
                    Subtotal: $
                    {(Number(item.product?.price || 0) * item.quantity).toFixed(
                      2
                    )}
                  </Text>
                </View>
              ))}
              <View style={{ marginVertical: 20 }}>
                <Button title="Close" onPress={closeModal} />
              </View>
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    padding: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: "500",
  },
  modalContent: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  productItem: {
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
