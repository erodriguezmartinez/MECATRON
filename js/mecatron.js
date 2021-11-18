/**
 * @file
Juego de MECATRON.
@author Esperanza Rogríguez Martínez <erodriguezmartinez.guadalupe@alumnado.fundacionloyola.net>.
@License GPL v3 o superior.
Año 2021
**/
'use strict'
/**
  Controlador principal del Juego
  **/
class Juego{
  constructor(){
    this.vista=new Vista();
    this.modelo=new Modelo();
    this.generadorPalabras=null;
    this.animador=null;
    this.divPrincipal=null;
    window.onload = this.iniciar.bind(this);
  }
  /**
    Poner en marcha el Juego
    **/
  iniciar(){
    //console.log("Iniciando...");
    //console.log(this)

    this.divPrincipal = document.getElementById('divPrincipal');
    this.vista.div=this.divPrincipal;
    this.generadorPalabras=window.setInterval(this.generarPalabra.bind(this),3000);
    this.animador=window.setInterval(this.vista.moverPalabra.bind(this.vista),300);
    window.onkeypress=this.pulsar.bind(app);
  }
  /**
    Generador de generador de palabras
    **/
  generarPalabra(){
    //  console.log("Generador de palabra nueva");
    let nuevaPalabra=this.modelo.crearPalabra();
    this.vista.dibujar(nuevaPalabra);
  }
  /**
   * Evento de antención a la pulsación del teclado.
   * 
   * @param {KeyboardEvent} evento Evento de la pulsación del teclado.
   */
  pulsar(evento){
    let letraPulsada = evento.key;
    //console.log("Evento capturado "+letraPulsada);
    //Busca todas las palabras que aparecen en el momento de pulsar
    let palabras=this.divPrincipal.querySelectorAll('.palabra');
    for(let palabra of palabras){
      let span= palabra.children.item(0);
      let nodoTexto= palabra.childNodes[1];
      let textoRestante= nodoTexto.nodeValue;
      let primeraLetraTextoRestante= textoRestante.charAt(0);
      //Comparamos la letra pulsada con la primera letra de las palabras visualizadas
      if(letraPulsada == primeraLetraTextoRestante){
        span.textContent += letraPulsada;
        nodoTexto.nodeValue = textoRestante.substring(1)

        //Si ha completado la palabra, lo eliminio y sumo puntos
        if(nodoTexto.nodeValue.length==0){
          palabra.remove();
          let puntos=this.modelo.sumarPunto(); /////ACABAR
          this.vista.dibujarPuntos(puntos); 
        }
      }else{
        //Ha fallado, repondo el texto de la palábra
        nodoTexto.nodeValue=span.textContent+nodoTexto.nodeValue;
        span.textContent='';
      }

    }
  }

}
/**
  Clase Vista que muestra el juego
  **/
class Vista{
  constructor(){
      this.div=null;  //div donde se desarrolla el juego
  }
  /**
    Dibuja el área de Juego
    @param nuevaPalabra (String) la nueva palabra
  **/
  dibujar(nuevaPalabra){
    let div=document.createElement('div');
    this.div.appendChild(div);
    let span = document.createElement('span');
    div.appendChild(span);
    div.appendChild(document.createTextNode(nuevaPalabra))
    div.classList.add('palabra')
    //TODO aleatorio
    div.style.top='0px';
    div.style.left=Math.floor(Math.random()*85)+'%';

  }
  dibujarPuntos(puntos){
    
    let divPuntos=document.getElementById('divPuntos');

    while(divPuntos.firstElementChild){   //Miestras que div tenga un primer hijo que borre a este
      divPuntos.removeChild(divPuntos.firstElementChild);
    }
  
    let dibujarPuntos = document.createElement('p');
    divPuntos.appendChild(dibujarPuntos);
    dibujarPuntos.appendChild(document.createTextNode(puntos));
  }

  /**
    Movimiento de la palabra hacia abajo
    **/
  moverPalabra(){
    //  console.log("Movimiento de palabra");
    //Busco todas las palabras del div
    let palabras=this.div.querySelectorAll('.palabra');
  //  console.log(palabras);
    //Para cada palabra,aumento su atributo top
    for(let palabra of palabras){
      let top=parseInt(palabra.style.top);
      top+=5;
      palabra.style.top=`${top}px`;
      
      //Cuando la palabra llega abajo del todo de la pantalla,esta se borra
      if(top==780){
        palabra.remove();
      }
    }
  //  let nuevaPalabra=this.modelo.crearPalabra();
    //this.vista.dibujar(this.divPrincipal,nuevaPalabra);
  }
}
/**
  Clase Modelo
**/
class Modelo{
  constructor(){
      this.palabras=['caballo','moto','castillo','escuela','palmera','zapatilla','botella','gafas','teléfono','mesa']
      this.puntos=0;
    }
    /**
      Devuelve una nueva palabra.
      Devuelve aleatoriamente un elemento del array de palabras.
      @return (String) Palabra generada.
      **/
    crearPalabra(){
      return this.palabras[Math.floor(Math.random()*this.palabras.length)]
    }
    sumarPunto(){
      return this.puntos+=1;  
    }
}

var app = new Juego();
