import styled from "styled-components"
import { Dropdown, Map, Text } from "../components/common"
import { useState } from "react"
import { colors } from "../styles/colors"
import { Info } from "../components/plant/Info"
import { AutoSupplySet } from "../components/plant/AutoSupplySet"
import { SupplyIntervalSet } from "../components/plant/SupplyIntervalSet"
import { NutrientRatioSet } from "../components/plant/NutrientRatioSet"

export function Plant() {
    const [plant, setPlant] = useState<string>("")
    const options = ["상추", "딸기"]

    return (
        <Container>
            <Wrapper>
                <Map lat={36.3916} lng={127.3632} />

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
                                <Info type="temperature" percentage={40} />
                            </EnvironmentValues>
                        </EnvironmentWrapper>
                    </InfoWrapper>
                </ItemContainer>

                <ItemContainer>
                    <AutoSettingContainer>
                        <AutoSupplySet />
                        <SupplyIntervalSet />
                        <NutrientRatioSet />
                    </AutoSettingContainer>
                </ItemContainer>
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

    @media (max-width: 480px) {
        padding: 60px 16px;
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
