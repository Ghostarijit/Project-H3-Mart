const productModel = require("../model/productModel");
//const internModel = require("../model/internModel");

var reader = require('xlsx');
const { json } = require("body-parser");

// Reading our test file
var file = reader.readFile("../product_list.xlsx")


const createProduct = async function (req, res) {

    try {

        var dataa = []

        const sheets = file.SheetNames

        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                dataa.push(res)
            })

        }

        let createdProduct = await productModel.insertMany(dataa)


        return res.send({ createdProduct })


     } catch (err) {

        res.status(500).send({ status: false, error: err.message });
    }
};


const updatePrice = async function (req, res) {

    try {
        let price = req.body.price
        let id = req.body.productId



        let updatePrice = await productModel.findOneAndUpdate({ _id: id?.trim() }, {

            $set: { price: price }

        }, { new: true })

        return res.status(500).send({ status: true, msg: `price Update Successfull this ${updatePrice.product_code} and productId is ${updatePrice._id}` })

    } catch (err) {

        res.status(500).send({ status: false, error: err.message });
    }
};


const GetProductWithPrice = async function (req, res) {

    try {
        let product = req.params.product_id




        let Price = await productModel.findOne({ product_code: product })

        let Doc = {
            Product: Price.product_code,
            price: Price.price
        }

        return res.status(500).send({ status: true, msg: Doc })

    } catch (err) {

        res.status(500).send({ status: false, error: err.message });
    }
};


const GetXL = async function (req, res) {

    try {

        let product = await productModel.find({}, { _id: 0 }).select({ product_code: 1, price: 1 })


        const arr = []

        for (let i = 0; i < product.length; i++) {
            arr.push(JSON.parse(JSON.stringify(product[i])))
        }

        arr.forEach(object => {
            delete object['createdAt'];
            delete object['updatedAt']

          })

        
        const ws = reader.utils.json_to_sheet(arr)

        reader.utils.book_append_sheet(file, ws, "Sheet4")

        // Writing to our file
        reader.writeFile(file, './product_list.xlsx')
        return res.send({ msg: product })

    } catch (err) {

        res.status(500).send({ status: false, error: err.message });
    }
};

module.exports = { createProduct, updatePrice, GetProductWithPrice, GetXL };