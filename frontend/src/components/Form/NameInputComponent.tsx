import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

interface NameInputProps {
    onNameChange: (firstName: string, lastName: string) => void;
}

const NameInputComponent: React.FC<NameInputProps> = ({ onNameChange }) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    const handleNameChange = () => {
        onNameChange(firstName, lastName);
    };

    return (
        <Box className="space-y-4">
            <Typography variant="h6">Enter Your Name</Typography>
            <div className="space-y-2">
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                        handleNameChange();
                    }}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                        handleNameChange();
                    }}
                />
            </div>
        </Box>
    );
};

export default NameInputComponent;
