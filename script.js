var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        processarXML(this);
    }
};
xhttp.open("GET", "rank.xml", true);
xhttp.send();

function processarXML(xml) {
    var xmlDoc = xml.responseXML;
    var vendasOrdenadas = []; // Array para armazenar as vendas ordenadas

    var mesDoAno = xmlDoc.getElementsByTagName("mes_do_ano");
    for (var i = 0; i < mesDoAno.length; i++) {
        var mes = mesDoAno[i].getElementsByTagName("mes")[0].textContent;
        var dia = mesDoAno[i].getElementsByTagName("numero")[0].textContent;
        var turno = mesDoAno[i].getElementsByTagName("turno")[0].textContent;
        var vendas = mesDoAno[i].getElementsByTagName("venda");
        for (var j = 0; j < vendas.length; j++) {
            var funcionario = vendas[j].getElementsByTagName("funcionario")[0].textContent;
            var litros = parseFloat(vendas[j].getElementsByTagName("quantidade_litros")[0].textContent); // Converter para número
            var valor = parseFloat(vendas[j].getElementsByTagName("valor_vendido")[0].textContent); // Converter para número
            var comissao = parseFloat(vendas[j].getElementsByTagName("comissao")[0].textContent); // Converter para número

            // Adicionar a venda ao array de vendas ordenadas
            vendasOrdenadas.push({ mes: mes, dia: dia, turno: turno, funcionario: funcionario, litros: litros, valor: valor, comissao: comissao });
        }
    }

    // Ordenar as vendas pelo número de litros (do maior para o menor)
    vendasOrdenadas.sort(function(a, b) {
        return b.litros - a.litros;
    });

    // Limpar o corpo da tabela antes de adicionar as linhas
    var corpoTabela = document.getElementById("corpo-tabela");
    corpoTabela.innerHTML = "";

    // Adicionar as vendas ordenadas à tabela
    vendasOrdenadas.forEach(function(venda) {
        var novaLinha = corpoTabela.insertRow();
        novaLinha.insertCell().textContent = venda.mes;
        novaLinha.insertCell().textContent = venda.dia;
        novaLinha.insertCell().textContent = venda.turno;
        novaLinha.insertCell().textContent = venda.funcionario;
        novaLinha.insertCell().textContent = venda.litros;
        novaLinha.insertCell().textContent = venda.valor;
        novaLinha.insertCell().textContent = venda.comissao;
    });
}




function filtrarVendas() {
    var filtroMes = document.getElementById("filtroMes").value;
    var filtroDia = document.getElementById("filtroDia").value;
    var filtroTurno = document.getElementById("filtroTurno").value;

    var linhasTabela = document.querySelectorAll("#corpo-tabela tr");

    for (var i = 0; i < linhasTabela.length; i++) {
        var linha = linhasTabela[i];
        var celulas = linha.getElementsByTagName("td");

        var mes = celulas[0].innerHTML;
        var dia = celulas[1].innerHTML;
        var turno = celulas[2].innerHTML;

        if (filtroMes === "" || mes === filtroMes) {
            if (filtroDia === "" || dia === filtroDia) {
                if (filtroTurno === "" || turno === filtroTurno) {
                    linha.style.display = "";
                } else {
                    linha.style.display = "none";
                }
            } else {
                linha.style.display = "none";
            }
        } else {
            linha.style.display = "none";
        }
    }
}


function ordenarPorLitros() {
    // Selecionar as células da coluna de litros
    var celulasLitros = document.querySelectorAll("#corpo-tabela td:nth-child(5)");

    // Converter as células da coluna de litros em uma matriz de valores
    var valoresLitros = [];
    for (var i = 0; i < celulasLitros.length; i++) {
        valoresLitros.push(parseFloat(celulasLitros[i].textContent)); // Converter para número
    }

    // Ordenar a matriz de valores de litros
    valoresLitros.sort(function(a, b) {
        return b - a; // Ordenar do maior para o menor
    });

    // Reordenar as linhas da tabela de acordo com a ordem dos valores de litros
    var corpoTabela = document.getElementById("corpo-tabela");
    for (var i = 0; i < valoresLitros.length; i++) {
        var indice = valoresLitros.indexOf(parseFloat(celulasLitros[i].textContent)); // Encontrar o índice do valor
        corpoTabela.appendChild(corpoTabela.children[indice].cloneNode(true)); // Adicionar a linha na posição correta
    }
}


