import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

import { Currency, User} from './'

interface IAccountModel extends Model{
    id: string,
    accountNumber: string;
    dpi: string; 
    typeDeposit: 'recurring' | 'savings';
    balance: number;
    idUser: string;
    state: number;
    idCurrency: string;
}

const Account = db.define<IAccountModel>('account', {
    accountNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    dpi: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    
    typeDeposit: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    balance: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    // idUser: {
    //     field: 'idUser',
    //     allowNull: false,
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'users',
    //         key: 'id'
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'SET NULL'
    // },
    // idCurrency: {
    //     field: 'idCurrency',
    //     allowNull: false,
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'currencies',
    //         key: 'id'
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'SET NULL'
    // },
    state: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
})


User.hasMany(Account, {
    as: 'User',
    foreignKey: 'idUser'
})

Account.belongsTo(User, { as: 'User', foreignKey: 'idUser' });

Currency.hasMany(Account,{
    as: 'Currency',
    foreignKey: 'idCurrency'
})


Account.belongsTo(Currency, {as: 'Currency', foreignKey: 'idCurrency'})

export default Account;