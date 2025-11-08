// screens/MenuItemScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useMenu } from '../context/MenuContext';
import { StackScreenProps } from '@react-navigation/stack';
import { Dish } from '../types';

// Define navigation types (must match App.tsx)
type RootStackParamList = {
  Home: undefined;
  ManageMenu: undefined;
  GuestFilter: undefined;
  MenuItem: { dishId: string };
};

type MenuItemScreenProps = StackScreenProps<RootStackParamList, 'MenuItem'>;

const MenuItemScreen: React.FC<MenuItemScreenProps> = ({ route }) => { // <--- Component name here
  const { getDishById } = useMenu();
  const { dishId } = route.params;
  const [dish, setDish] = useState<Dish | undefined>(undefined);

  useEffect(() => {
    // Fetch the dish details when the component mounts or dishId changes
    const fetchedDish = getDishById(dishId);
    setDish(fetchedDish);
  }, [dishId, getDishById]);

  if (!dish) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color="#B71C1C" />
        <Text>Loading or Dish not found...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{dish.dishName}</Text>
        <Text style={styles.course}>{dish.course}</Text>
        <View style={styles.separator} />
        <Text style={styles.descriptionHeader}>Description:</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price:</Text>
          <Text style={styles.priceValue}>R{dish.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF8F6' },
  loading: { justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  name: { fontSize: 26, fontWeight: 'bold', color: '#B71C1C', marginBottom: 5 },
  course: { fontSize: 16, color: '#666', fontStyle: 'italic', marginBottom: 10 },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  descriptionHeader: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  description: { fontSize: 16, color: '#444', marginBottom: 20 },
  priceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee' },
  priceLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  priceValue: { fontSize: 20, fontWeight: 'bold', color: '#B71C1C' },
});

export default MenuItemScreen; // <--- CRITICAL: Must be present for App.tsx to import it `