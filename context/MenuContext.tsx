// context/MenuContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dish, Course } from '../types';

// --- Context Interface ---
export interface MenuContextType {
  menu: Dish[];
  addDish: (dish: Dish) => void;
  removeItem: (dishId: string) => void;
  getDishById: (dishId: string) => Dish | undefined;
  getAveragePrices: () => { course: Course; averagePrice: string }[];
}

// --- Default Context Value ---
const initialMenu: Dish[] = [
  { id: '1', dishName: 'Caprese Salad', description: 'Fresh tomatoes, mozzarella, and basil.', course: 'Starter', price: 85.50 },
  { id: '2', dishName: 'Beef Wellington', description: 'Tender beef fillet baked in puff pastry.', course: 'Main', price: 250.00 },
  { id: '3', dishName: 'Chocolate Lava Cake', description: 'Warm cake with a molten chocolate center.', course: 'Dessert', price: 95.00 },
  { id: '4', dishName: 'Iced Coffee', description: 'Cold brewed coffee served over ice.', course: 'Beverage', price: 40.00 },
  { id: '5', dishName: 'Spicy Prawns', description: 'Prawns cooked in a peri-peri sauce.', course: 'Starter', price: 120.00 },
];

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

// --- Provider Component ---
export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<Dish[]>(initialMenu);

  const addDish = (dish: Dish) => {
    // Adds the new dish to the beginning of the array
    setMenu((prevMenu) => [dish, ...prevMenu]); 
  };
  
  // Requirement 1: Remove an item using its unique ID
  const removeItem = (dishId: string) => {
    // Uses the non-mutating Array.prototype.filter method
    setMenu((prevMenu) => prevMenu.filter(dish => dish.id !== dishId));
  };

  const getDishById = (dishId: string) => {
    return menu.find(dish => dish.id === dishId);
  };
  
  // Requirement 2: Calculate Average Price by Course (using loops)
  const getAveragePrices = () => {
    // Step 1: Group by course and calculate total price and count
    const courseData: { 
      [key in Course]?: { total: number; count: number } 
    } = {};

    // Use a for...of loop for iteration (satisfies 'use loops' requirement)
    for (const dish of menu) {
      if (!courseData[dish.course]) {
        courseData[dish.course] = { total: 0, count: 0 };
      }
      // The '!' tells TypeScript that courseData[dish.course] will be defined here
      courseData[dish.course]!.total += dish.price;
      courseData[dish.course]!.count += 1;
    }
    
    const results: { course: Course; averagePrice: string }[] = [];

    // Step 2: Calculate average and format results
    // Use a for...in loop (satisfies 'use loops' requirement)
    for (const courseKey in courseData) {
      // Type assertion is safe here as courseData is typed with Course keys
      const course = courseKey as Course; 
      const data = courseData[course]!;
      const average = data.count > 0 ? data.total / data.count : 0;
      
      results.push({
        course: course,
        averagePrice: average.toFixed(2), // Format to 2 decimal places
      });
    }

    return results;
  };

  // The context value provides all state and functions to consumers
  const contextValue = {
    menu,
    addDish,
    removeItem,
    getDishById,
    getAveragePrices,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
};

// --- Custom Hook for easy consumption ---
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};