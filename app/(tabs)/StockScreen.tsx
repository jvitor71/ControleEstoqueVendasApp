import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Item {
    name: string;
    quantity: string;
}
export default function StockScreen() {
  const [itens, setItens] = useState<Item[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  useFocusEffect(useCallback(() => {
      const loadStock = async () => {
        const storedStock = await AsyncStorage.getItem('estoque');
        if (storedStock) {
          setItens(JSON.parse(storedStock));
        }
      };
      loadStock();
      return;
    }, [])
  );

  useEffect(() => {
    const loadStock = async () => {
      const storedStock = await AsyncStorage.getItem('estoque');
      if (storedStock) {
        setItens(JSON.parse(storedStock));
      }
    };
    loadStock();
  }, []);

  const addItem = async () => {
    if (!itemName) {
      return;
    }

    if (!itemQuantity) {
      setItemQuantity('0');
    }

    const newItem = { name: itemName, quantity: itemQuantity};
    const updatedItens = [...itens, newItem];
    setItens(updatedItens);
    await AsyncStorage.setItem('estoque', JSON.stringify(updatedItens));
    setItemName('');
    setItemQuantity('');
    router.back();
  };

  return (
    <>
      <ThemedView style={styles.principalView}>
        <Text>Gerenciar Estoque</Text>
        <TextInput
          placeholder="Nome do Item"
          value={itemName}
          onChangeText={setItemName}
          style={styles.input} />
        <TextInput
          placeholder="Quantidade"
          value={itemQuantity}
          onChangeText={setItemQuantity}
          keyboardType="numeric"
          style={styles.input} />
      </ThemedView>
      <ThemedView style={styles.viewButton}>
          <Button title="Adicionar Item" onPress={addItem} color={'#0ca924'} />
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  principalView: {
    flex: 1, 
    padding: 20,
    justifyContent: 'center',
    position: 'static'
  },

  input: {
    borderWidth: 0.8, 
    gap: 10, 
    padding: 5, 
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5
  },

  viewButton: {
    justifyContent: 'flex-end'
  }
})
