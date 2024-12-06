const texto = document.getElementById("textoTarefa");
const btnInserir = document.getElementById("btnInserir");
const listaCompleta = document.getElementById("listaTarefas"); //Div que onde serão inseridas as tarefas

let numTarefa = 0;

//Adiciona tarefa ao array tarefasNovas
const adicionarTarefa = () => {
  if (texto.value != "") {
    numTarefa++;
    exibirTarefa();
    criarBotoes();
    texto.value = "";
  } else {
    alert("Digite uma Tarefa");
  }
};

//Exibe a tarefa na listaCompleta
const exibirTarefa = () => {
  //Cria os elementos para inserir na lista
  const espacoTarefa = document.createElement("div");
  const verificador = document.createElement("input");
  const textoTarefa = document.createElement("p");
  const botaoDeletar = document.createElement("i");

  //Adiciona os atributos de estilização e tipo aos elementos necessários
  espacoTarefa.setAttribute("class", "tarefaIncompleta");
  verificador.setAttribute("type", "checkbox");
  botaoDeletar.setAttribute("class", "fa-solid fa-trash-can");

  //Insere o texto do paragrafo `textoTarefa`
  textoTarefa.innerHTML = `${texto.value}`;

  //Acidiona os elementos criados à lista completa de tarefas
  espacoTarefa.appendChild(verificador);
  espacoTarefa.appendChild(textoTarefa);
  espacoTarefa.appendChild(botaoDeletar);
  listaCompleta.appendChild(espacoTarefa);
};

const criarBotoes = () => {
  const lista = [...listaCompleta.childNodes];

  lista.map((tarefa, numero) => {
    tarefa.addEventListener("click", (evt) => {
      if (evt.target == lista[numero].lastChild) {
        //Esse é um botão da Lixeira: deleta a tarefa que foi clicada;
        lista[numero].remove();
      } else if (evt.target == lista[numero].firstChild) {
        //Esse é um checkbox que altera a cor da tarefa
        evt.target.checked === true
          ? lista[numero].setAttribute("class", "tarefaCompleta")
          : lista[numero].setAttribute("class", "tarefaIncompleta");
      }
    });
  });
};

//Invoca a função adicionarTarefa ao clicar no botão
btnInserir.addEventListener("click", adicionarTarefa);

//Invoca a função adicionarTarefa ao apertar a tecla Enter
texto.addEventListener("keyup", (tecla) => {
  if (tecla.key == "Enter") {
    adicionarTarefa();
  }
});


