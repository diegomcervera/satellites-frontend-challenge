import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

const InfoComponent: React.FC<{ punto: any }> = ({ punto }) => {
    return (
        <Box p={2}>
            <Typography variant="h6" gutterBottom>
                Detalles del Punto
            </Typography>
            <Divider />
            <Box mt={2}>
                <Typography variant="body1">
                    <strong>ID:</strong> {punto.id}
                </Typography>
                <Typography variant="body1">
                    <strong>Confiabilidad:</strong> {punto.conf}
                </Typography>
                <Typography variant="body1">
                    <strong>Satélite:</strong> {punto.sat}
                </Typography>
                <Typography variant="body1">
                    <strong>Longitud:</strong> {punto.y}
                </Typography>
                <Typography variant="body1">
                    <strong>Latitud:</strong> {punto.x}
                </Typography>   
            </Box>
        </Box>
    );
};

export default InfoComponent;