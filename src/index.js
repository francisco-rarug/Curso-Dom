const appNode = document.querySelector('#app');
//Este metodo es para enviar a un mensaje al usuario cada vez que haga click sobre el h2 del contenedor
appNode.addEventListener('click', (event) => {
    if (event.target.nodeName === "H2"){
        window.alert('Hola, estas interesado en este tipo de palta?')
    } 
})
//const url = "https://platzi-avo.vercel.app/api/avo";

/* Cambiamos la url que tenemos por una url base
y lo que hacemos es agregarle atraves de  un template string
el resto de la url que teniamos en el fetch*/

const baseUrl='https://platzi-avo.vercel.app'
//Usando la api de monetizacion internacional
const formatPrice=(price)=>{
    const newPrice=new window.Intl.NumberFormat("en-EN",{
        style:"currency",
        currency: "USD",
    }).format(price)

    

return newPrice;
};

window
    .fetch(`${baseUrl}/api/avo`)
    .then(respuesta => respuesta.json())
    .then(responseJson =>{

        const todosLosItems = [];
        responseJson.data.forEach(item => {
        
        const imagen = document.createElement('img');
        /* Para asignar la url que obtenemos de la api
        a nuestra imagen lo hacemos en la propiedad src

        Si la agregaramos solo con lo que obtenemos de la API nos 
        daria un error ya que lo que obtenemos es una ruta obsuluta
        mas no una url por lo tanto nos dara error porque no
        encontraria la ruta de la imagen
        
        */
       //Create image
        imagen.src = `${baseUrl}${item.image}`;
        imagen.className="img"

        //create title
        const titulo = document.createElement('h2');
        titulo.textContent = item.name;

        /*titulo.addEventListener('click', () => {
            window.alert('Hola, estas interesado en este tipo de palta?')
        })*/
        titulo.className="title";

       //create price
        const precio = document.createElement('div');

        /* Le asignamos al texto del elemento precio que es un div
           la informacion que obtenemos de respuesta JSON Y atraves
           del parametro que tenemos en la funcion del forEach
           accederemos al precio 
        
        */
        precio.textContent = formatPrice(item.price);
        precio.className='precio'

        //container
        const container = document.createElement('div');

        container.append(imagen,titulo,precio);
        container.className="palta-container"
        
     
            todosLosItems.push(container);
            
                console.log(item.name);
                
            });
    
           appNode.append(...todosLosItems)
    
        });