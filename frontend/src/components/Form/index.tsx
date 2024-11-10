import React, { useState } from 'react';
import WheelsSelector from './WheelsSelector';
import VehicleTypeSelector from './VehicleTypeSelector';
import ModelSelector from './ModelSelector';
import DateRangePicker from './DateRangePicker';
import { Box, Button, Container } from '@mui/material';
import NameInputComponent from './NameInputComponent';

const FormContainer: React.FC = () => {
    const [step, setStep] = useState(0);
    const [name, setName] = useState({ firstName: '', lastName: '' });
    const [wheels, setWheels] = useState<number>(0);
    const [vehicleType, setVehicleType] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [bookingId, setBookingId] = useState<number | null>(null);

    // Function to move to the next step with validation
    const handleNext = async () => {
        if (step === 0) {
            if (!name.firstName || !name.lastName) {
                alert('Please enter both first name and last name before proceeding.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firstName: name.firstName, lastName: name.lastName }),
                });

                if (!response.ok) {
                    throw new Error('Failed to submit name to the API');
                }

                const responseData = await response.json();
                console.log('Response from server:', responseData);
                setBookingId(responseData.id);
            } catch (error) {
                console.error('Error submitting name:', error);
                alert('An error occurred while submitting your name. Please try again.');
                return;
            }
        }

        if (step === 1) {
            if (wheels == 0) {
                alert('Please select the number of wheels.');
                return;
            }
        }

        if (step === 2) {
            if (!vehicleType) {
                alert('Please select a vehicle type.');
                return;
            }
        }

        if (step === 3) {
            if (!model) {
                alert('Please select a model.');
                return;
            }
        }

        if (step === 4) {
            if (!startDate || !endDate) {
                alert('Please select both start and end dates.');
                return;
            }
        }

        if (step < 4) {
            setStep(step + 1);
        }
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        if (!bookingId || !startDate || !endDate || !model) {
            alert('Please complete the form before submitting.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/booking/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: bookingId,
                    vehicleModelId: model,
                    startDate,
                    endDate,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit booking.');
            }

            const responseData = await response.json();
            console.log('Booking submitted successfully:', responseData);
            alert('Booking submitted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('An error occurred while submitting the booking. Please try again.');
        }
    };

    return (
        <Container className="space-y-6 py-8">
            {step === 0 && (
                <NameInputComponent onNameChange={(firstName, lastName) => setName({ firstName, lastName })} />
            )}
            {step === 1 && <WheelsSelector onWheelsChange={setWheels} />}
            {step === 2 && <VehicleTypeSelector wheels={wheels} onVehicleTypeChange={setVehicleType} />}
            {step === 3 && <ModelSelector vehicleType={vehicleType} wheels={wheels} onModelChange={setModel} />}
            {step === 4 && (
                <DateRangePicker onDateRangeChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                }} />
            )}

            <Box mt={4}>
                {step < 4 ? (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default FormContainer;
