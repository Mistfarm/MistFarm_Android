import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { colorTable } from '../../constants/color';
import { Icon } from './Icon';
import { fontTable } from '../../constants/text';

interface InputProps extends Omit<TextInputProps, 'onChange'> {
  value?: string;
  onTextChange: (text: string, id?: string) => void;
  placeholder: string;
  label?: string;
  id?: string;
  multiLine?: number;
  password?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: boolean;
}

export default function Input({
  value,
  onTextChange,
  placeholder,
  label,
  id,
  multiLine,
  password,
  disabled,
  required,
  error,
  success,
  ...props
}: InputProps) {
  const [focus, setFocus] = useState(false);
  // const [visible, setVisible] = useState(false);

  const showLabelError = !!error;
  const isFocused = focus;
  const isDisabled = !!disabled;
  const isPassword = !!password;

  const borderColor = showLabelError
    ? colorTable.error
    : success
    ? colorTable.main[500]
    : isFocused
    ? colorTable.main[500]
    : colorTable.gray[950];

  const backgroundColor = colorTable.gray[950];

  const placeholderColor = colorTable.gray[400];
  const textColor = isDisabled
    ? colorTable.normal.white
    : colorTable.normal.white;

  return (
    <View style={styles.container}>
      {!!label && (
        <View style={styles.labelContainer}>
          <Text
            style={[
              fontTable['subTitle'][3],
              {
                color: showLabelError
                  ? colorTable.error
                  : colorTable.normal.white,
              },
            ]}
          >
            {label}
          </Text>
          {required && (
            <Text style={{ color: colorTable.error, marginLeft: 2 }}>*</Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: borderColor,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <TextInput
          {...props}
          value={value}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          placeholderTextColor={placeholderColor}
          multiline={!!multiLine}
          numberOfLines={multiLine || 1}
          editable={!isDisabled}
          style={[
            styles.input,
            fontTable['body'][1],
            {
              color: textColor,
              height: multiLine ? multiLine * 35 : 35,
            },
          ]}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChangeText={text => onTextChange(text, id)}
        />
        {/* {isPassword && (
          <TouchableOpacity
            onPress={() => setVisible(prev => !prev)}
            style={styles.icon}
          >
            <Icon
              name={visible ? 'Eye' : 'EyeOff'}
              size={20}
              colorType="gray"
              colorLevel={900}
            />
          </TouchableOpacity>
        )} */}
        {success && !isPassword && (
          <View style={styles.icon}>
            <Icon name="Check" size={20} colorType="main" colorLevel={500} />
          </View>
        )}
      </View>
      {!!error && (
        <Text style={[styles.helpText, { color: colorTable.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    padding: 0,
  },
  icon: {
    marginLeft: 8,
  },
  helpText: {
    fontSize: 12,
    fontFamily: 'Regular',
    alignSelf: 'flex-end',
  },
});
