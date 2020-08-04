const express = require("express");
const router = express.Router();
const User = require("../models/user");

/**
 * 获得所有的用户信息或按参数检索
 * 
 * response: Array
 * 
 * 获得所有用户：
 *     /api/user
 * 通过query参数检索：
 *     /api/?
 */
router.get("/", (req, res) => {
    searchObj = {};
    if (JSON.stringify(req.query) != "{}") {
        if (req.query["user_id"] != undefined)
            searchObj.user_id = req.query["user_id"];
        if (req.query["username"] != undefined)
            searchObj.username = req.query["username"];
    }
    User.find(searchObj, {}, (err, book) => {
        if (err) {
            res.json(err);
        } else {
            res.json(book);
        }
    })
});
/**
 * 获得用户计数
 */
router.get("/count", (req, res) => {
    User.countDocuments({})
        .then(user => {
            res.json(user)
        }).catch(err => {
            res.json(err);
        });;
})

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/", (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
    User.findOneAndRemove({
        _id: req.params.id
    })
        .then(user => res.send(`${user.username}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;