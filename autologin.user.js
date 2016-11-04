// ==UserScript==
// @name         Auto Login
// @namespace    https://github.com/pajdal97/SSPBRNO-Toolkit
// @version      1.1
// @description  Automaticke prihlasi k WIFI
// @author       Vladimír Paloušek
// @match        https://wifi.sspbrno.cz/login.html*
// @grant        none
// ==/UserScript==

    function hostReachable() {
      var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
      var status;

      xhr.open( "HEAD", "//google.com/", false );

      try {
        xhr.send();
        return ( xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304) );
      } catch (error) {
        return false;
      }

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
    
if(!hostReachable()) {
    
    var username = document.querySelector ('input[name="username"]');
    var password = document.querySelector ('input[name="password"]');
    var submit = document.querySelector ('input[name="Submit"]');
    
    if(getCookie("log_username") && getCookie("log_password")) {
    
      username.value=getCookie("log_username");
      password.value=getCookie("log_password");
    
    } else {
    
      var log_username = prompt("Zadejte uzivatelske jmeno", "");
      var log_password = prompt("Zadejte heslo:", "");
      if (log_username != null && log_password != null) {
        setCookie("log_username", log_username, 365);
        setCookie("log_password", log_password, 365);
        
        username.value=getCookie("log_username");
        password.value=getCookie("log_password");
          
      }
    
    }
    
    var clickEvent  = document.createEvent ('MouseEvents');

    clickEvent.initEvent ('click', true, true);

    submit.dispatchEvent (clickEvent);

} else {}