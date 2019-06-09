const leadController = require('./leadController');
const userController=require('./userController');
const taskController=require('./taskController');
const productController=require('./productController');
const assetController=require('./assetController');



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

  


};
