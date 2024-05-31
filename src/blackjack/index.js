import _ from 'underscore';
// import { crearDeck, a } from './useCases/crear-deck'; // importación combinada: por defecto + independiente
// import { crearDeck as crearNuevoDeck } from './useCases/crear-deck'; // importacion con Alias

// import { crearDeck } from './useCases/crear-deck';
// import { pedirCarta } from './useCases/pedir-carta';
// import { valorCarta } from './useCases/valor-carta';

import { crearDeck, pedirCarta, valorCarta, turnoComputadora, crearCartaHTML } from './useCases'; // importación mediante archivo de barril 

/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

// deck = crearNuevoDeck( tipos, especiales ); // habría que llamar a la función con el nuevo Alias
deck = crearDeck( tipos, especiales );




// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta( deck );
    
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;
    
    const imgCarta = crearCartaHTML( carta );
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador, puntosHTML[1], divCartasComputadora, deck );

    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador, puntosHTML[1], divCartasComputadora, deck );
    }

});


btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador, puntosHTML[1], divCartasComputadora, deck );
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck( tipos, especiales );

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});
