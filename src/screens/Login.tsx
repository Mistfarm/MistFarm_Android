import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Text } from '../components/common/Text';
import Input from '../components/common/Input';
import { Button } from '../components/common/Button';
import Logo from '../assets/Logo.svg';
import { colorTable } from '../constants/color';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Stack';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

function Login() {
  const navigation = useNavigation<NavigationProp>();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('로그인 시도:', id, password);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Logo width={152} height={64} />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            value={id}
            onTextChange={setId}
            placeholder="아이디 또는 이메일"
            label="아이디"
          />

          <Input
            value={password}
            onTextChange={setPassword}
            placeholder="비밀번호 입력"
            label="비밀번호"
            password
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Pressable style={styles.signupWrapper}>
            <Text
              style={styles.signupText}
              fontType="body"
              fontLevel={1}
              colorType="gray"
              colorLevel={600}
              onPress={() => navigation.navigate('Email')}
            >
              회원가입
            </Text>
          </Pressable>

          <Button onPress={handleLogin} type="main" disabled={!id || !password}>
            로그인
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 64,
    marginBottom: 50,
  },
  inputWrapper: {
    gap: 16,
  },
  signupWrapper: {
    alignItems: 'center',
    marginTop: 8,
  },
  signupText: {
    borderBottomColor: colorTable['gray'][600],
    borderBottomWidth: 1,
  },
  buttonWrapper: {
    marginTop: 'auto',
    marginBottom: 45,
    gap: 12,
  },
});
