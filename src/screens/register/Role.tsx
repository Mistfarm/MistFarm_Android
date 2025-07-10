import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { colorTable } from '../../constants/color';
import Header from '../../components/common/Header';
import { Text } from '../../components/common/Text';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/Stack';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Role'>;

function Role() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedRole, setSelectedRole] = useState<'house' | 'farm' | null>(
    null,
  );

  const onPressNext = () => {
    if (selectedRole) {
      console.log('선택된 역할:', selectedRole);
      navigation.navigate('Email', { role: selectedRole });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="회원가입" type="before" />
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <Text
            fontType="heading"
            fontLevel={3}
            colorType="normal"
            colorLevel={'white'}
          >
            계정 종류를 선택해주세요.
          </Text>
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleCard,
                selectedRole === 'house' && styles.selectedCard,
              ]}
              onPress={() => setSelectedRole('house')}
            >
              <Text
                fontType="heading"
                fontLevel={3}
                colorType="normal"
                colorLevel={'white'}
              >
                가정용
              </Text>
              <Icon name="Family" size={64} colorType="main" colorLevel={400} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleCard,
                selectedRole === 'farm' && styles.selectedCard,
              ]}
              onPress={() => setSelectedRole('farm')}
            >
              <Text
                fontType="heading"
                fontLevel={3}
                colorType="normal"
                colorLevel={'white'}
              >
                농업용
              </Text>
              <Icon name="Farmer" size={74} colorType="main" colorLevel={400} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button onPress={onPressNext} type="gray" disabled={!selectedRole}>
            다음
          </Button>
        </View>
      </View>
    </View>
  );
}

export default Role;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colorTable['normal']['black'],
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 362,
  },
  inputWrapper: {
    gap: 32,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleCard: {
    width: '48%',
    height: 216,
    backgroundColor: colorTable['gray'][950],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 43,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: colorTable['main'][500],
  },
  buttonWrapper: {
    marginBottom: 45,
  },
});
