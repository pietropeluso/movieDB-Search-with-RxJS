import Rx from 'rx';

const searchMovie = (query) => {
  const baseUrl = 'http://api.themoviedb.org/3/search/movie';
  const apiKey = 'e42a273d02161e819c4941fdc0263975'
  const safeQuery = encodeURIComponent(query.trim());

  // send the AJAX request only if the query is not empty
  if (safeQuery) {
    const url = `${baseUrl}?api_key=${apiKey}&query=${safeQuery}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    // return an observable containing the AJAX response/error
    return Rx.Observable.fromEvent(xhr, 'load')
      .map(e => {
        const req = e.currentTarget;
        const res = req.responseText;
        if (req.readyState === 4) {
          if (req.status === 200) {
              return JSON.parse(res);
          } else {
              return new Error(res);
          }
        } else {
          return new Error(res);
        }
      });
  }
}

export default searchMovie;