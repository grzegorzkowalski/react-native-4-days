import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import Stoper from "./component/Stoper";
import {store} from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Stoper />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
