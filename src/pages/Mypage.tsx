import styled from "styled-components"
import { Button, Input, Text } from "../components/common"
import { colors } from "../styles/colors"
import { useForm } from "../hooks/useForm"
import { useNavigate } from "react-router-dom"

export function Mypage() {
    const navigate = useNavigate()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { form, setForm, handleChange } = useForm<{
        user_id: string
        password: string
        newPassword: string
    }>({
        user_id: "",
        password: "",
        newPassword: "",
    })

    const handleUserInfo = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // 로그인 로직
    }

    const handleLogout = async () => {
        // 로그아웃 로직
        navigate("/")
    }

    const handleDeleteUser = async () => {
        // 회원탈퇴 로직
        navigate("/")
    }

    return (
        <Container>
            <Wrapper>
                <Form>
                    <Input
                        label="이름"
                        placeholder="수정할 이름을 입력해주세요"
                        name="user_id"
                        value={form.user_id}
                        onChange={handleChange}
                    />
                    <Input
                        label="현재 비밀번호"
                        type="password"
                        placeholder="현재 비밀번호를 입력해주세요"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Input
                        label="새 비밀번호"
                        type="password"
                        placeholder="새 비밀번호를 입력해주세요"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                    />
                    <Button size="large" onClick={handleUserInfo}>
                        정보 저장
                    </Button>
                </Form>

                <Logout>
                    <Button onClick={handleLogout} size="large" kind="gray">
                        로그아웃
                    </Button>
                </Logout>

                <Delete>
                    <Text onClick={handleDeleteUser} font="LabelLarge">
                        회원탈퇴 시 프로필 및 저장한 기기 정보가 삭제됩니다
                    </Text>

                    <DeleteButton>
                        <Button size="large" kind="red">
                            회원탈퇴
                        </Button>
                    </DeleteButton>
                </Delete>
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

const Form = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;

    @media (max-width: 480px) {
        gap: 16px;
    }
`

const Logout = styled.div`
    margin-left: auto;
    width: 150px;

    @media (max-width: 480px) {
        width: 100%;
    }

    button {
        width: 100%;
    }
`

const Delete = styled.div`
    width: 100%;
    padding: 12px;
    border: 1px solid ${colors.Gray300};
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        padding: 10px;
        gap: 8px;
    }
`

const DeleteButton = styled.div`
    width: 150px;
    margin-left: auto;

    @media (max-width: 480px) {
        width: 100%;
    }

    button {
        width: 100%;
    }
`
