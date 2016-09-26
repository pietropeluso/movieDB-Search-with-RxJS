import { Observable } from 'rx';

const main = (() => {
    const input = document.getElementById('searchInputBox');

    const keyup = Observable.fromEvent(input, 'keyup')
      .debounce(500) // debouncing the input for 500ms to avoid spurious query while typing
      .distinctUntilChanged() // ignore if the value hasn't changed
      .map(e => e.target.value) // extracting the text from the input element triggering the event
      .filter(text => text.length > 2) // filtering queries only with if the text is longer than 2 characters

    const subscription = keyup.subscribe(
      data => {
        console.log(`Emitted query: ${data}`);
      },
      err => {
        console.log(`Error: ${error}`);
      }
    );

})();
