import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

import { Category, Account, Currency} from './'

interface IMovement extends Model{
    id: string,
    description: string;
    type: 'EXPENSES' | 'INCOME',
    amount: number,
    date: string,
    state: number,
    idCategory: number,
    idAccount: number,
}

const Movement = db.define<IMovement>('movement', {
    description: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    type: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    amount: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    myDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
    },
    state: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
})

// Un movimiento va a tener 1 categoria, una categoria puede ser asignada a muchos movimientos
Category.hasMany(Movement, {
    as: 'Category',
    foreignKey: 'idCategory'
})

Movement.belongsTo(Category, { as: 'Category', foreignKey: 'idCategory' })
// Una cuenta puede ser relacionada a muchos movimientos, pero un movimiento en especifico solo puede ser relacionado a una cuenta

Account.hasMany(Movement, {
    as: 'Account',
    foreignKey: 'idAccount'
})

Movement.belongsTo(Account, { as: 'Account', foreignKey: 'idAccount' })

Currency.hasMany(Movement,{
    as: 'Currencies',
    foreignKey: 'idCurrency'
})

Movement.belongsTo(Currency, {as: 'Currencie', foreignKey: 'idCurrency'})

export default Movement;