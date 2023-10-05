// ==UserScript==
// @name         Steam Workshop Collection WH3 Mod Manager List Generator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get a list of mod codes from a Steam Workshop collection page and return them as Shazbot WH3 mod manager list
// @author       moodyswing
// @match        https://steamcommunity.com/sharedfiles/filedetails/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var modList = document.getElementsByClassName("collectionItem");
    var modCodes = "";
    for (var i = 0; i < modList.length; i++) {
        var modCode = modList[i].getAttribute("id");
        if (modCode != null) {
            modCodes += modCode.slice(11) + "|";
        }
    }
    console.log(modCodes.slice(0, -1));

    var button = document.createElement("button");
    button.innerHTML = "Get WH3 Mod Manager mods list";
    button.style.marginTop = "10px";
    button.style.padding = "10px";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.borderRadius = "5px";
    button.style.border = "none";
    button.style.cursor = "pointer";

    var popup = document.createElement("div");
    popup.style.display = "none";
    popup.style.position = "fixed";
    popup.style.zIndex = "1";
    popup.style.left = "50%";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.width = "300px";
    popup.style.height = "200px";
    popup.style.backgroundColor = "#f1f1f1";
    popup.style.borderRadius = "5px";
    popup.style.padding = "20px";

    var span = document.createElement("span");
    span.innerHTML = "×";
    span.style.position = "absolute";
    span.style.top = "0";
    span.style.right = "10px";
    span.style.fontSize = "28px";
    span.style.fontWeight = "bold";
    span.style.cursor = "pointer";

    var content = document.createElement("textarea");
    content.innerHTML = modCodes.slice(0, -1);

      button.onclick=function(){
          navigator.clipboard.writeText(content.innerHTML);
          alert("List copied to clipboard!\nPaste them into 'Share Mod List'->'Import'");
      }

      span.onclick=function(){
          popup.style.display="none";
      }

      window.onclick=function(event){
          if(event.target==popup){
              popup.style.display="none";
          }
      }

      var subscribeButtonDivs=document.getElementsByClassName("subscribeCollection");
      if(subscribeButtonDivs.length>0){
          subscribeButtonDivs[0].appendChild(button);
      }
})();
