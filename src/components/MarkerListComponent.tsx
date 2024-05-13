import React, { useState } from 'react';
import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Paper
} from '@mui/material';
import { Minimize, InfoOutlined } from '@mui/icons-material';

interface Marker {
  id: number;
  conf: number;
  x: number;
  y: number;
}

interface MarkerListComponentProps {
  markers: Marker[];
}

const MarkerListComponent: React.FC<MarkerListComponentProps> = ({ markers }) => {

    const [minimized, setMinimized] = useState(true);

    const toggleMinimized = () => {
        setMinimized(!minimized);
    };

    return (
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 500 }}>
            {minimized ? (
                <Button onClick={toggleMinimized} variant="contained" color="secondary">
                    <InfoOutlined />{`  (${markers.length})`}
                </Button>
            ) : (
                <>
                    <TableContainer component={Paper} style={{ maxHeight: 200, overflow: 'auto' }}>
                        <Table stickyHeader aria-label="marker table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Confiabilidad</TableCell>
                                    <TableCell>Latitud</TableCell>
                                    <TableCell>Longitud</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {markers.map((marker) => (
                                    <TableRow key={marker.id}>
                                    <TableCell>{marker.id}</TableCell>
                                    <TableCell>{marker.conf}</TableCell>
                                    <TableCell>{marker.x}</TableCell>
                                    <TableCell>{marker.y}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>    
                    </TableContainer>  
                <Button onClick={toggleMinimized} variant="contained" color="secondary">
                    <Minimize />
                </Button> 
                </>
            )}
        </div>
    );
};

export default MarkerListComponent;