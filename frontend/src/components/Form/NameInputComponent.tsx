import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

interface NameInputProps {
    onNameChange: (firstName: string, lastName: string) => void;
    name: { firstName: string; lastName: string };
}

const NameInputComponent: React.FC<NameInputProps> = ({ onNameChange, name }) => {
    const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
        onNameChange(field === 'firstName' ? value : name.firstName, field === 'lastName' ? value : name.lastName);
    };

    return (
        <Box className="space-y-4">
            <Typography variant="h6">Enter Your Name</Typography>
            <div className="space-y-2">
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={name.firstName}
                    onChange={(e) => handleNameChange('firstName', e.target.value)}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={name.lastName}
                    onChange={(e) => handleNameChange('lastName', e.target.value)}
                />
            </div>
        </Box>
    );
};

export default NameInputComponent;
