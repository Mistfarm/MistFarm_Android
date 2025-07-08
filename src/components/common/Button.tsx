import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import { Text, ITextProp } from './Text';
import { colorTable } from '../../constants/color';

interface IProp extends TouchableOpacityProps {
  onPress: (event: GestureResponderEvent) => void;
  type?: 'main' | 'gray';
  pressed?: boolean; // 👈 추가
  disabled?: boolean;
  textProps?: ITextProp;
  children: string;
}

export const Button = ({
  onPress,
  type = 'main',
  pressed = false,
  disabled = false,
  children,
  textProps,
  ...props
}: IProp) => {
  const getBackgroundColor = () => {
    if (disabled) {
      return type === 'main' ? colorTable.main[400] : colorTable.gray[50];
    }
    if (pressed) {
      return colorTable.main[600]; // 눌림 상태
    }
    return type === 'main' ? colorTable.main[400] : colorTable.gray[100];
  };

  const getTextColor = () => {
    if (disabled) {
      return type === 'main' ? colorTable.normal.white : colorTable.gray[600];
    }
    return colorTable.normal.white;
  };

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        props.style,
      ]}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text
        colorType={undefined}
        style={{ color: getTextColor() }}
        fontType="subTitle"
        fontLevel={2}
        {...textProps}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    flexShrink: 1,
  },
});
