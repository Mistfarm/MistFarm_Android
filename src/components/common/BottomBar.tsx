import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/Stack';
import { Text } from './Text';
import { Icon } from './Icon';
import { colorTable } from '../../constants/color';

interface BottomBarProps {
  role: 'house' | 'farm';
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function BottomBar({ role }: BottomBarProps) {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList>>();

  const items =
    role === 'house'
      ? ([
          { name: '구획선택', icon: 'Plan', route: 'HouseSection' },
          { name: '기기등록', icon: 'Plus', route: 'HouseDevice' },
          { name: '게임', icon: 'Game', route: 'Game' },
        ] as const)
      : ([
          { name: '구획선택', icon: 'Plan', route: 'HouseSection' },
          { name: '기기등록', icon: 'Plus', route: 'HouseDevice' },
        ] as const);

  return (
    <View style={styles.container}>
      {items.map(item => {
        const isSelected = route.name === item.route;
        return (
          <TouchableOpacity
            key={item.name}
            style={styles.item}
            onPress={() => navigation.navigate(item.route)}
          >
            <Icon
              name={isSelected ? `Green${item.icon}` : item.icon}
              size={28}
            />
            <Text
              fontType="body"
              fontLevel={3}
              colorType={isSelected ? 'main' : 'gray'}
              colorLevel={isSelected ? 400 : 600}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorTable['normal']['black'],
    paddingVertical: 14,
    bottom: 12,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
