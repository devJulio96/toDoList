const texto = document.getElementById("textoTarefa");
const btnInserir = document.getElementById("btnInserir");
const listaCompleta = document.getElementById("listaTarefas"); //Div que onde serão inseridas as tarefas
const contador = document.getElementById("contador");

//Adiciona tarefa ao array tarefasNovas
const adicionarTarefa = () => {
  if (texto.value != "") {
    tarefasTotais++;
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

//Invoca a função adicionarTarefa ao clicar no botão
btnInserir.addEventListener("click", adicionarTarefa);

//Invoca a função adicionarTarefa ao apertar a tecla Enter
texto.addEventListener("keyup", (tecla) => {
  if (tecla.key == "Enter") {
    adicionarTarefa();
  }
});

const criarBotoes = () => {
  const lista = [...listaCompleta.childNodes];

  for (const tarefa of lista) {

    tarefa.firstChild.addEventListener("click", () => {
      tarefa.firstChild.checked
        ? tarefa.setAttribute("class", "tarefaCompleta")
        : tarefa.setAttribute("class", "tarefaIncompleta");
    });

    tarefa.lastChild.addEventListener("click", () => {
      tarefa.remove();
    });
  }
};
