function demonstracaoCategorias() {
    async function fetchAsync() {
        const renderCategoria = document.getElementById("category_id");
        let txt = "";
        const response = await fetch('http://localhost:8080/moloniGetCategoriasProdutos/');
        const categorias = await response.json();
        
        //criação de uma tabela para demonstração dos resultados recebidos
        txt += "    <option disabled selected value> -- Selecione uma Categoria -- </option>";
        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        for (const categoria of categorias) {
            txt += "<option value=" + categoria.category_id + ">" + categoria.name + "</option>";
            
        }
        
        //console.log(categorias);
        //envia a tabela construida para a view e mostra no object com ID result
        renderCategoria.innerHTML = txt;
        
    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}

function demonstracaoCategoriasTabela() {
    async function fetchAsync() {
        const mostraCategorias = document.getElementById("categoriaTBody");
        let txt = "";
        const response = await fetch('http://localhost:8080/moloniGetCategoriasProdutos/');
        const categorias = await response.json();
        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        for (const categoria of categorias) {
            txt += `<tr>
             <td>${categoria.category_id}</td>
             <td>${categoria.name}</td>                
             <td>${categoria.description}</td>
             <th><button type="button" class="btn btn- btn-icon pull-right" onclick="demonstracaoProduto(${categoria.category_id})"><i class="fas fa-edit"></i></button></th>
             </tr>`;
        } 
        //envia a tabela construida para a view e mostra no object com ID result
        mostraCategorias.innerHTML = txt;
       
    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}


function demonstracaoProduto() {
    console.log(document.getElementById("category_id").value)
    var data = {};
    data.category_id = document.getElementById("category_id").value;
    /*async function fetchAsync() {
        const mostraProdutos = document.getElementById("produtoTBody");
        let txt = "";
        const response = await fetch('http://127.0.0.1:8080/moloniGetProdutosCategoria/');
        const Produtos = await response.json();
        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        let i = 0;
        for (const Produto of Produtos) {
            txt += `<tr>
            <td>${produto.product_id}</td>
            <td>${produto.name}</td>                
            <td>${produto.summary}</td>
            <td>${produto.reference}</td>
            <td>${produto.price}</td>
            <td>${produto.stock}</td>
            <td>${produto.minimum_stock}</td>
            <th><button type="button" class="btn btn- btn-icon pull-right" onclick="editarProduto(${produto.product_id})"><i class="fas fa-edit"></i></button></th>
            <th><button type="button" onclick="deleteProduto(${produto.product_id})" class="btn btn- btn-icon pull-right"><i class="fa fa-trash"></i></button></th>
            </tr>`;
        }*/



    async function fetchAsync() {

        const mostraProdutos = document.getElementById("produtoTBody");
        let txt = "";
        var Produtos = {};
        const response = await fetch('http://localhost:8080/moloniGetProdutosCategoria/',{
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                category_id: data.category_id
            })
        }).then(response => {
            return response.json();
        }).then(result => {
            console.log(result);
            Produtos = result;
        } )
        
        console.log(Produtos);

        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        for (const Produto of Produtos) {
            txt += `<tr>
            <td>${Produto.product_id}</td>
            <td>${Produto.name}</td>                
            <td>${Produto.summary}</td>
            <td>${Produto.reference}</td>
            <td>${Produto.price}</td>
            <td>${Produto.stock}</td>
            <td>${Produto.minimum_stock}</td>
            </tr>`;
        }
        //envia a tabela construida para a view e mostra no object com ID result
        mostraProdutos.innerHTML = txt;
    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("okkk")).catch(reason => console.log(reason.message));
}


window.onload = function () {

    demonstracaoCategorias(); //adicionar função de validação ao formulário
    demonstracaoCategoriasTabela(); //adicionar função de validação ao formulário
    demonstracaoProduto(); //adicionar função de validação ao formulário
};

