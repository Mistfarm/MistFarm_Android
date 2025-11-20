import styled from "styled-components"
import { AreaItem } from "../components/setting"
import { colors } from "../styles/colors"
import { useNavigate } from "react-router-dom"
import { Container as ContainerItem } from "../components/setting"
import { Button, Input } from "../components/common"
import { useForm } from "../hooks/useForm"

interface ItemProps {
    plant?: string
    name?: string
    state?: "success" | "fail"
    type?: "select" | "areaDelete" | "deviceDelete"
    onClick?: () => void
}

export function Areas() {
    const navigate = useNavigate()

    const { form, handleChange } = useForm<{
        area_id: string
        area_password: string
    }>({
        area_id: "",
        area_password: "",
    })

    const handleAdd = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    const dummy: ItemProps[] = Array.from({ length: 6 }).map((_, i) => ({
        plant: "상추",
        name: `기기 ${i}`,
        state: i % 2 === 0 ? "success" : "fail",
        type: "select",
        onClick: function () {
            console.log("Hello World!")
        },
    }))

    return (
        <Container>
            <Wrapper>
                <ContainerItem title="구획 등록">
                    <Input
                        label="구획 아이디"
                        placeholder="구획 아이디를 입력하세요"
                        value={form.area_id}
                        name="area_id"
                        onChange={handleChange}
                    />
                    <Input
                        label="구획 비밀번호"
                        placeholder="구획 비밀번호를 입력하세요"
                        value={form.area_password}
                        name="area_password"
                        onChange={handleChange}
                    />
                    <ButtonWrapper>
                        <Button onClick={handleAdd}>등록하기</Button>
                    </ButtonWrapper>
                </ContainerItem>

                <ItemContainer>
                    <AreaItem
                        name="미설정 기기"
                        onClick={() => navigate("/not-set")}
                    />
                    {dummy.map((v, i) => (
                        <AreaItem
                            key={i}
                            plant={v.plant}
                            name={v.name}
                            state={v.state}
                            type={v.type}
                            onClick={v.onClick}
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

const Icon = styled.div`
    margin-left: auto;
    background-color: ${colors.Gray100};
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    cursor: pointer;
    transition: 200ms;

    &:hover {
        background-color: ${colors.Gray200};
    }

    @media (max-width: 1024px) {
        width: 52px;
        height: 52px;
    }

    @media (max-width: 768px) {
        width: 44px;
        height: 44px;
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
