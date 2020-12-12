!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/pong/",n(n.s=2)}([function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return h(this,n)}}function h(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function c(t,e,n){return e&&u(t.prototype,e),n&&u(t,n),t}n.r(e);var f=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;l(this,t),this.x=e,this.y=n}return c(t,[{key:"len",get:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},set:function(t){var e=t/this.len;this.x*=e,this.y*=e}}]),t}(),y=function(){function t(e){l(this,t),e=e||{},this.pos=new f(e.x||0,e.y||0),this.size=new f(e.width||0,e.height||0)}return c(t,[{key:"width",get:function(){return this.size.x}},{key:"height",get:function(){return this.size.y}},{key:"left",get:function(){return this.pos.x-this.size.x/2}},{key:"right",get:function(){return this.pos.x+this.size.x/2}},{key:"top",get:function(){return this.pos.y-this.size.y/2}},{key:"bottom",get:function(){return this.pos.y+this.size.y/2}}]),t}(),p=function(t){o(n,t);var e=s(n);function n(t){var i;return l(this,n),t=t||{},(i=e.call(this,{x:t.x||0,y:t.y||0,width:t.width||10,height:t.height||10})).vel=new f,i}return n}(y),v=function(t){o(n,t);var e=s(n);function n(t){var i;return l(this,n),t=t||{},(i=e.call(this,{x:t.x||0,y:t.y||0,width:t.width||20,height:t.height||100})).score=0,i}return n}(y),d=function(){function t(e,n){l(this,t),this.width=e,this.height=n,this.initialSpeed=250,this._acumulator=0,this.step=1/240,this.ball=new p,console.log(this.ball),this.players=[new v({x:40,y:this.height/2}),new v({x:this.width-40,y:this.height/2})],this.reset()}return c(t,[{key:"collide",value:function(t,e){if(t.left<e.right&&t.right>e.left&&t.top<e.bottom&&t.bottom>e.top){e.vel.x=1.05*-e.vel.x;var n=e.vel.len;e.vel.y+=300*(Math.random()-.5),e.vel.len=n,console.log(e.vel),e.pos.x=e.vel.x>0?t.right+e.width/2:t.left-e.width/2}}},{key:"play",value:function(){var t=this.ball;0===t.vel.x&&0===t.vel.y&&(t.vel.x=200*(Math.random()>.5?1:-1),t.vel.y=200*(2*Math.random()-1),t.vel.len=this.initialSpeed)}},{key:"reset",value:function(){var t=this.ball;t.vel.x=0,t.vel.y=0,t.pos.x=this.width/2,t.pos.y=this.height/2}},{key:"update",value:function(t){var e=this,n=this.ball;n.pos.x+=n.vel.x*t,n.pos.y+=n.vel.y*t,(n.right<0||n.left>this.width)&&(++this.players[n.vel.x<0|0].score,this.reset()),(n.vel.y<0&&n.top<0||n.vel.y>0&&n.bottom>this.height)&&(n.vel.y=-n.vel.y),n.pos.x<this.width/2?(this.players[1].top>this.height/2&&(this.players[1].pos.y-=300*t),this.players[1].bottom<this.height/2&&(this.players[1].pos.y+=300*t)):(this.players[1].pos.y>n.pos.y&&(this.players[1].pos.y-=300*t),this.players[1].bottom<n.pos.y&&(this.players[1].pos.y+=300*t)),this.players.forEach((function(t){e.collide(t,n)}))}},{key:"simulate",value:function(t){for(this._acumulator+=t;this._acumulator>this.step;)this.update(this.step),this._acumulator-=this.step}}]),t}(),g=function(){function t(e){var n=this;l(this,t),this.WIDTH=e,this.ALIGN=e/3,this.CHAR_PIXEL=10,this.CHAR_WIDTH=4*this.CHAR_PIXEL,this.CHARS_STRINGS=["111101101101111","010010010010010","111001111100111","111001111001111","101101111001001","111100111001111","111100111101111","111001001001001","111101111101111","111101111001111"],this.CHARS=this.CHARS_STRINGS.map((function(t){var e=document.createElement("canvas"),i=n.CHAR_PIXEL;e.height=5*i,e.width=3*i;var o=e.getContext("2d");return o.fillStyle="#ECC94B",t.split("").forEach((function(t,e){"1"===t&&o.fillRect(e%3*i,(e/3|0)*i,i,i)})),e}))}return c(t,[{key:"draw",value:function(t,e,n){var i=this,o=e.toString().split(""),r=this.ALIGN*(n+1)-this.CHAR_WIDTH*o.length/2+this.CHAR_PIXEL/2;o.forEach((function(e,n){t.drawImage(i.CHARS[0|e],r+n*i.CHAR_WIDTH,20)}))}}]),t}(),w=function(){function t(e){l(this,t),this._canvas=e,this._context=e.getContext("2d"),this._canvas.width=document.body.clientWidth-20,this._canvas.height=document.body.clientHeight-20,this.pong=new d(e.width,e.height),this.score=new g(e.width)}return c(t,[{key:"setUpCanvas",value:function(){this._canvas.width=document.body.clientWidth-20,this._canvas.height=document.body.clientHeight-20}},{key:"setUpMoveMove",value:function(){var t=this;this._canvas.addEventListener("click",(function(){t.pong.play()})),this._canvas.addEventListener("mousemove",(function(e){var n=e.offsetY/e.target.getBoundingClientRect().height;t.pong.players[0].pos.y=t._canvas.height*n}))}},{key:"setUp",value:function(){this.setUpCanvas(),this.setUpMoveMove()}},{key:"drawBoard",value:function(){this._context.fillStyle="#000",this._context.fillRect(0,0,this._canvas.width,this._canvas.height)}},{key:"drawHalfLine",value:function(){var t=this._canvas.width,e=this._canvas.height,n=10,i=10,o=Math.floor(t/2)-n/2,r=Math.floor(e/(2*i)),s={x:o,y:Math.floor(e%(2*i)/2)+i/2};this._context.fillStyle="#ECC94B";for(var h=0;h<r;h++)this._context.fillRect(s.x,s.y,n,i),s.y+=2*i}},{key:"drawRect",value:function(t,e){this._context.fillStyle=e||"#fff",this._context.fillRect(t.left,t.top,t.size.x,t.size.y)}},{key:"drawScore",value:function(){var t=this;this.pong.players.forEach((function(e,n){t.score.draw(t._context,e.score,n)}))}},{key:"drawBall",value:function(){this.drawRect(this.pong.ball)}},{key:"drawPlayers",value:function(){var t=this;this.pong.players.forEach((function(e){return t.drawRect(e)}))}},{key:"draw",value:function(){this.clear(),this.drawScore(),this.drawPlayers(),this.drawBall()}},{key:"clear",value:function(){this.drawBoard(),this.drawHalfLine()}},{key:"start",value:function(){var t=this,e=null;requestAnimationFrame((function n(i){if(null!==e){var o=i-e;t.pong.update(o/1e3),t.draw()}e=i,requestAnimationFrame(n)}))}}]),t}(),b=(n(0),n(1),new w(document.getElementById("pong")));b.setUp(),b.start()}]);