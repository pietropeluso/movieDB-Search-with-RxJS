// import { Observable } from 'rx';
import searchMovie from './search/';
import UIManager from './utilities/UIManager';
import KeyUpFromElement from './streams/KeyUpFromElement';
import SortingResultsOption from './streams/SortingResultsOption';
import sortBy from 'lodash/sortBy';

const main = (() => {
    const input = document.getElementById('searchInputBox');
    const resultsContainer = document.getElementById('results');
    const sorting = document.querySelector('.sorting-criteria');
    const uiManager = new UIManager();
    let searchResults = [];
    let sortedResults = [];
    let previousSortingCriteria = '';

    const keyUpFromElement = new KeyUpFromElement(input, 500, uiManager.clearResult(resultsContainer));

    const searchObs = keyUpFromElement.getStream()
      .map(searchMovie) // submitting the query from the keyup stream to the movie search service
      .switch(); // switch to the most recent of the two observable (the response from the search service)

    const searchResultSubscription = searchObs.subscribe(
      data => {
        searchResults = data.results;
        if (data.total_results) {
          // render results
          uiManager.renderResult(resultsContainer, searchResults);
        }
      },
      err => {
        console.error(`Error: ${error}`);
      }
    );

    const sortingResultsOption = new SortingResultsOption(sorting);

    const sortingSubscription = sortingResultsOption.getStream()
      .subscribe(
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

          // render results
          uiManager.renderResult(resultsContainer, sortedResults);
        },
        err => {
          console.error(err)
        }
      );

})();
