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
  const searchSuggs = data[1].slice(0, 10);
  const searchSuggsWrapper = document.querySelector('.search-suggs-wrapper');
  const suggList = document.querySelector('.search-suggs');
  while(suggList.firstChild) {
    suggList.removeChild(suggList.firstChild);
  }
  
  searchSuggs.forEach(sugg => {
    if(sugg.startsWith('http://')) return;
    let suggItem = document.createElement('li');
    suggItem.classList.add('sugg-item');
    suggItem.textContent = sugg;
    suggList.appendChild(suggItem);
  });
  
  if(searchSuggs.length) {
    searchSuggsWrapper.style.display = 'block';
  } else {
    searchSuggsWrapper.style.display = 'none';
  }
};

export function getSuggestions(queryTerm) {
	var requestUrl = `https://suggestqueries.google.com/complete/search?client=chrome&ds=bo&q=${queryTerm}&callback=myJsonpCallback`;
  var scriptEl = document.createElement('script');
	scriptEl.setAttribute('src', requestUrl);
	document.body.appendChild(scriptEl);
	document.body.removeChild(scriptEl);
}

export function selectSuggestions(key) {
  const suggs = document.querySelectorAll('.search-suggs > .sugg-item');
  if(!suggs.length) return;
  
  let selected = document.querySelector('.sugg-item.selected'),
      current;
      
  if(selected) {
    selected.classList.remove('selected');
  }
  
  if(key === 'ArrowDown') {
    if(!selected || !selected.nextElementSibling) {
      current = suggs[0];
    } else {
      current = selected.nextElementSibling;
    }
  } else if(key === 'ArrowUp') {
    if(!selected || !selected.previousElementSibling) {
      current = suggs[suggs.length - 1];
    } else {
      current = selected.previousElementSibling;
    }
  } else if((key === 'Enter' || key === 'Tab') && selected) {
    removeSuggList();
  }
  
  if(current) {
    current.classList.add('selected');
  }
  const newSelected = document.querySelector('.sugg-item.selected');
  
  if(newSelected) {
    const input = document.querySelector('.book-search-input');
    const suggName = newSelected.textContent;
    input.value = suggName;
  }
}

function isSuggList(e) {
  if(!document.querySelectorAll('.search-suggs > .sugg-item').length) return;
  if(document.querySelector('.search-suggs').contains(e.target)) {
    const selectedBookName = e.target.textContent;
    document.querySelector('.book-search-input').value = selectedBookName;
    removeSuggList();
  } else {
    removeSuggList();
  }
}

function removeSuggList() {
  document.querySelector('.search-suggs-wrapper').style.display = 'none';
}

window.didScrollListPicker = false;

setInterval(() => {
  if(window.didScrollListPicker) {
    window.didScrollListPicker = false
  }
}, 50);

document.addEventListener('click', isSuggList)
