const populateList = (ulContainer, data) => {
  data.forEach(item => {
    const tile = createSingleTile(item);
    ulContainer.appendChild(tile);
  });
};

const createSingleTile = (data) => {
  const li = document.createElement('li');
  li.innerHTML = data.title;
  return li;
}

const clearList = (ulContainer) => {
  while (ulContainer.firstChild) {
    ulContainer.removeChild(ulContainer.firstChild);
  }
};

export { populateList, clearList };