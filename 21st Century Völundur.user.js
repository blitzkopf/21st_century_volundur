// ==UserScript==
// @name         21st Century Völundur
// @namespace    http://yngvi.com/
// @version      0.1
// @description  Browse volundur.rb.is in 21st century browser
// @author       Yngvi Þór Sigurjónsson
// @match        http://volundur.rb.is/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.1.1.js
// @require https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// ==/UserScript==

waitForKeyElements ("body>#menu", function() {
    'use strict';
    console.log("starting");
    var elms;
    var last_url;
    $(".menuFrame>table").each(function( i,e )  {
        console.log(e.getAttribute('id'));
        $(this).children().each(function(i2,e2) {
            if( e2.getAttribute("action") !== null) {
                last_url=e2.getAttribute("action");
            }
            if($(e2).is("tbody")) {
                console.log("tbody");
                $(this).children().each(function() {
                    if( this.getAttribute("action") !== null) {
                        last_url=this.getAttribute("action");
                    }
                    if($(this).is('tr')) {
                        console.log($(this).contents());
                        $(this).find("td").each(function(){
                            var texti;
                            console.log($(this).contents());
                            texti=$(this).contents()[0].data;
                            console.log(texti);
                            $(this).append('<a href="'+last_url+'" style="color:yellow"> **</a>');
                        });
                    }
                });
            }
            console.log(e2.getAttribute("action"));
        });
    });
    /*elms = document.evaluate("script",
                      document,
                      null,
                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                      null);
    for (var e in elms) {
        // do stuff
        console.log('element');
    }*/
    var input=document.createElement("input");
    input.type="button";
    input.value="GreaseMonkey Button";
    input.onclick = showAlert;
    document.body.appendChild(input);

    function showAlert()
    {
        alert("Hello World");
    }
}
);