import React from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
const image = {
  uri: "https://i.pinimg.com/originals/54/54/ae/5454ae00b78a3a579926a09ef831bc02.jpg",
};
import wishy from "../../assets/wishy.png";
const App = ({ navigation }) => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View>
        <Image
          style={{
            justifyContent: "center",
            marginLeft: 50,
            width: 350,
            height: 150,
          }}
          source={wishy}
        ></Image>
      </View>
      <Button
        style={styles.button}
        title="Эхлэх"
        onPress={() => navigation.navigate("Login")}
      />
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    textAlign: "center",
    marginVertical: 50,
  },
});

export default App;
