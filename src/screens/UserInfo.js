import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function UserInfo({ navigation }) {
  const handleLogin = async () => {
    try {
      const response = await login({
        phone: 99111199,
        password: "0000",
      });
      if (response.status === 200) {
        const userData = response.data.data;
        navigation.navigate("Home", { user: userData });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  // burtgeh username passworder phone
  // login username  password
  const handleLogOut = () => {
    navigation.navigate("Login");
  };
  return (
    <View>
      <Image
        source="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        style={{ height: 150, width: 300, borderRadius: 10 }}
      />
      <Text>UserInfo Page</Text>

      <Button
        style={styles.LogOutButton}
        title="LogOut"
        onPress={handleLogOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  LogOutButton: {
    backgroundColor: "red",
    color: "white",
  },
});
