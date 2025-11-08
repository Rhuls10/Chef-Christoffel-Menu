# Chef-Christoffel-Menu

# Chef Christoffel's Menu  
**Final PoE — React Native Expo App**

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-blue)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.75-green)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **fully functional restaurant menu app** built with **React Native + Expo + TypeScript**. Features include **add/remove dishes**, **filter by course**, **average price per course**, and **global state management**.

---

## Features

| Feature | Status |
|--------|--------|
| Add Dish (Name, Desc, Course, Price) | Done |
| Remove Dish by ID | Done |
| Filter by Course (`filter()`) | Done |
| Average Price per Course (`for...of` loop) | Done |
| Dish Details View | Done |
| Global State (Context API) | Done |
| Unique IDs (UUID) | Done |
| TypeScript Types | Done |
| Clean Navigation | Done |

---

## Project Structure
ChefChristoffelMenu/
├── App.tsx                  ← Navigation + Context
├── types.ts                 ← Dish & Course interfaces
├── context/
│   └── MenuContext.tsx      ← addDish, removeItem, getAveragePrices
├── screens/
│   ├── HomeScreen.tsx       ← Dashboard + stats
│   ├── ManageMenuScreen.tsx ← Add & Remove
│   ├── GuestFilterScreen.tsx← Course filter
│   └── MenuItemScreen.tsx   ← Dish details

# Changelog

All notable changes to **Chef Christoffel's Menu** are documented here.

---

## [v1.0.0] - 2025-11-08

### Added
- Full menu management system
- Add dish with name, description, course, price
- Remove dish by unique ID
- Filter dishes by course using `Array.prototype.filter()`
- Calculate **average price per course** using **loops** (`for...of`, `for...in`)
- Dish details screen
- Global state with `MenuContext`
- TypeScript types (`Dish`, `Course`)
- UUID for unique dish IDs
- Clean red-themed UI (`#B71C1C`)
- Navigation between all screens

### Fixed
- Navigation errors (`createStackNavigator` → `createNativeStackNavigator`)
- Import path issues (`./screens/HomeScreen`)
- Type errors in `RootStackParamList`
- UUID polyfill (`react-native-get-random-values`)
- Metro bundler stuck at 100%

### Tech
- Migrated to **Expo** workflow
- Used `npx expo install` for compatibility
- Added `NativeStackScreenProps` for type-safe navigation

---

## [v0.1.0] - Initial Setup
- Project initialized with `npx create-expo-app . --template blank-typescript`
- Basic folder structure created
- Dependencies installed

---



## Project Structure
