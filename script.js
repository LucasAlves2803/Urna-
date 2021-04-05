let seuvotopara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector(".d-1-3");


let etapaAtual = 0;
let numero = '';
let votos = [];

let voto_branco = false;

function comecarEtapa(){
    seuvotopara.style.display = 'none';
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    for (let i=0; i < etapa['numeros']; i++){
        if (i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        }else{
            numeroHtml += '<div class="numero"></div>';
        }
    }
    cargo.innerHTML = etapa['titulo'];
    descricao.innerHTML = '';
    lateral.innerHTML = '';
    aviso.style.display = 'none';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa['candidatos'].filter((item)=>{
        if (item.numero === numero){
            item.votos++;
            return true;
        }else{
            return false;
        }
    });
    if (candidato.length > 0){
        candidato = candidato[0];
        seuvotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br> Número: ${candidato.numero}`
        let fotosHtml = '';
        for (let i=0; i < candidato.fotos.length; i++){
            if (candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"> <img src="Imagens/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda} </div>`
            }else{
                fotosHtml += `<div class="d-1-image"><img src="Imagens/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda} </div>`    
            }
            
        }

        lateral.innerHTML = fotosHtml;
    }else{
        etapa['candidatos'].filter((obj)=>{
                if (obj.nome === 'Nulo'){
                    obj.votos++;
                }
            })
        descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO NULO </div>'; 
    }


     

  
}

function confirma(){
    let voto_confirmado = false;
    let etapa = etapas[etapaAtual];
    if (voto_branco === true || numero.length === etapa.numeros){
        voto_confirmado = true
        numero = '';
    }

    if (voto_confirmado){
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined){
            numero = '';
            comecarEtapa();
        }
        else{
            seuvotopara.style.display = 'none';
            aviso.style.display = 'none';
            document.querySelector(".tela").innerHTML= '<div class="aviso--gigante pisca"> FIM </div>';
            resultado();
        }
    }
}

function resultado(){
    for (let i=0; i < etapas.length; i++){
        etapa = etapas[i]['candidatos'];
        console.log(etapas[i]['titulo']);
        for (let j=0; j < etapa.length; j++){
            votos.push(etapa[j]);
            console.log(etapa[j]['nome'] + " " + etapa[j]['numero'] + " " + etapa[j]['votos']);
        }
    }
}
comecarEtapa();
// resultado
function clicou(n){
    let elnumero = document.querySelector('.numero.pisca');
    if (elnumero !== null){
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;
        elnumero.classList.remove('pisca');
        if (elnumero.nextElementSibling !== null){
            elnumero.nextElementSibling.classList.add('pisca');
        }
        else{
            atualizaInterface();
        }
    }
}

function corrige(){
    numero = '';
    comecarEtapa();
}



function branco(){
    if (numero === ''){
        voto_branco = true;
        seuvotopara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO </div>'; 

    }
}


