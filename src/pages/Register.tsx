import styled from "styled-components"
import { Input, Button, Text } from "../components/common"
import { useForm } from "../hooks/useForm"
import { useRegister } from "../apis/auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export function Register() {
    const navigate = useNavigate()
    const { form, handleChange } = useForm<{
        name: string
        user_id: string
        password: string
    }>({
        name: "",
        user_id: "",
        password: "",
    })

    const { mutate: register, isPending } = useRegister()

    const handleRegister = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!form.user_id || !form.password) {
            toast.error("아이디와 비밀번호를 입력해주세요")
            return
        }

        register(
            { name: form.name, id: form.user_id, password: form.password },
            {
                onSuccess: () => navigate("/"),
                onError: (error) =>
                    toast.error(
                        error.message || "알 수 없는 에러가 발생했습니다."
                    ),
            }
        )
    }

    return (
        <Main>
            <Form>
                <TitleBox>
                    <Text font="TitleLarge">회원가입</Text>
                    <Text font="BodyMedium" color="Gray500">
                        회원가입 하여 서비스를 이용해 보세요.
                    </Text>
                </TitleBox>
                <InputBox>
                    <Input
                        label="이름"
                        placeholder="이름 입력"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="아이디"
                        placeholder="아이디 입력"
                        name="user_id"
                        value={form.user_id}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호 입력"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </InputBox>
                <ButtonBox>
                    <Button
                        size="large"
                        full
                        color={isPending ? "gray" : "main"}
                        onClick={handleRegister}
                        disabled={isPending}
                    >
                        회원가입
                    </Button>
                    <QuestionBox>
                        <Text font="BodySmall" color="Gray500">
                            이미 회원이신가요?
                        </Text>
                        <a href="/login">
                            <Text font="LabelMedium" color="Green500">
                                로그인
                            </Text>
                        </a>
                    </QuestionBox>
                </ButtonBox>
            </Form>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 80px;
    min-height: calc(100dvh - 60px);
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
