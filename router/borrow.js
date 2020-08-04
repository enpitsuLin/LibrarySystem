const express = require("express");
const router = express.Router();
const Borrow = require('../models/borrow');

router.get("/", (req, res) => {
    searchObj = {};
    if (JSON.stringify(req.query) != "{}") {
        if (req.query["user_id"] != undefined)
            searchObj.user_id = req.query["user_id"]
        if (req.query["book_id"] != undefined)
            searchObj.book_id = req.query["book_id"]
    }
    Borrow.find(searchObj, {}, (err, book) => {
        if (err) {
            res.json(err);
        } else {
            res.json(book);
        }
    })
});

router.get("/count", (req, res) => {
    Borrow.countDocuments({})
        .then(book => {
            res.json(book)
        }).catch(err => {
            res.json(err);
        });;
})

router.get("/:id", (req, res) => {
    Borrow.findById(req.params.id)
        .then(borrow => {
            res.json(borrow);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/", (req, res) => {
    Borrow.create(req.body, (err, borrow) => {
        if (err) {
            res.json(err);
        } else {
            res.json(borrow);
        }
    });
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
    Borrow.findOneAndRemove({
        _id: req.params.id
    })
        .then(borrow => res.send(`${borrow.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;