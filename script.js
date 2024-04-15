var vendasData = {}; // Variável global para armazenar os dados das vendas
var meses = vendasData.vendas;
var frentistas = [];
var dados = [];

var inputM = document.querySelector("#filtroMes");

console.log(inputM)

inputM.addEventListener("change", () => {

    if(inputM.value == "todos"){
       
        carregarDadosVendas()
    }else{
        limparTabela();
    }


})

function carregarDadosVendas() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                vendasData = JSON.parse(this.responseText);
                console.log("Dados de vendas carregados:", vendasData);
                FiltroTodos();
                
            } else {
                console.error("Erro ao carregar dados de vendas:", this.status);
            }
        }
    };
    xhttp.open("GET", "vendas.json", true);
    xhttp.send();
}

carregarDadosVendas(); // Chamar a função para carregar os dados de vendas ao carregar a página






function FiltroTodos() {
    
        var meses = vendasData.vendas;
        for(var m = 0; m < meses.length; m++){
            var mes = meses[m];
            var dias = mes.dias;

            for(var d = 0; d < dias.length; d++){
                var dia = dias[d];
                var turnos = dia.turnos

                dia.turnos.forEach(turno => {
                    var funcionarios = turno.vendedores;
            
                    funcionarios.forEach(TotalLitros =>{
                        var nome = TotalLitros.nome;
                        var litros = TotalLitros.quantidade_litros;
                        var valor = TotalLitros.valor_vendido;
                        
                        var novoItem = {
                            mes: mes.mes,
                            dia: dia.dia,
                            turno: turno.turno,
                            nome: nome,
                            litros: litros,
                            valor: valor
                        };

                        dados.push(novoItem);
                        
                       
                    })    
                })
               
            }
        }
        todos(dados);
}


console.log(dados)

function adicionarLinhaTabela(turno, funcionario, litros, valor, comissao) {
    var corpoTabela = document.getElementById("corpo-tabela");

    var novaLinha = corpoTabela.insertRow();

    

    var celulaTurno = novaLinha.insertCell();
    celulaTurno.textContent = turno;

    var celulaFuncionario = novaLinha.insertCell();
    celulaFuncionario.textContent = funcionario;

    var celulaLitros = novaLinha.insertCell();
    celulaLitros.textContent = litros;

    var celulaValor = novaLinha.insertCell();
    celulaValor.textContent = valor;

    var celulaComissao = novaLinha.insertCell();
    celulaComissao.textContent = comissao;
}

function limparTabela() {
    var corpoTabela = document.getElementById("corpo-tabela");
    corpoTabela.innerHTML = ""; // Define o conteúdo do corpo da tabela como vazio
}

function todos(dados) {
    var totaisPorNome = {}; // Usando um objeto em vez de um array
    var dadosCombinados = [];

    dados.forEach(function(item) {
        var nome = item.nome;
        
        if (totaisPorNome[nome]) {
            // Se já existir, atualize os totais existentes
            totaisPorNome[nome].litros += item.litros;
            totaisPorNome[nome].valor += item.valor;
        } else {
            // Se não existir, crie um novo objeto de total por nome
            totaisPorNome[nome] = {
                mes: "Todos",
                dia: "Todos",
                turno: item.turno,
                nome: nome,
                litros: item.litros,
                valor: item.valor
            };
        }
    });

    // Converta o objeto totaisPorNome em um array dadosCombinados
    Object.keys(totaisPorNome).forEach(function(nome) {
        var total = totaisPorNome[nome];
        dadosCombinados.push({
            turno: total.turno,
            nome: total.nome,
            litros: total.litros,
            valor: total.valor
        });
    });

    console.log(dadosCombinados);

    // Adicione as linhas na tabela usando os dados combinados
    dadosCombinados.forEach(function(item) {
        adicionarLinhaTabela( item.turno, item.nome, item.litros, item.valor , item.valor*0.008);
    });
}
