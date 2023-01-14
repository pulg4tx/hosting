 
// Author: Ing (c)  Cristian David Arango Torres
// Primer bootcamp "piscina-42" UTP sobre fullstack
// Date: 2022/01/13
//         Technologic University of Pereira 


let icons = [] //Variable para guardar los diferentes iconos
let selections = [] //variable para guardar los numeros de tarjetas ya seleccionadas 
var cont = 0; //variable para almacenar el numero de aciertos
makeTable() //ejecucion de funcion por primera vez
var beat = null; //variable para almacenar el audio

function uploadIcons() { //cargar los iconos de las tarjetas a el arreglo icons
    icons = [
        '<img src="./img/parejas-001.png" alt="pareja001">',
        '<img src="./img/parejas-001.png" alt="pareja001">',
        '<img src="./img/parejas-002.png" alt="pareja002">',
        '<img src="./img/parejas-002.png" alt="pareja002">',
        '<img src="./img/parejas-003.png" alt="pareja003">',
        '<img src="./img/parejas-003.png" alt="pareja003">',
        '<img src="./img/parejas-004.png" alt="pareja004">',
        '<img src="./img/parejas-004.png" alt="pareja004">',
        '<img src="./img/parejas-005.png" alt="pareja005">',
        '<img src="./img/parejas-005.png" alt="pareja005">',
        '<img src="./img/parejas-006.png" alt="pareja006">',
        '<img src="./img/parejas-006.png" alt="pareja006">',
        '<img src="./img/parejas-007.png" alt="pareja007">',
        '<img src="./img/parejas-007.png" alt="pareja007">',
        '<img src="./img/parejas-008.png" alt="pareja008">',
        '<img src="./img/parejas-008.png" alt="pareja008">',
    ]

    shuffle(icons); //llamadoa la funcion shuffle para desordenar el arreglo icons
}

function shuffle(icons) { //funcion utilizada para mezclar el arreglo icons y dejar las imagenes aleatoriamente organizadas
    return icons.sort(() => Math.random() - 0.5);
}

function makeTable() { //funcion para generar la tabla del juego mediante el ID juego
    uploadIcons() //llamamos la funcio para cargar los iconos en el arreglo icons
    selections = [] //vaciamos el arreglo por si tiene algo adentro
    let row_n //variable para almacenar el contenido HTML de la fila del juego
    for (let j = 0; j < 4; j++) { //ciclo para recorrer las filas y guardar las cartas
        row_n = document.getElementById(`row_n${j}`) //obtener el ID de cada una de las filas
        let cards = [] //variable para gurdar el codigo de las tarjetas 
        for (let i = 0; i < 4; i++) { //ciclo para generar cuatro tarjetas por cada una de las filas
            cards.push(`
                <div class="area-tarjeta" onclick="selectionCards(${(j * 4) + i})">
                    <div class="tarjeta none" id="tarjeta${(j * 4) + i}">
                        <div class="cara trasera" id="trasera${(j * 4) + i}">
                            ${icons[0]}
                        </div>
                        <div class="cara superior">
                            <img src="./img/tarjeta_cubierta.png" alt="cubierta">
                        </div>
                    </div>
                </div>        
                `) //guardar en el arreglo las 4 cartas generadas
            icons.splice(0, 1) //eliminar de el arreglo
        }

        row_n.innerHTML = cards.join(" ") //agregar el codigo. (innerHTML reemplaza en el codigo HTML) (.join convierte el arreglo en una cadena de texto separada con un espacio)       

        cards = []; //vacio la variable para generar otras 4 cartas
    }

    for (let n = 0; n < 16; n++) { //animacion de cada tarjeta en la entrada
        let cards_n = document.getElementById("tarjeta" + n) //obtenemos el contenido dentro de la etiqueta
        setTimeout(() => { //delay
            cards_n.classList.toggle("none"); //quitarle la clase none para que se muestre la tarjeta
        }, 200 + (150 * n));

        setTimeout(() => { //delay
            cards_n.classList.add("cardAnimation"); //añadimos la clase cardAnimation para que se vea la animacion
        }, 200 + (150 * n));
    }
}

