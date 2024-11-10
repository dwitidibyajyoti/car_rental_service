import sequelize from './database';
import User from '../models/user.model';
import VehicleType from '../models/vehicleType.model';
import VehicleModel from '../models/vehicleModel.model';


// Sync all models
sequelize.sync({ force: false }) // Set to `true` to drop tables each time (useful for development)
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('Error syncing models:', error);
    });

const createVehicleType = async () => {
    try {
        // Define default vehicle types with engine type and wheel count
        const defaultVehicleTypes = [
            { name: 'care', engineType: 'Gasoline Engine', wheelCount: '4' }, // Car
            { name: 'truck', engineType: 'Diesel Engine', wheelCount: '4' },   // Truck
            { name: 'motor cycle', engineType: 'Electric Engine', wheelCount: '2' }, // Motorbike
            { name: 'scooter', engineType: 'Gasoline Engine', wheelCount: '2' }, // Motorbike

        ];

        // Loop through default vehicle types and create if not exists
        for (const vehicle of defaultVehicleTypes) {
            await VehicleType.findOrCreate({
                where: {
                    name: vehicle.name,
                    engineType: vehicle.engineType,
                    wheelCount: vehicle.wheelCount
                },
                defaults: vehicle
            });
        }

        console.log('Vehicle types checked/created successfully.');
    } catch (error) {
        console.error('Error creating vehicle types:', error);
    }
};

createVehicleType();


const createVehicleModel = async () => {
    try {
        // Define default vehicle models with model name, brand name, and vehicle type ID
        const defaultVehicleModels = [
            { modelName: 'Sedan', brandName: 'Toyota', vehicleTypeName: 'care' },
            { modelName: 'Pickup', brandName: 'Ford', vehicleTypeName: 'truck' },
            { modelName: 'Sport', brandName: 'Yamaha', vehicleTypeName: 'motor cycle' },
            { modelName: 'Scooter', brandName: 'Honda', vehicleTypeName: 'scooter' },
        ];

        // Loop through default vehicle models and create if not exists
        for (const vehicle of defaultVehicleModels) {
            // Find the vehicle type ID based on the name
            const vehicleType = await VehicleType.findOne({ where: { name: vehicle.vehicleTypeName } });

            if (vehicleType) {
                await VehicleModel.findOrCreate({
                    where: {
                        modelName: vehicle.modelName,
                        brandName: vehicle.brandName,
                        vehicleTypeId: vehicleType.id,
                    },
                    defaults: {
                        modelName: vehicle.modelName,
                        brandName: vehicle.brandName,
                        vehicleTypeId: vehicleType.id,
                    }
                });
            }
        }

        console.log('Vehicle models checked/created successfully.');
    } catch (error) {
        console.error('Error creating vehicle models:', error);
    }
};

createVehicleModel();