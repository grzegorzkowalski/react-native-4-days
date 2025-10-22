import React from "react";
import { Text } from "react-native";

export default function DataDisplay() {
    const date = new Date().toLocaleDateString();
    return (
        <Text>{date}</Text>
    )
}
