import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { colorTable } from '../../constants/color';
import { Text } from '../../components/common/Text';
import Input from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon'; // 아이콘 불러오기

export function Password() {
  const [password, setPassword] = useState<string>('');
  const [check, setCheck] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);

  const handleSignup = () => {
    console.log('회원가입 시도 :', password);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text
            fontType="heading"
            fontLevel={3}
            colorType="normal"
            colorLevel={'white'}
          >
            비밀번호를 입력해주세요.
          </Text>

          <View style={styles.inputWrapper}>
            <Input
              label="비밀번호 입력"
              placeholder="8~25자 내로 생성(대소문자,숫자,특수문자 포함)"
              onTextChange={setPassword}
            />
            <Input
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              onTextChange={setCheck}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Pressable
              style={styles.checkboxWrapper}
              onPress={() => setAgree(prev => !prev)}
            >
              <View
                style={[
                  styles.checkbox,
                  agree
                    ? {
                        backgroundColor: colorTable['main'][500],
                        borderColor: colorTable['main'][500],
                      }
                    : {
                        backgroundColor: colorTable['gray'][800],
                        borderColor: colorTable['gray'][300],
                      },
                ]}
              >
                {agree && (
                  <Icon
                    name="WhiteCheck"
                    size={16}
                    colorType="normal"
                    colorLevel="white"
                  />
                )}
              </View>
              <Text
                fontType="body"
                fontLevel={2}
                colorType="gray"
                colorLevel={300}
              >
                개인정보 수집 이용약관 동의
              </Text>
            </Pressable>
            <Button
              onPress={handleSignup}
              type="gray"
              disabled={!password || !check || !agree}
            >
              회원가입
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colorTable['normal']['black'],
  },
  wrapper: {
    flex: 1,
    marginTop: 160,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  inputWrapper: {
    marginTop: 24,
    gap: 32,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colorTable['gray'][600],
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 'auto',
    marginBottom: 45,
    gap: 12,
    alignItems: 'center',
  },
});
