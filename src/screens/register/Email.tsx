import Header from '../../components/common/Header';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colorTable } from '../../constants/color';
import { Text } from '../../components/common/Text';
import Input from '../../components/common/Input';
import { useState } from 'react';
import { Button } from '../../components/common/Button';

function Email() {
  const [email, setEmail] = useState<string>('');
  const [check, setCheck] = useState<string>('');

  const onPress = () => {
    if (email) console.log('이메일 발송됨');
  };

  const onEmail = () => {
    if (check) console.log('인증됨');
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
            정보를 입력해주세요.
          </Text>

          <Input
            label="이메일"
            placeholder="이메일 입력"
            onTextChange={setEmail}
          />

          <View style={styles.check}>
            <View style={styles.checkInput}>
              <Input
                label="이메일 인증"
                placeholder="인증번호 입력"
                onTextChange={setCheck}
              />
            </View>

            <TouchableOpacity style={styles.checkButton} onPress={onPress}>
              <Text
                fontType="body"
                fontLevel={3}
                colorType="gray"
                colorLevel={300}
              >
                인증번호 발송
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <Button onPress={onEmail} type="gray" disabled={!check}>
            다음
          </Button>
        </View>
      </View>
    </View>
  );
}

export default Email;

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
  inputWrapper: { gap: 32 },
  check: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  checkInput: {
    width: '75%',
  },
  checkButton: {
    height: 60,
    width: '22%',
    backgroundColor: colorTable['gray'][950],
    marginLeft: 'auto',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 'auto',
    marginBottom: 45,
    gap: 12,
  },
});
