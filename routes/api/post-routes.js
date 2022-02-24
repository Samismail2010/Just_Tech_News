//including packages
const router = require('express').Router();
//user included becaused we need to retrieve user_id to Post
const { Post, User } = require('../../models');
const { route } = require('./user-routes');

//get all users
router.get ('/', (req, res) => {
    console.log('==============');
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at'],
        // order set post order from latest
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log (err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            // retrieve id property
            id: req.params.id
        },
        attributes : ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({  message: 'No post with this id'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log (err);
            res.status(500).json(err);
        });
}); 

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if(!dbPostData[0]){
                res.status(404).json({ message: 'No user found eith this id'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;