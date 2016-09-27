import { describe, it } from 'mocha';
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import UIManager from '../../src/utilities/UIManager'

describe('dom-manipulation spec', function() {
  let uiManager;
  jsdom();

  before(function() {
    uiManager = new UIManager();
  })

  describe('...clearResult function', function() {
    const html = `
      <ul id="myList">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </ul>`;

    before(function() {
      document.body.innerHTML = html;
    });

    after(function() {
      document.body.innerHTML = '';
    });

    it('should clear the content of the provided DOM element', function() {
      const list = document.getElementById('myList');
      const elements = list.getElementsByTagName('li');
      expect(elements.length).to.equal(4);

      uiManager.clearResult(list);
      expect(list.firstChild).to.equal(null);
    })
  });

  describe('...populateResult function', function() {
    const containerID = 'results'
    const html = `<div id="${containerID}"></div>`;

    const dummyData = [
      {id: '1', title: 'title 1', poster_path: 'aaaa.jpg', release_date: '1234'},
      {id: '2', title: 'title 2', poster_path: 'bbbb.jpg', release_date: '5678'}
    ];

    const expectedContent = '<a href="https://www.themoviedb.org/movie/1" target="_blank">' +
        '<div class="movie-tile">' +
          '<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/aaaa.jpg">' +
          '<p class="movie-title">title 1</p>' +
          '<p class="movie-release-date">1234</p>' +
        '</div>' +
      '</a>' +
      '<a href="https://www.themoviedb.org/movie/2" target="_blank">' +
        '<div class="movie-tile">' +
          '<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/bbbb.jpg">' +
          '<p class="movie-title">title 2</p>' +
          '<p class="movie-release-date">5678</p>' +
        '</div>'+
      '</a>';

    before(function() {
      document.body.innerHTML = html;
    });

    after(function() {
      document.body.innerHTML = '';
    });

    it('should populate the content of the provided DOM element with the data provided', function() {
      const container = document.getElementById(containerID);

      uiManager.populateResult(container, dummyData);

      expect(container.innerHTML).to.equal(expectedContent);
    });
  });

});