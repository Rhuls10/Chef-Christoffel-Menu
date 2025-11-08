// screens/GuestFilterScreen.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';
import { Dish, Course } from '../types';

const ALL_COURSES = 'All Courses';
const COURSES: Course[] = ['Starter', 'Main', 'Dessert', 'Beverage'];

const GuestFilterScreen: React.FC = () => {
  const { menu } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<string>(ALL_COURSES);

  // Requirement 3: Use Array.prototype.filter for filtering
  const filteredMenu = useMemo(() => {
    if (selectedCourse === ALL_COURSES) {
      return menu;
    }
    // Filter the original menu array
    return menu.filter(dish => dish.course === selectedCourse);
  }, [menu, selectedCourse]); // Recalculate only when menu or selectedCourse changes

  const renderItem = ({ item }: { item: Dish }) => (
    <View style={styles.dishCard}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text style={styles.dishDescription}>{item.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.dishCourse}>Category: **{item.course}**</Text>
        <Text style={styles.dishPrice}>R{item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Guest Menu View</Text>

      {/* Course Filter Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Filter Menu By Course:</Text>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue) => setSelectedCourse(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={ALL_COURSES} value={ALL_COURSES} />
          {COURSES.map(course => (
            <Picker.Item key={course} label={course} value={course} />
          ))}
        </Picker>
      </View>

      <Text style={styles.resultsCount}>
        Displaying **{filteredMenu.length}** item(s)
      </Text>
      
      {/* Filtered Menu List */}
      <FlatList
        data={filteredMenu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// ... (Styles)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#FFF8F6' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#B71C1C' },
  pickerContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 8, paddingHorizontal: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  pickerLabel: { fontWeight: '600', color: '#333' },
  picker: { flex: 1 },
  resultsCount: { fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: '#333' },
  dishCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  dishName: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  dishDescription: { fontSize: 14, color: '#666' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 },
  dishCourse: { fontSize: 12, fontStyle: 'italic', color: '#B71C1C' },
  dishPrice: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  listContent: { paddingBottom: 10 },
});

export default GuestFilterScreen;