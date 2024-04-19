import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  Image,
  CheckBox,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

import Task from "../components/task";

export default function App() {
  // State variables
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [isSelected, setSelection] = useState(false);

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
  }, [ImagePicker]);

  const handleDelete = () => {
    if (isSelected) {
      setSelectedImage([]);
    }
  };
  const handleAddTask = () => {
    setTaskItems([...taskItems, newTaskItem]);
    setTask("");
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
        setSelectedImage([result]);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  console.log(taskItems);
  console.log(selectedImage);
  // JSX
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Task List</Text>
          <View style={styles.items}>
            {selectedImage?.map((data, index) => (
              <>
                <CheckBox value={isSelected} onValueChange={setSelection} />
                <View key={index}>
                  {data.assets.map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => completeTask(idx)}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.taskImage}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ))}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handlePickImage}>
          <View style={styles.addImageWrapper}>
            <FontAwesome name="image" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addButtonWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        {selectedImage.length !== 0 ? (
          <TouchableOpacity onPress={handleDelete}>
            <View style={styles.addButtonWrapper}>
              <Text style={styles.deleteText}>Delete Image</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
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
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#9195F6",
    borderWidth: 1,
    width: 200,
  },
  addImageWrapper: {
    width: 100,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#9195F6",
    borderWidth: 1,
  },
  addButtonWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#9195F6",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    color: "#9195F6",
  },
  taskImage: {
    width: 200,
    height: 200,
  },
});
