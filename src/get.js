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

export function getJSON(url) {
  return get(url).then(JSON.parse);
}

export function getBook(volumeID, APIKey) {
  const url = `https://www.googleapis.com/books/v1/volumes/${volumeID}&key=${APIKey}`;
  
  getJSON(url).then(res => {
    console.log('woo book!', res);
  }).catch(error => {
    console.log('There was an problem retrieving this book: ', error);
  });
}

window.myJsonpCallback = (data) => {
  console.log('zee data: ', data);
};

export function getSuggestions(queryTerm) {
	var requestUrl = `https://suggestqueries.google.com/complete/search?client=chrome&ds=bo&q=${queryTerm}&callback=myJsonpCallback`;
  var scriptEl = document.createElement('script');
	scriptEl.setAttribute('src', requestUrl);
	document.body.appendChild(scriptEl);
}
