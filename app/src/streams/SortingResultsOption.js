import { Observable } from 'rx';

class SortingResultsOption {
  constructor(element) {
    this.observable = Observable.fromEvent(element, 'click')
      .map(e => e.target.getAttribute('data-value'))
      .filter(e => e !== null);
  }

  getStream() {
    return this.observable;
  }
}

export default SortingResultsOption;