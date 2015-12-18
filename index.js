function newXHR() {
  if (window.ActiveXObject)
    return new ActiveXObject('Microsoft.XMLHTTP');
  else if (window.XMLHttpRequest)
    return new XMLHttpRequest();
  return null;
};

module.exports = function(url, callback, postBody) {
  var xhr = newXHR();

  if (!xhr)
    throw new Error('No XMLHttpRequest object available.');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4)
      callback(xhr.responseText);
  };

  if (postBody) {
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  else
    xhr.open('GET', url, true);

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(this.postBody);
};
