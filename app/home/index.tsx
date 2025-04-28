// HomeScreen.js
import React, { useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Animated, Dimensions, Modal } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const chats = [
  { id: "1", name: "Ashish Rawat", message: "Hey! How's it going?", time: "10:30 AM" },
  { id: "2", name: "Nishant Kumar Singh", message: "What's up?", time: "9:45 AM" },
  { id: "3", name: "Sahil Sharma", message: "Hi there", time: "8:15 AM" },
  { id: "4", name: "Ashish Rawat", message: "Hey! How's it going?", time: "10:30 AM" },
  { id: "5", name: "Nishant Kumar Singh", message: "What's up?", time: "9:45 AM" },
  { id: "6", name: "Sahil Sharma", message: "Hi there", time: "8:15 AM" },
  { id: "7", name: "Ashish Rawat", message: "Hey! How's it going?", time: "10:30 AM" },
  { id: "8", name: "Nishant Kumar Singh", message: "What's up?", time: "9:45 AM" },
  { id: "9", name: "Sahil Sharma", message: "Hi there", time: "8:15 AM" }
];

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
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
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleMenu} />
      )}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <LinearGradient colors={["#ffffff", "#e6f2ff"]} style={styles.sidebarContent}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.appName}>ChatSphere</Text>
          </View>

          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="home-outline" size={24} color="#3498db" />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={24} color="#3498db" />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Feather name="settings" size={24} color="#3498db" />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="log-out-outline" size={24} color="#3498db" />
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={require('../../assets/images/Profilesample.png')}
                style={styles.profilePic}
              />
            </TouchableOpacity>
            <Text style={styles.profileName}>Shefali</Text>
          </View>

          {/* Sidebar Profile Modal */}
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
                <Image
                  source={require('../../assets/images/Profilesample.png')}
                  style={styles.modalImage}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        </LinearGradient>
      </Animated.View>

      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#3498db" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ChatSphere</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={25} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList showsVerticalScrollIndicator={false}

        contentContainerStyle={{ padding: 10 }}
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlurView intensity={50} tint="light" style={styles.chatItem}>
            <View style={styles.chatRow}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedProfileImage(require('../../assets/images/Profilesample.png'));
                  setProfileModalVisible(true);
                }}
              >
                <Image
                  source={require('../../assets/images/Profilesample.png')}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </TouchableOpacity>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
              <Text style={styles.chatTime}>{item.time}</Text>
            </View>
          </BlurView>
        )}
      />

      {/* Floating New Chat Button */}
      <TouchableOpacity style={styles.newChatButton}>
        <Ionicons name="chatbubble" size={30} color="white" />
      </TouchableOpacity>

      {/* Profile Picture Modal */}
      <Modal visible={profileModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setProfileModalVisible(false)}
          >
            {selectedProfileImage && (
              <Image
                source={selectedProfileImage}
                style={styles.modalImage}
              />
            )}
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6fc",
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498db",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.7,
    zIndex: 2,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  sidebarContent: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  appName: {
    color: "#3498db",
    fontSize: 24,
    fontWeight: "bold",
  },
  menu: {
    flex: 1,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    color: "#3498db",
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    color: "#3498db",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatItem: {
    borderRadius: 20,
    marginVertical: 8,
    backgroundColor: "#ffffff", // Light background
    shadowColor: "#3498db",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // for Android
    overflow: "hidden",
  },
  
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34495e",
  },
  chatMessage: {
    color: "#7f8c8d",
  },
  chatTime: {
    color: "#95a5a6",
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
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 1,
  },
});

export default HomeScreen;
