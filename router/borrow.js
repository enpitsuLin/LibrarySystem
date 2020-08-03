const express = require("express");
const router = express.Router();
const Borrow = require('../models/borrow');

router.get("/borrow", (req, res) => {
    Borrow.find({})
        .sort({ update_at: -1 })
        .then(borrows => {
            res.json(borrows);
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
});

router.get("/borrow/count", (req, res) => {
    Borrow.count({}, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res); // 会输出数据库数据的数量
        }
    });
})

router.get("/borrow/:id", (req, res) => {
    Borrow.findById(req.params.id)
        .then(borrow => {
            res.json(borrow);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/borrow", (req, res) => {
    Borrow.create(req.body, (err, borrow) => {
        if (err) {
            res.json(err);
        } else {
            res.json(borrow);
        }
    });
});

router.put("/borrow/:id", (req, res) => {
    Borrow.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                borrow_id: req.body.borrow_id,
                borrow_name: req.body.borrow_name,
                author: req.body.author,
                publish: req.body.publish,
                price: req.body.price

            }
        },
        {
            new: true
        }
    )
        .then(borrow => res.json(borrow))
        .catch(err => res.json(err));
});

router.delete("/borrow/:id", (req, res) => {
    Borrow.findOneAndRemove({
        _id: req.params.id
    })
        .then(borrow => res.send(`${borrow.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;