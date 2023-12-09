const $ = (id) => document.getElementById(id);
window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {  

    const response =  await fetch(
      `http://localhost:3031/api/movies`
    )
    const result = await response.json();
    let data = result.data

    if (localStorage.length === 0 ) {
      const h1 = document.createElement("h1");
      h1.textContent = "Aun no hay peliculas Favoritas"
      app.appendChild(h1)
      
    } else {
      data.forEach((movie) => {
        let data2 = localStorage.getItem(`${movie.id}`)
        if (data2){
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
        } 
      }) 
    }
  } catch (error) {
    console.log(error);
  }
};