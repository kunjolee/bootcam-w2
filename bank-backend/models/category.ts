import { DataTypes } from 'sequelize';
import db from '../db/connection';


const Category = db.define('category', {
    category: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});


export default Category;