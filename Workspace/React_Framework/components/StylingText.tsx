import React from 'react';
import { Text, StyleSheet } from 'react-native';

const StylingText = () => {
    return (
        <Text>
            <Text style={styles.italic}>Pizza</Text> is a very tasty Italian dish. It is made from yeast dough.
            <Text style={styles.bolder}>Tomato sauce</Text> is poured onto the dough. The ingredients are placed on top:
            <Text style={styles.bolder}>sausage, yellow cheese, olives, bell peppers</Text>.
            There are many types of <Text style={styles.italic}>pizza</Text>, it can be with meat, meatless, fish, or sweet with
            <Text style={styles.yellow}>pineapple</Text>.
        </Text>
    );
};

const styles = StyleSheet.create({
   bolder: {
         fontWeight: 'bold',
   },
    italic: {
        fontStyle: 'italic',
    },
    yellow: {
        color: 'yellow',
    }
});

export default StylingText;