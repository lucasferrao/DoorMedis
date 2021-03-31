//Application routes
//app require
const app = require('../server');
//Evoke all needed controllers
const controllerCliente = 
    require('../controllers/cliente.controller.js');
const controllerEncomenda = 
    require('../controllers/encomenda.controller.js');
const controllerEstafeta = 
    require('../controllers/estafeta.controller.js');
const controllerFarmacia = 
    require('../controllers/farmacia.controller.js');
const controllerCarrinho = 
    require('../controllers/carrinho.controller.js');
const controllerProduto = 
    require('../controllers/produto.controller.js');
const controllerStock = 
    require('../controllers/stock.controller.js');


//Default route
app.get('/', function(req, res) {
    res.send("DoorMedis");
    res.end();
});

//Rotas
 //Cliente
 app.get('/clientes/', controllerCliente.read);
 app.get('/clientes/:id', controllerCliente.readByID);
 app.post('/clientes/', isLoggedIn, controllerCliente.save);
 app.put('/clientes/:id', isLoggedIn, isLoggedIn, controllerCliente.update);
 app.put('/clientes/del/:id', isLoggedIn, controllerCliente.deleteL);
 app.delete('/clientes/:id', isLoggedIn, controllerCliente.deleteP);

 //Encomenda
 app.get('/encomendas/', controllerEncomenda.read);
 app.get('/encomendas/:id', controllerEncomenda.readByID);
 app.post('/encomendas/', controllerEncomenda.save);
 app.put('/encomendas/:id', controllerEncomenda.update);

 //Estafeta
 app.get('/estafetas/', controllerEstafeta.read);
 app.get('/estafetas/:id', controllerEstafeta.readByID);
 app.post('/estafetas/', isLoggedIn, controllerEstafeta.save);
 app.put('/estafetas/:id', isLoggedIn, isLoggedIn, controllerEstafeta.update);
 app.put('/estafetas/del/:id', isLoggedIn, controllerEstafeta.deleteL);
 app.delete('/estafetas/:id', isLoggedIn, controllerEstafeta.deleteP);

 //Farmácia
 app.get('/farmacias/', controllerFarmacia.read);
 app.get('/farmacias/:id', controllerFarmacia.readByID);
 app.post('/farmacias/', isLoggedIn, controllerFarmacia.save);
 app.put('/farmacias/:id', isLoggedIn, isLoggedIn, controllerFarmacia.update);
 app.put('/farmacias/del/:id', isLoggedIn, controllerFarmacia.deleteL);
 app.delete('/farmacias/:id', isLoggedIn, controllerFarmacia.deleteP);

 //Produto
 app.get('/produtos/', controllerProduto.read);
 app.get('/produtos/:id', controllerProduto.readByID);
 app.post('/produtos/', controllerProduto.save);
 app.delete('/produtos/:id', controllerProduto.deleteP);

 //Stock
 app.get('/stocks/', controllerStock.read);
 app.get('/stocks/:id', controllerStock.readByID);
 app.post('/stocks/', controllerStock.save);
 app.put('/stocks/:id', controllerStock.update);

//Carrinho
app.get('/carrinhos/', controllerCarrinho.read);
app.get('/carrinhos/:id', controllerCarrinho.readByID);
app.post('/carrinhos/', controllerCarrinho.save);
app.put('/carrinhos/:id', controllerCarrinho.update);

module.exports = app;

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