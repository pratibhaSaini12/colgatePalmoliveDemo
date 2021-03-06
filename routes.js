// const leadController = require('./leadController');
const userController=require('./userController');
const taskController=require('./taskController');
const productController=require('./productController');
const assetController=require('./assetController');
const uploadImageController=require("./uploadImageController");
const uploadPDFController=require("./uploadPDFController");
const GoogleDriveController=require("./CRON/cronController");

// const cronController = require('./CRON/cronController');
require('./CRON/cronController')


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  //Prodcuts
  app.get('/api/getAllProducts',productController.getAllProducts);
  app.get('/api/getProductByID',productController.getProductByID);
  app.post('/api/updateProductByID',productController.updateProductByID);
  app.post('/api/deleteProductByID',productController.deleteProductByID);
  app.get('/api/compareProducts',productController.compareProducts);
  app.get('/api/getSimilarProducts',productController.getSimilarProducts);
  app.post('/api/deleteProducts',productController.deleteProducts);
  app.post('/api/createProduct',productController.createProduct);
  app.post('/api/bulkProductDelete',productController.bulkProductDelete);
  app.get('/api/getProductCompletion',productController.getProductCompletion);
  app.get('/api/productContentUpdates',productController.productContentUpdates);

  //Assets
  app.get('/api/getAllImages',assetController.getAllImages);
  app.get('/api/getAllDocuments',assetController.getAllDocuments);
  app.post('/api/updateAsset',assetController.updateAsset);
  app.post('/api/deleteAsset',assetController.deleteAsset);
  app.post('/api/createNewAsset',assetController.createNewAsset);

  //Users
  app.get('/api/getUserDetails',userController.getUserDetails);
  app.get('/api/getAllUsers',userController.getAllUsers);
  app.post('/api/loginData',userController.loginData);

  //Task
  app.get('/api/getAllTasks',taskController.getAllTasks);
  app.get('/api/getTaskByUserID',taskController.getTaskByUserID);
  app.post('/api/createNewTask',taskController.createNewTask);
  app.post('/api/upload/image',uploadImageController.upploadImage);
  app.post('/api/upload/pdf',uploadPDFController.upploadPDF);
  app.get('/api/getAllOpenTask',taskController.getAllOpenTask);
  app.get('/api/getAllOpenTaskByUser',taskController.getAllOpenTaskByUser);
  
  app.post('/api/get-images',uploadImageController.getImages);
  app.post('/api/updateTaskByID',taskController.updateTaskByID);

  app.get('/api/getAssetList',assetController.getAssetList);
  app.get('/api/getAssetByID',assetController.getAssetByID);
  app.get('/api/get-asset',assetController.getAssets);
  app.post('/api/upload/asset',assetController.upploadAsset);
  app.get('/api/getAssetFromDrive',assetController.createAssetThroughDriv);
  app.post('/api/readpdf',productController.readPDf);
  app.get('/api/fetchfile',productController.fetchFile);
  app.post('/api/batchUpdate',productController.batchUpdate);

  app.post('/api/searchFilterByValues',productController.searchFilterByValues);
  app.post('/api/deleteAssetByID',assetController.deleteAssetByID);

// CRON JOBS
 //app.post('/api/listFiles',cronController.listFiles);  /*  CRON for fetching data from Google Drive*/

 app.post('/api/upload/additional_image',uploadImageController.additionalImage);
 app.get('/api/get-additional-image',uploadImageController.getImages);
 app.post('/api/compareassets',assetController.compareAssets);
 app.get('/api/uploadfilesfromgoogledrive',GoogleDriveController.getData);
 

};
