// ==UserScript==
// @name         Auto Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automaticke prihlasi k WIFI
// @author       Vladimír Paloušek
// @match        https://wifi.sspbrno.cz/login.html?redirect=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var username = document.querySelector ('input[name="username"]');
    var password = document.querySelector ('input[name="password"]');
    var submit = document.querySelector ('input[name="Submit"]');
    
    username.value="<user_name>";
    password.value="<password>";
    
    var clickEvent  = document.createEvent ('MouseEvents');

    clickEvent.initEvent ('click', true, true);

    submit.dispatchEvent (clickEvent);

})();