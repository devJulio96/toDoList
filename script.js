let tarefasTotais = 0;
let tarefasCompletas = 0;
const texto = document.getElementById("textoTarefa");
const btnInserir = document.getElementById("btnInserir");
const btnUpload = document.getElementById("upload");
const btnDownload = document.getElementById("download");
const visorTarefas = document.getElementById("visorTarefas");
const contadorTarefas = document.getElementById("contador");
const uploadArquivo = document.getElementById("inputArquivo");

const renderizarNumeroTarefas = ()=>{
  contadorTarefas.innerHTML = `Tarefas: ${tarefasTotais} Completas: ${tarefasCompletas}`;
}
renderizarNumeroTarefas();

const renderizarTarefa = () => {
  if (texto.value != "") {
    tarefasTotais++;
    adicionarTarefa();
    renderizarNumeroTarefas();
    texto.value = "";

    if(texto.className ==="alertaTarefa"){
      texto.setAttribute("placeholder", "Qual sua tarefa?");
      texto.classList.replace("alertaTarefa", "inputTarefa");
    }
    
  } else {
    texto.setAttribute("placeholder", " X Insira uma tarefa");
    texto.classList.replace("inputTarefa", "alertaTarefa");
  }
};

const criarElemento = (elemento, atributo, valorAtributo) => {
  const elementoCriado = document.createElement(`${elemento}`);
  elementoCriado.setAttribute(`${atributo}`, `${valorAtributo}`);
  return elementoCriado;
}

const adicionarTarefa = () => {
  const espacoTarefa = criarElemento("div", "class", "tarefaIncompleta");
  const verificador = criarElemento("input", "type", "checkbox");
  const textoTarefa = criarElemento("p", "class", "texto");
  const iconeLixeira = criarElemento("i", "class", "fa-solid fa-trash-can");
  
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
  espacoTarefa.append(verificador, textoTarefa, iconeLixeira);
  visorTarefas.appendChild(espacoTarefa);
};

btnInserir.addEventListener("click", renderizarTarefa);

texto.addEventListener("keyup", (tecla) => {
  if (tecla.key == "Enter") {
    renderizarTarefa();
  }
});

btnDownload.addEventListener("click",()=>{
  const tarefasIncompletas = ["Tarefas Incompletas"];
  const tarefasCompletas = ["Tarefas Completas"];

  if(visorTarefas.hasChildNodes()){

    for(const tarefa of visorTarefas.childNodes) {
      if(tarefa.className === "tarefaIncompleta"){
        tarefasIncompletas.push(tarefa.firstChild.nextSibling.innerHTML)
      } else {
        tarefasCompletas.push(tarefa.firstChild.nextSibling.innerHTML)
      }
    }
    
    const incompletas = tarefasIncompletas.join("\n");
    const completas = tarefasCompletas.join("\n");
    
    const blob = new Blob([incompletas, "\n\n", completas], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
  
    link.href = url;
    link.download = "Lista de Tarefas.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  } else {
    texto.setAttribute("placeholder", " X Insira uma tarefa");
    texto.classList.replace("inputTarefa", "alertaTarefa");
  }
})

btnUpload.addEventListener("click",()=>{
  uploadArquivo.click()
})

uploadArquivo.addEventListener("change", (evt)=>{
  const arquivo = evt.target.files[0];
  
  if(arquivo){
    visorTarefas.innerHTML = "";
    tarefasTotais = 0;
    tarefasCompletas = 0;
    
    const tipoArquivo = arquivo.type;
    if (tipoArquivo === "text/plain" || tipoArquivo === "text/csv") {
      const leitor = new FileReader();

      leitor.onload = (evt) =>{
        const conteudosDoArquivo = evt.target.result;
        const conteudos = conteudosDoArquivo.split('\n');

        const completas = [];
        let ehTarefaCompleta = false;

        for(const conteudo of conteudos){
          if(conteudo ==="Tarefas Completas"){
            ehTarefaCompleta = true;
          }

          if(ehTarefaCompleta){
            completas.push(conteudo);
          }

          if(conteudo != "Tarefas Incompletas" && conteudo != "Tarefas Completas" && conteudo !=''){
            texto.value = conteudo;
            renderizarTarefa();
          }
        }

        completas.shift()

        for(const tarefa of visorTarefas.childNodes){
          if(completas.includes(tarefa.getElementsByTagName("p")[0].innerHTML)){
            tarefa.firstChild.click()
          };
        }
      }
      leitor.readAsText(arquivo);
    }
  }
})