import { useState } from "react"

export function useForm<T>(initialState: T) {
    const [form, setForm] = useState<T>(initialState)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }

    const reset = () => {
        setForm(initialState)
    }

    return { form, setForm, handleChange, reset }
}
