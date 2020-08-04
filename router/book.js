const express = require("express");
const router = express.Router();
const Book = require("../models/book");

/**
 * 获得所有的书籍信息或按参数检索(book_id仅作排序与索引 不暴露)
 * 
 * response: Array
 * 
 * 获得所有书籍：
 *     /api/book
 * 通过query参数检索：
 *     /api/?title=三国演义&author=罗贯中
 */
router.get("/", (req, res) => {
    searchObj = {};
    //console.log("查询对象为:" + req.query);
    if (JSON.stringify(req.query) != "{}") {
        if (req.query["title"] != undefined)
            searchObj.title = req.query["title"];
        if (req.query["author"] != undefined)
            searchObj.author = req.query["author"];
        if (req.query["publisher"] != undefined)
            searchObj.publisher = req.query["publisher"];
        if (req.query["class"] != undefined)
            searchObj.class = req.query["class"];
        if (req.query["language"] != undefined)
            searchObj.language = req.query["language"];
        if (req.query["isbn"] != undefined)
            searchObj.isbn = req.query["isbn"];
        if (req.query["reserve_price"] != undefined) {
            reserve_price = eval(req.query["reserve_price"]);
            searchObj["price"] = {
                $gte: reserve_price[0], $lte: reserve_price[1]
            }
        }
    }
    console.log(searchObj);
    Book.find(searchObj, {}, (err, book) => {
        if (err) {
            res.json(err);
        } else {
            res.json(book);
        }
    })
});
/**
 * 获得现有书籍数
 * response: Number
 * 
 * 书籍数：
 * /api/count
 */
router.get("/count", (req, res) => {
    Book.countDocuments({})
        .then(book => {
            res.json(book)
        }).catch(err => {
            res.json(err);
        });;
})
/**
 * 通过唯一_id检索书籍
 * response: Obejct
 * 
 * 检索书籍:
 *  /api/5f242d3a3c93c83460b17d3d
 */
router.get("/:id", (req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            res.json(book);
        })
        .catch(err => {
            res.json(err);
        });
});
/**
 * 通过post添加书籍数据
 * requset.body: JSON String
 * 
 * 通过post添加书籍
 *      /api/book
 */
router.post("/", (req, res) => {
    console.log(req.body)
    Book.create(req.body, (err, book) => {
        if (err) {
            res.json(err);
        } else {
            res.json(book);
        }
    });
});

router.put("/:id", (req, res) => {
    Book.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                title: req.body.title,
                author: req.body.author,
                publisher: req.body.publisher,
                language: req.body.language,
                price: req.body.price,
                isbn: req.body.isbn,
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

router.delete("/:id", (req, res) => {
    Book.findOneAndRemove({
        _id: req.params.id
    })
        .then(book => res.send(`${book.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;