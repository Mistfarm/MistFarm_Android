import { useState, useRef, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import { ChevronDown, ChevronUp } from "lucide-react"
import { colors } from "../../styles/colors"
import { Text } from "../common"

type Props = {
    label?: string
    options: string[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
}

export function Dropdown({
    label,
    options,
    value,
    onChange,
    placeholder = "선택해주세요",
}: Props) {
    const [open, setOpen] = useState(false)
    const [openUp, setOpenUp] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return

        const rect = ref.current?.getBoundingClientRect()
        if (rect) {
            const dropdownHeight = Math.min(options.length * 48, 240)
            const spaceBelow = window.innerHeight - rect.bottom
            setOpenUp(spaceBelow < dropdownHeight + 8)
        }
    }, [open, options.length])

    useEffect(() => {
        if (!open) return
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    const handleSelect = (option: string) => {
        onChange?.(option)
        setOpen(false)
    }

    return (
        <SelectFrame ref={ref}>
            {label && (
                <LabelWrapper>
                    <Text font="TitleTiny">{label}</Text>
                </LabelWrapper>
            )}

            <DropdownContainer
                onClick={() => setOpen((s) => !s)}
                $open={open}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <SelectedText $placeholder={!value}>
                    {value || placeholder}
                </SelectedText>
                {open ? (
                    <ChevronUp size={20} color={colors.Gray600} />
                ) : (
                    <ChevronDown size={20} color={colors.Gray600} />
                )}
            </DropdownContainer>

            {open && (
                <DropdownList $openUp={openUp} role="listbox">
                    {options.map((option) => (
                        <DropdownItem
                            key={option}
                            role="option"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </SelectFrame>
    )
}

const fadeInDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-8px) scaleY(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scaleY(1);
    }
`

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(8px) scaleY(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scaleY(1);
    }
`

const SelectFrame = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    z-index: 20;

    @media (max-width: 1024px) {
        gap: 4px;
    }

    @media (max-width: 768px) {
        gap: 2px;
    }
`

const LabelWrapper = styled.div`
    user-select: none;
    display: flex;
    align-items: center;
`

const DropdownContainer = styled.div<{ $open: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: ${colors.Gray50};
    border: 1px solid
        ${({ $open }) => ($open ? colors.Green500 : colors.Gray100)};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.16s ease;
    user-select: none;

    &:hover {
        background-color: ${colors.Gray100};
    }

    @media (max-width: 1024px) {
        padding: 14px;
    }

    @media (max-width: 768px) {
        padding: 12px;
    }
`

const SelectedText = styled.span<{ $placeholder: boolean }>`
    font-size: 16px;
    color: ${({ $placeholder }) =>
        $placeholder ? colors.Gray500 : colors.Gray800};
`

const DropdownList = styled.ul<{ $openUp: boolean }>`
    position: absolute;
    ${({ $openUp }) =>
        $openUp
            ? css`
                  bottom: calc(100% + 4px);
                  transform-origin: bottom center;
                  animation: ${fadeInUp} 0.16s ease forwards;
              `
            : css`
                  top: calc(100% + 4px);
                  transform-origin: top center;
                  animation: ${fadeInDown} 0.16s ease forwards;
              `}
    left: 0;
    width: 100%;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    max-height: 240px;
    overflow-y: auto;
    list-style: none;
    padding: 8px 0;
    margin: 0;
    z-index: 999;

    &::-webkit-scrollbar {
        display: none;
    }
`

const DropdownItem = styled.li`
    padding: 12px 16px;
    font-size: 15px;
    color: ${colors.Gray800};
    cursor: pointer;
    transition: background 0.12s ease;

    &:hover {
        background-color: ${colors.Gray50};
    }

    &:active {
        background-color: ${colors.Gray100};
    }
`
