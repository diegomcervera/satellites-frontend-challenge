import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

interface Punto {
    id: number;
    sat: string;
}

const SatelliteFilterComponent: React.FC<{ puntos: Punto[], onFilterChange: (selectedOption: string) => void, val: string }> = ({ puntos, onFilterChange, val }) => {
    
    const obtenerValoresUnicos = (campo: keyof Punto): string[] => {
        const valoresUnicos: Set<string> = new Set();
        puntos.forEach(punto => {
            valoresUnicos.add(String(punto[campo]));
        });
        return Array.from(valoresUnicos);
    };

    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedOption = event.target.value;
        onFilterChange(selectedOption);
    };

    const opcionesSatellite = obtenerValoresUnicos('sat');

    return (
        <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="satelliteFilterLabel">Satellite</InputLabel>
            <Select
                labelId="satelliteFilterLabel"
                id="satelliteFilter"
                value={val}
                onChange={handleChange}
            >
                <MenuItem value="todos">Todos</MenuItem>
                {opcionesSatellite.map((opcion, index) => (
                    <MenuItem key={index} value={opcion}>{opcion}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SatelliteFilterComponent;