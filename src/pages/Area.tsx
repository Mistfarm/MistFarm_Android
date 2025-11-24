import styled from "styled-components"
import { Button, Dropdown, Map, Text } from "../components/common"
import { useState, useEffect } from "react"
import { colors } from "../styles/colors"
import { Info } from "../components/plant/Info"
import { AutoSupplySet } from "../components/plant/AutoSupplySet"
import { NutrientRatioSet } from "../components/plant/NutrientRatioSet"
import { AreaItem } from "../components/setting"
import { useParams } from "react-router-dom"
import { useGetZoneSetting, useSelectPlant } from "../apis/plant"
import { useDeleteZone, useGetZoneDevices, useDeleteDevice } from "../apis/zone"
import { toast } from "react-toastify"
import { useDeviceStatus } from "../apis/zone/useDeviceStatus"

export function Area() {
    const { id } = useParams<{ id: string }>()
    const zoneId = id ?? ""

    const [viewMode, setViewMode] = useState<"plant" | "device">("plant")
    const [checkedDevices, setCheckedDevices] = useState<string[]>([])

    const options = ["허브", "고사리", "딸기"]

    const { devices: socketDevices } = useDeviceStatus(zoneId)
    const mapCoordinates = socketDevices.map((d) => ({
        device_id: d.device_id,
        lat: d.lat,
        lng: d.lon,
        connected: d.connected,
    }))

    const { data: setting } = useGetZoneSetting(zoneId)
    const selectPlantMutation = useSelectPlant()
    const [plant, setPlant] = useState<string>("")

    useEffect(() => {
        if (setting?.plant) setPlant(setting.plant)
    }, [setting])

    useEffect(() => {
        if (!plant) return
        const timer = setTimeout(() => {
            selectPlantMutation.mutate(
                { zone_id: zoneId, plant },
                {
                    onSuccess: () =>
                        toast.success(`${plant}으로 변경되었습니다.`),
                    onError: (err: any) => {
                        const message =
                            err?.response?.data?.message ||
                            err?.message ||
                            JSON.stringify(err) ||
                            "식물 변경에 실패했습니다."
                        toast.error(message)
                    },
                }
            )
        }, 400)

        return () => clearTimeout(timer)
    }, [plant])

    const deleteZoneMutation = useDeleteZone()
    const handleDeleteArea = () => {
        if (!zoneId) return toast.error("유효하지 않은 구획입니다.")

        deleteZoneMutation.mutate(
            { zone_id: zoneId },
            {
                onSuccess: () => toast.success("구획이 삭제되었습니다."),
                onError: (err: any) =>
                    toast.error(
                        err?.response?.data?.message || "구획 삭제 실패"
                    ),
            }
        )
    }

    const { data: devicesData, refetch: refetchDevices } = useGetZoneDevices(
        { zone_id: zoneId },
        { enabled: !!zoneId }
    )
    const devices = devicesData?.devices ?? []

    const handleCheckDevice = (id: string) => {
        setCheckedDevices((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
        )
    }

    const deleteDeviceMutation = useDeleteDevice()
    const handleDeleteSelectedDevices = () => {
        if (!zoneId || checkedDevices.length === 0) return
        deleteDeviceMutation.mutate(
            { zone_id: zoneId, device_ids: checkedDevices },
            {
                onSuccess: () => {
                    toast.success("선택된 기기가 삭제되었습니다.")
                    setCheckedDevices([])
                    refetchDevices()
                },
                onError: (err: any) => {
                    toast.error(
                        err?.response?.data?.message || "기기 삭제 실패"
                    )
                },
            }
        )
    }

    return (
        <Container>
            <Wrapper>
                <TopToggle>
                    <TopToggleOption
                        $active={viewMode === "plant"}
                        onClick={() => setViewMode("plant")}
                    >
                        식물 설정
                    </TopToggleOption>
                    <TopToggleOption
                        $active={viewMode === "device"}
                        onClick={() => setViewMode("device")}
                    >
                        기기 리스트
                    </TopToggleOption>
                    <TopToggleActive $position={viewMode} />
                </TopToggle>

                {viewMode === "plant" && (
                    <>
                        <Map devices={mapCoordinates} />
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
                                <Info
                                    type="plant"
                                    percentage={
                                        ((setting?.growth_level ?? 0) / 6) * 100
                                    }
                                    size={200}
                                />
                                <EnvironmentWrapper>
                                    <Text font="TitleTiny" color="Gray500">
                                        식물 환경 조회
                                    </Text>
                                    <EnvironmentValues>
                                        <Info
                                            type="water"
                                            percentage={setting?.humidity ?? 0}
                                        />
                                        <Info
                                            type="temperature"
                                            percentage={
                                                setting?.temperature ?? 0
                                            }
                                        />
                                    </EnvironmentValues>
                                </EnvironmentWrapper>
                            </InfoWrapper>
                        </ItemContainer>

                        <ItemContainer>
                            <AutoSettingContainer>
                                <AutoSupplySet zoneId={zoneId} />
                                <NutrientRatioSet zoneId={zoneId} />
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
                                    선택 기기 삭제
                                </Button>
                            </ButtonWrapper>
                        </SubTitle>

                        {devices.map((device) => {
                            const socketInfo = socketDevices.find(
                                (d) => d.device_id === device.devices_id
                            )
                            return (
                                <DeviceItemWrapper key={device.devices_id}>
                                    <AreaItem
                                        checkbox
                                        button={false}
                                        type="deviceDelete"
                                        name={device.name}
                                        value={checkedDevices.includes(
                                            device.devices_id
                                        )}
                                        onCheck={() =>
                                            handleCheckDevice(device.devices_id)
                                        }
                                        state={socketInfo?.connected}
                                    />
                                </DeviceItemWrapper>
                            )
                        })}
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

const TopToggleOption = styled.div<{ $active: boolean }>`
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

const TopToggleActive = styled.div<{ $position: "plant" | "device" }>`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: ${colors.Green500};
    border-radius: 12px;
    transition: left 0.25s ease;

    left: ${({ $position }) => ($position === "plant" ? "0%" : "50%")};
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
