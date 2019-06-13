var con = require('./config.js')
var md5 = require('md5');
var datetime = require('node-datetime');
const PDFExtract = require('pdf.js-extract').PDFExtract;

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
        try {
            let queryForSql = `update product SET product_name='${req.body.product_name}',
            upc='${req.body.upc}',
            category='${req.body.category}',
            link='${req.body.link}',
            product_line='${req.body.product_line}',
            product_status='${req.body.product_status}',
            cost='${req.body.cost}',
            wholesale_price='${req.body.wholesale_price}',
            msrp='${req.body.msrp}',
            retail_price='${req.body.retail_price}',
            medium_description='${req.body.medium_description}',
            long_description='${req.body.long_description}',
            tags='${req.body.tags}',
            warnings='${req.body.warnings}',
            material='${req.body.material}',
            style='${req.body.style}',
            main_image='${req.body.main_image}',
            workflow_state='${req.body.workflow_state}',
            brand='${req.body.brand}',
            product_completion='${req.body.product_completion}'           
            where product_id=${req.body.product_id}`;
            console.log('query code ', queryForSql)
            // process.exit(0)
            con.query(queryForSql, function (err, result) {
                // console.log('response from update====', result)
                if (err)
                    throw err;
                else {

                    return res.status(200).json({
                        product: result
                    })
                }
            })
        } catch (e) { console.log('errorn', e) }
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
        con.query("INSERT INTO product (`product_name`, `upc`, `category`,`link`,`product_line`,`product_status`,`cost`,`wholesale_price`,`msrp`,`retail_price`,`medium_description`,`long_description`,`tags`,`warnings`,`material`,`style`,`main_image`,workflow_state,`brand`,`product_completion`) VALUES ('" + req.body.product_name + "', '" + req.body.upc + "', '" + req.body.category + "','" + req.body.link + "','" + req.body.product_line + "','" + req.body.product_status + "','" + req.body.cost + "','" + req.body.wholesale_price + "','" + req.body.msrp + "','" + req.body.retail_price + "','" + req.body.medium_description + "','" + req.body.long_description + "','" + req.body.tags + "','" + req.body.warnings + "','" + req.body.material + "','" + req.body.style + "','" + req.body.main_image + "','" + req.body.workflow_state + "','" + req.body.brand + "','" + req.body.product_completion + "')", function (err, result) {
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
        con.query("select 100_per/total*100 as 100_per from( select count(1) as total, sum(if(product_completion='100' and product_status='active',1,0)) as 100_per from product) t", function (err, result) {
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
    readPDf(req, res) {
        console.log('--- aa gya---');
        var pdf_path = "./file/pdf1.pdf";
        const pdfExtract = new PDFExtract();
        const options = {}; /* see below */
        const codinateArray = [
            {
                lang: 'TR',
                ques1: "Hill's™ Science Plan™ MATURE ADULT CAT FOOD with CHICKEN",
                ques2: "BESLEME TALİMATLARI:",
                ques3: "Bu mamayı ilk defa mı kullanıyorsunuz?",
                ques4: "İÇİNDEKİLER",
                ques5: "Avrupa daüretilmiştir. *Kalite, tutarlılık ve lezzet için %100 Garanti, yoksa paranız iade",
                codinate: { xu: 966, xl: 871, yu: 1113, yl: 860 }
            },
            {
                lang: 'CZ',
                ques1: "Hill's™ Science Plan™ MATURE ADULT CAT FOOD with CHICKEN",
                ques2: "POKYNY KE KRMENÍ",
                ques3: "Podáváte toto krmivo poprvé?",
                ques4: "SLOŽENÍ:",
                ques5: "Vyrobeno v EU. *100% zárukakvality, konzistence a chuti, nebo Vám vrátíme peníze zpět",
                codinate: { xu: 855, xl: 763, yu: 1113, yl: 860 }
            },
            {
                lang: 'GR',
                ques1: "Hill's™ Science Plan™ MATURE ADULT CAT FOOD with CHICKEN",
                ques2: "ΟΔΗΓΙΕΣ ΧΟΡΗΓΗΣΗΣ",
                ques3: "Χορηγείτεαυτή την τροφή για πρώτη φορά?",
                ques4: "ΣΥΝΘΕΣΗ:",
                ques5: "Παρασκευάζεται στη Ε.Ε. *100% Εγγύηση για ποιότητα, συνέπεια καιγεύση, ή τα λεφτά σας πίσω.",

                codinate: { xu: 750, xl: 645, yu: 1113, yl: 860 }
            },
            {
                lang: 'PL',
                ques1: "Hill's™ Science Plan™ MATURE ADULT CAT FOOD with CHICKEN",
                ques2: "INSTRUKCJA KARMENIA",
                ques3: "Jeśli to nowa karma",
                ques4: "SKŁAD:",
                ques5: "Wyprodukowano w UE. *100% Gwarancji jakości, konsystencji i smakualbo zwrot pieniędzy.",

                codinate: { xu: 632, xl: 525, yu: 1113, yl: 860 }
            },
            //            {
            //                lang:'',
            //                ques1: '',
            //                codinate: {xu: 512, xl: 400, yu: 1113, yl: 860}
            //            },
            {
                lang: 'ES',
                ques1: "Hill's™ Science Plan™ MATURE ADULT CAT FOOD con POLLO",
                ques2: "MODO DE EMPLEO:",
                ques3: "Si se utiliza este alimentopor primera vez",
                ques4: "COMPOSICIÓN:",
                ques5: "Fabricado en la UE. *100% Garantizado en calidad, consistencia ysabor o te devolvemos el dinero.",

                codinate: { xu: 966, xl: 871, yu: 1336, yl: 1160 }
            },
            {
                lang: 'PT',
                ques1: "Hill's™ Science Plan™ MATURE ADULT CAT FOOD with CHICKEN",
                ques2: "MODO DE UTILIZAÇÃO:",
                ques3: "É a primeira vez que utiliza este alimento?",
                ques4: "COMPOSIÇÃO",
                ques5: "Produzido na UE. *100% Garantia de qualidade,consistência e sabor, ou devolvemos-lhe o seu dinheiro.",

                codinate: { xu: 855, xl: 753, yu: 1336, yl: 1160 }
            },
            {
                lang: 'DK,NO',
                ques1: "Hill's™ Science Plan™ MATURE ADULT CAT FOOD with CHICKEN",
                ques2: "FODRINGSVEJLEDNING:",
                ques3: "Anvender du foderet for første gang?",
                ques4: "SAMMENSÆTNING:",
                ques5: "Fremstillet i EU. *100%Garanti for kvalitet, konsistens og smag, eller dine penge tilbage.",

                codinate: { xu: 735, xl: 640, yu: 1336, yl: 1160 }
            },
            {
                lang: 'SE',
                ques1: "Hill's™ Science Plan™ MATURE ADULT CAT FOOD with CHICKEN",
                ques2: "UTFODRINGSINSTRUKTIONER:",
                ques3: "Utfodra med fodret för första gången?",
                ques4: "SAMMANSÄTTNING:",
                ques5: "Produzido na UE. *100% Garantia de qualidade, consistência e sabor, ou devolvemos-lhe o seu dinheiro.",

                codinate: { xu: 625, xl: 520, yu: 1336, yl: 1160 }
            },
            {
                lang: 'FL',
                ques1: "Hill's™ Science Plan™ MATURE ADULT CAT FOOD with CHICKEN",
                ques2: "RUOKINTAOHJEET:",
                ques3: "Syötätkö tätä ruokaa ensimmäistä kertaa?",
                ques4: "KOOSTUMUS:",
                ques5: "Valmistettu EU:ssa. *100 % Takuu laadulle, koostumukselle ja maulle, tai saat rahasi takaisin.",

                codinate: { xu: 512, xl: 395, yu: 1336, yl: 1160 }
            },
            {
                lang: 'RU,BY',
                ques1: "Hill's™ Science Plan™ ДЛЯ КОШЕК СТАРШЕ 7 ЛЕТ с КУРИЦЕЙ",
                ques2: "РЕКОМЕНДАЦИИ ПОКОРМЛЕНИЮ:",
                ques3: "Пробуете этотрацион впервые?",
                ques4: "СОСТАВ:",
                ques5: "Изготовлено в странах ЕС. *100% Гарантии качества, консистенции и вкуса.",

                codinate: { xu: 395, xl: 250, yu: 1336, yl: 1160 }
            }

        ];
        pdfExtract.extract(pdf_path, options, (err, data) => {
            if (err)
                return console.log(err);
            var finalarray = [];
            codinateArray.forEach(function (codinate) {
                var arrayElement = [];
                data.pages[0].content.forEach(function (element) {
                    if (element.x <= codinate.codinate.xu && element.x >= codinate.codinate.xl && element.y <= codinate.codinate.yu && element.y >= codinate.codinate.yl) {

                        if (arrayElement.length == 0)
                            arrayElement.push(element);
                        else {
                            var insertIndex = shortIndex(arrayElement, element, 1);
                            arrayElement.splice(insertIndex, 0, element);
                        }
                    }
                });
                var reversed = arrayElement.reverse();
                var sendStr = '';
                reversed.forEach(function (element) {
                    sendStr = sendStr + element.str;
                });
                console.log('lang', codinate.lang);
                console.log('ques1', sendStr.indexOf(codinate.ques1));
                console.log('ques2', sendStr.indexOf(codinate.ques2));
                console.log('ques3', sendStr.indexOf(codinate.ques3));
                console.log('ques4', sendStr.indexOf(codinate.ques4));
                console.log('ques5', sendStr.indexOf(codinate.ques5));

                var object = {
                    lang: codinate.lang,
                    description: sendStr.substring(0, sendStr.indexOf(codinate.ques1)),
                    ques1: codinate.ques1,
                    ans1: sendStr.substring(sendStr.indexOf(codinate.ques1) + codinate.ques1.length, sendStr.indexOf(codinate.ques2)),
                    ques2: codinate.ques2,
                    ans2: sendStr.substring(sendStr.indexOf(codinate.ques2) + codinate.ques2.length, sendStr.indexOf(codinate.ques3)),
                    ques3: codinate.ques3,
                    ans3: sendStr.substring(sendStr.indexOf(codinate.ques3) + codinate.ques3.length, sendStr.indexOf(codinate.ques4)),
                    ques4: codinate.ques4,
                    ans4: sendStr.substring(sendStr.indexOf(codinate.ques4) + codinate.ques4.length, sendStr.indexOf(codinate.ques5)),
                    ques5: codinate.ques5,
                    ans5: sendStr.substring(sendStr.indexOf(codinate.ques5) + codinate.ques5.length, sendStr.length)
                }
                finalarray.push(object);
            });
            res.send(finalarray);
        });

    },

    batchUpdate(req, res) {
        console.log('###################', req.body.id)
        con.query(
            `update product set ${req.body.batchKey}=? where product_id IN (${req.body.id})`, [req.body.batchValue], function (err, result) {

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

    searchFilterByValues(req, res) {

        con.query("SELECT * FROM `product` where category=? AND product_status=? ,brand=?", [req.body.searchValue1, req.body.searchValue2, req.body.searchValue3], function (err, result) {
            console.log('response from DB====', result)
            if (err)
                throw err;
            else {

                return res.status(200).json({
                    products: result
                })
            }
        })
    }



};
function shortIndex(arrayElement, element, index) {
    var returnvalue;
    if (arrayElement[arrayElement.length - index].x == element.x) {
        if (arrayElement[arrayElement.length - index].y > element.y) {
            returnvalue = shortIndex(arrayElement, element, index + 1);
        } else {
            arrayElement.length - index;

        }
    } else if (arrayElement[arrayElement.length - index].x > element.x) {
        if (arrayElement.length >= index + 1) {
            returnvalue = shortIndex(arrayElement, element, index + 1);
        } else {
            return arrayElement.length - index;
        }
    } else {
        return arrayElement.length - index + 1;
    }
    return returnvalue;
}