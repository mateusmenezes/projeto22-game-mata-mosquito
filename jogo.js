var altura = 0;
var largura = 0;
var vidas = 1;

function RedimensionaPalco(){
    // essa largura e altura está pegando do objeto window pelos metodos o tamanho da janela
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(altura, largura);
}
RedimensionaPalco();


function posicaoRandom(){

    // removendo elementos HTML caso exista
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove();
        if(vidas > 3){
            // O objeto de localização contém informações sobre o URL atual.
            window.location.href = 'fim_jogo.html';

        }else{
            document.getElementById('v' + vidas).src = './imagens/coracao_vazio.png';
            vidas++;
        }
    }
    
    /* 
    gerando numeros aleatorios(Só geram valores entre 0 e 1)
    math.floor faz o arrendondamento do valor para baixo
    Math tem que ser escrito com inicio maiusculo.
    */ 
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0? 0: posicaoX;
    posicaoY = posicaoY < 0? 0: posicaoY;


/*
    criando elementos HTML
*/

    var mosquito = document.createElement('img');
    mosquito.src = "./imagens/mosca.png";
    mosquito.className = tamanhoRandomico() + ' ' + ladoAleatorio();
    mosquito.id = 'mosquito';
    document.body.appendChild(mosquito);
    mosquito.style.position = 'absolute';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.left = posicaoX + 'px';
    mosquito.onclick = function (){
        // o objeto this faz referencia ao proprio elemento que está chamando


        this.remove()
    }
}

function tamanhoRandomico(){
    var classe = Math.floor(Math.random() * 3);
    switch(classe){
        case 0:
            return 'mosquito';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}

function ladoAleatorio(){
    var lado = Math.floor(Math.random() * 2);
    switch (lado) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }

}

/*
    implementando cronometro
 */

var tempo = 10;
var cronometro;
var funcao = function(){

    // innerHTML retorna o valor que está entre os nós. EXEMPLO <div> teste </div>
    tempo--;
    if (tempo < 0 ) {
        if(vidas <= 3){
            clearInterval(cronometro);
            clearInterval(criaMosquito);
            window.location.href = 'vitoria.html';
        }else{
            window.location.href = 'fim_jogo.html';
        }
        
    }else{
        document.getElementById('cronometro').innerHTML =  tempo;
    }

    
}
cronometro = setInterval(funcao, 1000);


/*
    recuperando a string do nivel 
*/


// o search pega somente a parte querystring (string de consulta é aquilo que fica do lado direito do ponto de interrogação na URL(inclusive o proprio ?))
var nivel = window.location.search;
var criaMosquitoTempo = 1500;
// tirar um caractere da string
nivel = nivel.replace('?', '');

if (nivel ==='nivel1') {
    // tempo de 1500
    var criaMosquitoTempo = 1500;
}else if(nivel === 'nivel2'){
    // tempo de 1000
    var criaMosquitoTempo = 1000;
}else if(nivel === 'nivel3'){
    // tempo de 750
    var criaMosquitoTempo = 750;
}

