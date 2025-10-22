import React from 'react';
import { View, StyleSheet, useWindowDimensions } from "react-native";

const ColorLayout = () => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;
    return (
        <View style={isPortrait ? styles.boxContainer : [styles.boxContainer , styles.boxContainerHorizontal]}>
            <View style={styles.blueBox}></View>
            <View style={styles.redBox}>
                <View style={styles.yellowBox}></View>
                <View style={styles.yellowBox}></View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        height:  250,
        width: '90%',
        margin: 10,
        justifyContent: 'space-between',
    },
    boxContainerHorizontal: {
        height:  500,
    },
   blueBox: {
       width: "100%",
       height: 100,
       backgroundColor: 'blue',
       flex: 1,
       marginBottom: 10,
   },
    redBox: {
        width: "100%",
        height: 100,
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    yellowBox: {
        width: "45%",
        height: 80,
        backgroundColor: 'yellow',
    }
});

export default ColorLayout;