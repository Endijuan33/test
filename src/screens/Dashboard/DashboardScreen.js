import React from 'react';
import { Box, Button, VStack, Heading, Text } from 'native-base';

export default function DashboardScreen({ navigation }) {
  return (
    <Box safeArea p={4} flex={1}>
      <Heading mb={4}>Dashboard Konter HP</Heading>
      <VStack space={3}>
        <Button onPress={() => navigation.navigate('InputHP')}>Input Data HP</Button>
        <Button onPress={() => navigation.navigate('IMEIScanIn')}>Scan IMEI Masuk</Button>
        <Button onPress={() => navigation.navigate('IMEIScanOut')}>Scan IMEI Keluar</Button>
        <Button onPress={() => navigation.navigate('Rekap')}>Rekapitulasi</Button>
      </VStack>
      <Text mt={8} color="gray.500">Versi 1.0.0 - Expo 53</Text>
    </Box>
  );
}
