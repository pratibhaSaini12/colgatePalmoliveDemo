var con = require('./config.js')
var md5 = require('md5');
var datetime = require('node-datetime');

module.exports = {

    //get all the available products
    getAllProducts(req, res) {

        con.query("SELECT * FROM `object_query_22` where ActiveStatus=1", function (err, result) {
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
        con.query("SELECT * FROM `object_query_22` where ActiveStatus=? AND LeadOwner=?", [1, req.query.name], function (err, result) {
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
    updateProductByID(req,res){

    },

    //Delete product by ID
    deleteProductByID(req,res){

    },

    //compare products
    compareProducts(req,res){

    },

    //Get similar products
    getSimilarProducts(req,res){

    },



    

};
