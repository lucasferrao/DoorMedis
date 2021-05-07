//Application routes
//app require
const app = require('../server');
const auth = require("../middleware/auth");
//Evoke all needed controllers
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
 //Jasmin
 app.post('/jasminGetToken/', controllerJasmin.obterToken);
 app.get('/jasminArtigosInventario/', controllerJasmin.obterArtigosInventario);
 app.get('/jasminListaEncomendas/', controllerJasmin.obterListaEncomendas);
 app.get('/jasminProdutosFarmacia/', controllerJasmin.obterProdutosFarmacia);


 //Moloni
 app.get('/vamos/', controllerMoloni.obterToken);
 app.post('/moloniGetFornecedor/', controllerMoloni.obterFornecedor);
 app.post('/moloniGetProdutos/', controllerMoloni.obterProdutos);
 app.post('/moloniGetCategoriasProdutos/', controllerMoloni.obterCategorias);
 app.post('/moloniGetPedidoEncomenda/', controllerMoloni.obterPedidoEncomenda);
 app.post('/moloniGetProdutosCategoria/', controllerMoloni.obterProdutosCategoria);
 app.post('/novaEncomenda/', controllerMoloni.novaEncomenda);
 app.post('/putEncomenda/', controllerMoloni.putEncomendas);
 app.post('/novoProduto/', controllerMoloni.novoProduto);
 app.post('/novoProduto/', controllerMoloni.putProduto);
 
 
 //app.post('/novaProduto/', controllerMoloni.inserirProduto);
 

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

