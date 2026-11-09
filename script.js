//arrays obrigatorios
let nomesProdutos = [];
let precosProdutos = [];
let totaisVendas = [];
//armazenam os dados durante a execução do programa


// exibe menu principal
//sem parâmetros mas com retorno
function exibirMenu() {
    let opcao = prompt(
        "SISTEMA DE LANCHONETE\n\n" +
        "1. Cadastrar produto\n" +
        "2. Listar produtos cadastrados\n" +
        "3. Realizar venda\n" +
        "4. Consultar total de vendas do dia\n" +
        "5. Encerrar o sistema\n\n" +
        "Informe o número da opção desejada:"
    );
    
    // se for cancelada/fechada, retorna opcao 5 de encerrar
    return opcao ? Number(opcao.trim()) : 5;
}


//cadastrar o produto
//sem parametros, sem retorno
function cadastrarProduto() {
    let nome = prompt("Digite o nome do produto:");
    
    //nome nao vazio
    if (!nome || nome.trim() === "") {
        alert("O nome do produto não pode estar vazio!");
        return;
    }
    
    nome = nome.trim();

    
    //nao deixa cadastrar denovo um produto com o mesmo nome
    let nomeMinusculo = nome.toLowerCase();
    for (let i = 0; i < nomesProdutos.length; i++) {
        if (nomesProdutos[i].toLowerCase() === nomeMinusculo) {
            alert("Erro: Já existe um produto com este nome!");
            return;
            }
    }
    
    let precoInput = prompt("Informe o preço unitário do produto (ex: 12.50):");
    let preco = Number(precoInput);
    
    // validação de valor maior que 0
    if (isNaN(preco) || preco <= 0) {

        alert("O preço precisa ser um valor numérico e maior que zero!");
        return;
    }
    
    //guarda nos arrays e mantem correspondência pelos índices
    nomesProdutos.push(nome);
    precosProdutos.push(preco);
    
    alert(`Produto "${nome}" cadastrado por R$ ${preco.toFixed(2)}!`);
}


//listar produtos
//sem parametro, sem retorno
function listarProdutos() {

    //ve se existe produto cadastrado
    if (nomesProdutos.length === 0) {
        alert("Erro! Nenhum produto cadastrado no momento.");
        return;
    }
    
    let listaTexto = "PRODUTOS DISPONÍVEIS:\n\n";
    
    //percorre arrays e faz a lista com os codigos (indice + 1)
    for (let i = 0; i < nomesProdutos.length; i++) {
        let codigo = i + 1;
        let nome = nomesProdutos[i];
        let preco = precosProdutos[i].toFixed(2);
        
        listaTexto += `[Código ${codigo}] ${nome} - R$ ${preco}\n`;
    }
    

    alert(listaTexto);
}


//calcular total das vendas
//com parametros e retorno

function calcularTotalVenda(preco, quantidade) {
    return preco * quantidade;
}


//calcular desconto
//com parametros e retornoo
//acima de 50 - 10%
function calcularDesconto(total) {
    if (total > 50) {
        return total * 0.10; //10%
    }
    return 0; //0 de deseconto abaixo de 50
}



//mostrar resumo venda
//com parametro sem retorno
function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {
    let valorFinal = subtotal - desconto;
    
    let resumo = "=== RESUMO DA VENDA ===\n\n" +
        `Produto: ${nome}\n` +
        `Preço unitário: R$ ${preco.toFixed(2)}\n` +
        `Quantidade: ${quantidade}\n` +
        `Subtotal: R$ ${subtotal.toFixed(2)}\n` +
        `Desconto: R$ ${desconto.toFixed(2)}\n` +
        `\n` +
        `Valor a pagar: R$ ${valorFinal.toFixed(2)}`;
        
    alert(resumo);
}


//realizar venda
// sem paremetro sem retorno
function realizarVenda() {
    if (nomesProdutos.length === 0) {
        alert("Erro: Não há produtos cadastrados para realizar vendas!");
        return;
    }
    
    //mostra os disponiveis
    listarProdutos();
    
    //pede codigo
    let codigoInput = prompt("Digite o CÓDIGO do produto desejado:");
    let codigo = Number(codigoInput);
    let indice = codigo - 1; //ajusta o código do usuário para o índice do array (0-indexed)
    
    // ve se o produto existe/ta cdastrado
    if (isNaN(codigo) || indice < 0 || indice >= nomesProdutos.length) {
        alert("Erro: Produto inexistente! Informe um código válido da lista.");
        return;
    }
    
    // pede quantia
    let qtdInput = prompt(`Digite a quantidade desejada para "${nomesProdutos[indice]}":`);
    let quantidade = Number(qtdInput);
    
    // quantidade precisa ser um num inteiro e maior que 0
    if (isNaN(quantidade) || quantidade <= 0 || !Number.isInteger(quantidade)) {
        alert("A quantidade deve ser um número inteiro maior que zero");
        return;
    }
    
    let nome = nomesProdutos[indice];
    let preco = precosProdutos[indice];
    
    
    // calcula subtotal e desconto usando as funcoes pedidas
    let subtotal = calcularTotalVenda(preco, quantidade);
    let desconto = calcularDesconto(subtotal);
    let valorFinal = subtotal - desconto;
    
    //mostra resumo de venda
    exibirResumoVenda(nome, preco, quantidade, subtotal, desconto);
    
    // confirma e registra venda no array totaisVendas
    let confirmar = confirm("Deseja confirmar esta venda?");
    if (confirmar) {
        totaisVendas.push(valorFinal);
        alert("Venda concluída e registrada com sucesso!");
    } else {
        alert("Venda cancelada pelo operador.");
    }

}


//soma total de vendas do dia
// sem parametro, com retorno
function obterTotalVendasDia() {
    let soma = 0;
    for (let i = 0; i < totaisVendas.length; i++) {
        soma += totaisVendas[i];
    }

    return soma;
}


//mostra total de vendas
//sem parametros sem retorno
function exibirTotalVendasDia() {
    if (totaisVendas.length === 0) {
        alert("Não existem vendas registradas no dia até o momento.");
        return;
    }
    
    let qtdVendas = totaisVendas.length;
    let valorTotal = obterTotalVendasDia();
    
    let relatorio = "VENDAS DO DIA: \n\n" +
        `Quantidade de vendas: ${qtdVendas}\n` +
        `Valor total vendido: R$ ${valorTotal.toFixed(2)}`;

        
    alert(relatorio);
}



//controle do menu
// Controla navegação do menu
function iniciarSistema() {
    let opcao;
    
    do {
        opcao = exibirMenu();
        
        switch (opcao) {
            case 1:
                cadastrarProduto();
                break;
            case 2:
                listarProdutos();
                break;
            case 3:
                realizarVenda();
                break;
            case 4:
                exibirTotalVendasDia();
                break;
            case 5:
                alert("Encerrando o sistema!");
                break;
            default:
                alert("Opção inválida! Escolha um número de 1 a 5.");
        }
    } while (opcao !== 5);
}



// roda programa automaticamente ao carregar a página
iniciarSistema();