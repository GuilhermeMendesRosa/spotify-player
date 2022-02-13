let musicas = [
    {titulo:"Black Summer", artista:"Red Hot Chili Peppers", src:"./assets/audios/black.mp3", img:"./assets/images/rhcp.jpg", background:"background-image: linear-gradient(30Deg, #1F1F1F,  #DB2E28, #212121);"}, 
    {titulo:"Mask Off Old-School", artista:"2pac", src:"./assets/audios/2pac.mp3", img:"./assets/images/2pac.jpg", background:"background-image: linear-gradient(30Deg, #A0A0A0,  #252525, #7A7B7A);"},
    {titulo:"starboy slowed", artista:"The Weeknd", src:"./assets/audios/starboy-slowed.mp3", img:"./assets/images/starboy.jpg", background:"background-image: linear-gradient(30Deg, #B871DB,  #966ADD, #352741);"},
    {titulo:"stressed out slowed", artista:"Twenty One Pilots", src:"./assets/audios/stressed-out.mp3", img:"./assets/images/stress.jpg", background:"background-image: linear-gradient(30Deg, #9C6C84,  #3B3758, #997927);"}

]

let musica = document.querySelector("Audio");
let index = 0;
let tocando = false;

let slider = document.querySelector("#slider")

let duracaoMusica = document.querySelector(".fim")
let imagem = document.querySelector(".capa");
let nomeMusica = document.querySelector(".descricao h2");
let nomeArtista = document.querySelector(".descricao em")
let background = document.querySelector("body");

let indexDaUltimaMusica = musicas.length -1;

renderizarMusica();

duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))



// Eventos

document.querySelector(".alternar").addEventListener("click", alternarPlayPause)

musica.addEventListener("timeupdate", atualizarBarra);

slider.addEventListener("click", definirTempo)

document.querySelector(".anterior").addEventListener("click", () => {
    tocando = false;
    index--;
    if (index < 0){
        index = indexDaUltimaMusica;
    }
    renderizarMusica(index);
    musica.pause()
    alternarPlayPause()
});

document.querySelector(".proxima").addEventListener("click", () => {
    tocando = false;
    index++;
    if (index > 3) {
        index = 0;
    }
    renderizarMusica(index);
    musica.pause()
    alternarPlayPause()
});

// Funções

function renderizarMusica (ìndex) {
    musica.setAttribute("src", musicas[index].src);
    musica.addEventListener('loadeddata', () => {        
        imagem.src = musicas[index].img;
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))
        background.setAttribute("style", musicas[index].background)
        slider.max = Math.floor(musica.duration);
    });
    
} 

function alternarPlayPause () {
    if (tocando == false) {
        musica.play();
        document.querySelector(".alternar").setAttribute("src", "./assets/images/icons/pause.png")
        tocando = true;
    } else {
        musica.pause();
        document.querySelector(".alternar").setAttribute("src", "./assets/images/icons/play.png")
        tocando = false;
    }
}

function atualizarBarra () {
    slider.value = Math.round(musica.currentTime);
    let tempoDecorrido = document.querySelector(".inicio");
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));

}

function segundosParaMinutos (segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = "0" + campoSegundos;
    }

    return campoMinutos + ":" + campoSegundos;
}

function definirTempo(){
    musica.currentTime = slider.value;  
}