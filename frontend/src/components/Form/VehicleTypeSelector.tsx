import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Box } from '@mui/material';

interface VehicleTypeSelectorProps {
    wheels: number; // The number of wheels selected
    onVehicleTypeChange: (type: string) => void; // Function to handle vehicle type change
}

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({ wheels, onVehicleTypeChange }) => {
    const [vehicleTypes, setVehicleTypes] = useState<string[]>([]); // State to store vehicle types

    useEffect(() => {
        // Fetch vehicle types based on the selected wheel count
        const fetchVehicleTypes = async () => {
            try {
                // Replace with the appropriate API endpoint to fetch vehicle types based on wheels
                const response = await fetch(`http://localhost:5000/vehicle-types/wheels/${wheels}`);
                const data = await response.json();

                if (response.ok) {
                    setVehicleTypes(data.names); // Set the vehicle names to state
                } else {
                    console.error('Error fetching vehicle types:', data.message);
                }
            } catch (error) {
                console.error('Error fetching vehicle types:', error);
            }
        };

        if (wheels) {
            fetchVehicleTypes(); // Fetch vehicle types whenever the wheel count changes
        }
    }, [wheels]); // Run this effect whenever the `wheels` prop changes

    return (
        <Box className="space-y-4">
            <FormControl component="fieldset">
                <FormLabel component="legend">Type of Vehicle</FormLabel>
                <RadioGroup
                    aria-label="vehicleType"
                    name="vehicleType"
                    onChange={(e) => onVehicleTypeChange(e.target.value)} // Handle vehicle type change
                    row
                >
                    {vehicleTypes.length > 0 ? (
                        vehicleTypes.map((type) => (
                            <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                        ))
                    ) : (
                        <div>No vehicle types available</div> // Display a message if no vehicle types are available
                    )}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default VehicleTypeSelector;
