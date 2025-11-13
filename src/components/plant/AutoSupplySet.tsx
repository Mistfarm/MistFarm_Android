import styled from "styled-components"
import { Button, Text } from "../common"
import { colors } from "../../styles/colors"

export function AutoSupplySet() {
    return (
        <Wrapper>
            <Header>
                <Text font="TitleTiny">자동 공급</Text>
                <ToggleWrapper>
                    <ToggleInput type="checkbox" id="autoToggle" />
                    <ToggleLabel htmlFor="autoToggle" />
                </ToggleWrapper>
            </Header>

            <Button size="large">수동 공급</Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin: 0 auto;
`

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ToggleWrapper = styled.div`
    position: relative;
    width: 44px;
    height: 24px;
`

const ToggleInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + label {
        background-color: ${colors.Green500};
    }

    &:checked + label::after {
        left: 22px;
    }
`

const ToggleLabel = styled.label`
    position: absolute;
    cursor: pointer;
    background-color: ${colors.Gray400};
    border-radius: 24px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: background-color 0.3s ease;

    &::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 3px;
        width: 18px;
        height: 18px;
        background: white;
        border-radius: 50%;
        transition: left 0.3s ease;
    }
`
