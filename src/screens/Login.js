import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { login } from "./action";

import logo from "../../assets/logo.jpg";

export default function LoginForm({ navigation }) {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({
        username,
        password,
      });
      if (response.status === 200) {
        const userData = response.data.data;
        navigation.navigate("Home", { user: userData });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  //     // navigation.navigate("Main", { screen: "Home" });

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Нууц үг"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={(value) => {
              setClick(value);
            }}
            trackColor={{ true: "green", false: "gray" }}
          />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <Pressable onPress={() => Alert("Нууц үгээ мартчихсан юмуу?!")}>
          <Text style={styles.forgetText}>Forgot Password?</Text>
        </Pressable>
      </View>

      <Pressable style={styles.buttonView}>
        <Button title="Нэвтрэх" onPress={handleLogin} color="#9195F6" />
      </Pressable>

      <Button
        title="Бүртгүүлэх"
        onPress={() => navigation.navigate("Register")}
        color="#9195F6"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
    backgroundColor: "#ffffff",
  },
  image: {
    height: 120,
    width: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    textTransform: "uppercase",
    textAlign: "center",
    color: "#FF1493",
    marginBottom: 20,
  },
  inputView: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 15,
  },
  rememberView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginBottom: 15,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
    color: "#333",
  },
  forgetText: {
    fontSize: 11,
    color: "#FF1493",
  },
  buttonView: {
    width: "80%",
    marginBottom: 20,
  },
});
