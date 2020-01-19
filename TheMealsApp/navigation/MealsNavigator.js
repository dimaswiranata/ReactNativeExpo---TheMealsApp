import React from 'react';
import { Platform, Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import FiltersScreen from '../screens/FiltersScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';

// Function desain stack
const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor : Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen'
}

//Stack Meals
const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
},{
    // mode: 'modal',
    // initialRouteName: 'Categories',
    defaultNavigationOptions : defaultStackNavOptions
});

//Stack Fav
const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
},
{
    defaultNavigationOptions : defaultStackNavOptions
});

// configurasi stack fav dan meals beserta icon dan color
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator, 
        navigationOptions:{
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-restaurant' 
                        size={25} 
                        color={tabInfo.tintColor}
                        />
                );
            },
            tabBarColor: Colors.primaryColor,
            tabBarStyle: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator, 
        navigationOptions:{
            // tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-star' 
                        size={25} 
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.accentColor,
            tabBarStyle: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
        }
    }
};

// panggil function configurasi stack
const MealsFavTabNavigator = 
    Platform.OS ==='android' 
        ?   createMaterialBottomTabNavigator(tabScreenConfig, {
                activeTintColor: Colors.accentColor,
                shifting: true,
                // shifting: false,
                barStyle: {
                    backgroundColor: Colors.primaryColor
                }
            }) 
        : createBottomTabNavigator(
            tabScreenConfig,
            {
                tabBarOptions : {
                    labelStyle :{
                        fontFamily: 'open-sans'
                    },
                    activeTintColor: Colors.accentColor
                }
            }
        );

const FiltersNavigator = createStackNavigator(
{
    Filter: FiltersScreen
},
{
    // navigationOptions: {
    //     drawerLabel : 'Filter!!!'
    // },
    defaultNavigationOptions : defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator(
    {
        MealsFavs : {
            screen : MealsFavTabNavigator,
            navigationOptions : {
                drawerLabel : 'Meals'
            }
        },
        Filters : {
            screen : FiltersNavigator,
            navigationOptions : {
                drawerLabel : 'Filters'
            }
        }
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }

        }
    }
);

// export default createAppContainer(MealsNavigator);
export default createAppContainer(MainNavigator);