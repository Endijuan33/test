import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Button, FlatList } from 'native-base';
import db from '../../database';
import * as FileSystem from 'expo-file-system';

export default function RekapScreen() {
  const [todayIn, setTodayIn] = useState([]);
  const [todayOut, setTodayOut] = useState([]);
  const [rekapDate, setRekapDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT u.imei, p.brand, p.type, u.created_at 
         FROM units u JOIN phones p ON u.phone_id = p.id 
         WHERE DATE(u.created_at) = ? AND u.status = 'in'`,
        [rekapDate],
        (_, { rows }) => setTodayIn(rows._array)
      );
      tx.executeSql(
        `SELECT u.imei, p.brand, p.type, u.sold_at 
         FROM units u JOIN phones p ON u.phone_id = p.id 
         WHERE DATE(u.sold_at) = ? AND u.status = 'out'`,
        [rekapDate],
        (_, { rows }) => setTodayOut(rows._array)
      );
    });
  }, [rekapDate]);

  const handleBackup = async () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM phones', [], (_, phones) => {
        tx.executeSql('SELECT * FROM units', [], (_, units) => {
          const data = { phones: phones.rows._array, units: units.rows._array };
          const json = JSON.stringify(data, null, 2);
          const path = FileSystem.documentDirectory + `backup_${rekapDate}.json`;
          FileSystem.writeAsStringAsync(path, json)
            .then(() => alert('Backup tersimpan: ' + path));
        });
      });
    });
  };

  return (
    <Box safeArea p={4} flex={1}>
      <Heading mb={4}>Rekapitulasi Harian ({rekapDate})</Heading>
      <VStack space={2}>
        <Text bold>Unit Masuk:</Text>
        <FlatList
          data={todayIn}
          keyExtractor={item => item.imei}
          renderItem={({ item }) => (
            <Text>{item.brand} {item.type} - IMEI: {item.imei}</Text>
          )}
        />
        <Text bold mt={3}>Unit Keluar:</Text>
        <FlatList
          data={todayOut}
          keyExtractor={item => item.imei}
          renderItem={({ item }) => (
            <Text>{item.brand} {item.type} - IMEI: {item.imei}</Text>
          )}
        />
        <Button mt={4} onPress={handleBackup}>Backup ke .json</Button>
      </VStack>
    </Box>
  );
}
