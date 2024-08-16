import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Sample Data
const workerData = [
  {
    id: '1',
    name: 'John Doe',
    country: 'USA',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    category: 'Photographer',
  },
  {
    id: '2',
    name: 'Jane Smith',
    country: 'UK',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    category: 'Makeup',
  },
  {
    id: '3',
    name: 'Nora Fatehi',
    country: 'India',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    category: 'Mehndi',
  },
  {
    id: '4',
    name: 'Mike Johnson',
    country: 'Canada',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    category: 'Astrologer',
  },
  {
    id: '5',
    name: 'Linda Brown',
    country: 'USA',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    category: 'Assistant',
  },
];

const categoriesData = [
  { id: '1', Worker_Role: 'Photographer', icon: 'camera' },
  { id: '2', Worker_Role: 'Makeup', icon: 'color-palette' },
  { id: '3', Worker_Role: 'Mehndi', icon: 'brush' },
  { id: '4', Worker_Role: 'Astrologer', icon: 'star' },
  { id: '5', Worker_Role: 'Assistant', icon: 'people' },
];

const WelcomeScreen = () => (
  <View style={styles.center}>
    <Text style={styles.text}>Welcome</Text>
  </View>
);

const CategoriesScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredWorkers, setFilteredWorkers] = useState(workerData);

  // Handle search
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = workerData.filter((worker) =>
      worker.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredWorkers(filtered);
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    const filtered = workerData.filter(
      (worker) => worker.category === category
    );
    setFilteredWorkers(filtered);
  };

  // Render worker profile card
  const renderWorker = ({ item }) => (
    <View style={styles.profileCard}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <Text style={styles.workerName}>{item.name}</Text>
      <Text>{item.country}</Text>
    </View>
  );

  // Render category icons
  const renderCategoryIcon = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryFilter(item.Worker_Role)}
      style={styles.iconContainer}>
      <Ionicons name={item.icon} size={40} color="black" />
      <Text style={styles.iconLabel}>{item.Worker_Role}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Search */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Workers"
        value={searchText}
        onChangeText={handleSearch}
        placeholderTextColor="#8a8a8a"
      />

      {/* Category Carousel using FlatList */}
      <FlatList
        data={categoriesData}
        renderItem={renderCategoryIcon}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />

      {/* Worker Profiles Grid */}
      <FlatList
        data={filteredWorkers}
        renderItem={renderWorker}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#eae0c8' },
          tabBarActiveTintColor: '#4a4a4a',
          tabBarInactiveTintColor: '#8a8a8a',
        }}>
        <Tab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f1', // Soft neutral background
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a4a', // Rich dark text color
    fontFamily: 'Georgia', // Classic serif font for elegance
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#b5a642', // Subtle gold tone
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff8e1', // Ivory background for input
    marginBottom: 15,
    color: '#4a4a4a',
    fontFamily: 'Georgia',
  },
  carousel: {
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  profileCard: {
    width: '48%',
    backgroundColor: '#eae0c8', // Soft beige background
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b5a642', // Gold border
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a4a4a',
    fontFamily: 'Georgia',
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#4a4a4a',
    fontFamily: 'Georgia',
  },
});
