import styled from "styled-components"
import { AreaItem } from "../components/setting"
import { useNavigate } from "react-router-dom"
import { Container as ContainerItem } from "../components/setting"
import { Button, Input } from "../components/common"
import { useForm } from "../hooks/useForm"
import {
    useGetZoneList,
    useRegisterZone,
    useGetZoneDevices,
} from "../apis/zone"
import { useState, useEffect } from "react"

export function Areas() {
    const navigate = useNavigate()

    const { form, handleChange, reset } = useForm<{
        zoneAuthId: string
        zonePw: string
    }>({
        zoneAuthId: "",
        zonePw: "",
    })

    const [selectedZoneId] = useState<string>("")

    const { data: zoneList } = useGetZoneList()
    const { mutate: registerZone } = useRegisterZone()
    const { data: devices, refetch: refetchDevices } = useGetZoneDevices(
        { zoneId: selectedZoneId },
        { enabled: false }
    )

    const handleAdd = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        registerZone(form, {
            onSuccess: () => {
                reset()
                if (selectedZoneId) refetchDevices()
            },
        })
    }

    useEffect(() => {
        if (selectedZoneId) refetchDevices()
    }, [selectedZoneId])

    return (
        <Container>
            <Wrapper>
                <ContainerItem title="구획 등록">
                    <Input
                        label="구획 아이디"
                        placeholder="구획 아이디를 입력하세요"
                        value={form.zoneAuthId}
                        name="zoneAuthId"
                        onChange={handleChange}
                    />
                    <Input
                        label="구획 비밀번호"
                        placeholder="구획 비밀번호를 입력하세요"
                        value={form.zonePw}
                        name="zonePw"
                        onChange={handleChange}
                    />
                    <ButtonWrapper>
                        <Button onClick={handleAdd}>등록하기</Button>
                    </ButtonWrapper>
                </ContainerItem>

                <ItemContainer>
                    {zoneList?.zones?.[0] && (
                        <AreaItem
                            plant={zoneList.zones[0].plant}
                            name={zoneList.zones[0].name}
                            type="select"
                            onClick={() => navigate("/not-set")}
                        />
                    )}

                    {zoneList?.zones?.slice(1).map((zone) => (
                        <AreaItem
                            key={zone.id}
                            plant={zone.plant}
                            name={zone.name}
                            type="select"
                            onClick={() => navigate(`/area/${zone.id}`)}
                        />
                    ))}

                    {selectedZoneId &&
                        devices?.devices?.map((d) => (
                            <AreaItem
                                key={d.devicesId}
                                name={d.name}
                                type="deviceDelete"
                            />
                        ))}
                </ItemContainer>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;

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
    gap: 30px;
    padding: 100px 0;
    box-sizing: border-box;

    @media (max-width: 1024px) {
        gap: 48px;
        padding: 80px 32px;
    }

    @media (max-width: 768px) {
        gap: 36px;
        padding: 80px 20px;
    }

    @media (max-width: 480px) {
        padding: 60px 16px;
        gap: 28px;
    }
`

const ItemContainer = styled.div`
    width: 100%;
    max-width: 760px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
`

const ButtonWrapper = styled.div`
    width: 160px;
    margin-left: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
    }
`
