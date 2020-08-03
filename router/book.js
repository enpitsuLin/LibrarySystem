const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const e = require("express");


/**
 * 获得现有书籍数
 * response: Number
 * 
 * 书籍数：
 * /api/book/count
 */
router.get("/book/count", (req, res) => {
    Book.countDocuments({})
        .then(book => {
            res.json(book)
        }).catch(err => {
            res.json(err);
        });;
})
/**
 * 通过唯一ID检索书籍
 * response: Obejct
 * 
 * 检索书籍:
 *  /api/book/5f242d3a3c93c83460b17d3d
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
 * 获得所有的书籍信息或按参数检索
 * 
 * response: Array
 * 
 * 获得所有书籍：
 *     /api/book
 * 通过query参数检索：
 *     /api/book/?title=三国演义&author=罗贯中
 */
router.get("/book", (req, res) => {
    searchObj = {};
    if (JSON.stringify(req.query) != "{}") {
        var title = req.query["title"];
        var author = req.query["author"];
        var isbn = req.query["isbn"];
        searchObj = {
            "title": title,
            "author": author,
            "isbn": isbn
        }
    }
    Book.find(searchObj, {}, (err, book) => {
        if (err) {
            res.json(err);
        } else {
            res.json(book);
        }
    })


});
/**
 * 通过post添加书籍数据
 * requset.body: JSON String
 * 
 * 通过post添加书籍
 *      /api/book
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
                title: req.body.title,
                publish: req.body.publish,
                language: req.body.language,
                price: req.body.price,
                isbn: req.body.isbn,
                author: req.body.author,
                class: req.body.class
            }
        },
        {
            new: true
        }, (err, book) => {
            if (err) {
                res.json(err);
            } else {
                res.json(book);
            }
        });
});

router.delete("/book/:id", (req, res) => {
    Book.findOneAndRemove({
        _id: req.params.id
    })
        .then(book => res.send(`${book.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;