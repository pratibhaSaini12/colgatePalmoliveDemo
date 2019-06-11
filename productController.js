var con = require('./config.js')
var md5 = require('md5');
var datetime = require('node-datetime');

module.exports = {

    //get all the available products
    getAllProducts(req, res) {
        console.log('inside controller')

        con.query("SELECT * FROM `product` ", function (err, result) {
            //     console.log('response from DB====', result)
            if (err)
                throw err;
            else {

                return res.status(200).json({
                    products: result
                })
            }
        })
    },


    //get product by ID
    getProductByID(req, res) {
        console.log("Query------ ", req.query);
        con.query("SELECT * FROM `product` where product_id=?", [req.query.id], function (err, result) {
            console.log('response from get producy data by id----', result)
            if (err)
                throw err;
            else {

                return res.status(200).json({
                    product: result
                })
            }
        })
    },

    //Update product by ID
    updateProductByID(req, res) {
        console.log("req.body=============", req.body)
        con.query("update `product` SET product_name=?,upc=?,category=?,link=?,product_line=?,product_status=?,cost=?,wholesale_price=?,msrp=?,retail_price=?,medium_description=?,long_description=? ,tags=?,warnings=?,material=?,style=?, main_image=?,workflow_state=?  where product_id=?", [req.body.product_name, req.body.upc, req.body.category, req.body.link, req.body.product_line, req.body.product_status, req.body.cost, req.body.wholesale_price, req.body.msrp, req.body.retail_price, req.body.medium_description, req.body.long_description, req.body.tags, req.body.warnings, req.body.material, req.body.style, req.body.main_image, req.body.product_id, req.body.workflow_state], function (err, result) {
            console.log('response from update====', result)
            if (err)
                throw err;
            else {

                return res.status(200).json({
                    product: result
                })
            }
        })
    },

    //Delete product by ID
    deleteProductByID(req, res) {
        console.log('###############', req.body)
        con.query("DELETE from `product` where product_id=" + req.body.id, function (err, result) {
            console.log('response from delete by id====', result)
            if (err)
                throw err;
            else {

                return res.status(200).json({
                    product: result
                })
            }
        })


    },

    //compare products
    compareProducts(req, res) {
        con.query("select * from `product` where product_id IN (" + req.query.id + ")", function (err, result) {
            console.log('response from compare by id====', result)
            if (err)
                throw err;
            else {
                return res.status(200).json({
                    product: result
                })
            }
        })

    },

    //Get similar products
    getSimilarProducts(req, res) {

    },

    //Bulk delete 
    deleteProducts(req, res) {

    },

    //Create Product
    createProduct(req, res) {
        console.log('data ===', req.body)
        con.query("INSERT INTO product (`product_id`, `product_name`, `upc`, `category`,`link`,`product_line`,`product_status`,`cost`,`wholesale_price`,`msrp`,`retail_price`,`medium_description`,`long_description`,`tags`,`warnings`,`material`,`style`,`main_image`,workflow_state) VALUES ('" + req.body.product_id + "', '" + req.body.product_name + "', '" + req.body.upc + "', '" + req.body.category + "','" + req.body.link + "','" + req.body.product_line + "','" + req.body.product_status + "','" + req.body.cost + "','" + req.body.wholesale_price + "','" + req.body.msrp + "','" + req.body.retail_price + "','" + req.body.medium_description + "','" + req.body.long_description + "','" + req.body.tags + "','" + req.body.warnings + "','" + req.body.material + "','" + req.body.style + "','" + req.body.main_image + "','" + req.body.workflow_state + "')", function (err, result) {
            console.log('response from create Product====', result)
            if (err)
                throw err;
            else {

                return res.status(200).json({
                    product: result
                })
            }
        })
    },

    bulkProductDelete(req, res) {
        console.log('###############', req.body)
        con.query("DELETE from `product` where product_id IN (" + req.body.id + ")", function (err, result) {
            console.log('response from bulk delete by id====', result)
            if (err)
                throw err;
            else {
                return res.status(200).json({
                    product: result
                })
            }
        })
    },

    getProductCompletion(req, res) {
        console.log('###############', req.body)
        con.query("select active/total*100 as complete,inactive/total*100 as incomplete from( select count(1) as total, sum(if(product_status='active',1,0)) as active,sum(if(product_status='inactive',1,0)) as inactive from product) t", function (err, result) {
            console.log('response from bulk delete by id====', result)
            if (err)
                throw err;
            else {
                return res.status(200).json({
                    product: result
                })
            }
        })
    },

    productContentUpdates(req, res) {
        console.log('###############', req.body)
        con.query("select 30days/total*100 as first,90days/total*100 as second,90plus/total*100 as third from( select count(1) as total, sum(if(updated_at>date_sub(curdate(), interval 30 day),1,0)) as 30days,sum(if(updated_at<=date_sub(curdate(), interval 30 day) and updated_at>date_sub(curdate(), interval 90 day),1,0)) as 90days, sum(if(updated_at<=date_sub(curdate(), interval 90 day),1,0)) as 90plus from product) t", function (err, result) {
            console.log('response from bulk delete by id====', result)
            if (err)
                throw err;
            else {
                return res.status(200).json({
                    product: result
                })
            }
        })
    },






};
