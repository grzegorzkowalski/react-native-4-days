import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import PlayerCard from './PlayerCard';
import players from '../data/players';

export default function PlayerList() {
    const router = useRouter();

    const handlePlayerPress = (index: number) => {
        router.push(`/player/${index}`);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={players}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <PlayerCard
                        name={item.name}
                        onPress={() => handlePlayerPress(index)}
                    />
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContent: {
        paddingVertical: 8,
    },
});