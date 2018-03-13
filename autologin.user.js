// ==UserScript==
// @name         Auto Login
// @namespace    https://github.com/pajdal97/SSPBRNO-Toolkit
// @version      1.3
// @description  Automaticke prihlasi k WIFI
// @author       Vladimír Paloušek
// @match        https://wifi.sspbrno.cz/login.html*
// @grant        none
// @updateURL	 https://github.com/pajdal97/SSPBRNO-Toolkit/raw/master/autologin.user.js
// @downloadURL	 https://github.com/pajdal97/SSPBRNO-Toolkit/raw/master/autologin.user.js
// ==/UserScript==
function get() {
    var url = window.location.href;
    var params = url.split('?');
    if (params[1] == undefined) return null;
    var gets = {};
    var attrs = params[1].split('&');
    for (var i in attrs) {
        var partAttr = attrs[i].split('=');
        gets[partAttr[0]] = partAttr[1];
    }
    return gets;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function loadDoc(url,params) {
  var result;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        result = true;
    } else {
        result = false;
    }
  };
  xhttp.open("post", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
  return result;
}

var redirectUrl = get().redirect;

function connect() {
            var log_username = prompt("Zadejte uzivatelske jmeno", "");
            var log_password = prompt("Zadejte heslo:", "");
            if (log_username != null && log_password != null) {
                var login_status = loadDoc("/login.html","username="+log_username+"&password="+log_password+"&buttonClicked=4&err_flag=0&err_msg=&info_flag=0&info_msg=&redirect_url=");
                setTimeout(function(){
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                       setTimeout(function(){
                        if (this.readyState == 4 && this.status == 200) {
                            setCookie("log_username", log_username, 365);
                            setCookie("log_password", log_password, 365);
                            window.location = "http://" + redirectUrl;
                        } else {
                            setCookie("log_username", log_username, 365);
                            setCookie("log_password", log_password, 365);
                            window.location = "http://" + redirectUrl;
                            //connect();
                        }
                       }, 500);
                    };
                    xhttp.open("get", "https://www.sspbrno.cz/", true);
                    xhttp.send();
                }, 500);
            } else {}

        }
    if(getCookie("log_username") && getCookie("log_password")) {

        if(loadDoc("https://www.sspbrno.cz/","")) {
            window.location = "http://" + redirectUrl;
        } else {
            loadDoc("/login.html","username="+getCookie("log_username")+"&password="+getCookie("log_password")+"&buttonClicked=4&err_flag=0&err_msg=&info_flag=0&info_msg=&redirect_url=");
            window.location = "http://" + redirectUrl;
        }
    } else {
        connect();
    }

