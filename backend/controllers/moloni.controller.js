var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moloni_access_token;
var moloni_refresh_token;
//var companyID = '179319';
var fornecedores = [];
var dadosFornecedor;
var produtos = [];
var dadosProdutos;
var encomenda = [];
var dadosEncomenda;

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
            fornecedores.push(dadosFornecedor[i].fornecedor_id);
        }
        console.log(dadosFornecedor);
        console.log(fornecedores);
    });

}

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
            produtos.push(dadosProdutos[i].produto_id);
        }
        console.log(dadosProdutos);
        console.log(produtos);
    });
}
function obterPedidoEncomenda() {
    obterToken();
    console.log("foi buscar o access_token");
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/supplierPurchaseOrder/getAll/?access_token=' + moloni_access_token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: { company_id: '179319' }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //res.status(200).send(body);
        dadosEncomenda = JSON.parse(response.body);
        for (var i = 0; i < dadosEncomenda.length; i++) {
            encomenda.push(dadosEncomenda[i].encomenda_id);
        }
        console.log(dadosEncomenda);
        console.log(encomenda);
    });
}
async function novaEncomenda(encomenda) {
    let token = await obterToken();
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/supplierPurchaseOrder/insert/?access_token=' + moloni_access_token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            company_id: '129778',
            date: new Date().toISOString(),
            expiration_date: new Date().toISOString(),
            document_set_id: encomenda.document_set_id,
            supplier_id: '1456493',
            our_reference: '',
            your_reference: '',
            financial_discount: '',
            products: [
                {
                    product_id: encomenda.product_id,//'82823347',
                    name: encomenda.name,//'Griponal',
                    summary: '',
                    qty: encomenda.qty,//'5',
                    price: encomenda.price, //'9.55',
                    discount: '',
                    order: '',
                    exemption_reason: '',
                }],
            taxes: [
                {
                    tax_id: encomenda.tax_id,//'2186600',
                    value: '', //'2.1965',
                    order: '',//'1',
                    cumulative: '0',
                }
            ],
            child_products: [{
                product_id: encomenda.produto_id,//'82823347',
                name: encomenda.name,//'Griponal',
                qty: encomenda.qty,//'5',
                price: encomenda.price,//'9.55'
                discount: '',
                deduction_id: '',
                order: '',
                origin_id: '',
                exemption_reason: '',
                warehouse_id: '',
                properties: [{
                    title: '',
                    value: '',
                }],
                taxes: [{
                    tax_id: encomenda.tax_id,
                    value: '',
                    order: '',
                    cumulative: '',
                }],
            }],
            exchange_currency_id: '',
            exchange_rate: '',
            notes: '',
            status: '',
        },
    }

        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            //res.send(body);
            //console.log("top")
        })
        return " no Moloni,"
        
    }

    module.exports = {
        obterToken: obterToken,
        obterFornecedor: obterFornecedor,
        obterProdutos: obterProdutos,
        obterPedidoEncomenda: obterPedidoEncomenda,
        novaEncomenda: novaEncomenda,
    }