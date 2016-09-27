class UIManager {
  constructor() {}

  populateResult(container, data) {
    data.forEach(item => {
      const tile = this.createSingleTile(item);
      container.appendChild(tile);
    });
  }

  createSingleTile(data) {
    const tile = document.createElement('a');
    tile.setAttribute('href', `https://www.themoviedb.org/movie/${data.id}`);
    tile.setAttribute('target', '_blank');

    // creating container
    const div = document.createElement('div');
    div.className = 'movie-tile';

    // create a poster image inside the tile
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`;
    div.appendChild(img);

    // adding a label to display the movie title
    const label = document.createElement('p');
    label.className = 'movie-title';
    label.innerHTML = data.title;
    div.appendChild(label)

    const releaseDate = document.createElement('p');
    releaseDate.className = 'movie-release-date';
    releaseDate.innerHTML = data.release_date;
    div.appendChild(releaseDate);

    tile.appendChild(div);
    return tile;
  }

  clearResult(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  renderResult(resultsContainer, data) {
    // clear the current result list
    this.clearResult(resultsContainer);
    // populate with new data
    this.populateResult(resultsContainer, data);
  };
};

export default UIManager;
