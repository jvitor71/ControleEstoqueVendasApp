import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {

  return (
      <Stack initialRouteName='index'>
        <Stack.Screen name='index' options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='StockScreen' options={{title: 'Gerenciador de Estoque'}}></Stack.Screen>
      </Stack>
  );
}
