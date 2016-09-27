import { Observable } from 'rx';

class KeyUpFromElement {
  constructor(element, debounce, clearingFn) {
    this.observable = Observable.fromEvent(element, 'keyup')
    .debounce(debounce) // debouncing the input for 500ms to avoid spurious query while typing
    .distinctUntilChanged() // ignore if the value hasn't changed
    .map(e => {
      const q = e.target.value;
      // if the query is an empty string the result list
      // container is cleared so the UI content is consistent
      // with the search input status
      if (!q.length) { clearingFn(); }
      return q; // returning the query string to filter it in the next step
    })
    .filter(q => q.length > 0); // filtering queries only with if the text has at least one character
  }

  getStream() {
    return this.observable;
  }
}

export default KeyUpFromElement;