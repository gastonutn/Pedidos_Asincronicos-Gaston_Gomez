const $ = (id) => document.getElementById(id);
window.onload =  async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const link2 = document.createElement("a");
  app.appendChild( link2)
  const link3 = document.createElement("a");
  app.appendChild( link3)

  app.appendChild(container);

  try {  
    const response = await fetch('http://localhost:3031/api/movies')
    const {meta,data} = await response.json();
    
    if (localStorage.length) {
      
      link2.textContent = "Peliculas Favoritas"
      link2.className ="botonFavoritos"
      link2.setAttribute('href',`favoritas.html`)

      link3.textContent = "Vacias favoritas"
      link3.className ="botonFavoritos"
      link3.addEventListener("click", function (){
        localStorage.clear()
        location.reload()
        })   
    }
   
    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const link = document.createElement("a");

      link.textContent = "Ver más"
      link.className ="botonAgregar2"
      link.setAttribute('href',`formulario.html?movie=${movie.id}`)

      const fav = document.createElement("i");
      fav.className ="fav fa-regular fa-heart"
       
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(link);
      card.appendChild(fav);
   
      fav.addEventListener("click", function (){
        localStorage.setItem(`${movie.id}`,`${movie.id}`)
        location.reload()
        })   
    });
    console.log(localStorage)
  } catch (error) {
    console.log(error);
  }
};