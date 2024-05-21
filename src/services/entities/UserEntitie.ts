import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';


export const UserEntitie = sequelize.define("UserEntitie", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING(200), allowNull: false},
    password: {type: DataTypes.STRING(500), allowNull: false}
},{
    paranoid: false,
    tableName: 'users',
    timestamps: false,
    freezeTableName: true
})