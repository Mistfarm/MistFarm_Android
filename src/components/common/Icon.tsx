import { SvgProps } from 'react-native-svg';
import * as Icons from '../../assets/icons';
import { colorTable } from '../../constants/color';

const rotateTable = {
  up: '0deg',
  down: '180deg',
  right: '90deg',
  left: '-90deg',
};

export type IconType = keyof typeof Icons;

interface IColorProp {
  colorType?: keyof typeof colorTable;
  colorLevel?:
    | keyof (typeof colorTable)['normal']
    | keyof (typeof colorTable)['main']
    | keyof (typeof colorTable)['gray'];
}

interface IProps extends Omit<SvgProps, 'color'>, IColorProp {
  name: IconType;
  rotate?: keyof typeof rotateTable;
  size?: number;
}

export const Icon = ({
  name,
  colorType = 'gray',
  colorLevel = 400,
  rotate = 'up',
  size = 36,
  ...props
}: IProps) => {
  const _Icon = Icons[name];

  let resolvedColor: string | undefined;

  const colorGroup = colorTable[colorType];
  if (typeof colorGroup === 'string') {
    resolvedColor = colorGroup;
  } else if (colorLevel in colorGroup) {
    resolvedColor = (colorGroup as Record<string | number, string>)[colorLevel];
  }

  return (
    <_Icon
      {...props}
      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      width={size}
      height={size}
      fill={resolvedColor} // ✅ SVG 색상은 여기!
      style={[
        props.style,
        {
          transform: [{ rotate: rotateTable[rotate] }],
        },
      ]}
    />
  );
};
