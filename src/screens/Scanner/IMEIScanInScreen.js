import React, { useEffect, useState } from 'react';
import { Box, Button, Select, VStack, Heading, Text, Toast } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../../database';

export default function IMEIScanInScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState('');

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) => setHasPermission(status === 'granted'));
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM phones', [], (_, { rows }) => setPhones(rows._array));
    });
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO units (phone_id, imei, status, created_at) VALUES (?, ?, 'in', datetime('now'))`,
        [selectedPhone, data],
        () => Toast.show({ description: `IMEI ${data} berhasil dimasukkan` }),
        (_, error) => Toast.show({ description: error.message })
      );
    });
  };

  if (hasPermission === null) return <Text>Meminta izin kamera...</Text>;
  if (hasPermission === false) return <Text>Izinkan akses kamera di pengaturan.</Text>;

  return (
    <Box safeArea p={4} flex={1}>
      <Heading mb={4}>Scan IMEI Masuk</Heading>
      <VStack space={3}>
        <Select
          selectedValue={selectedPhone}
          onValueChange={val => setSelectedPhone(val)}
          placeholder="Pilih tipe HP"
        >
          {phones.map(phone => (
            <Select.Item key={phone.id} label={`${phone.brand} ${phone.type} (${phone.code})`} value={phone.id.toString()} />
          ))}
        </Select>
        {selectedPhone ? (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 300, width: '100%' }}
            />
            {scanned && <Button mt={2} onPress={() => setScanned(false)}>Scan lagi</Button>}
          </>
        ) : (
          <Text>Pilih tipe HP dulu</Text>
        )}
      </VStack>
    </Box>
  );
}
