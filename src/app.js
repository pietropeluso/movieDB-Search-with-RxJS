import { Observable } from 'rx';
import searchMovie from './search/';

const main = (() => {
    const input = document.getElementById('searchInputBox');

    const keyup = Observable.fromEvent(input, 'keyup')
      .debounce(500) // debouncing the input for 500ms to avoid spurious query while typing
      .distinctUntilChanged() // ignore if the value hasn't changed
      .map(e => e.target.value) // extracting the text from the input element triggering the event
      .filter(text => text.length > 2); // filtering queries only with if the text is longer than 2 characters

    const searchObs = keyup
      .map(searchMovie) // submitting the query to the movie search service
      .switch(); // switch to the most recent of the two observable (the response from the search service)

    const subscription = searchObs.subscribe(
      data => {
        console.log(`MovieDB data: ${JSON.stringify(data)}`);
      },
      err => {
        console.log(`Error: ${error}`);
      }
    );

})();
