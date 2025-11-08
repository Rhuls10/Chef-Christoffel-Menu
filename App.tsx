// App.tsx
import 'react-native-gesture-handler';
import 'react-native-get-random-values'; // For UUID
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // FIXED
import { MenuProvider } from './context/MenuContext';
import HomeScreen from './screens/HomeScreen';
import ManageMenuScreen from './screens/ManageMenuScreen';
import GuestFilterScreen from './screens/GuestFilterScreen';
import MenuItemScreen from './screens/MenuItemScreen';

// Define navigation param list
export type RootStackParamList = {
  Home: undefined;
  ManageMenu: undefined;
  GuestFilter: undefined;
  MenuItem: { dishId: string };
};

// Define colors
export const Colors = {
  primary: '#B71C1C',
  background: '#FFF8F6',
  text: '#333',
  card: '#FFF',
};

// Create stack with typed params
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: Colors.card,
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Chef Christoffel's Menu" }}
          />
          <Stack.Screen
            name="ManageMenu"
            component={ManageMenuScreen}
            options={{ title: 'Manage Menu (Add/Remove)' }}
          />
          <Stack.Screen
            name="GuestFilter"
            component={GuestFilterScreen}
            options={{ title: 'Guest View Filter' }}
          />
          <Stack.Screen
            name="MenuItem"
            component={MenuItemScreen}
            options={{ title: 'Dish Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;