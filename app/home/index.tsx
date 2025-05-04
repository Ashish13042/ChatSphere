// HomeScreen.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const chats = [
  {
    id: "1",
    name: "Ashish Rawat",
    message: "Hey! How's it going?",
    time: "10:30 AM",
    profileImage: require("../../assets/images/Profilesample.png"),
  },
  {
    id: "2",
    name: "Nishant Kumar Singh",
    message: "What's up?",
    time: "9:45 AM",
    profileImage: require("../../assets/images/Profilesample.png"),
  },
  {
    id: "3",
    name: "Sahil Sharma",
    message: "Hi there",
    time: "8:15 AM",
    profileImage: require("../../assets/images/Profilesample.png"),
  },
  {
    id: "4",
    name: "Ashish Rawat",
    message: "Hey! How's it going?",
    time: "10:30 AM",
    profileImage: require("../../assets/images/Profilesample.png"),
  },
  {
    id: "5",
    name: "Nishant Kumar Singh",
    message: "What's up?",
    time: "9:45 AM",
    profileImage: require("../../assets/images/Profilesample.png"),
  },
  {
    id: "6",
    name: "Sahil Sharma",
    message: "Hi there",
    time: "8:15 AM",
    profileImage: require("../../assets/images/Profilesample.png"),
  },
  {
    id: "7",
    name: "Ashish Rawat",
    message: "Hey! How's it going?",
    time: "10:30 AM",
    profileImage: require("../../assets/images/Profilesample.png"),
  },
  {
    id: "8",
    name: "Nishant Kumar Singh",
    message: "What's up?",
    time: "9:45 AM",
    profileImage: require("../../assets/images/Profilesample.png"),
  },
  {
    id: "9",
    name: "Sahil Sharma",
    message: "Hi there",
    time: "8:15 AM",
    profileImage: require("../../assets/images/Profilesample.png"),
  },
];

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -width * 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      {menuVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleMenu}
        />
      )}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        <View style={styles.sidebarContent}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
          <View style={styles.menuItems}>
            <TouchableOpacity>
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("./home/profile")}>
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={require("../../assets/images/Profilesample.png")}
                style={styles.profilePic}
              />
            </TouchableOpacity>
            <Text style={styles.profileName}>Shefali</Text>
          </View>

          {/* Modal for Profile Picture */}
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalBackground}
                onPress={() => setModalVisible(false)}
              >
                <Image
                  source={require("../../assets/images/Profilesample.png")}
                  style={styles.modalImage}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#3498db" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ChatSphere</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={25} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        contentContainerStyle={{ padding: 10 }}
        data={chats}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BlurView intensity={50} tint="light" style={styles.chatItem}>
            <TouchableOpacity style={styles.chatRow}>
              <Image source={item.profileImage} style={styles.profileImage} />

              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
              <Text style={styles.chatTime}>{item.time}</Text>
            </TouchableOpacity>
          </BlurView>
        )}
      />

      {/* Floating New Chat Button */}
      <TouchableOpacity style={styles.newChatButton}>
        <Ionicons name="chatbubble" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f4 ",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f3f4", 
  },
  headerText: {
    fontSize: 24,
    fontWeight:"500",
    color: "#3498db",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#f5fcff", // soft white-blue blend
    zIndex: 2,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
  sidebarContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  sidebarGradient: {
    flex: 1,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  menuItems: {
    gap: 20,
  },
  menuText: {
    fontSize: 18,
    color: "#2196f3", // light blue
    fontWeight: "500",
    marginLeft: 10,
  },
  profileSection: {
    alignItems: "center",
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  profileName: {
    fontSize: 16,
    color: "#2196f3",
    marginTop: 8,
    fontWeight: "600",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  chatItem: {
    borderRadius: 30,
    marginVertical: 10,
    backgroundColor: "#ecf0f1",
    
    // Android
    elevation: 5, // smaller elevation gives a subtle shadow
  
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaf2f8 ",
    padding: 15,
    borderRadius: 30,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  chatMessage: {
    color: "#555",
  },
  chatTime: {
    color: "#999",
    fontSize: 12,
  },
  newChatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3498db",
    padding: 20,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 150,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});

export default HomeScreen;
