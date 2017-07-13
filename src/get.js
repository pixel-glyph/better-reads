function get(url) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url);
    
    req.onload = () => {
      if(req.status === 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = () => reject(Error('Network Error'));
    req.send();
  });
}

function getJSON(url) {
  return get(url).then(JSON.parse);
}

export function search (terms, APIKey) {
  const searchTerms = terms.split(' ').join('+');
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=${APIKey}`;
      
  getJSON(url).then(res => {
    console.log('woo books!', res);
  }).catch(error => {
    console.log('There was an problem retrieving the search: ', error);
  });  // add another then() here to stop loading gif
}

export function getBook (volumeID, APIKey) {
  const url = `https://www.googleapis.com/books/v1/volumes/${volumeID}&key=${APIKey}`;
  
  getJSON(url).then(res => {
    console.log('woo book!', res);
  }).catch(error => {
    console.log('There was an problem retrieving this book: ', error);
  });
}
