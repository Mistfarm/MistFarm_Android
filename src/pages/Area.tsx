import styled from "styled-components"
import { Button, Dropdown, Map, Text } from "../components/common"
import { useState } from "react"
import { colors } from "../styles/colors"
import { Info } from "../components/plant/Info"
import { AutoSupplySet } from "../components/plant/AutoSupplySet"
import { SupplyIntervalSet } from "../components/plant/SupplyIntervalSet"
import { NutrientRatioSet } from "../components/plant/NutrientRatioSet"
import { AreaItem } from "../components/setting"
import { Trash2 } from "lucide-react"

interface Device {
    id: number
    name: string
    state: "success" | "fail"
}

export function Area() {
    const [plant, setPlant] = useState<string>("")
    const [viewMode, setViewMode] = useState<"plant" | "device">("plant")
    const [checkedDevices, setCheckedDevices] = useState<number[]>([])
    const options = ["상추", "딸기"]

    const positions = [
        { lat: 36.3916, lng: 127.3632 },
        { lat: 36.3926, lng: 127.3635 },
        { lat: 36.39146, lng: 127.3642 },
    ]

    const dummy: Device[] = [
        { id: 1, name: "기기 1", state: "success" },
        { id: 2, name: "기기 2", state: "fail" },
    ]
    const [devices, setDevices] = useState<Device[]>(dummy)

    const handleDeleteSelectedDevices = () => {
        setDevices((prev) =>
            prev.filter((device) => !checkedDevices.includes(device.id))
        )
        setCheckedDevices([])
    }

    const handleCheckDevice = (id: number) => {
        setCheckedDevices((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
        )
    }

    const handleDeleteArea = () => {
        // 구획 삭제 로직
    }

    return (
        <Container>
            <Wrapper>
                <TopToggle>
                    <TopToggleOption
                        active={viewMode === "plant"}
                        onClick={() => setViewMode("plant")}
                    >
                        식물 설정
                    </TopToggleOption>

                    <TopToggleOption
                        active={viewMode === "device"}
                        onClick={() => setViewMode("device")}
                    >
                        기기 리스트
                    </TopToggleOption>

                    <TopToggleActive position={viewMode} />
                </TopToggle>

                {viewMode === "plant" && (
                    <>
                        <Map coordinates={positions} />
                        <InputWrapper>
                            <Dropdown
                                value={plant}
                                label="생장식물"
                                placeholder="식물을 선택해주세요"
                                options={options}
                                onChange={(e) => setPlant(e)}
                            />
                        </InputWrapper>
                        <ItemContainer>
                            <InfoWrapper>
                                <Info type="plant" percentage={40} size={200} />

                                <EnvironmentWrapper>
                                    <Text font="TitleTiny" color="Gray500">
                                        식물 환경 조회
                                    </Text>
                                    <EnvironmentValues>
                                        <Info type="water" percentage={40} />
                                        <Info
                                            type="temperature"
                                            percentage={40}
                                        />
                                    </EnvironmentValues>
                                </EnvironmentWrapper>
                            </InfoWrapper>
                        </ItemContainer>
                        <ItemContainer>
                            <AutoSettingContainer>
                                <AutoSupplySet />
                                <NutrientRatioSet />
                            </AutoSettingContainer>
                        </ItemContainer>

                        <InfoWrapper>
                            <ButtonWrapper>
                                <Button
                                    kind="red"
                                    size="large"
                                    onClick={handleDeleteArea}
                                >
                                    구획 삭제
                                </Button>
                            </ButtonWrapper>
                        </InfoWrapper>
                    </>
                )}

                {viewMode === "device" && (
                    <DeviceListContainer>
                        <SubTitle>
                            <Text font="TitleTiny">연결된 기기 리스트</Text>

                            <ButtonWrapper>
                                <Button
                                    kind="gray"
                                    onClick={handleDeleteSelectedDevices}
                                >
                                    기기 해제
                                </Button>
                            </ButtonWrapper>
                        </SubTitle>

                        {dummy &&
                            dummy.map((v, i) => (
                                <DeviceItemWrapper key={v.id}>
                                    <AreaItem
                                        key={i}
                                        checkbox={true}
                                        button={false}
                                        type="deviceDelete"
                                        name={v.name}
                                        value={checkedDevices.includes(v.id)}
                                        state={v.state}
                                        onCheck={() => handleCheckDevice(v.id)}
                                    />
                                </DeviceItemWrapper>
                            ))}
                    </DeviceListContainer>
                )}
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 100px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;

    @media (max-width: 1024px) {
        padding: 80px 32px;
    }

    @media (max-width: 768px) {
        padding: 100px 20px;
    }

    @media (max-width: 480px) {
        padding: 120px 16px;
    }
`

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
    box-sizing: border-box;

    @media (max-width: 1024px) {
        padding: 0 32px;
        gap: 48px;
    }

    @media (max-width: 768px) {
        padding: 0 20px;
        gap: 36px;
    }

    @media (max-width: 480px) {
        padding: 0 16px;
        gap: 28px;
    }
`

const InputWrapper = styled.div`
    max-width: 800px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const ItemContainer = styled.div`
    width: 100%;
    border-top: 1px solid ${colors.Gray400};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    box-sizing: border-box;

    @media (max-width: 1024px) {
        padding: 32px 0;
    }

    @media (max-width: 768px) {
        padding: 24px 0;
    }

    @media (max-width: 480px) {
        padding: 20px 0;
    }
`

const InfoWrapper = styled.div`
    max-width: 800px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 30px;

    @media (max-width: 1024px) {
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
`
const EnvironmentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 20px;

    @media (max-width: 768px) {
        align-items: center;
        text-align: center;
    }
`

const EnvironmentValues = styled.div`
    display: flex;
    gap: 120px;

    @media (max-width: 768px) {
        gap: 60px;
    }

    @media (max-width: 480px) {
        gap: 40px;
    }
`

const AutoSettingContainer = styled.div`
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 60px;

    @media (max-width: 1024px) {
        gap: 48px;
    }

    @media (max-width: 768px) {
        gap: 36px;
    }

    @media (max-width: 480px) {
        gap: 28px;
    }
`

const TopToggle = styled.div`
    width: 100%;
    max-width: 400px;
    height: 50px;
    background: white;
    border: 1px solid ${colors.Green500};
    border-radius: 12px;
    position: relative;
    display: flex;
    overflow: hidden;
    cursor: pointer;
`

const TopToggleOption = styled.div<{ active: boolean }>`
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

const TopToggleActive = styled.div<{ position: "plant" | "device" }>`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: ${colors.Green500};
    border-radius: 12px;
    transition: left 0.25s ease;

    left: ${({ position }) => (position === "plant" ? "0%" : "50%")};
`

const DeviceListContainer = styled.div`
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px 0;
`

const SubTitle = styled.div`
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 12px;
`

const DeviceItemWrapper = styled.div`
    width: 100%;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const ButtonWrapper = styled.div`
    width: 160px;
    margin-left: auto;
`
