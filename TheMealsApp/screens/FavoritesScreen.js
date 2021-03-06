import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../components/HeaderButton';
import { MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const FavoritesScreen = props => {

    const favMeals = MEALS.filter(
        meal => meal.id === 'm1' || meal.id === 'm2'
    )

    return (
        // <View style={styles.screen}>
        //     <Text>The Favorites Screen!</Text>
        // </View>
        <MealList listData={favMeals} navigation={props.navigation}/>
    );
};

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: (
            () => 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    }
};

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
//   });

export default FavoritesScreen;