import styled from "styled-components"
import { colors } from "../../styles/colors"
import { Button, Text } from "../common"
import { useState, useEffect } from "react"

interface IProps {
    plant?: string
    name?: string
    state?: "success" | "fail"
    type?: "select" | "areaDelete" | "deviceDelete"
    onClick?: () => void
}

export function AreaItem({
    plant,
    name,
    state,
    type = "select",
    onClick,
}: IProps) {
    const buttonText = {
        select: "선택",
        areaDelete: "구획삭제",
        deviceDelete: "기기삭제",
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <Container>
            <TextWrapper>
                <Text font="BodySmall" color="Gray500">
                    {plant}
                </Text>
                <Text font="TitleTiny">{name}</Text>
                <Text
                    color={state === "success" ? "Green500" : "CriticalMain"}
                    font="BodySmall"
                >
                    {state}
                </Text>
            </TextWrapper>

            <ButtonWrapper>
                <Button
                    onClick={onClick}
                    size={isMobile ? "medium" : "large"}
                    kind="gray"
                >
                    {buttonText[type]}
                </Button>
            </ButtonWrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 12px 16px;
    background-color: ${colors.White};
    border: 1px solid ${colors.Gray300};
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    transition: 150ms;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
    }
`

const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 6px;
    }
`

const ButtonWrapper = styled.div`
    width: 150px;

    @media (max-width: 768px) {
        width: 100%;
    }
`
