/*Produtos*/
//quando inicia a página faz
function demonstracaoProduto() {
    async function fetchAsync() {
        const mostraProdutos = document.getElementById("produtoTBody");
        let txt = "";
        const response = await fetch('http://127.0.0.1:8080/moloniGetProdutos/');
        const Produtos = await response.json();
        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        let i = 0;
        for (const Produto of Produtos) {
            txt += `<tr>
            <td>${Produto.product_id}</td>
            <td>${Produto.name}</td>                
            <td>${Produto.summary}</td>
            <td>${Produto.reference}</td>
            <td>${Produto.price}</td>
            <td>${Produto.stock}</td>
            <td>${Produto.minimum_stock}</td>
            <th><button type="button" class="btn btn- btn-icon pull-right" onclick="editarProduto(${Produto.product_id})"><i class="fas fa-edit"></i></button></th>
            <th><button type="button" onclick="deleteProduto(${Produto.product_id})" class="btn btn- btn-icon pull-right"><i class="fa fa-trash"></i></button></th>
            </tr>`;
        }
        //envia a tabela construida para a view e mostra no object com ID result
        mostraProdutos.innerHTML = txt;
    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}

window.onload = function () {
    //chama a função para atualizar os users
    demonstracaoProduto(); //adicionar função de validação ao formulário


};
