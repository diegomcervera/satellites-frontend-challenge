import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { cargarFechaHora } from '../redux/slices/map';
import { useAppDispatch } from '../hooks/redux';

const DateFilterComponent: React.FC = () => {

    const dispatch = useAppDispatch();
    const [dateTime, setDateTime] = useState<{fecha: string, hora: number}>({
        fecha: "",
        hora: 0
    });
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        cargarFechaHora(dispatch, dateTime.fecha, dateTime.hora);
    },[dateTime, dispatch])

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dia = event.target.value as string;
        setDateTime(dt => ({...dt, fecha:dia}));
    };

    const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const val = event.target.value as string;
        const hora = parseInt(val);
        setDateTime(dt => ({...dt, hora:hora}));
        setTime(val);
    };

    return (
        <>
            <TextField
                id="date"
                label="Date"
                type="date"
                value={dateTime.fecha}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="time"
                label="Time"
                type="time"
                value={time}
                onChange={handleTimeChange}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
        </>
    )
};

export default DateFilterComponent;