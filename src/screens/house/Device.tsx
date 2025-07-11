import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import BottomBar from '../../components/common/BottomBar';
import { colorTable } from '../../constants/color';

export function HouseDevice() {
  return (
    <View style={styles.container}>
      <Header title="기기등록" type="main" />
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
