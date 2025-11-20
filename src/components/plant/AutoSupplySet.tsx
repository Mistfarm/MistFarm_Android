import styled from "styled-components"
import { Text, Button } from "../common"
import { colors } from "../../styles/colors"
import { useState } from "react"
import { SupplyIntervalSet } from "./SupplyIntervalSet"

export function AutoSupplySet() {
    const [mode, setMode] = useState<"auto" | "manual">("auto")
    const [manualState, setManualState] = useState<"on" | "off">("off")

    return (
        <Wrapper>
            <Header>
                <Text font="TitleTiny">공급 모드</Text>
            </Header>

            <ToggleGroup>
                <ToggleOption
                    active={mode === "auto"}
                    onClick={() => setMode("auto")}
                >
                    자동 공급
                </ToggleOption>

                <ToggleOption
                    active={mode === "manual"}
                    onClick={() => setMode("manual")}
                >
                    수동 공급
                </ToggleOption>

                <ActiveBackground position={mode} />
            </ToggleGroup>

            {mode === "auto" && <SupplyIntervalSet />}

            {mode === "manual" && (
                <ManualWrapper>
                    <Text font="TitleTiny">수동 제어</Text>

                    <ManualToggle>
                        <ManualButton
                            active={manualState === "off"}
                            onClick={() => setManualState("off")}
                        >
                            중단
                        </ManualButton>

                        <ManualButton
                            active={manualState === "on"}
                            onClick={() => setManualState("on")}
                        >
                            공급
                        </ManualButton>
                        <ManualBackground position={manualState} />
                    </ManualToggle>
                </ManualWrapper>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin: 0 auto;
`

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ToggleGroup = styled.div`
    width: 100%;
    max-width: 700px;
    height: 60px;
    background: white;
    border: 1px solid ${colors.Green500};
    border-radius: 12px;
    position: relative;
    display: flex;
    overflow: hidden;
    cursor: pointer;
`

const ToggleOption = styled.div<{ active: boolean }>`
    flex: 1;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    color: ${({ active }) => (active ? "white" : colors.Green500)};
    user-select: none;
    transition: color 0.25s ease;
`

const ActiveBackground = styled.div<{ position: "auto" | "manual" }>`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: ${colors.Green500};
    border-radius: 12px;
    transition: left 0.25s ease;

    left: ${({ position }) => (position === "manual" ? "50%" : "0%")};
`

const ManualWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 12px;
`

const ManualToggle = styled.div`
    width: 100%;
    max-width: 700px;
    height: 60px;
    background: white;
    border: 1px solid ${colors.Green500};
    border-radius: 12px;
    position: relative;
    display: flex;
    overflow: hidden;
    cursor: pointer;
    margin: auto;
`

const ManualButton = styled.div<{ active: boolean }>`
    flex: 1;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: ${({ active }) => (active ? "white" : colors.Green500)};
    transition: color 0.25s ease;
    cursor: pointer;
`

const ManualBackground = styled.div<{ position: "on" | "off" }>`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: ${colors.Green500};
    border-radius: 12px;
    transition: left 0.25s ease;
    left: ${({ position }) => (position === "off" ? "0%" : "50%")};
`
