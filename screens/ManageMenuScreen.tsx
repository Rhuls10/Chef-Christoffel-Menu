// screens/ManageMenuScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';
import { Dish, Course } from '../types';
import { v4 as uuidv4 } from 'uuid'; // Generates unique IDs

const COURSES: Course[] = ['Starter', 'Main', 'Dessert', 'Beverage'];

const ManageMenuScreen: React.FC = () => {
  const { menu, addDish, removeItem } = useMenu(); // Get removeItem
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>(COURSES[0]);
  const [price, setPrice] = useState('');

  // --- Add Dish Logic ---
  const handleAddDish = useCallback(() => {
    // Check for valid input
    const parsedPrice = parseFloat(price);
    if (!dishName || isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert("Input Error", "Please ensure the Dish Name is entered and the Price is a valid number greater than zero.");
      return;
    }

    const newDish: Dish = {
      id: uuidv4(), // Assign a unique ID
      dishName,
      description,
      course,
      price: parsedPrice,
    };

    addDish(newDish);
    // Clear the form
    setDishName('');
    setDescription('');
    setPrice('');
    Alert.alert("Success", `${dishName} added to the menu!`);
  }, [dishName, description, course, price, addDish]);


  // --- Remove Dish Logic (Part 3 Requirement) ---
  const handleRemoveDish = (dishId: string, dishName: string) => {
    Alert.alert(
      "Confirm Removal",
      `Are you sure you want to remove "${dishName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive", 
          onPress: () => removeItem(dishId) // Call the context function
        }
      ]
    );
  };
  
  // Renders an item in the removable list
  const renderItem = ({ item }: { item: Dish }) => (
    <View style={styles.dishItem}>
      <View style={styles.dishDetails}>
        <Text style={styles.dishNameText}>{item.dishName} ({item.course})</Text>
        <Text style={styles.dishPriceText}>R{item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={() => handleRemoveDish(item.id, item.dishName)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* --- ADD DISH FORM --- */}
      <Text style={styles.header}>➕ Add New Dish</Text>
      <TextInput placeholder="Dish Name" value={dishName} onChangeText={setDishName} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Price (e.g. 120.00)" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      
      <View style={styles.pickerWrapper}>
        <Text style={styles.pickerLabel}>Course:</Text>
        <Picker selectedValue={course} onValueChange={(itemValue: Course) => setCourse(itemValue)} style={styles.picker}>
          {COURSES.map(c => <Picker.Item key={c} label={c} value={c} />)}
        </Picker>
      </View>
      
      <Button color="#B71C1C" title="Add Dish to Menu" onPress={handleAddDish} />

      {/* --- REMOVE DISH LIST --- */}
      <Text style={styles.header}>❌ Remove Menu Items</Text>
      <FlatList 
        data={menu} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id} 
        style={styles.list}
      />
    </View>
  );
};

// ... (Styles)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#FFF8F6' },
  header: { fontSize: 20, fontWeight: 'bold', marginVertical: 15, color: '#333' },
  input: { backgroundColor: '#FFF', padding: 10, borderRadius: 5, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  pickerWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#FFF', borderRadius: 5, paddingHorizontal: 5, borderWidth: 1, borderColor: '#ccc' },
  pickerLabel: { paddingRight: 10, fontSize: 16, color: '#333' },
  picker: { flex: 1 },
  list: { marginTop: 10 },
  dishItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 6, marginBottom: 8, borderWidth: 1, borderColor: '#f0f0f0' },
  dishDetails: { flex: 1 },
  dishNameText: { fontSize: 16, fontWeight: '600', color: '#333' },
  dishPriceText: { fontSize: 14, color: '#B71C1C', marginTop: 2 },
  removeButton: { backgroundColor: '#FF6347', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 4 },
  removeButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
});

export default ManageMenuScreen;