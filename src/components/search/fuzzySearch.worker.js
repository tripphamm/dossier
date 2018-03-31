// allow 'self' in worker context
/* eslint no-restricted-globals: 0 */

import fuzzy from 'fuzzy';


self.addEventListener('message', (event) => {
    const {
        persons,
        records,
        query
    } = event.data;

    const personResults = fuzzy.filter(query, persons, {
      pre: '<',
      post: '>',
      extract: (person) => {
        return person.name;
      },
    }).map(el => {
      return {
        person: el.original,
        match: el
      }
    });
  
    const recordResults = fuzzy.filter(query, records, {
      pre: '<',
      post: '>',
      extract: (record) => {
        return `${record.key}: ${record.value}`
      }
    }).map(el => {
      return {
        record: el.original,
        match: el
      }
    });

    self.postMessage({
        personResults,
        recordResults
    });
});