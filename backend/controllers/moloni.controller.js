
//const { request} = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moloni_access_token;
var moloni_refresh_token;
//var moloni = require('moloni');
var { moloni } = require('../config/moloniconfig.js')
var fornecedores = [];
/*var categorias = [];
var companyID = '179319';
var fornecedores = [];
var produtos = [];
var dadosProdutos;
var encomenda = [];
var dadosEncomenda;
const querystring = require('querystring');
const { ok } = require('assert');
const { constants } = require('fs');

*/
var request = require('request');

function obterToken() {
    var url = "https://api.moloni.pt/v1/grant/?grant_type=password&client_id=doormedis&client_secret=9b83a502ef2b0a8733192c45fcfdf9dea9d4fc6c&username=a89262@alunos.uminho.pt&password=isi2021";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    var jsonStructure = '[' + xmlHttp.responseText + ']';
    var json = JSON.parse(jsonStructure);
    moloni_access_token = json[0]["access_token"];
    moloni_refresh_token = json[0]["refresh_token"];
    console.log("moloni_access_token: " + moloni_access_token + " moloni_refresh_token: " + moloni_refresh_token);
}

/*
function obterProdutos() {
    obterToken();
    console.log("foi buscar o access_token");
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/products/getAll/?access_token=' + moloni_access_token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: { company_id: '179319' }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //res.status(200).send(body);
        dadosProdutos = JSON.parse(response.body);
        for (var i = 0; i < dadosProdutos.length; i++) {
            produtos.push(dadosProdutos[i].product_id);
        }
        console.log(dadosProdutos);
        console.log(produtos);
    });
}
/*
function obterCategorias() {
    obterToken();
    console.log("foi buscar o access_token");
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/productCategories/getAll/?access_token=' + moloni_access_token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            company_id: '179319',
            parent_id: 0

        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //res.status(200).send(body);
        dadosProdutos = JSON.parse(response.body);
        for (var i = 0; i < dadosProdutos.length; i++) {
            categorias.push(dadosCategorias[i].category_id);
        }
        console.log(dadosCategorias);
        console.log(categorias);
    });
}*/

function obterFornecedor() {
    obterToken();
    console.log("foi buscar o access_token");
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/suppliers/getAll/?access_token=' + moloni_access_token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: { company_id: '179319' }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //res.status(200).send(body);
        dadosFornecedor = JSON.parse(response.body);
        for (var i = 0; i < dadosFornecedor.length; i++) {
            fornecedores.push(dadosFornecedor[i].supplier_id);
        }
        console.log(dadosFornecedor);
        console.log(fornecedores);
    });

}

function obterCategorias(req, res) {

    moloni.productCategories('getAll', {
        company_id: '179319', parent_id: '0'
    }, function (error, result) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.send(result);
        }
    })
}

//------------------------------------PRODUTOS-------------------------------------//

function obterProdutos(req, res) {

    moloni.products('getAll', {

        company_id: '179319',
        //category_id: req.body.category_id

    }, function (error, result) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.send(result);
        }
    })
};
function putProduto(req, res) {

    moloni.products('update', {
  
      company_id: '179319',
      category_id: req.body.category_id,
      type: '1',
      name: req.body.name,
      summary: req.body.summary,
      reference: req.body.reference,
      ean: '',
      price: req.body.price,
      unit_id: '1562053',
      has_stock: '1',
      stock: req.body.stock,
      minimum_stock: req.body.minimum_stock,
      pos_favorite: '0',
      at_product_category: 'M',
      exemption_reason: 'M06',
      product_id: req.body.product_id,
      taxes: ''
  
    }, function (error, result) {
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        res.send(result);
      }
    })
  };

function obterProdutosCategoria(req, res) {

    moloni.products('getAll', {

        company_id: '179319',
        category_id: req.body.category_id

    }, function (error, result) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.send(result);
        }
    })
};
async function novoProduto(req, res) {

    await obterToken();
    var products = req.body.products;
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/products/insert/?access_token=',
        qs: { access_token: '' + moloni_access_token },
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'PHPSESSID=4rl1rtu9g2ghd7p745auj7j825'
        },
        form: {
            company_id: '179319',
            category_id: req.body.category_id,
            type: '1',
            name: req.body.name,
            //summary: req.body.summary,
            reference: req.body.reference,
            //ean: '',
            price: req.body.price,
            unit_id: '1562053',
            has_stock: '1',
            stock: req.body.stock,
           // minimum_stock: req.body.minimum_stock,
            //pos_favorite: '0',
            //at_product_category: 'M',
            exemption_reason: 'M06',
            //product_id: req.body.product_id,
            taxes: ''
        }
    };
      request(options, function(error, response, body) {
            if (error) throw new Error(error);
            res.status(200).send(body);
            console.log("ja esta")
        });
}
 //-------------------------ENCOMENDAS---------------------------//

async function obterPedidoEncomenda(req, res) {

    await obterToken()
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/supplierPurchaseOrder/getAll/',
        qs: { access_token: '' + moloni_access_token },
        'headers': {
            'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
            'Cookie': 'PHPSESSID=4rl1rtu9g2ghd7p745auj7j825'
        },
        form: {
            company_id: '179319' //unico parametro obrigatório
        }
    };
    request(options, function (error, response, body) {
        result = (JSON.parse(body));
        res.send(result);
        console.log(result);
    });
}

function putEncomendas(req, res) {
    obterToken()
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/supplierPurchaseOrder/update/',
        qs: { access_token: '' + moloni_access_token },
        'headers': {
            'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded']
        },
        form: {
            company_id: '179319',
            date: req.body.date,
            expiration_date: '2021-07-06',
            document_id: '398384493',
            supplier_id: '1456493',

            products: [{
                product_id: req.body.product_id,
                name: req.body.name,
                qty: req.body.qty,
                price: '0',
                taxes: [{
                    tax_id: '2186600'
                }]
            }],
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
};
async function novaEncomenda(req, res) {

    await obterToken();
    var products = req.body.products;
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/supplierPurchaseOrder/insert/',
        qs: { access_token: '' + moloni_access_token },
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'PHPSESSID=4rl1rtu9g2ghd7p745auj7j825'
        },
        form: {
            company_id: '179319',
            date: new Date(),
            expiration_date: '26-05-2021',
            document_set_id: '399346',
            supplier_id: '1456493',
            products: products[{
                product_id: req.body.product_id,
                name: req.body.name,
                qty: req.body.qty,
                price: '0',
                taxes: [{
                    tax_id: '2186600'
                }]
            }],
            //'products': products,
            // 'status': '1'
        }
    }
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.status(200).send(body);
        console.log("ja esta")
    });
}



module.exports = {
    obterToken: obterToken,
    obterProdutosCategoria: obterProdutosCategoria,
    obterFornecedor: obterFornecedor,
    obterCategorias: obterCategorias,
    obterProdutos: obterProdutos,
    putProduto: putProduto,
    obterPedidoEncomenda: obterPedidoEncomenda,
    novaEncomenda: novaEncomenda,
    putEncomendas: putEncomendas,
    novoProduto: novoProduto,
}