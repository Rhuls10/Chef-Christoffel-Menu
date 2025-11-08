// types.ts

// Define a literal union type for course categories for strong typing
export type Course = 'Starter' | 'Main' | 'Dessert' | 'Beverage';

// Define the core data structure for a Dish
export interface Dish {
  id: string; // Unique ID is crucial for reliable removal
  dishName: string;
  description: string;
  course: Course;
  price: number;
}