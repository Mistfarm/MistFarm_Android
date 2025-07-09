import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { Icon } from './Icon';
import { colorTable } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  type: 'before' | 'main' | 'cancel';
}

function Header({ title, type }: Props) {
  const navigation = useNavigation();

  const iconName =
    type === 'before' ? 'LeftArrow' : type === 'main' ? 'Bell' : 'Cancel';

  const onPress = () => {
    if (type == 'before') navigation.goBack();
    // 다른 타입은 이후 개발
  };

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        <Icon onPress={onPress} size={20} name={iconName} />
      </View>

      <Text
        fontType="subTitle"
        fontLevel={3}
        style={{ color: colorTable['normal']['white'] }}
      >
        {title}
      </Text>

      <View style={styles.side}>
        {type === 'main' ? (
          <Icon size={24} name="Menu" />
        ) : (
          <View style={{ width: 20 }} />
        )}
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: colorTable['normal']['black'],
    borderBottomColor: colorTable['gray'][900],
    borderBottomWidth: 1,
  },
  side: {
    width: 20,
    alignItems: 'center',
  },
});
