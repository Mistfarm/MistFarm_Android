import styled from "styled-components"
import { AreaItem } from "../components/setting"
import { Settings } from "lucide-react"
import { colors } from "../styles/colors"

interface ItemProps {
    plant?: string
    name?: string
    state?: "success" | "fail"
    type?: "select" | "areaDelete" | "deviceDelete"
    onClick?: () => void
}

export function Plants() {
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
                <Icon>
                    <Settings />
                </Icon>

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
        padding: 80px 20px;
    }
`

const Wrapper = styled.div`
    width: 100%;
    max-width: 760px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
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
