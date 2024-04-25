import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ListItem } from "@rneui/themed";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Modal,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Home() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleDelete = () => {
    setSelectedImage([]);
  };

  const handlePickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        multiple: true,
      });

      if (!result.cancelled) {
        setSelectedImage([...selectedImage, ...result.assets]);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const handleSubmitModal = () => {
    setTaskItems([...taskItems, { task, selectedImage }]);
    setTask("");
    setSelectedImage([]);
    setModalVisible(false);
  };

  const handleDeleteItem = (index) => {
    const updatedTaskItems = [...taskItems];
    updatedTaskItems.splice(index, 1);
    setTaskItems(updatedTaskItems);
  };

  const handleDeleteImage = (index) => {
    const updatedSelectedImage = [...selectedImage];
    updatedSelectedImage.splice(index, 1);
    setSelectedImage(updatedSelectedImage);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Task List</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <ListItem.Swipeable
                key={index}
                leftContent={() => (
                  <View style={styles.swipeLeftContent}>
                    <Text style={styles.swipeLeftText}>Info</Text>
                    <FontAwesome name="info" size={24} color="white" />
                  </View>
                )}
                rightContent={() => (
                  <View style={styles.swipeRightContent}>
                    <Text
                      onPress={() => handleDeleteItem(index)}
                      style={styles.swipeRightText}
                    >
                      Delete
                    </Text>
                    <FontAwesome name="trash" size={24} color="white" />
                  </View>
                )}
              >
                <ListItem.Content>
                  <ListItem.Title>{item.task}</ListItem.Title>
                  <View style={styles.imageContainer}>
                    {item.selectedImage.map((image, idx) => (
                      <Image
                        key={idx}
                        source={{ uri: image.uri }}
                        style={styles.taskImage}
                      />
                    ))}
                  </View>
                </ListItem.Content>
              </ListItem.Swipeable>
            ))}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addButtonWrapper}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              placeholder="Write a task"
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity onPress={handlePickImage}>
              <View style={styles.modalButton}>
                <FontAwesome name="image" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {selectedImage.map((image, idx) => (
                <View key={idx} style={styles.uploadedImageContainer}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.uploadedImage}
                  />
                  <TouchableOpacity onPress={() => handleDeleteImage(idx)}>
                    <FontAwesome name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Button
              style={styles.modalButtonSub}
              title="Submit"
              onPress={handleSubmitModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadedImageContainer: {
    width: "33%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#9F91CC",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  items: {
    marginTop: 30,
  },
  addButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
  addText: {
    fontSize: 30,
    color: "#9195F6",
  },
  taskText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalInput: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
  },
  modalButtonSub: {
    width: 10,

    marginBottom: 10,
    backgroundColor: "#2c69d3",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    marginBottom: 10,
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  swipeLeftContent: {
    flex: 1,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    paddingHorizontal: 20,
  },
  swipeLeftText: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  swipeRightContent: {
    flex: 1,
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    paddingHorizontal: 20,
  },
  swipeRightText: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
});