function selectionCards(i) {
    let cards = document.getElementById("tarjeta" + i) //obtiene el contenido de la etiqueta con el ID
    if (cards.style.transform != "rotateY(180deg)") { //sino esta volteada
        cards.style.transform = "rotateY(180deg)" //cambia el estilo y la voltea
        selections.push(i) //pone el numero de la tarjeta en el arreglo selections
    }
    if (selections.length == 2) { //cuando esten dos seleccionadas
        comparationCards(selections) //las comparamos con la funcion comparationCards
        selections = [] //reiniciamos las tarjetas seleccionadas
    }
}

function comparationCards(selections) { //funcion utilizada para comparar las cartas, reproducir los audios y llamar los modales
    setTimeout(() => { //setTimeout es para darle tiempo
        let backFace1 = document.getElementById("trasera" + selections[0]) //obtengo el contenido de la parte trasera de la carta
        let backFace2 = document.getElementById("trasera" + selections[1]) //obtengo el contenido de la parte trasera de la carta
        if (backFace1.innerHTML != backFace2.innerHTML) { //si el html de las 2 tarjetas es diferente entonces no coinciden las tarjetas
            let card1 = document.getElementById("tarjeta" + selections[0]) //obtengo el contenido de la carta
            let card2 = document.getElementById("tarjeta" + selections[1]) //obtengo el contenido de la carta
            card1.style.transform = "rotateY(0deg)" //la volteamos de nuevo
            card2.style.transform = "rotateY(0deg)" //la volteamos de nuevo
            beat = new Audio('./audio/incorrecta.mp3'); //reproducimos el audio de la carta incorrecta
            beat.play(); 
        } else { //si coinciden
            beat = new Audio('./audio/correcta.mp3'); //reproducimos el audio de la carta correcta
            beat.play();
            var img = backFace1.querySelector("img"); //selecciono la etiqueta img
            var alt = img.getAttribute("alt"); //consulto el contenido del atributo alt
            beat = new Audio("./audio/" + alt + ".mp3"); //reproducimos el audio correspondiente a la carta
            beat.play();
            if (cont < 8) { //si son menos de 8 aciertos contador de aciertos
                updateModal(alt);
                cont += 1; //sumo uno al contador de aciertos
            }
        }
    }, 1000); //1000 milisegundos = 1 segundo para que se voltee la carta de nuevo (sino son par)
}

function setModalText(objectClass) { //funcion para seleccionar el texto del modal correspondiente a la pareja de cartas
    let string = ''
    switch (objectClass) {
        case 'pareja004':
            string = 'El villancico es un género de cancion cuya letra hace referencia a la navidad.';
            break;
        case 'pareja006':
            string = 'A la nanita nana es un villancio compuesto por Jeremías Quintero, oriundo de Barbacoas, Nariño.';
            break;
        case 'pareja005':
            string = 'La palabra tutaina es utilizada en Perú para referirse coloquialmente a una fiesta pequeña, por lo que el título de este villancico se refiere a la celebración de la tradicional novena de aguinaldos.';
            break;
        case 'pareja002':
            string = 'En Ecuador, México, Colombia, Guatemala, El Salvador, Venezuela, Perú, Argentina, Chile y Canarias, la figura del niño Jesús se coloca despúes de la llegada de la navidad.';
            break;
        case 'pareja007':
            string = 'A las novenas se les llama "Las posadas" y son fiestas populares de Mexico, Honduras, Guatemala, El Salvador, Costa Rica, Nicaragua y Panamá.';
            break;
        case 'pareja008':
            string = 'En las posadas, cada uno de los nueve días representa un valor, como humildad, fortaleza, desapego, caridad, confianza, justicia, pureza, alegría y generosidad.';
            break;
        case 'pareja003':
            string = 'El villancico es un género de canción cuya letra hace referencia a la navidad.';
            break;
        case 'pareja001':
            string = 'La primera celebración navideña en la que se montó un pesebre para la conmemoraciónd del nacimiento de Jesús fue en la nochebuena del año 1223, realizada por San Francisco de Asís.';
            break;
    }
    return string;
}   