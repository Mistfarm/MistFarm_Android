import styled from "styled-components"
import Logo from "../../assets/Logo.png"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { colors } from "../../styles/colors"

export function Header() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLogined, setIsLogined] = useState<boolean>(false)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    const toggleMenu = () => setMenuOpen((prev) => !prev)

    const handleNavClick = (path: string) => {
        navigate(path)
        setMenuOpen(false)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setMenuOpen(false)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <Container>
            <Wrapper>
                <LogoButton onClick={() => navigate("/")}>
                    <img src={Logo} alt="로고" />
                </LogoButton>

                <NavCenter>
                    {isLogined && (
                        <>
                            <NavButton onClick={() => navigate("/device")}>
                                기기관리
                            </NavButton>
                            <NavButton onClick={() => navigate("/area")}>
                                구획관리
                            </NavButton>
                        </>
                    )}
                </NavCenter>

                <RightSection>
                    <DesktopButtons>
                        {isLogined ? (
                            <NavButton onClick={() => navigate("/mypage")}>
                                마이페이지
                            </NavButton>
                        ) : (
                            <>
                                <NavButton
                                    onClick={() => navigate("/register")}
                                >
                                    회원가입
                                </NavButton>
                                <LoginButton onClick={() => navigate("/login")}>
                                    로그인
                                </LoginButton>
                            </>
                        )}
                    </DesktopButtons>

                    <MenuButton onClick={toggleMenu}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </MenuButton>
                </RightSection>
            </Wrapper>

            {menuOpen && (
                <MobileMenu>
                    {isLogined ? (
                        <>
                            <NavButton
                                onClick={() => handleNavClick("/device")}
                            >
                                기기관리
                            </NavButton>
                            <NavButton onClick={() => handleNavClick("/plant")}>
                                구획관리
                            </NavButton>
                            <NavButton
                                onClick={() => handleNavClick("/mypage")}
                            >
                                마이페이지
                            </NavButton>
                        </>
                    ) : (
                        <>
                            <NavButton
                                onClick={() => handleNavClick("/register")}
                            >
                                회원가입
                            </NavButton>
                            <NavButton onClick={() => handleNavClick("/login")}>
                                로그인
                            </NavButton>
                        </>
                    )}
                </MobileMenu>
            )}
        </Container>
    )
}

const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    border-bottom: 1px solid #eee;
    z-index: 1000;
`

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 66px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

const LogoButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;

    img {
        width: 80px;
        height: auto;

        @media (max-width: 500px) {
            width: 60px;
        }
    }
`

const NavCenter = styled.nav`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 24px;

    @media (max-width: 768px) {
        display: none;
    }
`

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

/* ✅ 데스크탑 전용 버튼 */
const DesktopButtons = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    @media (max-width: 768px) {
        display: none;
    }
`

const NavButton = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        color: ${colors.Green500};
    }

    @media (max-width: 500px) {
        font-size: 14px;
    }
`

const LoginButton = styled.button`
    background: ${colors.Green500};
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

/* ✅ 모바일 전용 메뉴 버튼 */
const MenuButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: none;

    @media (max-width: 768px) {
        display: block;
    }
`

/* ✅ 모바일 드롭다운 메뉴 */
const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-top: 1px solid #eee;
    padding: 12px 0;
    animation: fadeIn 0.3s ease;

    ${NavButton}, ${LoginButton} {
        margin: 8px 0;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
