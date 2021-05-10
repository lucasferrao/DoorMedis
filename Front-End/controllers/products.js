/*Produtos*/
//quando inicia a página faz
function demonstracaoProduto() {
    async function fetchAsync() {
        const mostraProdutos = document.getElementById("produtoTBody");
        let txt = "";
        const response = await fetch('http://localhost:8080/moloniGetProdutos/');
        const Produtos = await response.json();
        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        let i = 0;
        for (const Produto of Produtos) {
            txt += `<tr>
            <td>
            <input type="checkbox" name="produtos" value="${Produto.reference}">
            </td>
            <td>${Produto.product_id}</td>   
            <td>${Produto.name}</td>                
            <td>${Produto.summary}</td>
            <td>${Produto.reference}</td>
            <td>${Produto.price}</td>
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

function createList() {
    var productTable = document.getElementById('tableProducts');

    let array = [];
    //alert(productTable.rows.length)
    for (var i = 0; i < productTable.rows.length; i++) {
        var row = document.getElementsByTagName('tr')[i];
        var td = row.getElementsByTagName("td");
        if (td[0] != undefined && td[0].getElementsByTagName('input')[0].checked) {
            let obj = {
                product_id: td[1].innerHTML,
                name: td[2].innerHTML,
                summary: td[3].innerHTML,
                reference: td[4].innerHTML,
                price: td[5].innerHTML,
                qtd: td[6].getElementsByTagName('input')[0].value
            }
            array.push(obj);
        }

    }
    localStorage.setItem('listaCompras', JSON.stringify(array));
    window.location.assign("../tables.html");
}


window.onload = function () {
    //chama a função para atualizar os users
    demonstracaoProduto(); //adicionar função de validação ao formulário

};
