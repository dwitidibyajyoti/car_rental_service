import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class VehicleType extends Model {
    public id!: number;
    public name!: string;
    public engineType!: string;
    public wheelCount!: string;
}

VehicleType.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        engineType: {
            type: DataTypes.ENUM('Electric Engine', 'Gasoline Engine', 'Diesel Engine'),
            allowNull: false,
        },
        wheelCount: {
            type: DataTypes.ENUM('2', '3', '4', '6', '10'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'vehicleTypes',
    }
);

export default VehicleType;
