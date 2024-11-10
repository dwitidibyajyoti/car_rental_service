import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import VehicleType from './vehicleType.model'; // Import VehicleType model

class VehicleModel extends Model {
    public id!: number;
    public modelName!: string;
    public brandName!: string; // Vehicle brand name
    public vehicleTypeId!: number; // Foreign key to VehicleType
}

VehicleModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        modelName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brandName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleTypeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: VehicleType, // Referencing the VehicleType model
                key: 'id'
            },
            // onDelete: 'CASCADE', // Optional: Delete VehicleModel when VehicleType is deleted
        },
    },
    {
        sequelize,
        modelName: 'VehicleModel',
        tableName: 'vehicleModels',
    }
);

// Set up association between VehicleModel and VehicleType
VehicleModel.belongsTo(VehicleType, {
    foreignKey: 'vehicleTypeId',
    as: 'vehicleType',
});

VehicleType.hasMany(VehicleModel, {
    foreignKey: 'vehicleTypeId',
    as: 'vehicleModels',
});

export default VehicleModel;
