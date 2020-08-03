const express = require("express");
const router = express.Router();
const User = require("../models/user");


router.get("/user", (req, res) => {
    User.find({})
        .sort({ update_at: -1 })
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
});
/**
 * 获得用户计数
 */
router.get("/user/count", (req, res) => {
    User.countDocuments({})
        .then(user => {
            res.json(user)
        }).catch(err => {
            res.json(err);
        });;
})

router.get("/user/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/user", (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
});

router.put("/user/:id", (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                user_id: req.body.user_id,
                username: req.body.username,
                password: req.body.password,
                identity: req.body.identity,
                name: req.body.name,
                department: req.body.department
            }
        },
        {
            new: true
        }
    )
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

router.delete("/user/:id", (req, res) => {
    User.findOneAndRemove({
        _id: req.params.id
    })
        .then(user => res.send(`${user.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;