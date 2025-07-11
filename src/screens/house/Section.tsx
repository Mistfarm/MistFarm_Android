import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import BottomBar from '../../components/common/BottomBar';
import { colorTable } from '../../constants/color';

export function HouseSection() {
  return (
    <View style={styles.container}>
      <Header title="구획선택" type="main" />
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
