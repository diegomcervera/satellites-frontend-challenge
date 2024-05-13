import { Grid } from '@mui/material';
import SatelliteFilterComponent from './SatelliteFilterComponent';
import DateFilterComponent from './DateFilterComponent';

interface Punto {
    id: number;
    sat: string;
}

const FilterComponent: React.FC<{ puntos: Punto[], onFilterChange: (selectedOption: string) => void, val: string }> = ({ puntos, onFilterChange, val }) => {

    return (
        <Grid container spacing={0} style={{margin:'20px'}}>
            <Grid item xs={2}>
                <SatelliteFilterComponent  puntos={puntos} onFilterChange={onFilterChange} val={val}/>
            </Grid>
            <Grid item xs={2}>
                <DateFilterComponent/>
            </Grid>
        </Grid>
    )
};

export default FilterComponent;