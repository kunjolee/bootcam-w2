import { DataTypes } from "sequelize";
import db from "../db/connection";

const Currency = db.define('currency', {
    currencyType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})


export default Currency;