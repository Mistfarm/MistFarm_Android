import styled from "styled-components"
import { Container, AreaItem } from "../components/setting"
import { Button, Dropdown, Input, Text } from "../components/common"
import { useForm } from "../hooks/useForm"
import { useState } from "react"

interface Device {
    id: number
    name: string
    state: "success" | "fail"
}

interface Area {
    id: number
    plant: string
    name: string
    devices: Device[]
}

export function Setting() {
    const { form, handleChange } = useForm<{
        device_id: string
        device_password: string
    }>({
        device_id: "",
        device_password: "",
    })

    const [old, setOld] = useState<string>("")
    const [checkedAreas, setCheckedAreas] = useState<number[]>([])
    const [checkedDevices, setCheckedDevices] = useState<number[]>([])

    const handleAdd = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    const dummyAreas: Area[] = [
        {
            id: 1,
            plant: "상추",
            name: "구획 A",
            devices: [
                { id: 1, name: "기기 1", state: "success" },
                { id: 2, name: "기기 2", state: "fail" },
            ],
        },
        {
            id: 2,
            plant: "딸기",
            name: "구획 B",
            devices: [],
        },
        {
            id: 3,
            plant: "미정",
            name: "구획 C",
            devices: [],
        },
    ]

    const dummyNotSettingItems = new Array(3)
        .fill("")
        .map((_, i) => `기기 ${i + 3}`)

    const handleCheckArea = (id: number) => {
        setCheckedAreas((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        )
    }

    const handleCheckDevice = (id: number) => {
        setCheckedDevices((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
        )
    }

    const handleAddToOld = () => {
        // 기존 구획에 추가 로직
    }

    const handleAddNew = () => {
        // 새 구획 추가 로직
    }

    return (
        <Wrapper>
            <Container title="기기 등록">
                <Input
                    label="기기 아이디"
                    placeholder="기기 아이디를 입력하세요"
                    value={form.device_id}
                    name="device_id"
                    onChange={handleChange}
                />
                <Input
                    label="기기 비밀번호"
                    placeholder="기기 비밀번호를 입력하세요"
                    value={form.device_password}
                    name="device_password"
                    onChange={handleChange}
                />
                <Button size="large" onClick={handleAdd}>
                    등록하기
                </Button>
            </Container>

            <Container title="기기 목록" gap={8}>
                {dummyAreas.map((area) => (
                    <div
                        style={{ width: "100%", marginBottom: "0px" }}
                        key={area.id}
                    >
                        <AreaItem
                            checkbox={true}
                            type="areaDelete"
                            plant={area.plant}
                            name={area.name}
                            value={checkedAreas.includes(area.id)}
                            onClick={() => console.log(area.name, "삭제")}
                            onCheck={() => handleCheckArea(area.id)}
                        />

                        {area.devices.length > 0 && (
                            <DeviceList>
                                {area.devices.map((device) => (
                                    <DeviceItemWrapper key={device.id}>
                                        <AreaItem
                                            checkbox={true}
                                            type="deviceDelete"
                                            name={device.name}
                                            value={checkedDevices.includes(
                                                area.id
                                            )}
                                            state={device.state}
                                            onClick={() =>
                                                console.log(device.name, "삭제")
                                            }
                                            onCheck={() =>
                                                handleCheckDevice(device.id)
                                            }
                                        />
                                    </DeviceItemWrapper>
                                ))}
                            </DeviceList>
                        )}
                    </div>
                ))}
            </Container>

            <Container title="구획 관리">
                <ContentContainer>
                    <Text font="TitleTiny">미설정 기기</Text>
                    {dummyNotSettingItems.map((v, i) => (
                        <AreaItem
                            checkbox={true}
                            name={v}
                            key={i}
                            button={false}
                        />
                    ))}
                </ContentContainer>

                <ContentContainer>
                    <Dropdown
                        label="기존 구획에 추가"
                        options={dummyAreas.map((v) => v.name)}
                        onChange={setOld}
                        placeholder="추가할 구획을 선택해주세요"
                        value={old}
                    />
                    <ButtonWrapper>
                        <Button onClick={handleAddToOld} size={"large"}>
                            추가하기
                        </Button>
                    </ButtonWrapper>
                </ContentContainer>

                <ContentContainer>
                    <Input
                        label="새 구획에 추가"
                        placeholder="새로 추가할 구획의 이름을 입력해주세요"
                    />
                    <ButtonWrapper>
                        <Button onClick={handleAddNew} size={"large"}>
                            생성하기
                        </Button>
                    </ButtonWrapper>
                </ContentContainer>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 80px;
    padding: 100px 0;
    box-sizing: border-box;

    @media (max-width: 1024px) {
        gap: 60px;
        padding: 80px 32px;
    }

    @media (max-width: 768px) {
        gap: 40px;
        padding: 80px 20px;
    }
`

const DeviceList = styled.div`
    width: 100%;
    display: flex;
    align-items: end;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`

const DeviceItemWrapper = styled.div`
    width: 95%;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 5px;
`

const ButtonWrapper = styled.div`
    width: 120px;
    margin-left: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
    }
`
