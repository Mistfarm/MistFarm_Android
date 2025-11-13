import styled from "styled-components"
import { Text } from "../common"
import { Icon } from "./Icon"

interface IProps {
    type?: "plant" | "temperature" | "water"
    percentage?: number
    size?: number
}

export function Info({ type, percentage, size }: IProps) {
    return (
        <>
            <Container>
                <Text font="TitleTiny" style={{ fontSize: "20px" }}>
                    {type == "temperature"
                        ? "온도"
                        : type == "water"
                        ? "습도"
                        : "식물 성장도"}
                </Text>
                <Icon
                    type={type ?? "temperature"}
                    percentage={percentage ?? 0}
                    size={size ?? 100}
                />
                <Text font="TitleSmall">
                    {percentage}
                    {type == "temperature" ? "℃" : "%"}
                </Text>
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
`
