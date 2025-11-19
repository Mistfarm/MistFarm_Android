import styled from "styled-components"
import { Button, Input, Text } from "../components/common"
import { colors } from "../styles/colors"
import { useForm } from "../hooks/useForm"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEdit, useExit, useLogout } from "../apis/auth"
import { AxiosError } from "axios"

export function Mypage() {
    const navigate = useNavigate()

    const { form, handleChange, setForm } = useForm<{
        name: string
        password: string
        newPassword: string
    }>({
        name: "",
        password: "",
        newPassword: "",
    })

    const { mutate: editInfo, isPending } = useEdit()
    const { mutate: logout } = useLogout()
    const { mutate: exit } = useExit()

    const handleUserInfo = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (
            (form.password && !form.newPassword) ||
            (!form.password && form.newPassword)
        ) {
            toast.error("비밀번호 입력이 올바르지 않습니다.")
            return
        }

        if (
            form.password &&
            form.newPassword &&
            form.password === form.newPassword
        ) {
            toast.error("새 비밀번호는 기존 비밀번호와 달라야 합니다.")
            return
        }

        const payload: Partial<{ name: string; password: string }> = {}
        if (form.name.trim()) payload.name = form.name.trim()
        if (form.newPassword.trim()) payload.password = form.newPassword.trim()

        if (Object.keys(payload).length === 0) {
            toast.info("변경할 정보가 없습니다.")
            return
        }

        editInfo(payload, {
            onSuccess: () => {
                toast.success("정보가 수정되었습니다.")
                setForm({
                    name: "",
                    password: "",
                    newPassword: "",
                })
            },
            onError: (error) => {
                const err = error as AxiosError<any>
                const message =
                    err.response?.data?.message ||
                    err.message ||
                    "알 수 없는 에러가 발생했습니다."

                toast.error(message)
            },
        })
    }

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.success("로그아웃 되었습니다.")
                navigate("/login")
            },
            onError: (error) => {
                const err = error as AxiosError<any>
                toast.error(
                    err.response?.data?.message || "로그아웃에 실패했습니다."
                )
            },
        })
    }

    const handleDeleteUser = () => {
        if (!window.confirm("정말 회원탈퇴를 진행하시겠습니까?")) return
        exit(undefined, {
            onSuccess: () => {
                toast.success("회원탈퇴가 완료되었습니다.")
                navigate("/login")
            },
            onError: (error) => {
                const err = error as AxiosError<any>
                toast.error(
                    err.response?.data?.message || "회원탈퇴에 실패했습니다."
                )
            },
        })
    }

    return (
        <Container>
            <Wrapper>
                <Form>
                    <Input
                        label="이름"
                        placeholder="이름 입력"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <Input
                        label="현재 비밀번호"
                        type="password"
                        placeholder="현재 비밀번호 입력"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Input
                        label="새 비밀번호"
                        type="password"
                        placeholder="새 비밀번호 입력"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                    />
                    <Button
                        size="large"
                        color={isPending ? "gray" : "main"}
                        onClick={handleUserInfo}
                        disabled={isPending}
                    >
                        정보 저장
                    </Button>
                </Form>

                <Logout>
                    <Button size="large" kind="gray" onClick={handleLogout}>
                        로그아웃
                    </Button>
                </Logout>

                <Delete>
                    <Text font="LabelLarge">
                        회원탈퇴 시 프로필 및 저장한 기기 정보가 삭제됩니다
                    </Text>
                    <DeleteButton>
                        <Button
                            size="large"
                            kind="red"
                            onClick={handleDeleteUser}
                        >
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
