import { StyleSheet } from 'react-native';
import HooksExamples from '@/components/HooksExamples';
import { View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <HooksExamples />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
