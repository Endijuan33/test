import React, { useState } from 'react';
import { VStack, Input, Button, Center, Text } from 'native-base';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Integrasi Firebase Auth / SQLite
  const handleLogin = () => {
    // Demo: langsung masuk dashboard
    navigation.replace('Dashboard');
  };

  return (
    <Center flex={1} px={6}>
      <VStack space={4} w="100%">
        <Text fontSize="2xl" bold>Login Konter HP</Text>
        <Input placeholder="Username" value={username} onChangeText={setUsername} />
        <Input placeholder="Password" value={password} onChangeText={setPassword} type="password" />
        <Button mt={2} onPress={handleLogin}>Login</Button>
      </VStack>
    </Center>
  );
}
