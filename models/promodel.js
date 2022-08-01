import {Sequelize} from "sequelize";
import db from "../config/db.js";
import users from "./usermodel.js";

const {DataTypes} = Sequelize

const products = db.define('products',{

    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[3,100]
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName : true
})

users.hasMany(products)
products.belongsTo(users,{foreignKey:'userId'})

export default products