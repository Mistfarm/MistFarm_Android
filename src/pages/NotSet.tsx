import styled from "styled-components"
import { Dropdown, Button, Input, Text, Map } from "../components/common"
import { AreaItem } from "../components/setting"
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

export function NotSet() {
    const [old, setOld] = useState<string>("")

    const positions = [
        { lat: 36.3916, lng: 127.3632 },
        { lat: 36.3926, lng: 127.3635 },
        { lat: 36.39146, lng: 127.3642 },
    ]

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

    const handleAddToOld = () => {
        // 기존 구획에 추가 로직
    }

    const handleAddNew = () => {
        // 새 구획 추가 로직
    }

    return (
        <>
            <Container title="구획 관리">
                <MapWrapper>
                    <Map coordinates={positions} />
                </MapWrapper>

                <Wrapper>
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
                </Wrapper>
            </Container>
        </>
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
