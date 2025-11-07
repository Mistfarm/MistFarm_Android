import styled from "styled-components"
import Logo from "../../assets/Logo.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Header() {
    const [isLogined, setIsLogined] = useState<boolean>(false)
    const navigate = useNavigate()

    const logoutHandler = async () => {
        // 로그아웃 핸들러
        navigate("/")
    }

    return (
        <>
            {isLogined ? (
                <Container>
                    <Wrapper>
                        <Left>
                            <NavButton onClick={() => navigate("/device")}>
                                기기관리
                            </NavButton>
                            <NavButton onClick={() => navigate("/plant")}>
                                식물관리
                            </NavButton>
                        </Left>
                        <Right>
                            <NavButton onClick={logoutHandler}>
                                로그아웃
                            </NavButton>
                            <LogoButton>
                                <img src={Logo} alt="로고" />
                            </LogoButton>
                        </Right>
                    </Wrapper>
                </Container>
            ) : (
                <Container>
                    <Wrapper>
                        <Left>
                            <LogoButton>
                                <img src={Logo} alt="로고" />
                            </LogoButton>
                        </Left>
                        <Right>
                            <NavButton onClick={() => navigate("/register")}>
                                회원가입
                            </NavButton>
                            <LoginButton onClick={() => navigate("/login")}>
                                로그인
                            </LoginButton>
                        </Right>
                    </Wrapper>
                </Container>
            )}
        </>
    )
}

const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    border-bottom: 1px solid #eeeeee;
    z-index: 1000;
    overflow-x: hidden;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 60px;
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        height: auto;
        padding: 8px 12px;
        gap: 8px;
    }
`

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;

    @media (max-width: 500px) {
        gap: 12px;
    }
`

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`

const NavButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    font-size: 16px;
    color: #333;
    white-space: nowrap;

    &:hover {
        color: #1860f0;
    }

    @media (max-width: 500px) {
        font-size: 14px;
    }
`

const LogoButton = styled.button`
    background: none;
    border: none;
    padding: 0;

    img {
        width: 80px;
        height: auto;

        @media (max-width: 500px) {
            width: 60px;
        }
    }
`

const LoginButton = styled.button`
    background: #1860f0;
    color: white;
    border: none;
    padding: 7px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: 500px) {
        font-size: 14px;
        padding: 6px 10px;
    }
`
