// App.js
import React, { useEffect, useRef, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
// Configure notifications for foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        console.log("Expo Push Token:", token);
      }
    });

    // Listen for notifications when app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  return (
    <AuthProvider>
      <PaperProvider>
        <StripeProvider publishableKey="pk_test_51QHjAHRwFKrcZYFWWbNjoWah2HlW0yIghlzDiel5qtmn2Eudof0fzMGtOwSP1QpxDz1C2SYixo52vD6FKEBfRCAl00VHc3BUfw">
          <AppNavigator />
        </StripeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

// Request permissions and get push token
async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    return tokenData.data;
  } else {
    alert("Must use physical device for Push Notifications");
  }
}
