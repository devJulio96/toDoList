let tarefasTotais = 0;
let tarefasCompletas = 0;
const texto = document.getElementById("textoTarefa");
const btnInserir = document.getElementById("btnInserir");
const listaCompleta = document.getElementById("listaTarefas");
const contadorTarefas = document.getElementById("contador");
contadorTarefas.innerHTML = `Tarefas: ${tarefasTotais} Completas: ${tarefasCompletas}`;

//Adiciona tarefa ao array tarefasNovas
const adicionarTarefa = () => {
  if (texto.value != "") {
    tarefasTotais++;
    criarTarefas();
    exibirNumeroTarefas();
    texto.value = "";
  } else {
    alert("Digite uma Tarefa");
  }
};

const exibirNumeroTarefas = ()=>{
  contadorTarefas.innerHTML = `Tarefas: ${tarefasTotais} Completas: ${tarefasCompletas}`;
}

//Exibe a tarefa na listaCompleta
const criarTarefas = () => {
  //Cria os elementos para inserir na lista
  const espacoTarefa = document.createElement("div");
  const verificador = document.createElement("input");
  const textoTarefa = document.createElement("p");
  const iconeLixeira = document.createElement("i");

  //Adiciona os atributos de estilização e tipo aos elementos necessários
  espacoTarefa.setAttribute("class", "tarefaIncompleta");
  verificador.setAttribute("type", "checkbox");
  iconeLixeira.setAttribute("class", "fa-solid fa-trash-can");
  
  iconeLixeira.addEventListener("click",()=>{
    espacoTarefa.remove();
    tarefasTotais -=1;
    if(tarefasCompletas > 0){
      tarefasCompletas -=1;
    }
    exibirNumeroTarefas();
  })
  
  verificador.addEventListener("click", ()=>{
    if(verificador.checked){
      espacoTarefa.setAttribute("class", "tarefaCompleta");
      tarefasCompletas++;
    } else{
      espacoTarefa.setAttribute("class", "tarefaIncompleta");
      tarefasCompletas -=1
    }
    exibirNumeroTarefas();
  })

  //Insere o texto do paragrafo `textoTarefa`
  textoTarefa.innerHTML = `${texto.value}`;

  //Acidiona os elementos criados à lista completa de tarefas
  espacoTarefa.appendChild(verificador);
  espacoTarefa.appendChild(textoTarefa);
  espacoTarefa.appendChild(iconeLixeira);
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