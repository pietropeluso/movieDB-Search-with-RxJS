const populateResult = (container, data) => {
  data.forEach(item => {
    const tile = createSingleTile(item);
    container.appendChild(tile);
  });
};

const createSingleTile = (data) => {
  const el = document.createElement('div');
  el.className = 'movie-tile';

  // create a poster image inside the tile
  const img = document.createElement('img');
  img.src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`;
  el.appendChild(img);

  // adding a label to display the movie title
  const label = document.createElement('p');
  label.innerHTML = data.title;
  el.appendChild(label)

  return el;
}

const clearResult = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

export { populateResult, clearResult };