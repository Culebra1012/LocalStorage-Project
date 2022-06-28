//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
//Almacena todos los tweets
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando el usarui agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo.
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        crearHTML()
    });
}



//Funciones
function agregarTweet(e){
    e.preventDefault();

    //Textarea donde el usuario escribe los tweets
    const tweet = document.querySelector('#tweet').value;

    //Validación de que se escribe el tweet.

    if(tweet === ''){
        mostrarError('Este campo no puede estar vacio')

        return; //Evita la ejecución de más lineas de codigo.
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Añadir al array de tweets el contenido

    tweets = [...tweets, tweetObj];
 
    //Una vez agregado el tweet vamos crear HTML

    crearHTML();

    //Reiniciar el formulario

    formulario.reset()
}

// Mostrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')


    // Insertar mensaje error en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    //Eliminar el mensaje de error despues de 2s
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}

//Muestra el listado en el HTML de lo tweets

function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach( tweet => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.textContent = 'X';

            //Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id)   
            }

            //Crear el HTML
            const li = document.createElement('li');

            // Añadir el texto
            li.innerText = tweet.tweet 

            //Asignar el boton de eliminar
            li.appendChild(btnEliminar)

            //Insertarlo en el html
            listaTweets.appendChild(li);
        });
    }
    
    sincronizarStorage();
}
//Agrega los Tweets actuales al Storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}
//Elimina el tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id)
    crearHTML()
}

//Limpiar el HTML

function limpiarHTML(){
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);    
    }
}