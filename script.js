let tarefasTotais = 0;
let tarefasCompletas = 0;
const texto = document.getElementById("textoTarefa");
const btnInserir = document.getElementById("btnInserir");
const visorTarefas = document.getElementById("visorTarefas");
const contadorTarefas = document.getElementById("contador");
contadorTarefas.innerHTML = `Tarefas: ${tarefasTotais} Completas: ${tarefasCompletas}`;

const renderizarTarefa = () => {
  if (texto.value != "") {
    tarefasTotais++;
    adicionarTarefa();
    renderizarNumeroTarefas();
    texto.value = "";
  } else {
    alert("Digite uma Tarefa");
  }
};

const renderizarNumeroTarefas = ()=>{
  contadorTarefas.innerHTML = `Tarefas: ${tarefasTotais} Completas: ${tarefasCompletas}`;
}

const adicionarTarefa = () => {
  const espacoTarefa = document.createElement("div");
  const verificador = document.createElement("input");
  const textoTarefa = document.createElement("p");
  const iconeLixeira = document.createElement("i");

  espacoTarefa.setAttribute("class", "tarefaIncompleta");
  verificador.setAttribute("type", "checkbox");
  iconeLixeira.setAttribute("class", "fa-solid fa-trash-can");
  
  iconeLixeira.addEventListener("click",()=>{
    espacoTarefa.remove();
    tarefasTotais -=1;
    
    if(tarefasCompletas > 0 && espacoTarefa.className === "tarefaCompleta"){
      tarefasCompletas -=1;
    }

    renderizarNumeroTarefas();
  })
  
  verificador.addEventListener("click", ()=>{
    if(verificador.checked){
      espacoTarefa.setAttribute("class", "tarefaCompleta");
      tarefasCompletas++;
    } else{
      espacoTarefa.setAttribute("class", "tarefaIncompleta");
      tarefasCompletas -=1
    }
    renderizarNumeroTarefas();
  })

  textoTarefa.innerHTML = `${texto.value}`;

  espacoTarefa.appendChild(verificador);
  espacoTarefa.appendChild(textoTarefa);
  espacoTarefa.appendChild(iconeLixeira);
  visorTarefas.appendChild(espacoTarefa);
};

btnInserir.addEventListener("click", renderizarTarefa);

texto.addEventListener("keyup", (tecla) => {
  if (tecla.key == "Enter") {
    renderizarTarefa();
  }
});