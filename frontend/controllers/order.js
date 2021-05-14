function demonstracaoProduto() {
    async function fetchAsync() {
        const mostraProdutos = document.getElementById("encomendaTBody");
        let txt = "";
        const response = await fetch('http://localhost:8080/moloniGetProdutos');
        const Produtos = await response.json();
        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        let i = 0;
        for (const Produto of Produtos) {
            txt += `<tr>
            <td style="display:none">${Produto.product_id}</td>
            <td>
            <input type="checkbox" name="produtos" value="${Produto.reference}">
            </td>
            <td>${Produto.name}</td>                
            <td>${Produto.summary}</td>
            <td>${Produto.reference}</td>
            <td>${Produto.stock}</td>
            <td>${Produto.minimum_stock}</td>
            <td> <div class="col-sm-3"> <input type="number" id="${Produto.reference}" min="0" class="form-control"></div></td>
            </tr>`;
            i++;
        }
        //envia a tabela construida para a view e mostra no object com ID result
        mostraProdutos.innerHTML = txt;
    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}


function createEncomenda() {

    var encomendaTable = document.getElementById('encomendaTable');

    let array = [];
    let obj = {
        "products": []
    }

    for (var i = 1; i < encomendaTable.rows.length; i++) {
        var row = document.getElementsByTagName('tr')[i];
        var td = row.getElementsByTagName("td");

            if (td[1] != undefined && td[1].getElementsByTagName('input')[0].checked) {
         obj.products.push( 
            
                {
                    "product_id": td[0].innerHTML,
                    "name": td[2].innerHTML,
                    "qty": td[7].getElementsByTagName('input')[0].value,
                    "price": "0",
                    "taxes": {
                        "tax_id": "2186600"
                    },
                    "exemption_reason": 'M01'
                }
            
            )
            }
    }
    console.log(obj)
    fetch('http://localhost:8080/novaEncomenda/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(function (response) {
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
            console.log(response.url); //=> String
        } else {
            alert(" Invoice submitted with success");
        }
        return response.json();
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        alert("Invoice submission error"); console.error(err);
    });
}
document.getElementById("myBtn").addEventListener("click", function () {
    createEncomenda();
});


async function demonstracaoEncomendas() {
    async function fetchAsync() {
        const mostraEncomendas = document.getElementById("encomendaTBody");
        let txt = "";
        console.log(txt)
        const response = await fetch('http://localhost:8080/moloniGetPedidoEncomenda/');
        const encomendas = await response.json();
        console.log("ola");
        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        for (const encomenda of encomendas) {
            txt += `<tr>
             <td>${encomenda.document_id}</td>
             <td>${encomenda.date}</td>
             <td>${encomenda.entity_name}</td>
             <td>${encomenda.gross_value}</td>
             <td>${encomenda.taxes_value}</td>  
             <td>${encomenda.net_value}</td>                   
             </tr>`;
        }
        //<td>${new Date(encomenda.date)}</td> 


        //envia a tabela construida para a view e mostra no object com ID result
        mostraEncomendas.innerHTML = txt;
        console.log("ola");
    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}

//quando inicia a página faz
window.onload = function () {
    demonstracaoProduto(); //adicionar função de validação ao formulário
    //chama a função para atualizar os users
    demonstracaoEncomendas(); //adicionar função de validação ao formulário
};