import styled from "styled-components"
import { Text } from "../common"
import { colors } from "../../styles/colors"
import { useEffect, useState } from "react"
import { SupplyIntervalSet } from "./SupplyIntervalSet"
import {
    useGetZoneSetting,
    useSetMode,
    useSetPower,
    useSetFogCycle,
} from "../../apis/plant"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

interface Props {
    zoneId: string
}

export function AutoSupplySet({ zoneId }: Props) {
    const { data, refetch } = useGetZoneSetting(zoneId)

    const setModeMutation = useSetMode()
    const setPowerMutation = useSetPower()
    const setFogCycleMutation = useSetFogCycle()

    const [mode, setMode] = useState<"auto" | "manual">("auto")
    const [manualState, setManualState] = useState<"on" | "off">("off")

    useEffect(() => {
        if (!data) return
        if (data.mode === true) {
            setMode("auto")
        } else {
            setMode("manual")
            setManualState(data.power ? "on" : "off")
        }
    }, [data])

    const handleChangeMode = (next: "auto" | "manual") => {
        setMode(next)
        setModeMutation.mutate(
            {
                zoneId: zoneId,
                mode: next === "auto",
            },
            {
                onSuccess: () => refetch(),
                onError: (error) => {
                    const err = error as AxiosError<any>
                    const message =
                        err.response?.data?.message ||
                        err.message ||
                        "알 수 없는 에러가 발생했습니다."

                    toast.error(message)
                },
            }
        )
    }

    const handleChangeManualPower = (next: "on" | "off") => {
        setManualState(next)
        setPowerMutation.mutate(
            {
                zoneId: zoneId,
                power: next === "on",
            },
            {
                onSuccess: () => refetch(),
                onError: (error) => {
                    const err = error as AxiosError<any>
                    const message =
                        err.response?.data?.message ||
                        err.message ||
                        "알 수 없는 에러가 발생했습니다."

                    toast.error(message)
                },
            }
        )
    }

    const handleIntervalChange = (on: string, off: string) => {
        setFogCycleMutation.mutate(
            {
                zoneId: zoneId,
                onInterval: on,
                offInterval: off,
            },
            {
                onSuccess: () => refetch(),
                onError: (error) => {
                    const err = error as AxiosError<any>
                    const message =
                        err.response?.data?.message ||
                        err.message ||
                        "알 수 없는 에러가 발생했습니다."

                    toast.error(message)
                },
            }
        )
    }

    return (
        <Wrapper>
            <Header>
                <Text font="TitleTiny">공급 모드</Text>
            </Header>

            <ToggleGroup>
                <ToggleOption
                    $active={mode === "auto"}
                    onClick={() => handleChangeMode("auto")}
                >
                    자동 공급
                </ToggleOption>

                <ToggleOption
                    $active={mode === "manual"}
                    onClick={() => handleChangeMode("manual")}
                >
                    수동 공급
                </ToggleOption>

                <ActiveBackground $position={mode} />
            </ToggleGroup>

            {mode === "auto" && (
                <SupplyIntervalSet
                    defaultOn={
                        data?.mode === true ? data.onInterval : "00:00:00"
                    }
                    defaultOff={
                        data?.mode === true ? data.offInterval : "00:00:00"
                    }
                    onSubmit={handleIntervalChange}
                />
            )}

            {mode === "manual" && (
                <ManualWrapper>
                    <Text font="TitleTiny">수동 제어</Text>

                    <ManualToggle>
                        <ManualButton
                            $active={manualState === "off"}
                            onClick={() => handleChangeManualPower("off")}
                        >
                            중단
                        </ManualButton>

                        <ManualButton
                            $active={manualState === "on"}
                            onClick={() => handleChangeManualPower("on")}
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

const ToggleOption = styled.div<{ $active: boolean }>`
    flex: 1;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    color: ${({ $active }) => ($active ? "white" : colors.Green500)};
    user-select: none;
    transition: color 0.25s ease;
`

const ActiveBackground = styled.div<{ $position: "auto" | "manual" }>`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: ${colors.Green500};
    border-radius: 12px;
    transition: left 0.25s ease;

    left: ${({ $position }) => ($position === "manual" ? "50%" : "0%")};
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

const ManualButton = styled.div<{ $active: boolean }>`
    flex: 1;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: ${({ $active }) => ($active ? "white" : colors.Green500)};
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
