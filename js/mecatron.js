/**mecatron.js
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
    this.generadorPalabras=window.setInterval(this.generarPalabra.bind(this),1000);
    this.animador=window.setInterval(this.vista.moverPalabra.bind(this.vista),100);
  }
  /**
    Generador de generador de palabras
    **/
  generarPalabra(){
    //  console.log("Generador de palabra nueva");
    let nuevaPalabra=this.modelo.crearPalabra();
    this.vista.dibujar(nuevaPalabra);
  }

}
/**
  Clase Vista que muestra el juego
  **/
class Vista{
  constructor(){
      this.div=null;
  }
  /**
    Dibuja el área de Juego
    @param nuevaPalabra (String) la nueva palabra
  **/
  dibujar(nuevaPalabra){
    let div=document.createElement('div');
    this.div.appendChild(div);
    div.appendChild(document.createTextNode(nuevaPalabra))
    div.classList.add('palabra')
    //TODO aleatorio
    div.style.top='0px';
    div.style.left=Math.floor(Math.random()*85)+'%';
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
      this.palabras=['caballo','moto','castillo','escuela','palmera','zapatilla','botella']
  }
    /**
      Devuelve una nueva palabra
      @return (String) Palabra generada
      **/
    crearPalabra(){
      return this.palabras[Math.floor(Math.random()*this.palabras.length)]
    }
}


var app = new Juego();
