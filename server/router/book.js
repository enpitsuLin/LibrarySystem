const express = require("express");
const router = express.Router();
const Book = require("../models/book");

/**
 * 获得所有的书籍信息
 */
router.get("/book", (req, res) => {
    Book.find({})
        .sort({ update_at: -1 })
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
});
/**
 * 获得现有书籍计数
 */
router.get("/book/count",(req, res)=>{
    Book.countDocuments({})
        .then(book =>{
            res.json(book)
        }).catch(err => {
            res.json(err);
        });;
})
/**
 * 通过唯一ID检索书籍
 */
router.get("/book/:id", (req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            res.json(book);
        })
        .catch(err => {
            res.json(err);
        });
});
/**
 * 通过post插入书籍数据
 */
router.post("/book", (req, res) => {
    console.log(req.body)
    Book.create(req.body, (err, book) => {
        if (err) {
            res.json(err);
        } else {
            res.json(book);
        }
    });
});

router.put("/book/:id", (req, res) => {
    Book.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                book_id: req.body.book_id,
                book_name: req.body.book_name,
                author: req.body.author,
                publish: req.body.publish,
                price: req.body.price

            }
        },
        {
            new: true
        }
    )
        .then(book => res.json(book))
        .catch(err => res.json(err));
});

router.delete("/book/:id", (req, res) => {
    Book.findOneAndRemove({
        _id: req.params.id
    })
        .then(book => res.send(`${book.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;