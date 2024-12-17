import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const navigation = useNavigation();

    const renderNote = ({ item }) => (
        <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent}>{item.content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notely</Text>
                <Ionicons name="search-outline" size={24} color="#000" onPress={() => navigation.navigate('SearchScreen')} />
            </View>
            <FlatList
                renderItem={renderNote}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.notesList}
                numColumns={2}
            />
            <Pressable style={styles.fab}>
                <Ionicons name="add-outline" size={28} color="#fff" onPress={() => navigation.navigate('DetailScreen')} />
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    notesList: {
        paddingHorizontal: 8,
        paddingTop: 8,
    },
    noteCard: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        margin: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        elevation: 1,
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    noteContent: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#3C3D37',
        width: 45,
        height: 45,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
});



export default HomeScreen;