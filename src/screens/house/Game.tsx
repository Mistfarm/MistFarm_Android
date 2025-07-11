import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import BottomBar from '../../components/common/BottomBar';
import { colorTable } from '../../constants/color';

export function Game() {
  return (
    <View style={styles.container}>
      <Header title="미니게임" type="main" />
      <BottomBar role="house" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTable['normal']['black'],
    justifyContent: 'space-between',
  },
});
