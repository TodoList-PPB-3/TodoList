import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Index = () => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(navigation.getState());
            navigation.navigate('HomeScreen');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/Logo.png')}
                style={[styles.logo, { width: width * 0.2, height: width * 0.2 }]}
                resizeMode="contain"
            />
            <Text style={styles.appName}>Notely</Text>
            <Text style={styles.description}>
                Aplikasi catatan yang ringan dan cepat, dirancang untuk membantu Anda mengatur ide-ide, tugas, dan daftar dengan mudah.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7A8B78',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        marginBottom: 0,
    },
    appName: {
        fontSize: 20,
        color: '#E4E4C1',
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginTop: -8,
    },
    description: {
        fontSize: 12,
        color: '#E4E4C1',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        position: 'absolute',
        bottom: height * 0.03,
        paddingHorizontal: 10,
        width: '90%',
        lineHeight: 16,
        maxHeight: 80,
        overflow: 'hidden',
    },
});

export default Index;
