import React from 'react';
import { StyleSheet, Text, View, Button, Platform} from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import Colors from '../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import MealList from '../components/MealList';
import MealItem from '../components/MealItem';

const CategoryMealsScreen = props => {

    const catId = props.navigation.getParam('categoryId');

    const displayedMeals = MEALS.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    return (
       <MealList 
            listData={displayedMeals} 
            navigation={props.navigation}
       />
    );
};

CategoryMealsScreen.navigationOptions = navigationData => {

    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle : selectedCategory.title
    };
};

const styles = StyleSheet.create({
    
});

export default CategoryMealsScreen;