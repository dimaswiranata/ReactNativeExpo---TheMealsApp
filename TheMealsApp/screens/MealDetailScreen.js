import React from 'react';
import { 
    ScrollView, 
    Image, 
    StyleSheet, 
    Text, 
    View, 
    Button
} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons'

import { CATEGORIES, MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = props => {
    return(
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
};

const MealDetailScreen = props => {

    const mealId = props.navigation.getParam('mealId');

    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient =>(
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step =>(
                <ListItem key={step}>{step}</ListItem>
            ))}
            {/* <View style={styles.screen}>
                <Text>{selectedMeal.title}</Text>
                <Text>The Meal Detail Screen!</Text>
                <Button title="Go Back to Categories" onPress={() => {
                    // props.navigation.pop();
                    // popToTop balik ke hal utama
                    props.navigation.popToTop();
                }}/>
            </View> */}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = navigationData => {
    const mealId = navigationData.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return {
        headerTitle: selectedMeal.title,
        // headerRight: <Text>FAV!</Text>
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Favorite"
                iconName="ios-star"
                onPress={() => {
                    console.log('Mark as Favorite!');
                }}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
  });

export default MealDetailScreen;