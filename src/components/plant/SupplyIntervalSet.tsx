import styled from "styled-components"
import { Button, Text } from "../common"
import { colors } from "../../styles/colors"

export function SupplyIntervalSet() {
    return (
        <Wrapper>
            <Section>
                <Text font="TitleTiny" color="Black">
                    켜져있는 시간 (ON)
                </Text>
                <TimeInputWrapper>
                    <TimeInput placeholder="00" />
                    <Separator>:</Separator>
                    <TimeInput placeholder="00" />
                    <Separator>:</Separator>
                    <TimeInput placeholder="00" />
                </TimeInputWrapper>
            </Section>

            <Section>
                <Text font="TitleTiny" color="Black">
                    꺼져있는 시간 (OFF)
                </Text>
                <TimeInputWrapper>
                    <TimeInput placeholder="00" />
                    <Separator>:</Separator>
                    <TimeInput placeholder="00" />
                    <Separator>:</Separator>
                    <TimeInput placeholder="00" />
                </TimeInputWrapper>
            </Section>

            <ButtonWrapper>
                <Button>공급간격 저장</Button>
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin: 0 auto;
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`

const TimeInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 480px) {
        gap: 6px;
    }
`

const TimeInput = styled.input`
    min-width: 40px;
    max-width: 72px;
    width: 15vw;
    height: 48px;
    border-radius: 6px;
    border: none;
    background-color: ${colors.Gray100};
    border: 1px solid ${colors.Gray300};
    color: ${colors.Black};
    text-align: center;
    font-size: 20px;
    outline: none;

    @media (max-width: 480px) {
        height: 40px;
        font-size: 16px;
        width: 20vw;
        max-width: 56px;
    }
`

const Separator = styled.span`
    color: ${colors.Gray600};
    font-size: 18px;
    font-weight: bold;

    @media (max-width: 480px) {
        font-size: 16px;
    }
`

const ButtonWrapper = styled.div`
    width: 160px;
    margin-left: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
    }
`
