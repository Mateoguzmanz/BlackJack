const miModulo = (() => {
    'use strict';
     
    let deck = [];
    const tipos = ['C','D','H','S'],
     especiales = ['A','J','Q','K']; 

    let puntosJugadores = []; 

    //Referencias Html
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHtml = document.querySelectorAll('small');
    
    //Esta funcion Inicializa el Juego 
       const inicilizarJuego = (numJugadores = 2) => {
       deck = crearDeck();

       puntosJugadores = [];
       for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0); 
       }

       puntosHtml.forEach(elem => elem.innerText = 0);
       divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false; 
    }    

    //Esta funcion crea un nuevo deck
    const crearDeck = () =>{

        deck = [];
        for(let i = 2; i<=10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }   
        }

        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push(especial + tipo)
            }
        }        
        return _.shuffle(deck);
    }

    //Esta funcion permite pedir carta 
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        } 
        return deck.pop();

    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10 
                : valor * 1;
    }

    //Turno: 0 = primer jugador y el ultimo será la computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }
        
    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            
            if (puntosComputadora === puntosMinimos) {
                alert('empate')
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana')
            } 
        }, 100);
    }

    //Evento: Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length -1 );
      
        }
        while ((puntosComputadora < puntosMinimos) && (puntosMinimos<=21));
        determinarGanador();
    }

     //Evento Pedir
     btnPedir.addEventListener('click', () => {
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        
        crearCarta(carta, 0);
        
        if (puntosJugador > 21) {
            console.warn('Perdiste el Juego');   
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora (puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21!!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora(puntosJugador);
        } 
    })

    btnDetener.addEventListener('click', () => {
       
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    // btnNuevo.addEventListener('click', () => {
    //     inicilizarJuego();
    // });

    return {
       nuevoJuego: inicilizarJuego
    };
})();




