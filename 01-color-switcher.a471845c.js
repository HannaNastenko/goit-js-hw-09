const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");let o=null;function r(t){t.removeAttribute("disabled")}function a(t){t.setAttribute("disabled",!0)}function c(){n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.addEventListener("click",(function(n){c(),o=setInterval((()=>{c()}),1e3),a(t),r(e)})),e.addEventListener("click",(function(){clearInterval(o),r(t),a(e)})),a(e);
//# sourceMappingURL=01-color-switcher.a471845c.js.map