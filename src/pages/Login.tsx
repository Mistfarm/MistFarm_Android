import styled from "styled-components"
import { Input, Button, Text } from "../components/common"
import { useForm } from "../hooks/useForm"
import { useLogin } from "../apis/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

export function Login() {
    const navigate = useNavigate()

    const { form, handleChange } = useForm<{
        user_id: string
        password: string
    }>({
        user_id: "",
        password: "",
    })

    const { mutate: login, isPending } = useLogin()

    const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!form.user_id || !form.password) {
            toast.error("아이디와 비밀번호를 입력해주세요")
            return
        }

        login(
            { id: form.user_id, password: form.password },
            {
                onSuccess: () => navigate("/"),
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
        <Container>
            <Wrapper>
                <Form>
                    <TitleBox>
                        <Text font="TitleLarge">로그인</Text>
                        <Text font="BodyMedium" color="Gray500">
                            로그인 하여 서비스를 이용해 보세요.
                        </Text>
                    </TitleBox>
                    <InputBox>
                        <Input
                            label="아이디"
                            placeholder="아이디를 입력해 주세요"
                            name="user_id"
                            value={form.user_id}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                        />
                        <Input
                            label="비밀번호"
                            placeholder="비밀번호를 입력해 주세요"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                    </InputBox>
                    <ButtonBox>
                        <Button
                            size="large"
                            full
                            color={isPending ? "gray" : "main"}
                            onClick={handleLogin}
                            disabled={isPending}
                        >
                            로그인
                        </Button>
                        <QuestionBox>
                            <Text font="BodySmall" color="Gray500">
                                아직 회원이 아니신가요?
                            </Text>
                            <a href="/register">
                                <Text font="LabelMedium" color="Green500">
                                    회원가입
                                </Text>
                            </a>
                        </QuestionBox>
                    </ButtonBox>
                </Form>
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 48px;
    width: 100%;
    max-width: 480px;
    padding: 60px 32px;

    @media (max-width: 768px) {
        padding: 40px 20px;
        gap: 36px;
    }
`

const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
`

const QuestionBox = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
`
