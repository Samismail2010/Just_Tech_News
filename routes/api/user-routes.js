const router = require('express').Router();

const res = require('express/lib/response');
const { User } = require('../../models');
const { update } = require('../../models/User');

//GET/api/users
// when client makes GET request to /api/users we will select all users from the User Table
//in the database and send it back as json
router.get('/', (req, res) => {
    //Access our User model and run .findAll() method)

    //findAll() method = `SELECT * FROM users;
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET/api/users/1
//tjis method findOne() used to return one piece back

router.get('/:id', (req, res) => {
    //findOne(); method = `SELECT * FROM users WHERE id = 1`;
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData){
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//POST/api/users
router.post('/', (req, res) => {
    //expects { username: 'Sam', email: 'sam@sam.com', password: 'password1234'}
    //used sequelized create() method/ values we get from req.body
    
    //create() method = INSERT INTO user
    //                  (username, email, password)
    //                  VALUES
    //                  ('Sam', 'sam@sam.com', 'password1234')
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    // expects { email: 'sam@sam.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData){
            res.status(400).json({ message: 'No user with this email address'});
            return;
        }
        //add comment syntax in front of this in the .then()
        //res.json({ user: dbUserData});
        // verify user

        const validPassword = dbUserData.checkPassword(req.body.password);
            if(!validPassword){
                res.status(400).json({ message: 'Incorrect password!'});
                return;
            }

            res.json({ user: dbUserData, message: 'You are now logged in!'});
    });
});

//PUT/api/users/1
router.put('/:id', (req, res) => {
//Update exsisting data
    //expects {username: 'sam', email: 'sam@sam.com', password: 'password1234'}

    // if req.body has exact key/values pairs to match the model, you can use `req.body` instead
    //the update() method combines creating paramter + looking up paramater
    //we pass req.body for new data
    //we pass req.params.id to indecate exactly where we want the new data used
    
    //update() method = UPDATE users
    //                  SET username = 'sam', email = 'sam@sam.com', password = 'password1234'
    //                  WHERE id = 1;
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData =>{
            if(!dbUserData[0]){
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//DELETE/api/users/1
router.delete('/:id', (req,res) => {
    //destroy() method used
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;