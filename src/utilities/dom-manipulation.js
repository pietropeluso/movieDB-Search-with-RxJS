const populateList = (ulContainer, data) => {
  data.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = item.title;
    ulContainer.appendChild(li);
  });
};

const clearList = (ulContainer) => {
  while (ulContainer.firstChild) {
    ulContainer.removeChild(ulContainer.firstChild);
  }
};

export { populateList, clearList };