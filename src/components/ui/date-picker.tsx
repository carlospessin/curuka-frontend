import { useState, useEffect } from "react"
import { format, parse } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DatePickerProps {
    value?: Date
    onChange: (date: Date | undefined) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
    const [inputValue, setInputValue] = useState(value ? format(value, "dd/MM/yyyy") : "")

    // Sincroniza quando o value externo muda
    useEffect(() => {
        setInputValue(value ? format(value, "dd/MM/yyyy") : "")
    }, [value])

    // quando digita no campo
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setInputValue(val)

        const parsed = parse(val, "dd/MM/yyyy", new Date())
        if (!isNaN(parsed.getTime())) {
            onChange(parsed)
        }
    }

    // quando seleciona no calendário
    const handleSelect = (date: Date | undefined) => {
        if (date) {
            setInputValue(format(date, "dd/MM/yyyy"))
            onChange(date)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="dd/mm/aaaa"
                className="w-full"
            />

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                        <CalendarIcon className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={handleSelect}
                        className="bg-white p-3 rounded-md shadow-md"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
