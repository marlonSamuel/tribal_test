import { sequelize } from "../../common/mysql.persistence";
import {DataTypes} from 'sequelize';


export const TestEntitie = sequelize.define("TestEntitie", {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING(200), allowNull: false}
},{
    paranoid: false,
    tableName: 'test2_table',
    timestamps: true,
    freezeTableName: true
})