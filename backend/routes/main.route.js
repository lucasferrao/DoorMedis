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
 app.get('/moloniGetFornecedor/', controllerMoloni.obterFornecedor);
 app.get('/moloniGetProdutos/', controllerMoloni.obterProdutos);
 app.get('/moloniGetCategoriasProdutos/', controllerMoloni.obterCategorias);
 app.get('/moloniGetPedidoEncomenda/', controllerMoloni.obterPedidoEncomenda);
 app.post('/moloniGetProdutosCategoria/', controllerMoloni.obterProdutosCategoria);
 app.post('/novaEncomenda/', controllerMoloni.novaEncomenda);
 app.put('/putEncomenda/', controllerMoloni.putEncomendas);
 app.post('/moloniGetNovoProduto/', controllerMoloni.novoProduto);
 app.put('/putNovoProduto/', controllerMoloni.putProduto);
 
 
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

