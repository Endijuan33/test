import React, { useState } from 'react';
import { Box, Heading, VStack, Button, Text, Toast } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../../database';

export default function IMEIScanOutScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [unit, setUnit] = useState(null);

  React.useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) => setHasPermission(status === 'granted'));
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    db.transaction(tx => {
      tx.executeSql(
        `SELECT u.*, p.brand, p.type FROM units u JOIN phones p ON u.phone_id = p.id WHERE u.imei = ? AND u.status = 'in'`,
        [data],
        (_, { rows }) => {
          if (rows.length === 0) {
            Toast.show({ description: `IMEI ${data} tidak ditemukan / sudah terjual` });
          } else {
            setUnit(rows._array[0]);
            // Update status unit ke 'out' dan catat waktu jual
            tx.executeSql(
              `UPDATE units SET status = 'out', sold_at = datetime('now') WHERE id = ?`,
              [rows._array[0].id]
            );
            // Log transaksi
            tx.executeSql(
              `INSERT INTO logs (unit_id, action, timestamp) VALUES (?, 'out', datetime('now'))`,
              [rows._array[0].id]
            );
            Toast.show({ description: `Unit ${rows._array[0].brand} ${rows._array[0].type} (IMEI: ${data}) berhasil keluar` });
          }
        }
      );
    });
  };

  if (hasPermission === null) return <Text>Meminta izin kamera...</Text>;
  if (hasPermission === false) return <Text>Izinkan akses kamera di pengaturan.</Text>;

  return (
    <Box safeArea p={4} flex={1}>
      <Heading mb={4}>Scan IMEI Keluar / Penjualan</Heading>
      <VStack space={3}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 300, width: '100%' }}
        />
        {scanned && <Button mt={2} onPress={() => { setScanned(false); setUnit(null); }}>Scan lagi</Button>}
        {unit && (
          <Box mt={2} p={2} bg="green.100" borderRadius={8}>
            <Text>Terjual: {unit.brand} {unit.type}</Text>
            <Text>IMEI: {unit.imei}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
