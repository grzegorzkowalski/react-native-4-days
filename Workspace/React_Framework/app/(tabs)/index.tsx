import React from "react";

import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';

import { Text, View } from '@/components/Themed';
import DataDisplay from '@/components/DateDisplay';
import MapImage from "@/components/MapImage";
import StylingText from "@/components/StylingText";
import ColorLayout from "@/components/ColorLayout";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <DataDisplay />
      {/*<Text>{new Date().toLocaleDateString()}</Text>*/}
      <MapImage />
      <StylingText />
      <ColorLayout />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
