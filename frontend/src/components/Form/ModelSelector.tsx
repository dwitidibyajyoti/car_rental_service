import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Box } from '@mui/material';
import axios from 'axios'; // For making API requests

interface ModelSelectorProps {
    vehicleType: string;
    onModelChange: (modelId: string) => void | undefined;  // Expecting modelId instead of model name
    wheels: number; // The number of wheels selected for the vehicle type (bike: 2, car: 4)
}

interface Model {
    id: string;
    brandName: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ vehicleType, onModelChange, wheels }) => {
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchModels = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await axios.get(`http://localhost:5000/vehicle-models/${vehicleType}/${wheels}`);
                const vehicleModels = response.data.models;

                if (vehicleModels && vehicleModels.length > 0) {
                    // Assuming response has { id, brandName } for each model
                    setModels(vehicleModels);
                } else {
                    setModels([]);
                    setError('No models found for this vehicle type and wheel count.');
                }
            } catch (err) {
                setError('Failed to fetch models.');
            } finally {
                setLoading(false);
            }
        };

        // Only fetch models when both vehicleType and wheels are defined
        if (vehicleType && wheels) {
            fetchModels();
        }
    }, [vehicleType, wheels]); // Dependencies are vehicleType and wheels

    return (
        <Box className="space-y-4">
            <FormControl component="fieldset">
                <FormLabel component="legend">Specific Model</FormLabel>
                <RadioGroup
                    aria-label="model"
                    name="model"
                    onChange={(e) => {
                        const selectedModel = models.find(model => model.brandName === e.target.value);
                        if (selectedModel) {
                            onModelChange(selectedModel.id); // Pass the model.id instead of brandName
                        }
                    }}
                    row
                >
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        models.map((model) => (
                            <FormControlLabel key={model.id} value={model.brandName} control={<Radio />} label={model.brandName} />
                        ))
                    )}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default ModelSelector;
