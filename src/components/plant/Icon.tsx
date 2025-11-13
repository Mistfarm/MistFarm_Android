import React from "react"
import styled from "styled-components"

import { PlantIcon, TemperatureIcon, WaterIcon } from "../../assets/icons"
import { colors } from "../../styles/colors"

type IconType = "plant" | "temperature" | "water"

type Props = {
    type: IconType
    percentage: number
    size?: number
    className?: string
}

const COLORS: Record<IconType, string> = {
    plant: colors.Green400,
    temperature: "#ff8181",
    water: "#7baeff",
}

export const Icon: React.FC<Props> = ({
    type,
    percentage,
    size = 40,
    className,
}) => {
    const pct = Math.max(0, Math.min(100, Math.round(percentage)))
    const color = COLORS[type]

    const IconComponent =
        type === "plant"
            ? PlantIcon
            : type === "temperature"
            ? TemperatureIcon
            : WaterIcon

    const clipTop = 100 - pct

    return (
        <Wrap
            style={{ width: size, height: size }}
            className={className}
            aria-hidden
        >
            <IconBase as={IconComponent} aria-hidden focusable={false} />

            <ColorLayer
                style={{
                    clipPath: `inset(${clipTop}% 0 0 0)`,
                }}
                $color={color}
            >
                <IconColor as={IconComponent} aria-hidden focusable={false} />
            </ColorLayer>
        </Wrap>
    )
}

const Wrap = styled.div`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    user-select: none;
`

const IconBase = styled.svg`
    width: 100%;
    height: 100%;
    display: block;
    color: #e6e9ee;
    fill: currentColor;
    stroke: none;
`

const ColorLayer = styled.div<{ $color: string }>`
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: clip-path 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: clip-path;
    color: ${({ $color }) => $color};
`

const IconColor = styled.svg`
    width: 100%;
    height: 100%;
    display: block;
    color: inherit;
    fill: currentColor;
    stroke: none;
`
