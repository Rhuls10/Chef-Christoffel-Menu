// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useMenu } from '../context/MenuContext';
import { Dish } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

// Define navigation types for better safety
type RootStackParamList = {
  Home: undefined;
  ManageMenu: undefined;
  GuestFilter: undefined;
  MenuItem: { dishId: string };
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { menu, getAveragePrices } = useMenu();
  
  const totalItems = menu.length;
  const averagePricesByCourse = getAveragePrices(); // Get the statistics

  // Renders each dish item in the list
  const renderItem = ({ item }: { item: Dish }) => (
    <TouchableOpacity
      style={styles.dishCard}
      onPress={() => navigation.navigate('MenuItem', { dishId: item.id })}
    >
      <View>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.dishCourse}>{item.course}</Text>
      </View>
      <Text style={styles.dishPrice}>R{item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  // Component to render the average price breakdown
  const renderAveragePrices = () => (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>🍽️ Menu Statistics</Text>
      <Text style={styles.statsTotal}>Total Menu Items: **{totalItems}**</Text>
      
      <View style={styles.averageContainer}>
        <Text style={styles.averageHeader}>Average Price by Course:</Text>
        {averagePricesByCourse.map((item) => (
          <Text key={item.course} style={styles.averageText}>
            • {item.course}: **R{item.averagePrice}**
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderAveragePrices()}

      <Text style={styles.listHeader}>All Dishes</Text>
      <FlatList 
        data={menu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      
      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('ManageMenu')}
        >
          <Text style={styles.buttonText}>Manage Menu (Add/Remove)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('GuestFilter')}
        >
          <Text style={styles.buttonText}>Guest View (Filter)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F6', padding: 10 },
  statsCard: { backgroundColor: '#FFF', borderRadius: 8, padding: 15, marginVertical: 10, shadowOpacity: 0.1, shadowRadius: 3 },
  statsTitle: { fontSize: 18, fontWeight: 'bold', color: '#B71C1C', marginBottom: 5 },
  statsTotal: { fontSize: 16, marginBottom: 10, fontWeight: '600' },
  averageContainer: { marginTop: 5 },
  averageHeader: { fontSize: 15, fontWeight: 'bold', marginTop: 5 },
  averageText: { fontSize: 14, marginVertical: 2 },
  listHeader: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: '#333' },
  dishCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 6, marginBottom: 8, shadowOpacity: 0.05 },
  dishName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  dishCourse: { fontSize: 12, color: '#666' },
  dishPrice: { fontSize: 16, fontWeight: 'bold', color: '#B71C1C' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  navButton: { flex: 1, backgroundColor: '#B71C1C', padding: 10, borderRadius: 5, marginHorizontal: 5, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  listContent: { paddingBottom: 10 },
});

export default HomeScreen; 