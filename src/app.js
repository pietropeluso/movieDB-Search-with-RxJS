import { Observable } from 'rx';
import searchMovie from './search/';
import { clearResult, populateResult } from './utilities/dom-manipulation';
import sortBy from 'lodash/sortBy';

const main = (() => {
    const input = document.getElementById('searchInputBox');
    const resultsContainer = document.getElementById('results');
    const sorting = document.querySelector('.sorting-criteria');
    let searchResults = [];
    let sortedResults = [];
    let previousSortingCriteria = '';

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

    const searchResultSubscription = searchObs.subscribe(
      data => {
        searchResults = data.results;
        if (data.total_results) {
          // clear the current result list
          clearResult(resultsContainer);
          // populate with new data
          populateResult(resultsContainer, searchResults);
        }
      },
      err => {
        console.error(`Error: ${error}`);
      }
    );

    const sortingObs = Observable.fromEvent(sorting, 'click')
      .map(e => e.target.getAttribute('data-value'))
      .filter(e => e !== null)

    const sortingSubscription = sortingObs.subscribe(
      sortingCriteria => {

        // if the user has clicked again on the same search
        // criteria, the UI reverse the previously sorted
        // list of results, otherwise it will sort the list
        // against the new sorting criteria
        if (sortingCriteria === previousSortingCriteria) {
          sortedResults = sortedResults.reverse();
        } else {
          sortedResults = sortBy(searchResults, sortingCriteria);
        }

        // saving the current sorting criteria for future comparison (see above)
        previousSortingCriteria = sortingCriteria;

        // clear the current result list
        clearResult(resultsContainer);
        // populate with new data
        populateResult(resultsContainer, sortedResults);
      },
      err => {
        console.error(err)
      }
    );

})();
