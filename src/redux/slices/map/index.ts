import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";

export interface mapState {
    puntos: [],
    fecha: string,
    hora: number
}

const initialState: mapState = {
    puntos: [],
    fecha: "",
    hora: 0
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        cargarPuntos: (state, action: PayloadAction<[]>) => {
            state.puntos = action.payload;
        },
        setFechaHora: (state, action: PayloadAction<{fecha: string, hora: number}>) => {
            state.fecha = action.payload.fecha;
            state.hora = action.payload.hora;
        }
    }
});

export const obtenerPuntos = async (dispatch: AppDispatch, fecha: string, hora: number): Promise<any> => {
    try {
        var api = "";
        if(hora===0) {
            api = `/api/${fecha}/T00.json`;
        } else {
            api = `/api/${fecha}/T${hora}.json`;
        }
        const response = await fetch(api);
        const data = await response.json();
        dispatch(cargarPuntos(data?.data?.getPublicWildfireByDate?.items));
        return response;
    } catch (error) {
        return error;
    }
}

export const cargarFechaHora = async (dispatch: AppDispatch, fecha: string, hora: number): Promise<any> => {
    try {
        const response = {
            fecha: fecha,
            hora: hora
        };
        dispatch(setFechaHora(response));
    } catch (error) {
        return error;
    }
}


export const {cargarPuntos, setFechaHora} = mapSlice.actions;
export default mapSlice.reducer;