(()=>{"use strict";var e={208:(e,n,t)=>{t.d(n,{A:()=>l});var r=t(601),o=t.n(r),a=t(314),i=t.n(a)()(o());i.push([e.id,"@import url(https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&family=Poppins&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap);"]),i.push([e.id,':root {\n  --clr-dark-purple: #2a004e;\n  --clr-purple: #8174a0;\n  --clr-light-purple: #a888b5;\n  --clr-dark-red: #c62300;\n  --clr-grey: #808080;\n  --clr-white: #f7f7f8;\n  --font-family: "Ubuntu", serif;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: var(--font-family);\n}\n\n.header {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  background-color: var(--clr-dark-purple);\n  color: var(--clr-white);\n}\n\nh1 {\n  font-family: "Playwrite AU SA", serif;\n  padding-top: 20px;\n}\n\n#current-player {\n  padding: 10px;\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: 1px;\n}\n\n.board-name {\n  font-weight: 400;\n  font-style: italic;\n  letter-spacing: 1px;\n}\n\n#boards {\n  display: flex;\n  gap: 30px;\n}\n\n.board-container {\n  /* border: 1px solid black; */\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.board-container.dimmed {\n  opacity: 0.5;\n  pointer-events: none;\n  transition: opacity 0.2s ease-in-out;\n}\n\n.board {\n  display: grid;\n  grid-template-columns: repeat(10, 45px);\n  grid-template-rows: repeat(10, 45px);\n  margin: 20px;\n  margin-top: 10px;\n  border: 1px solid black;\n}\n\n#board-2-container .ship {\n  background-color: transparent;\n}\n\n#board-2-container .square.active:hover {\n  background-color: var(--clr-purple);\n}\n\n.square {\n  border: 1px solid var(--clr-purple);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.square i {\n  font-size: 20px;\n  color: var(--clr-white);\n}\n\n.ship {\n  background-color: var(--clr-light-purple);\n}\n\n.sunk {\n  background-color: red;\n}\n\n.hit {\n  background-color: var(--clr-grey);\n}\n\n.missed {\n  color: var(--clr-purple);\n}\n\n#sunken-ships-container {\n  /* border: 1px solid black; */\n  display: grid;\n  grid-template-columns: 500px 500px;\n  gap: 30px;\n  /* margin: 20px; */\n}\n\n.sunk-ships {\n  /* padding: 10px; */\n  text-align: center;\n  /* text-transform: capitalize; */\n  /* border: 1px solid green; */\n  letter-spacing: 1px;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 1.5;\n  /* color: var(--clr-light-purple); */\n}\n\n.modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n\n.modal.hidden {\n  display: none;\n}\n\n.modal-content {\n  background-color: var(--clr-purple);\n  padding: 20px;\n  border-radius: 10px;\n  text-align: center;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n}\n\n.modal-content h2 {\n  margin-bottom: 20px;\n}\n\n.modal-content button {\n  margin: 10px;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  background-color: var(--clr-purple);\n  font-size: 16px;\n  transition: background-color 0.3s ease;\n  border: 2px solid var(--clr-white);\n  color: var(--clr-white);\n}\n\n.modal-content button:hover {\n  background-color: var(--clr-white);\n  color: var(--clr-purple);\n}\n\n.board.disabled {\n  pointer-events: none;\n  opacity: 0.5;\n}\n\n#place-ships-modal {\n  position: fixed;\n  top: 200px;\n  left: 55%;\n  height: 300px;\n  /* border: 2px solid white; */\n  background-color: var(--clr-light-purple);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  /* opacity: 0.9; */\n}\n\n#place-ships-modal form {\n  /* padding-top: 20px; */\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  /* border: 1px solid green; */\n  /* height: 100%; */\n  align-items: center;\n}\n\n.ship-placement {\n  /* border: 1px solid black; */\n  display: grid;\n  padding: 0 10px;\n  grid-template-columns: 120px 50px 50px 100px;\n  gap: 10px;\n  align-items: center;\n}\n\n#place-ships-modal h2 {\n  margin-top: 10px;\n  text-align: center;\n}\n\n#place-ships-modal input {\n  width: 40px;\n  height: 30px;\n  /* outline: none; */\n}\n\n#place-ships-modal button {\n  margin-top: 10px;\n  /* margin: 10px 20px; */\n  width: 50%;\n}\n\n#row-col-label {\n  display: flex;\n  justify-content: center;\n  gap: 11px;\n  margin-bottom: 5px;\n  color: var(--clr-dark-purple);\n}\n\nlabel {\n  padding: 2px;\n}\n\nlabel.success {\n  border: 2px solid green;\n}\n\nlabel.error {\n  border: 2px solid red;\n}\n\nbutton {\n  padding: 5px;\n  font-size: 14px;\n  border: none;\n  background-color: var(--clr-white);\n  color: var(--clr-dark-purple);\n}\n\nbutton:hover {\n  background-color: var(--clr-grey);\n  color: var(--clr-white);\n}\n',""]);const l=i},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var l=0;l<this.length;l++){var s=this[l][0];null!=s&&(i[s]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);r&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),n.push(d))}},n}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var a={},i=[],l=0;l<e.length;l++){var s=e[l],c=r.base?s[0]+r.base:s[0],d=a[c]||0,p="".concat(c," ").concat(d);a[c]=d+1;var u=t(p),m={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)n[u].references++,n[u].updater(m);else{var h=o(m,r);r.byIndex=l,n.splice(l,0,{identifier:p,updater:h,references:1})}i.push(p)}return i}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var l=t(a[i]);n[l].references--}for(var s=r(e,o),c=0;c<a.length;c++){var d=t(a[c]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}a=s}}},659:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,exports:{}};return e[r](a,a.exports,t),a.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.nc=void 0;var r=t(72),o=t.n(r),a=t(825),i=t.n(a),l=t(659),s=t.n(l),c=t(56),d=t.n(c),p=t(540),u=t.n(p),m=t(113),h=t.n(m),g=t(208),f={};f.styleTagTransform=h(),f.setAttributes=d(),f.insert=s().bind(null,"head"),f.domAPI=i(),f.insertStyleElement=u(),o()(g.A,f),g.A&&g.A.locals&&g.A.locals;const y=[{length:5,name:"carrier"},{length:4,name:"battleship"},{length:3,name:"cruiser"},{length:3,name:"submarine"},{length:2,name:"destroyer"}];function v(){return y.map((e=>function(e,n){const t=e;let r=0,o=!1;return{getName:()=>n,getLength:()=>t,getHits:()=>r,isSunk:()=>o,hit:()=>{o?console.warn(`${n} ship is already sunk!`):(r++,r>=t&&(o=!0))},reset:()=>{r=0,o=!1}}}(e.length,e.name)))}function x(){let e=Array.from({length:10},(()=>Array(10).fill(null).map((()=>({shipId:null,isHit:!1,missed:!1})))));const n=(n,t,r)=>{const o=n.getLength();if(t[0]<0||t[1]<0||t[0]>9||t[1]>9)return!1;if("horizontal"===r){if(t[1]+o>10)return!1;for(let n=0;n<o;n++)if(e[t[0]][t[1]+n].shipId)return!1}else if("vertical"===r){if(t[0]+o>10)return!1;for(let n=0;n<o;n++)if(e[t[0]+n][t[1]].shipId)return!1}return!0};return{getBoard:()=>e,canPlaceShip:n,placeShip:(t,r,o="horizontal")=>{if(!n(t,r,o))return!1;const a=t.getLength();for(let n=0;n<a;n++)"horizontal"===o?e[r[0]][r[1]+n].shipId=t:e[r[0]+n][r[1]].shipId=t;return!0},removeShip:n=>{e=e.map((e=>e.map((e=>e.shipId===n?{...e,shipId:null}:e))))},receiveAttack:(n,t)=>{if(!((e,n)=>e>=0&&e<10&&n>=0&&n<10)(n,t))return!1;const r=e[n][t];return!r.isHit&&!r.missed&&(r.shipId?(r.isHit=!0,r.shipId.hit(),{hit:!0,shipId:r.shipId}):(r.missed=!0,{hit:!1}))},allShipsSunk:()=>e.flat().filter((e=>null!==e.shipId)).every((e=>e.isHit)),resetBoard:()=>{e=Array.from({length:10},(()=>Array(10).fill(null).map((()=>({shipId:null,isHit:!1,missed:!1})))))}}}function b(){const e=x(),n=v();let t=null,r=[],o=null;const a=e=>{const n=e.getBoard().getBoard(),t=[];for(let e=0;e<n.length;e++)for(let r=0;r<n[e].length;r++)n[e][r].isHit||n[e][r].missed||(e+r)%2!=0||t.push({x:e,y:r});return 0===t.length?null:t[Math.floor(Math.random()*t.length)]},i=(e,n,t)=>{const r=e.getBoard().getBoard();return n>=0&&n<10&&t>=0&&t<10&&!r[n][t].isHit&&!r[n][t].missed},l=()=>{n.forEach((e=>e.reset())),e.resetBoard()};return{getName:()=>"computer",getBoard:()=>e,attack:(e,n=null,l=null)=>{let s,c;null!==n&&null!==l?(s=n,c=l):({x:s,y:c}=t?(e=>{for(;r.length>0;){const{x:n,y:t}=r.pop();if(i(e,n,t))return{x:n,y:t}}return a(e)})(e):a(e)),console.log("Attacking: ",{x:s,y:c});const d=e.getBoard().receiveAttack(s,c);return d.shipId?d.shipId.isSunk()?(console.log("Ship sunk! Resetting attack strategy."),r=[],o=null,t=null):(t?o||(o=t.x===s?"horizontal":"vertical"):t={x:s,y:c},((e,n)=>{"horizontal"===o?(r.push({x:e,y:n-1}),r.push({x:e,y:n+1})):"vertical"===o?(r.push({x:e+1,y:n}),r.push({x:e-1,y:n})):(r.push({x:e,y:n-1}),r.push({x:e,y:n+1}),r.push({x:e+1,y:n}),r.push({x:e-1,y:n}))})(s,c)):0===r.length&&(t=null),d},getSunkShips:()=>n.filter((e=>e.isSunk())),resetShips:l,resetGame:()=>{l(),t=null,r=[],o=null},placeShipsRandomly:()=>{const t=["horizontal","vertical"],r=[];return n.forEach((n=>{let o=!1;for(;!o;){const a=Math.floor(10*Math.random()),i=Math.floor(10*Math.random()),l=t[Math.floor(Math.random()*t.length)];e.canPlaceShip(n,[a,i],l)&&(e.placeShip(n,[a,i],l),o=!0,r.push({shipName:n.getName(),row:a,col:i,dir:l}))}})),r}}}!function(){const e=document.getElementById("board-1-container"),n=document.getElementById("board-2-container"),t=document.getElementById("current-player"),r=document.getElementById("sunken-ships-container");let o=!1;const a=function(){const e="player",n=x(),t=v();let r=Array.from({length:10},((e,n)=>Array.from({length:10},((e,t)=>[n,t])))).flat();const o=()=>{r=Array.from({length:10},((e,n)=>Array.from({length:10},((e,t)=>[n,t])))).flat()},a=()=>{t.forEach((e=>e.reset())),n.resetBoard()};return{getName:()=>e,getBoard:()=>n,getShips:()=>t,attack:(e,n,t)=>e.getBoard().receiveAttack(n,t),getSunkShips:()=>t.filter((e=>e.isSunk())),resetShips:a,resetGame:()=>{a(),o()},allShipsPlaced:()=>t.every((e=>n.getBoard().flat().some((n=>n.shipId===e)))),placeShipsRandomly:()=>{const e=["horizontal","vertical"],r=[];return t.forEach((t=>{let o=!1;for(;!o;){const a=Math.floor(10*Math.random()),i=Math.floor(10*Math.random()),l=e[Math.floor(Math.random()*e.length)];n.canPlaceShip(t,[a,i],l)&&(n.placeShip(t,[a,i],l),o=!0,r.push({shipName:t.getName(),row:a,col:i,dir:l}))}})),r}}}(),i=b();let l=a;const s=()=>{l=l===a?i:a,t.innerHTML=`${l.getName()}'s turn`,"computer"===l.getName()&&(n.classList.add("dimmed"),setTimeout((()=>{const e=l===a?i:a;l.attack(e)&&(p(),e.getBoard().allShipsSunk()?g():s()),n.classList.remove("dimmed")}),600))},c=()=>{var e;document.getElementById("place-ships-modal").style.display="block",document.getElementById("reset-game-btn").addEventListener("click",(()=>{o=!1,f()})),document.getElementById("place-random-btn").addEventListener("click",(e=a,()=>function(e){e.resetShips();e.placeShipsRandomly().forEach((({shipName:e,row:n,col:t,dir:r})=>{document.getElementById(`${e}-row`).value=n,document.getElementById(`${e}-col`).value=t,document.getElementById(`${e}-direction`).value=r;const o=document.querySelector(`label[for="${e}-row"]`);o.classList.remove("error"),o.classList.add("success")})),p()}(e))),document.getElementById("start-game-btn").addEventListener("click",d);a.getShips().forEach((e=>{const n=document.getElementById(`${e.getName()}-row`),t=document.getElementById(`${e.getName()}-col`),r=document.getElementById(`${e.getName()}-direction`),o=()=>function(e){const n=document.getElementById(`${e}-row`),t=document.getElementById(`${e}-col`),r=document.getElementById(`${e}-direction`),o=document.querySelector(`label[for="${e}-row"]`),i=parseInt(n.value,10),l=parseInt(t.value,10),s=r.value;if(isNaN(i)||isNaN(l))return o.classList.add("error"),void o.classList.remove("success");const c=a.getBoard(),d=a.getShips(),u=d.findIndex((n=>n.getName()===e));if(-1===u)return;c.removeShip(d[u]);const m=c.canPlaceShip(d[u],[i,l],s);console.log(d[u].getName(),"is valid:",m),m?(o.classList.add("success"),o.classList.remove("error"),c.placeShip(d[u],[i,l],s)):(o.classList.add("error"),o.classList.remove("success")),p()}(e.getName());n.addEventListener("input",o),t.addEventListener("input",o),r.addEventListener("change",o)})),i.placeShipsRandomly(),p()};function d(){a.allShipsPlaced()?(o=!0,document.getElementById("place-ships-modal").style.display="none",console.log("Game started!"),p()):alert("Please place all ships in valid positions before starting the game.")}function p(){e.innerHTML="",n.innerHTML="",r.innerHTML="";const t=document.createElement("div");t.textContent="Player's board",t.classList.add("board-name"),e.appendChild(t);const o=document.createElement("div");o.textContent="Computer's board",o.classList.add("board-name"),n.appendChild(o);const l=a.getBoard().getBoard(),s=i.getBoard().getBoard();e.appendChild(u(l,!1)),n.appendChild(u(s,!0)),r.appendChild(m(a)),r.appendChild(m(i))}function u(e,n=!1){const t=document.createElement("div");t.classList.add("board");for(let r=0;r<10;r++)for(let a=0;a<10;a++){const i=document.createElement("div");i.classList.add("square"),e[r][a].shipId?e[r][a].shipId.isSunk()?(i.innerHTML='<i class="fa-solid fa-skull"></i>',i.classList.add("sunk")):e[r][a].isHit?(i.innerHTML='<i class="fa-solid fa-bomb"></i>',i.classList.add("hit")):i.classList.add("ship"):e[r][a].missed&&(i.innerHTML='<i class="fa-solid fa-x"></i>',i.classList.add("missed")),n&&o&&(i.classList.add("active"),i.dataset.row=r,i.dataset.col=a,i.addEventListener("click",(e=>h(e)))),t.appendChild(i)}return t}function m(e){const n=document.createElement("div");n.classList.add("sunk-ships");const t=e.getSunkShips();if(t.length>0)for(const r of t)n.innerHTML+=`${e.getName()[0].toUpperCase()+e.getName().slice(1)}'s ${r.getName()} has been sunk!<br>`;return n}function h(e){const n=e.currentTarget.dataset.row,t=e.currentTarget.dataset.col,r=l===a?i:a;console.log(`${l.getName()} attacked: Row ${n} Col ${t}`),l.attack(r,n,t)&&(p(),r.getBoard().allShipsSunk()?g():s())}function g(){o=!1,document.querySelectorAll(".board").forEach((e=>e.classList.add("disabled"))),function(e){const n=document.getElementById("endgame-modal");document.getElementById("endgame-message").textContent=`${e} Wins!`,n.classList.remove("hidden"),document.getElementById("restart-btn").addEventListener("click",(()=>{n.classList.add("hidden"),f()})),n.addEventListener("click",(e=>{e.target===n&&n.classList.add("hidden")})),document.addEventListener("keydown",(e=>{"Escape"===e.key&&n.classList.add("hidden")}))}(l.getName())}function f(){a.resetGame(),i.resetGame(),l=a,function(){const e=document.getElementById("reset-game-btn");e.listener&&(e.removeEventListener("click",e.listener),delete e.listener);const n=document.getElementById("place-random-btn");n.listener&&(n.removeEventListener("click",n.listener),delete n.listener);const t=document.getElementById("start-game-btn");t.listener&&(t.removeEventListener("click",t.listener),delete t.listener),a.getShips().forEach((e=>{const n=document.getElementById(`${e.getName()}-row`),t=document.getElementById(`${e.getName()}-col`),r=document.getElementById(`${e.getName()}-direction`);n.listener&&(n.removeEventListener("input",n.listener),delete n.listener),t.listener&&(t.removeEventListener("input",t.listener),delete t.listener),r.listener&&(r.removeEventListener("change",r.listener),delete r.listener)}))}(),document.querySelectorAll("input").forEach((e=>{e.value=""})),document.querySelectorAll("label").forEach((e=>{e.classList.remove("success"),e.classList.remove("error")})),c()}c()}()})();