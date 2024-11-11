import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Booking from '../models/booking.model';
import cors from 'cors';
import VehicleType from '../models/vehicleType.model';
import { Op } from 'sequelize';
import '../config/dbSync';
import VehicleModel from '../models/vehicleModel.model';


const app = express();
const PORT = 5000;

app.use(cors());

// Load environment variables from .env file
dotenv.config();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Node.js and Express!');
});


app.use(express.json());

// POST route to create a new booking with firstName and lastName
// POST route to create a new booking
app.post('/booking', async (req: any, res: any, next: any) => {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
        return res.status(400).json({ message: 'First name and last name are required' });
    }

    try {
        const newBooking = await Booking.create({
            firstName,
            lastName,
            status: 'Pending',
            bookingStartDate: new Date(), // Replace with real dates as needed
            bookingEndDate: new Date(),
            vehicleModelId: 1, // Replace with your actual logic or data
        });
        res.status(201).json(newBooking);
    } catch (error) {
        next(error); // Forward the error to Express error handler
    }
});

app.get('/vehicle-types/wheels', async (req: Request, res: Response) => {
    try {
        const vehicleTypes = await VehicleType.findAll({
            attributes: ['wheelCount'], // Select only the `wheelCount` attribute
        });

        // Extract wheel counts into a set to remove duplicates and convert back to array
        const uniqueWheelCounts = Array.from(new Set(vehicleTypes.map((vehicleType: any) => vehicleType.wheelCount)));

        res.status(200).json({ wheelCounts: uniqueWheelCounts });
    } catch (error) {
        console.error('Error fetching wheel counts:', error);
        res.status(500).json({ message: 'Error fetching wheel counts' });
    }
});

app.get('/vehicle-types/wheels/:wheelCount', async (req: any, res: any) => {
    const { wheelCount } = req.params;

    try {
        const vehicleTypes = await VehicleType.findAll({
            where: {
                wheelCount,  // Match the wheelCount
            },
        });

        if (vehicleTypes.length === 0) {
            return res.status(404).json({ message: `No vehicle types found for ${wheelCount} wheels` });
        }

        // Respond with the names of the vehicle types
        const names = vehicleTypes.map((vehicle) => vehicle.name);
        res.status(200).json({ names });
    } catch (error) {
        console.error('Error fetching vehicle types:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/vehicle-models/:name/:wheelCount', async (req: any, res: any) => {
    const { name, wheelCount } = req.params; // Extract name and wheel count from URL params



    try {
        // Step 1: Find the VehicleType based on name and wheel count
        const vehicleType = await VehicleType.findOne({
            where: { name, wheelCount },
        });
        if (!vehicleType) {
            return res.status(404).json({ message: 'VehicleType not found' });
        }



        // Step 2: Get all VehicleModels for the found vehicleType
        const vehicleModels = await VehicleModel.findAll({
            where: { vehicleTypeId: vehicleType.id },
        });

        // If models are found, return them; otherwise, return a message
        if (vehicleModels.length > 0) {
            return res.status(200).json({ models: vehicleModels });
        } else {
            return res.status(404).json({ message: 'No models found for this vehicle type' });
        }
    } catch (error) {
        console.error('Error fetching vehicle models:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/booking/submit', async (req: any, res: any) => {
    try {
        const { id, vehicleModelId, startDate, endDate } = req.body;

        // Check for existing bookings with overlapping dates and the same model, excluding "Completed" bookings
        const existingBooking = await Booking.findOne({
            where: {
                vehicleModelId,
                status: { [Op.ne]: 'Completed' }, // Exclude bookings with status "Completed"
                id: { [Op.ne]: id }, // Exclude the current booking being updated
                [Op.or]: [
                    {
                        bookingStartDate: {
                            [Op.between]: [new Date(startDate), new Date(endDate)]
                        }
                    },
                    {
                        bookingEndDate: {
                            [Op.between]: [new Date(startDate), new Date(endDate)]
                        }
                    },
                    {
                        [Op.and]: [
                            { bookingStartDate: { [Op.lte]: new Date(startDate) } },
                            { bookingEndDate: { [Op.gte]: new Date(endDate) } }
                        ]
                    }
                ]
            }
        });
        console.log(existingBooking, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>pppp');


        if (existingBooking) {
            return res.status(409).json({ message: 'The selected vehicle model is already booked during the requested time period.' });
        }

        // Update the booking only if the booking with the provided ID exists
        const [affectedRows] = await Booking.update(
            {
                vehicleModelId,
                bookingStartDate: new Date(startDate),
                bookingEndDate: new Date(endDate),
                status: 'Completed', // Default status for this scenario
            },
            {
                where: { id }, // Update only the booking with the matching id
            }
        );

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating booking' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// CREATE TABLE vehicle_types (
//     type_id SERIAL PRIMARY KEY,           -- Unique identifier for each vehicle type
//     type_name VARCHAR(50) NOT NULL UNIQUE, -- Name of the vehicle type (e.g., Car, Bike, Truck)
//     number_of_wheels INT NOT NULL CHECK (number_of_wheels > 0), -- Number of wheels for this type
//     default_fuel_type VARCHAR(50) NOT NULL, -- Default fuel type for this vehicle type (e.g., Petrol, Electric)
//     description VARCHAR(255)              -- Description of the vehicle type (optional)
// );