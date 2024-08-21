import { Image, StyleSheet, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Href, router, useFocusEffect } from 'expo-router';

interface Item {
  name: string;
  quantity: string;
}

export default function HomeScreen() {
  const [itens, setItens] = useState<Item[]>([]);
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
    const loadEvents = async () => {
      const storedItens = await AsyncStorage.getItem('estoque');
      if (storedItens) {
        setItens(JSON.parse(storedItens));
      }
    };
    loadEvents();
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#474a51', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.iconLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Gerenciamento de Estoque</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Veja o estoque disponível:</ThemedText>
        {
          itens.length > 0 ? itens.map((item, index) => <ThemedText type='default' key={index}>Item: {item.name} - Quantidade: {item.quantity}</ThemedText>) : <ThemedText>Você ainda não possui itens em estoque</ThemedText>
        }
      </ThemedView>
      <ThemedView style={styles.stepContainer2}>
        <Button title="Incluir Item em Estoque" onPress={() => {router.navigate('StockScreen' as Href)}} color={'#0ca924'} />
        <Button title="Excluir Itens em Estoque" onPress={() => {AsyncStorage.setItem('estoque', ''); setItens([])}} color={'#d23310'} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 80
  },
  stepContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconLogo: {
    height: 178,
    width: 290,
    bottom: -30,
    left: -60,
    position: 'absolute',
  },
  link: {
    marginTop: 15,
    paddingVertical: 5,
  },
  stepContainer2: {
    gap: 5,
    justifyContent: 'space-around',
    marginTop: 250,
  },
});
