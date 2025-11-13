import styled from "styled-components"
import { colors } from "../../styles/colors"
import { Button, Text } from "../common"
import { useState, useEffect } from "react"

interface IProps {
    plant?: string
    name?: string
    state?: "success" | "fail"
    type?: "select" | "areaDelete" | "deviceDelete"
    checkbox?: boolean
    button?: boolean
    value?: boolean
    onClick?: () => void
    onCheck?: () => void
}

export function AreaItem({
    plant,
    name,
    state,
    type = "select",
    checkbox = false,
    button = true,
    value,
    onClick,
    onCheck,
}: IProps) {
    const buttonText = {
        select: "선택",
        areaDelete: "구획 삭제",
        deviceDelete: "기기 삭제",
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <Container>
            <LeftSection>
                {checkbox && (
                    <CheckboxInput
                        checked={value}
                        type="checkbox"
                        onChange={onCheck}
                    />
                )}

                <TextWrapper>
                    {plant && (
                        <Text
                            font={isMobile ? "BodyMedium" : "BodySmall"}
                            color="Gray500"
                        >
                            ({plant})
                        </Text>
                    )}
                    <Text font={isMobile ? "BodyMedium" : "TitleTiny"}>
                        {name}
                    </Text>
                    {state && (
                        <Text
                            color={
                                state === "success"
                                    ? "Green500"
                                    : "CriticalMain"
                            }
                            font={isMobile ? "BodyMedium" : "BodySmall"}
                        >
                            {state === "success" ? "연결 성공" : "연결 실패"}
                        </Text>
                    )}
                </TextWrapper>
            </LeftSection>

            {button && (
                <ButtonWrapper>
                    <Button
                        onClick={onClick}
                        size={isMobile ? "medium" : "large"}
                        kind="gray"
                    >
                        {buttonText[type]}
                    </Button>
                </ButtonWrapper>
            )}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 70px;
    background-color: ${colors.White};
    border: 1px solid ${colors.Gray200};
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: 150ms;

    @media (max-width: 1024px) {
        padding: 12px 16px;
    }

    @media (max-width: 768px) {
        flex-direction: row;
        align-items: center;
        padding: 10px 14px;
        min-height: 60px;
    }
`

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`

const CheckboxInput = styled.input`
    width: 20px;
    height: 20px;
    accent-color: ${colors.Green500};
    cursor: pointer;
`

const ButtonWrapper = styled.div`
    width: 120px;
    display: flex;
    justify-content: flex-end;
`
