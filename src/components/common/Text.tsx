import { TextProps, Text as RNText } from 'react-native';
import { fontTable } from '../../constants/text';
import { colorTable } from '../../constants/color';

type FontType = keyof typeof fontTable;
type FontLevel<T extends FontType> = keyof (typeof fontTable)[T];
type PaletteLevel =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;
type NormalLevel = 'white' | 'black';

interface IColorProp {
  colorType?: keyof typeof colorTable;
  colorLevel?: PaletteLevel | NormalLevel;
}

interface IProp<T extends FontType = FontType>
  extends Omit<TextProps, 'children'>,
    IColorProp {
  fontType: T;
  fontLevel?: FontLevel<T>;
  children: string | (string | React.ReactElement)[];
}

export interface ITextProp extends Partial<IProp> {}

export const Text = <T extends FontType>({
  colorType,
  colorLevel,
  fontType,
  fontLevel = 1 as FontLevel<T>,
  children,
  ...props
}: IProp<T>): React.ReactElement => {
  const group = fontTable[fontType];
  const fontStyle =
    fontLevel in group
      ? group[fontLevel as keyof typeof group]
      : (group[1] as (typeof group)[keyof typeof group]);

  let resolvedColor: string | undefined;
  if (colorType) {
    const colorGroup = colorTable[colorType];
    if (typeof colorGroup === 'string') {
      resolvedColor = colorGroup;
    } else if (colorLevel !== undefined && colorLevel in colorGroup) {
      resolvedColor = (
        colorGroup as Record<NormalLevel | PaletteLevel, string>
      )[colorLevel];
    }
  }
  return (
    <RNText
      {...props}
      style={{
        ...fontStyle,
        color: resolvedColor,
        ...(props.style as object),
      }}
    >
      {children}
    </RNText>
  );
};
