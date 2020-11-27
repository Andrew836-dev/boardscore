(this["webpackJsonpboard-board"]=this["webpackJsonpboard-board"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(1),a=n.n(c),s=n(5),o=n.n(s),u=(n(12),n(2)),i=n(3),l=n(6),j="UPDATE_SCORE_FOR_ONE_PLAYER",d="ADD_PLAYER",b="REMOVE_PLAYER",O="RESET_SCORES",p=Object(c.createContext)({loading:!1,players:[]}),f=p.Provider,h=function(e,t){switch(t.type){case j:return function(e,t,n){if(Array.isArray(e.players)&&e.players[t]){var r=e.players;return r[t].scores.push(n),Object(u.a)(Object(u.a)({},e),{},{loading:!1,players:r})}return e}(e,t.playerIndex,t.newScore);case d:return function(e,t){var n=e.players||[];return n.push({name:t,scores:[]}),Object(u.a)(Object(u.a)({},e),{},{loading:!1,players:n})}(e,t.playerName);case"LOADING":return function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return Object(u.a)(Object(u.a)({},e),{},{loading:t})}(e);case b:return function(e,t){var n=e.players||[];return n=n.filter((function(e,n){return n!==t})),Object(u.a)(Object(u.a)({},e),{},{loading:!1,players:n})}(e,t.playerIndex);case O:return function(e){var t=e.players||[];return t.forEach((function(e){e.scores=[]})),Object(u.a)(Object(u.a)({},e),{},{loading:!1,players:t})}(e);default:return e}},y=function(e){e.value;var t=Object(l.a)(e,["value"]),n=Object(c.useReducer)(h,{loading:!1,players:[]}),a=Object(i.a)(n,2),s=a[0],o=a[1];return Object(r.jsx)(f,Object(u.a)({value:[s,o]},t))},x=function(){return Object(c.useContext)(p)};var v=function(e){var t,n=e.dispatch,a=e.playerIndex,s=e.player||{name:"Something went wrong. Please refresh and try again.",scores:[]},o=s.name,u=s.scores,l=Object(c.useState)(!1),d=Object(i.a)(l,2),O=d[0],p=d[1],f=Object(c.useState)(0),h=Object(i.a)(f,2),y=h[0],x=h[1],v=Object(c.useRef)();function m(){p((function(){return!1}))}return Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{style:{display:"flex"},children:[Object(r.jsx)("h3",{children:o}),Object(r.jsx)("button",{onClick:function(){return n({type:b,playerIndex:a})},children:"Remove"})]}),Object(r.jsxs)("div",{style:{display:"inline-flex"},children:["Score: ",u.length?(t=u,t.reduce((function(e,t){return e+t}))):"0",O?Object(r.jsxs)("form",{className:"blockDisplay",onSubmit:function(e){e.preventDefault(),n({type:j,playerIndex:a,newScore:y||0}),m(),x((function(){return 0}))},onBlur:m,children:[Object(r.jsx)("label",{htmlFor:"score",children:"Add points"}),Object(r.jsx)("input",{className:"scoreInput",onChange:function(){return x(parseInt(v.current.value))},autoFocus:!0,onFocus:function(e){return e.currentTarget.select()},type:"number",id:"score",name:"score",ref:v,value:y})]}):Object(r.jsx)("button",{className:"scoreButton",onClick:function(){p((function(){return!0}))},children:"Score"})]})]})};var m=function(){var e=x(),t=Object(i.a)(e,2),n=t[0],c=t[1],a=n.players||[];return a.length?Object(r.jsx)("div",{style:{display:"flex",border:"black 1px solid"},children:a.map((function(e,t){return Object(r.jsx)(v,{dispatch:c,playerIndex:t,player:e},"player"+t)}))}):Object(r.jsx)(r.Fragment,{})};var g=function(){var e=x()[1],t=Object(c.useState)(!1),n=Object(i.a)(t,2),a=n[0],s=n[1],o=Object(c.useState)(""),u=Object(i.a)(o,2),l=u[0],j=u[1],b=Object(c.useRef)();return Object(r.jsx)(r.Fragment,{children:a?Object(r.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n=l.trim();""!==n&&e({type:d,playerName:n}),j(""),s(!1)},children:[Object(r.jsx)("label",{htmlFor:"name",children:"Name (Press enter to add the player, click away to close this)"}),Object(r.jsx)("input",{name:"name",id:"name",autoFocus:!0,onBlur:function(){s(!1)},onChange:function(){j(b.current.value)},value:l,ref:b})]}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("button",{id:"addPlayer",onClick:function(){s(!0)},children:"Add player"}),Object(r.jsx)("button",{id:"clearScores",onClick:function(){e({type:O})},children:"Reset Scores"})]})})};var S=function(){return Object(r.jsx)(y,{children:Object(r.jsxs)("div",{children:[Object(r.jsx)("header",{children:Object(r.jsx)("h2",{children:"Welcome to the score Board for Board games"})}),Object(r.jsxs)("section",{children:[Object(r.jsx)(m,{}),Object(r.jsx)(g,{})]})]})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,14)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};o.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(S,{})}),document.getElementById("root")),C()}},[[13,1,2]]]);
//# sourceMappingURL=main.60c2fbe4.chunk.js.map