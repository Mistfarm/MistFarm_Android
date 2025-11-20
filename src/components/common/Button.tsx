import { ComponentProps, CSSProperties } from "react"
import { colors } from "../../styles/colors"
import { Fonts } from "../../styles/fonts"
import styled from "styled-components"

type KindType = "green" | "gray" | "white" | "red"

type Props = ComponentProps<"button"> & {
    kind?: KindType
    size?: "medium" | "large"
    full?: boolean
}

export const Button = ({
    kind = "green",
    size = "medium",
    style,
    full = true,
    children,
    ...props
}: Props) => {
    const KIND_STYLE: Record<KindType, CSSProperties> = {
        green: {
            backgroundColor: colors.Green500,
            color: colors.White,
        },
        gray: {
            backgroundColor: colors.Gray100,
            color: colors.Black,
        },
        white: {
            backgroundColor: colors.White,
            color: colors.Gray700,
        },
        red: {
            backgroundColor: colors.CriticalBackground,
            color: colors.CriticalMain,
        },
    }

    const SIZE_STYLE: Record<"medium" | "large", CSSProperties> = {
        medium: { padding: "8px 16px", ...Fonts.LabelMedium },
        large: { padding: "16px 24px", ...Fonts.LabelLarge },
    }

    return (
        <ButtonTag
            style={{
                ...KIND_STYLE[kind],
                ...SIZE_STYLE[size],
                width: full ? "100%" : "fit-content",
                ...style,
            }}
            {...props}
        >
            {children}
        </ButtonTag>
    )
}

const ButtonTag = styled.button`
    border: none;
    cursor: pointer;
    border-radius: 12px;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        filter: brightness(0.95);
    }
`
