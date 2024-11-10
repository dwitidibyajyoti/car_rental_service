import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

interface DateRangePickerProps {
    onDateRangeChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateRangeChange }) => {
    const [startDate, setStartDate] = React.useState<string>('');
    const [endDate, setEndDate] = React.useState<string>('');

    const handleDateChange = () => {
        onDateRangeChange(new Date(startDate), new Date(endDate));
    };

    return (
        <Box className="space-y-4">
            <Typography variant="h6">Select Booking Dates</Typography>
            <div className="space-y-2">
                <TextField
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                        handleDateChange();
                    }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={endDate}
                    onChange={(e) => {
                        setEndDate(e.target.value);
                        handleDateChange();
                    }}
                />
            </div>
        </Box>
    );
};

export default DateRangePicker;
