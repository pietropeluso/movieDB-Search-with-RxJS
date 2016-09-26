import { Observable } from 'rx';
import searchMovie from './search/';
import { clearResult, populateResult } from './utilities/dom-manipulation';

const main = (() => {
    const input = document.getElementById('searchInputBox');
    const resultsContainer = document.getElementById('results');

    const keyup = Observable.fromEvent(input, 'keyup')
      .debounce(500) // debouncing the input for 500ms to avoid spurious query while typing
      .distinctUntilChanged() // ignore if the value hasn't changed
      .map(e => {
        const q = e.target.value;
        // if the query is an empty string the result list
        // container is cleared so the UI content is consistent
        // with the search input status
        if (!q.length) { clearResult(resultsContainer); }
        return q; // returning the query string to filter it in the next step
      })
      .filter(q => q.length > 0); // filtering queries only with if the text has at least one character

    const searchObs = keyup
      .map(searchMovie) // submitting the query to the movie search service
      .switch(); // switch to the most recent of the two observable (the response from the search service)

    const subscription = searchObs.subscribe(
      data => {
        if (data.total_results) {
          // clear the current result list
          clearResult(resultsContainer);
          // populate with new data
          populateResult(resultsContainer, data.results);
        }
      },
      err => {
        console.error(`Error: ${error}`);
      }
    );

})();
