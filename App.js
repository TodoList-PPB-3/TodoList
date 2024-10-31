import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './app/screens/SplashScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Menampilkan splash screen selama beberapa detik
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Sesuaikan durasi splash screen
  }, []);

  return (
    isLoading ? <SplashScreen /> : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Aplikasi Utama Belum Siap</Text>
      </View>
    )
  );
};

export default App;
