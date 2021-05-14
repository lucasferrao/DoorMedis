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

//quando inicia a página faz
window.onload = function () {
    //chama a função para atualizar os users
    demonstracaoCategorias(); //adicionar função de validação ao formulário
    
    document.getElementById("formNovoProduto").onsubmit = function (e) {
       
    };

    
    function saveProduto() {
        var data = {};
        data.name = document.getElementById("name").value;
        data.category_id = document.getElementById("category_id").value;
        data.summary = document.getElementById("summary").value;
        data.reference = document.getElementById("reference").value;
        data.price = document.getElementById("price").value;
        data.stock = document.getElementById("stock").value;
        data.minimum_stock = document.getElementById("minimum_stock").value;

        console.log(data); //debugging para ver os dados que foram enviados
        //chamada fetch para envio dos dados para o servior via POST
        fetch('http://localhost:8080/moloniGetNovoProduto/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function (response) {
            if (!response.ok) {
                console.log(response.status); //=> number 100–599
                console.log(response.statusText); //=> String
                console.log(response.headers); //=> Headers
                console.log(response.url); //=> String
            /*    if (response.status === 409) {
                    alert("Duplicated Email");
                } else {
                    throw Error(response.statusText);
                }   */
            } else {
                document.getElementById("formNovoProduto").reset(); //limpeza dos dados do form
                alert("submitted with success");
                //refreshProduto();
            }
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            alert("Submission error"); console.error(err);
        });
    }
    document.getElementById("createbutton").addEventListener("click", function () {
        saveProduto();
    });

    
    function demonstracaoCategorias() {
        async function fetchAsync() {
            const renderCategoria = document.getElementById("category_id");
            let txt = "";
            const response = await fetch('http://localhost:8080/moloniGetCategoriasProdutos/');
            const categorias = await response.json();
            //criação de uma tabela para demonstração dos resultados recebidos
            txt += "    <option disabled selected value> -- Selecione uma categoria -- </option>";
            //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
            for (const categoria of categorias) {
                 txt += "<option value=" + categoria.category_id + ">" + categoria.name + "</option>";
            }
            //envia a tabela construida para a view e mostra no object com ID result
            renderCategoria.innerHTML = txt;
            }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("deu")).catch(reason => console.log(reason.message));
    }
        
    
    
};   


window.onload = function () {
    //chama a função para atualizar os users
    demonstracaoProduto(); //adicionar função de validação ao formulário


};
