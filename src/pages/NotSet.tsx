import styled from "styled-components"
import { Dropdown, Button, Input, Text, Map } from "../components/common"
import { AreaItem } from "../components/setting"
import { useState } from "react"
import {
    useCreateZone,
    useGetZoneDevices,
    useGetZoneList,
    useRegisterDevice,
} from "../apis/zone"
import { toast } from "react-toastify"
import { useDeviceStatus } from "../apis/zone/useDeviceStatus"

export function NotSet() {
    const [selectedOldZone, setSelectedOldZone] = useState<string>("")
    const [newZoneName, setNewZoneName] = useState("")
    const [checkedDevices, setCheckedDevices] = useState<string[]>([])

    const { data: zoneList } = useGetZoneList()
    const notSetId = zoneList?.zones[0].id ?? ""

    const { devices: socketDevices } = useDeviceStatus(notSetId)
    const mapCoordinates = socketDevices.map((d) => ({
        device_id: d.device_id,
        lat: d.lat,
        lng: d.lon,
        connected: d.connected,
    }))

    const { data: zonesData } = useGetZoneList()
    const zones = zonesData?.zones ?? []

    const { data: devicesData } = useGetZoneDevices({ zone_id: "" })
    const devices = devicesData?.devices ?? []

    const createZoneMutation = useCreateZone()
    const registerDeviceMutation = useRegisterDevice()

    const handleCheckDevice = (id: string) => {
        setCheckedDevices((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        )
    }

    const handleAddToOld = () => {
        if (!selectedOldZone) return toast.error("추가할 구획을 선택해주세요")
        if (checkedDevices.length === 0)
            return toast.error("추가할 기기를 선택해주세요")

        const selectedZoneId = zones.find((v) => v.name === selectedOldZone)?.id
        if (!selectedZoneId) return toast.error("올바른 구획을 선택해주세요")

        registerDeviceMutation.mutate(
            {
                zone_id: selectedZoneId,
                device_ids: checkedDevices,
            },
            {
                onSuccess: () => {
                    toast.success(
                        `기기 ${checkedDevices.length}개가 ${selectedOldZone} 구획에 추가되었습니다.`
                    )
                    setCheckedDevices([])
                },
                onError: (err: any) => {
                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "기기 추가에 실패했습니다."
                    toast.error(message)
                },
            }
        )
    }

    const handleAddNew = () => {
        if (!newZoneName) return toast.error("구획 이름을 입력해주세요")
        if (checkedDevices.length === 0)
            return toast.error("추가할 기기를 선택해주세요")

        createZoneMutation.mutate(
            { zone_name: newZoneName, device_ids: checkedDevices },
            {
                onSuccess: () => {
                    toast.success("구획이 생성되었습니다.")
                    setNewZoneName("")
                    setCheckedDevices([])
                },
                onError: (err: any) => {
                    const message =
                        err?.response?.data?.message ||
                        err?.message ||
                        "구획 생성에 실패했습니다."
                    toast.error(message)
                },
            }
        )
    }

    return (
        <Container title="구획 관리">
            <MapWrapper>
                <Map devices={mapCoordinates} />
            </MapWrapper>

            <Wrapper>
                <ContentContainer>
                    <Dropdown
                        label="기존 구획에 추가"
                        options={zones.map((v) => v.name)}
                        onChange={setSelectedOldZone}
                        placeholder="추가할 구획을 선택해주세요"
                        value={selectedOldZone}
                    />
                    <ButtonWrapper>
                        <Button onClick={handleAddToOld} size="large">
                            추가하기
                        </Button>
                    </ButtonWrapper>
                </ContentContainer>

                <ContentContainer>
                    <Input
                        label="새 구획에 추가"
                        placeholder="새로 추가할 구획의 이름을 입력해주세요"
                        value={newZoneName}
                        onChange={(e) => setNewZoneName(e.target.value)}
                    />
                    <ButtonWrapper>
                        <Button onClick={handleAddNew} size="large">
                            생성하기
                        </Button>
                    </ButtonWrapper>

                    <Text font="TitleTiny">미설정 기기</Text>

                    {devices.map((v) => {
                        const socketInfo = socketDevices.find(
                            (d) => d.device_id === v.devices_id
                        )

                        return (
                            <AreaItem
                                key={v.devices_id}
                                checkbox
                                name={v.name}
                                value={checkedDevices.includes(v.devices_id)}
                                onCheck={() => handleCheckDevice(v.devices_id)}
                                type="deviceDelete"
                                state={socketInfo?.connected}
                            />
                        )
                    })}
                </ContentContainer>
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
    gap: 24px;

    @media (max-width: 1024px) {
        padding: 80px 32px;
    }
    @media (max-width: 768px) {
        padding: 80px 20px;
    }
`

const Wrapper = styled.div`
    width: 100%;
    max-width: 760px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    box-sizing: border-box;

    @media (max-width: 1024px) {
        padding: 80px 32px;
    }
    @media (max-width: 768px) {
        padding: 80px 20px;
    }
    @media (max-width: 480px) {
        padding: 60px 16px;
    }
`

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 24px;
`

const ButtonWrapper = styled.div`
    width: 120px;
    margin-left: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
    }
`

const MapWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;

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
