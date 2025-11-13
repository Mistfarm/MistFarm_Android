import styled from "styled-components"
import { Text } from "../common"
import { colors } from "../../styles/colors"

export function SupplyIntervalSet() {
    return (
        <Wrapper>
            <Text font="TitleTiny" color="Black">
                공급 간격 설정
            </Text>
            <TimeInputWrapper>
                <TimeInput placeholder="00" />
                <Separator>:</Separator>
                <TimeInput placeholder="00" />
                <Separator>:</Separator>
                <TimeInput placeholder="00" />
            </TimeInputWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin: 0 auto;
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
    max-width: 72px;
    height: 48px;
    border-radius: 6px;
    border: none;
    background-color: ${colors.Gray200};
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
