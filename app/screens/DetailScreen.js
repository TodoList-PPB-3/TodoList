import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { blackColor, whiteColor } from '../../constants/Colors';
import { fontRegular, fontBold } from '../../constants/Fonts';

const DetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Retrieve initial title from route parameters or set a default
    const { title: initialTitle = 'Title' } = route.params || {};

    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState('Description');

    return (
        <View style={styles.container}>
            {/* Back Button with Icon and Editable Title */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Ionicons name="chevron-back-outline" size={24} color="#6c757d" />
                </TouchableOpacity>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Title"
                    placeholderTextColor="#6c757d"
                />
            </View>

            {/* Full-height Description Input */}
            <TextInput
                style={styles.descriptionInput}
                placeholder="Description"
                placeholderTextColor="#6c757d"

                multiline
                scrollEnabled={false} // Disable scrolling
            />

            {/* Background grid */}
            <View style={styles.gridBackground}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        flex: 1,
        backgroundColor: '#fffffff',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        marginRight: 8,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        color: blackColor,
        flex: 1,
        fontFamily: fontBold,
        paddingVertical: 4,
        borderWidth: 0,
        outlineStyle: 'none'
    },
    descriptionInput: {
        flex: 1, // Full remaining height
        fontSize: 16,
        color: '#6c757d',
        paddingHorizontal: 16,
        fontFamily: fontRegular,
        paddingVertical: 8,
        textAlignVertical: 'top', // for multiline input
        outlineStyle: 'none'
    },
    gridBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(248, 215, 218, 0.5)', // Slightly transparent pink
        zIndex: -1,
    },
});

export default DetailScreen;
