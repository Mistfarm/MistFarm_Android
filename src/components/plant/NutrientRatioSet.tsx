import styled from "styled-components"
import { Button, Text } from "../common"
import { colors } from "../../styles/colors"
import { useState, useEffect } from "react"
import { useSetNutrient, useGetZoneSetting } from "../../apis/plant"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

interface Props {
    zoneId: string
}

interface SliderProps {
    value: number
}

export function NutrientRatioSet({ zoneId }: Props) {
    const { data, refetch } = useGetZoneSetting(zoneId)
    const setNutrientMutation = useSetNutrient()

    const [ratio, setRatio] = useState<number>(0)

    useEffect(() => {
        if (!data) return
        if ("nutrients_rate" in data) setRatio(data.nutrientsRate)
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRatio(Number(e.target.value))
    }

    const handleSave = () => {
        setNutrientMutation.mutate(
            { zoneId: zoneId, nutrientsRate: ratio },
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
            <Text
                font="TitleSmall"
                color="Gray900"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                양분 비율 설정
                <br />
                <Text font="TitleTiny" color="Gray500">
                    양분 : 물
                </Text>
            </Text>

            <Slider
                type="range"
                min={0}
                max={100}
                value={ratio}
                onChange={handleChange}
            />
            <RatioText>
                {ratio} : {100 - ratio}
            </RatioText>

            <ButtonWrapper>
                <Button onClick={handleSave}>양분비율 저장</Button>
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin: 0 auto;
`

const Slider = styled.input.attrs({ type: "range" })<SliderProps>`
    width: 100%;
    cursor: pointer;
    appearance: none;
    height: 8px;
    border-radius: 4px;
    background: ${({ value }) => `
        linear-gradient(
            to right,
            ${colors.Green500} 0%,
            ${colors.Green500} ${value}%,
            ${colors.Gray400} ${value}%,
            ${colors.Gray400} 100%
        )
    `};
    transition: background 0.1s ease-in-out;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        border: 2px solid ${colors.Green500};
        cursor: pointer;
    }

    @media (max-width: 480px) {
        height: 6px;
    }
`

const RatioText = styled.div`
    width: 100%;
    text-align: center;
    background-color: ${colors.Gray500};
    color: white;
    border-radius: 8px;
    padding: 8px 0;
    font-weight: 500;

    @media (max-width: 480px) {
        padding: 6px 0;
        font-size: 14px;
    }
`

const ButtonWrapper = styled.div`
    width: 160px;
    margin-left: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
    }
`
