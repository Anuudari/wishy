import React from "react";
import { Text } from "react-native";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserInfo from "./src/screens/UserInfo";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = Platform.OS === "ios" ? "home" : "home-outline";
          } else if (route.name === "UserInfo") {
            iconName = Platform.OS === "ios" ? "account" : "account-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarLabel: ({ color }) => {
          let label;
          if (route.name === "Home") {
            label = "Нүүр";
          } else if (route.name === "UserInfo") {
            label = "Хэрэглэгч";
          }
          return <Text style={{ color }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="UserInfo" component={UserInfo} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
