import React, {useEffect} from 'react';
import {Button, View, Text, FlatList} from "react-native";
import { useSelector } from "react-redux";
import {RootState, useAppDispatch} from "../redux/store";
import {incrementValue, resetCounting, saveResult, startCounting, stopCounting} from "../redux/watchSlice";

const Stoper = () => {
    const selector = useSelector((state: RootState) => state);
    const isCounting = useSelector((state: RootState) => state.isCounting);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isCounting) return;
        const  interval = setInterval(() => {
            dispatch(incrementValue());
        }, 1000);

        return () => clearInterval(interval);
    }, [isCounting]);

    return (
        <View>
            <View>
                <Text>Time: {selector.value}</Text>
            </View>
            <Button title="Start"  onPress={() => dispatch(startCounting())}/>
            <Button title="Stop" onPress={() => dispatch(stopCounting())} />
            <Button title="Reset" onPress={() => dispatch(resetCounting())} />
            <Button title="Add result" onPress={() => dispatch(saveResult())} />

            {selector.result.length > 0 && (
                <>
                    <Text>Results</Text>
                    <FlatList
                        data={selector.result}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text>{item}</Text>
                        )
                        }
                    />
                </>
            )}
        </View>
    );
};

export default Stoper;