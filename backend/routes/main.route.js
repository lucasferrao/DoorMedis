//Application routes
//app require
const app = require('../server');
const auth = require("../middleware/auth");

//Evoke all needed controllers
const controllerCliente = 
    require('../controllers/cliente.controller.js');
const controllerEncomenda = 
    require('../controllers/encomenda.controller.js');
const controllerEstafeta = 
    require('../controllers/estafeta.controller.js');
const controllerFarmacia = 
    require('../controllers/farmacia.controller.js');
const controllerProduto = 
    require('../controllers/produto.controller.js');
const controllerStock = 
    require('../controllers/stock.controller.js');
const controllerJasmin = 
    require('../controllers/jasmin.controller.js');
const controllerMoloni = 
    require('../controllers/moloni.controller.js');
const controllerHubspot = 
    require('../controllers/hubspot.controller.js');    

//Default route
app.get('/', function(req, res) {
    res.send("DoorMedis");
    res.end();
});

//Rotas
 //Cliente
 app.get('/clientes/', controllerCliente.read);
 app.get('/clientes/:id', controllerCliente.readID);
 app.post('/clientes/', /*isLoggedIn,*/ controllerCliente.save);
 app.put('/clientes/:id',/*isLoggedIn,*/ /*isLoggedIn,*/ controllerCliente.update);
 app.put('/clientes/del/:id',/*isLoggedIn,*/ controllerCliente.deleteL);
 app.delete('/clientes/:id',/*isLoggedIn,*/ controllerCliente.deleteP);

 //Encomenda
 app.get('/encomendas/', controllerEncomenda.read);
 app.get('/encomendas/:id', controllerEncomenda.readID);
 app.post('/encomendas/', controllerEncomenda.save);
 app.put('/encomendas/:id', controllerEncomenda.update);

 //Estafeta
 app.get('/estafetas/', controllerEstafeta.read);
 app.get('/estafetas/:id', controllerEstafeta.readID);
 app.post('/estafetas/',/* isLoggedIn,*/ controllerEstafeta.save);
 app.put('/estafetas/:id',/* isLoggedIn, isLoggedIn,*/ controllerEstafeta.update);
 app.put('/estafetas/del/:id', /*isLoggedIn,*/ controllerEstafeta.deleteL);
 app.delete('/estafetas/:id',/* isLoggedIn,*/ controllerEstafeta.deleteP);

 //Farmácia
 app.get('/farmacias/', controllerFarmacia.read);
 app.get('/farmacias/:id', controllerFarmacia.readID);
 app.post('/farmacias/',/* isLoggedIn,*/ controllerFarmacia.save);
 app.put('/farmacias/:id',/* isLoggedIn, isLoggedIn,*/ controllerFarmacia.update);
 app.put('/farmacias/del/:id', /*isLoggedIn,*/ controllerFarmacia.deleteL);
 app.delete('/farmacias/:id',/* isLoggedIn,*/ controllerFarmacia.deleteP);

 //Produto
 app.get('/produtos/', controllerProduto.read);
 app.get('/produtos/:id', controllerProduto.readID);
 app.post('/produtos/', controllerProduto.save);
 app.delete('/produtos/:id', controllerProduto.deleteP);

 //Stock
 app.get('/stocks/', controllerStock.read);
 app.get('/stocks/:id', controllerStock.readID);
 app.post('/stocks/', controllerStock.save);
 app.put('/stocks/:id', controllerStock.update);

 //Jasmin
 app.get('/jasminArtigosInventario/', controllerJasmin.obterArtigosInventario);
 app.get('/jasminListaEncomendas/', controllerJasmin.obterListaEncomendas);
 app.get('/jasminProdutosFarmacia/', controllerJasmin.obterProdutosFarmacia);


 //Moloni
 app.post('/moloniGetToken/', controllerMoloni.obterToken);
 app.post('/moloniGetFornecedor/', controllerMoloni.obterFornecedor);
 app.post('/moloniGetProdutos/', controllerMoloni.obterProdutos);
 app.post('/moloniGetPedidoEncomenda/', controllerMoloni.obterPedidoEncomenda);
 app.post('/novaEncomenda/', controllerMoloni.novaEncomenda);

 //Hubspot
 //app.post('/hubspotGetToken/', controllerHubspot.obterTokenHubspot);

//Verify if a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    else {
        res.status(jsonMessages.login.unauthorized.status).send(jsonMessages.login.unauthorized);
        return next();
    }
}

module.exports = app;

