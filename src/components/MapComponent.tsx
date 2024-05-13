import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { obtenerPuntos } from '../redux/slices/map';
import { MapContainer, TileLayer, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import InfoComponent from './InfoComponent';
import MarkerListComponent from './MarkerListComponent';
import { Button } from '@mui/material';
import FilterComponent from './FilterComponent';

const MapComponent: React.FC = () => {
    const { map } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const mapInstanceRef = useRef<L.Map | null>(null);
    const [puntosInfo, setPuntosInfo] = useState<any[]>([]);
    const [puntos, setPuntos] = useState<any[]>([]);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState<string>('');

    useEffect(() => {
        obtenerPuntos(dispatch, "2023-01-01", 0);
    },[dispatch])

    useEffect(() => {
        obtenerPuntos(dispatch, map.fecha, map.hora);
    },[map.fecha, map.hora])

    useEffect(() => {
        setPuntos(map?.puntos);
    },[map])

    useEffect(() => {
        if(map && map.puntos && filtroSeleccionado!=="todos") {
            const pun: any[] = map.puntos;
            setPuntos(pun.filter(p => p.sat === filtroSeleccionado));
        } else if (map && map.puntos && filtroSeleccionado==="todos") {
            setPuntos(map.puntos);
        }
    },[filtroSeleccionado])

    const obtenerLimitesMapa = () => {
        if (!mapInstanceRef.current) return null;
        return mapInstanceRef.current.getBounds();
    };

    const filtrarPuntosEnLimites = (limites: L.LatLngBounds | null) => {
        if (!limites || !puntos) return [];
        return puntos.filter((punto: any) => limites.contains([punto.y, punto.x]));
    };

    const handleClick = (): void => {
        const limitesMapa = obtenerLimitesMapa();
        const puntosFiltrados = filtrarPuntosEnLimites(limitesMapa);
        setPuntosInfo(puntosFiltrados);
    };

    const handleMapCreated = (mapInstance: L.Map) => {
        mapInstanceRef.current = mapInstance;
    };

    const getCircleFillColor = (value: number) => {
        value = Math.min(100, Math.max(0, value));
        if (value <= 33) {
            return 'rgb(255, 255, 0)';
        } else if (value <= 66) {
            return 'rgb(255, 165, 0)';
        } else {
            return 'rgb(255, 0, 0)';
        }
    };
    
    const handleFilterChange = (selectedOption: string) => {
        setFiltroSeleccionado(selectedOption);
    };

    return (
        <>
            <FilterComponent puntos={map?.puntos} onFilterChange={handleFilterChange} val={filtroSeleccionado}/>
            <div style={{ position: 'relative', height: '400px' }}>
                <MapContainer   
                    center={[-35.10, -66.32]} 
                    zoom={6} 
                    style={{ height: '100vh' }} 
                    ref={handleMapCreated}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
                        url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga"
                    />
                    {puntos.map((punto: any, index: number) => (
                        <Circle
                            key={index} // O utiliza una identificación única proporcionada por tus datos si tienes una disponible
                            center={[punto.y, punto.x]}
                            color={getCircleFillColor(punto.conf)}
                            radius={10000}
                            fillOpacity={1}
                        >
                            <Popup>
                                <InfoComponent punto={punto}/>
                            </Popup>
                        </Circle>
                    ))}
                    <Button style={{ position: 'absolute', top: 10, right: 150, zIndex: 500 }} variant="contained" color='secondary' onClick={handleClick}>Cargar Informacion de Puntos Visibles</Button>
                    <MarkerListComponent markers={puntosInfo} />
                </MapContainer>
            </div>
        </>
    );
};

export default MapComponent; 