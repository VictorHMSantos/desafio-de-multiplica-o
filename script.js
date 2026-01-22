let respostaCorreta = 0;
let pontos = 0;

function atualizarPontuacao() {
    document.getElementById("pontos").textContent = pontos;
}

function gerarQuestao() {
    document.getElementById("mensagem").textContent = "";

    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    respostaCorreta = a * b;

    document.getElementById("conta").textContent = `${a} × ${b} = ?`;

    let respostas = new Set();
    respostas.add(respostaCorreta);

    while (respostas.size < 4) {
        let erro = respostaCorreta + Math.floor(Math.random() * 11) - 5;
        if (erro > 0) respostas.add(erro);
    }

    respostas = Array.from(respostas).sort(() => Math.random() - 0.5);

    const opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

    respostas.forEach(valor => {
        const bateria = document.createElement("div");
        bateria.className = "bateria";
        bateria.addEventListener("click", () => verificarResposta(bateria, valor));

        const corpo = document.createElement("div");
        corpo.className = "corpo";

        const nivel = document.createElement("div");
        nivel.className = "nivel";

        const altura = Math.min((valor / 81) * 100, 100);
        nivel.style.height = altura + "%";

        corpo.appendChild(nivel);

        const numero = document.createElement("div");
        numero.className = "numero";
        numero.textContent = valor;

        bateria.appendChild(corpo);
        bateria.appendChild(numero);

        opcoesDiv.appendChild(bateria);
    });
}

function verificarResposta(elemento, valor) {
    if (valor === respostaCorreta) {
        elemento.classList.add("correto");
        pontos += 10;
        document.getElementById("mensagem").textContent = "Muito bem! +10 pontos ✅";
        atualizarPontuacao();

        setTimeout(gerarQuestao, 1200);
    } else {
        elemento.classList.add("errado");
        pontos = Math.max(0, pontos - 5);
        document.getElementById("mensagem").textContent = "Tente novamente −5 pontos ❌";
        atualizarPontuacao();
    }
}

// Início do jogo
atualizarPontuacao();
gerarQuestao();
