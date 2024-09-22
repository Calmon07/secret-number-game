//lista dos números secretos
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
//Variável para armazenar a função.
let numeroSecreto = gerarNumeroAleatorio();
//Variável para contar as tentativas de chute.
let tentativas = 1;

//Essa função permite colocar o texto que quiser na tag que desejar.
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  mensagemTitulo = `Escolha um número entre 1 e ${numeroLimite}`;
  exibirTextoNaTela("p", mensagemTitulo);
}
exibirMensagemInicial();

//Essa função verifica se o chute que você deu é correto ou não, além de informar se o número gerado é maior ou menor que o seu chute
function verificarChute() {
  let chute = document.querySelector("input").value;
  console.log(chute == numeroSecreto);

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    //Caso você tenha tentado acertar mais de uma vez, irá ser "tentativas", se acertar de primeira, será "tentativa".
    //Essa variável somente verifica se você acertou de primeira ou não, podendo ser "tentativa" ou "tentativas".
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";

    //Essa variável printa em quantas tentativas você acertou.
    let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`;
    exibirTextoNaTela("p", mensagemTentativas);

    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número é menor que esse chute!");
    } else {
      exibirTextoNaTela("p", "O número é maior que esse chute!");
    }
    //Caso você erre o chute, o número de tentativas será incrementado em 1.
    tentativas++;
    limparCampo();
  }
}

//Essa função gera um número aleatório. Se a lista dos números secretos conter esse número, ele irá gerar um novo número, se não, ela irá adicionar ele no final da lista dos números sorteados
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;

  exibirMensagemInicial();

  document.getElementById("reiniciar").setAttribute("disabled", true);
}
