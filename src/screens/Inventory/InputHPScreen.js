import React, { useState } from 'react';
import { Box, VStack, Input, Button, Heading, Toast } from 'native-base';
import db from '../../database';

export default function InputHPScreen({ navigation }) {
  const [code, setCode] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [ramRom, setRamRom] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO phones (code, brand, type, ram_rom, price) VALUES (?, ?, ?, ?, ?)`,
        [code, brand, type, ramRom, parseInt(price)],
        () => {
          Toast.show({ description: "Data HP berhasil disimpan" });
          navigation.goBack();
        },
        (_, error) => Toast.show({ description: error.message })
      );
    });
  };

  return (
    <Box safeArea p={4} flex={1}>
      <Heading mb={4}>Input Data HP</Heading>
      <VStack space={3}>
        <Input placeholder="Kode HP" value={code} onChangeText={setCode} />
        <Input placeholder="Merek" value={brand} onChangeText={setBrand} />
        <Input placeholder="Tipe" value={type} onChangeText={setType} />
        <Input placeholder="RAM/ROM (misal 4/64)" value={ramRom} onChangeText={setRamRom} />
        <Input placeholder="Harga" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <Button mt={2} onPress={handleSave}>Simpan</Button>
      </VStack>
    </Box>
  );
}
