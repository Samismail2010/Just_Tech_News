const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


//create our User model
class User extends Model {
   // set up method to run  on instance data(per user) to check password 
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration
User.init(
    {
        //TABLE COLUMN DEFINITION GO HERE
        
        //define an id column
        id: {
            // use the special Sequelize DataTypes object provided what type of data it is
            type: DataTypes.INTEGER,

            //this is equivalent of SQL's `NOT NULL` option
            allowNull: false,

            //instruct that this is the Primary Key
            primaryKey: true,

            //turn on auto increment
            autoIncrement: true
        },

       // define a username column
       username: {
           type: DataTypes.STRING,
           allowNull: false
       },
       
       //define an email column
       email: {
           type: DataTypes.STRING,
           allowNull: false,

           //there cannot be any duplicate email values un this table
           unique: true,

           //if allowNull is set to be false, we can run our data through validators before creating the table data
           validate: {
               isEmail: true
           }
       },

       //define a password column
       password: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               //this means the passwword must be at least  4 characters long
               len:[4]
           }
       }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" funcitionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                },
                // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    return updatedUserData;
            }
    },
        //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //pass in our imported sequelize connection (the directiuon to our database)
        sequelize,
        //dont automatically create createAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing (i.e `context_text` and NOT `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;