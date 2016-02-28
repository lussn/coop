var AjaxService = function AjaxService() {
    this.get = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr.status, xhr.responseText);
            }
        };
        xhr.send();
    },
    this.post = function (url, body, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr.status, xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(body));
    }
};
module.exports = new AjaxService();
