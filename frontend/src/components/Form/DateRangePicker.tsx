import React, { useEffect } from 'react';
import { TextField, Box, Typography } from '@mui/material';

interface DateRangePickerProps {
    onDateRangeChange: (startDate: Date, endDate: Date) => void;
    startDate: Date | null;
    endDate: Date | null;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateRangeChange, startDate, endDate }) => {
    useEffect(() => {
        if (startDate && endDate) {
            onDateRangeChange(startDate, endDate); // Initially set the values on load
        }
    }, [startDate, endDate, onDateRangeChange]);

    const handleDateChange = (field: 'start' | 'end', value: string) => {
        const updatedDate = new Date(value);
        if (field === 'start') {
            onDateRangeChange(updatedDate, endDate ?? new Date());
        } else {
            onDateRangeChange(startDate ?? new Date(), updatedDate);
        }
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
                    value={startDate ? startDate.toISOString().split('T')[0] : ''} // Check before formatting
                    onChange={(e) => handleDateChange('start', e.target.value)}
                />
                <TextField
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={endDate ? endDate.toISOString().split('T')[0] : ''} // Check before formatting
                    onChange={(e) => handleDateChange('end', e.target.value)}
                />
            </div>
        </Box>
    );
};

export default DateRangePicker;
