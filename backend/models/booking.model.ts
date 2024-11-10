import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import VehicleModel from './vehicleModel.model'; // Import the VehicleModel

class Booking extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public bookingStartDate!: Date;
    public bookingEndDate!: Date;
    public status!: string;
    public vehicleModelId!: number; // Foreign key to VehicleModel
}

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bookingStartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        bookingEndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'), // Enum for booking status
            allowNull: false,
            defaultValue: 'Pending', // Default status
        },
        vehicleModelId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: VehicleModel, // Reference to the VehicleModel table
                key: 'id',
            },
            onDelete: 'CASCADE', // Optional: Cascade delete to remove bookings if the VehicleModel is deleted
        },
    },
    {
        sequelize,
        tableName: 'bookings',
    }
);

// Set up association between Booking and VehicleModel
Booking.belongsTo(VehicleModel, {
    foreignKey: 'vehicleModelId',
    as: 'vehicleModel',
});

VehicleModel.hasMany(Booking, {
    foreignKey: 'vehicleModelId',
    as: 'bookings',
});

export default Booking;
