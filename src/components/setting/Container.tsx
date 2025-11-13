import React from "react"
import styled from "styled-components"
import { Text } from "../common"
import { colors } from "../../styles/colors"

interface IProps {
    title?: string
    children?: React.ReactNode
    gap?: number
}

export function Container({ title, children, gap = 36 }: IProps) {
    return (
        <Wrapper>
            {title && <Text font="TitleTiny">{title}</Text>}
            <Item $gap={gap}>{children}</Item>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 960px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;

    @media (max-width: 1024px) {
        width: 100%;
        padding: 0 32px;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`

const Item = styled.div<{ $gap: number }>`
    width: 100%;
    border: 1px solid ${colors.Gray300};
    border-radius: 12px;
    padding: 48px 72px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ $gap }) => `${$gap}px`};

    @media (max-width: 1024px) {
        padding: 40px 48px;
    }

    @media (max-width: 768px) {
        padding: 32px 20px;
    }
`
