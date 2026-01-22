let respostaCorreta = 0;
let pontos = 0;

let faseAtual = 1;
let acertosSeguidos = 0;

const fases = {
    1: [1, 2, 5],
    2: [3, 4, 6],
    3: [7, 8, 9]
};

const ACERTOS_PARA_AVANCAR = 5;

function atualizarPontuacao() {
    document.getElementById("pontos").textContent = pontos;
}

function gerarQuestao() {
    document.getElementById("mensagem").textContent = "";

    const tabuadaDisponivel = fases[faseAtual];
    const a = tabuadaDisponivel[Math.floor(Math.random() * tabuadaDisponivel.length)];
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
        acertosSeguidos++;

        document.getElementById("mensagem").textContent =
            "Muito bem! +10 pontos ✅"
            `${acertosSeguidos} acertos seguidos 🔋`;

        atualizarPontuacao();

        verificarAvancoDeFase();

        setTimeout(gerarQuestao, 1200);
    } else {
        elemento.classList.add("errado");

        acertosSeguidos = 0;

        document.getElementById("mensagem").textContent =
            "Quase! Vamos tentar de novo 🙂";

        atualizarPontuacao();
    }
}

function verificarAvancoDeFase() {
    atualizarFase();
    if (acertosSeguidos >= ACERTOS_PARA_AVANCAR && faseAtual < 3) {
        faseAtual++;
        acertosSeguidos = 0;

        document.getElementById("mensagem").textContent =
            `🎉 Nova fase liberada! Fase ${faseAtual}`;
    }
}

function atualizarFase() {
    document.getElementById("faseAtual").textContent = faseAtual;
}

// Início do jogo
atualizarFase();
atualizarPontuacao();
gerarQuestao();
