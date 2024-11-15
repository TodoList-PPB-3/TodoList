import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { blackColor, whiteColor } from '../constants/Colors';
import { fontRegular, fontBold } from '../constants/Fonts';

const SearchScreen = () => {
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const items = [

    ];

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filteredData = items.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
        setData(filteredData);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.chevronContainer}>
                    <Ionicons name="chevron-back-outline" size={28} color="#787878" />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        value={searchQuery}
                        placeholderTextColor="#6c757d"
                        onChangeText={handleSearch}
                    />
                    <Ionicons name="search" size={18} color="#787878" />
                </View>
            </View>

            {data.length === 0 ? (
                <View style={styles.notFoundContainer}>
                    <Text style={styles.notFoundText}>Tidak ditemukan</Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Text style={styles.itemText}>{item.name}</Text>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    chevronContainer: {
        marginRight: 8,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#787878',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    searchInput: {
        flex: 1,
        outlineStyle: 'none',
        fontWeight: 'bold',
        color: blackColor,
        paddingVertical: 8,
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        color: '#ccc',
        fontSize: 12,
    },
    itemText: {
        paddingVertical: 8,
    },
});


export default SearchScreen;
