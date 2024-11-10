import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Box } from '@mui/material';

interface WheelsSelectorProps {
    onWheelsChange: (wheels: number) => void;
}

const WheelsSelector: React.FC<WheelsSelectorProps> = ({ onWheelsChange }) => {
    const [wheelOptions, setWheelOptions] = useState<number[]>([]);

    useEffect(() => {
        const fetchWheelOptions = async () => {
            try {
                const response = await fetch('http://localhost:5000/vehicle-types/wheels');
                const data = await response.json();

                // Assuming data.wheelCounts is the array of unique wheel counts
                if (data?.wheelCounts) {
                    setWheelOptions(data.wheelCounts);
                }
            } catch (error) {
                console.error('Error fetching wheel options:', error);
            }
        };

        fetchWheelOptions();
    }, []);

    return (
        <Box className="space-y-4">
            <FormControl component="fieldset">
                <FormLabel component="legend">Number of Wheels</FormLabel>
                <RadioGroup
                    aria-label="wheels"
                    name="wheels"
                    onChange={(e) => onWheelsChange(Number(e.target.value))}
                    row
                >
                    {wheelOptions.map((wheels) => (
                        <FormControlLabel key={wheels} value={wheels} control={<Radio />} label={`${wheels}`} />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default WheelsSelector;
