import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import AppNavigator from './src/navigation/AppNavigator';
import { initDb } from './src/database';

export default function App() {
  useEffect(() => {
    initDb();
  }, []);

  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
}
