import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';


interface IUserModel extends Model{
    id: string,
    name: string;
    username: string;
    email: string;
    pass: string;
    address: string;
    phone: string;
    birthdate: string;
    state: number;  
}

const User = db.define<IUserModel>('user', {
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    pass: {
        allowNull: false,
        type: DataTypes.STRING
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    birthdate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
    },
    state: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
})

export default User;