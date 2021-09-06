(this["webpackJsonpcrate-client"]=this["webpackJsonpcrate-client"]||[]).push([[0],{81:function(e,t,a){e.exports=a(99)},86:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){},94:function(e,t,a){},95:function(e,t,a){},97:function(e,t,a){},98:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(7),c=a.n(o),i=(a(86),a(15)),l=a(17),s=a(18),m=a(21),u=a(19),p=a(22),h=a(73),g=(a(87),a(32)),d=a(29),f=(a(88),a(50)),b=a(65),E=a.n(b),y="SET_AUTHENTICATED";function v(e){return{type:y,payload:e}}var j=a(43),O={authenticated:"true"===window.sessionStorage.getItem("authenticated"),name:window.sessionStorage.getItem("name")};var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;return t.type===y?(window.sessionStorage.setItem("authenticated",t.payload.authenticated),window.sessionStorage.setItem("name",t.payload.name),Object.assign({},e,{authenticated:t.payload.authenticated,name:t.payload.name})):e},C=Object(j.b)(w);function N(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=E.a.get("CSRF-Token");return fetch(e,Object(f.a)({method:t,headers:Object(f.a)({"Content-Type":"application/json"},n&&{"X-CSRF-Token":"".concat(n)}),credentials:"include"},a&&{body:a})).then((function(e){return Promise.all([e.status,e.json()])})).then((function(e){var t=Object(i.a)(e,2),a=t[0],n=t[1];return 401===a&&C.dispatch(v({authenticated:!1,name:""})),Promise.all([a,n])}))}var k=a(37),S=a(13),x=Object(S.a)(),A=a(136),I=a(100),F=a(146),T=a(148),_=a(67),P=a.n(_),B=a(149),D=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:""},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a={email:this.state.email,password:this.state.password};N("http://localhost:3000/login","post",JSON.stringify(a)).then((function(e){var a=Object(i.a)(e,2),n=a[0],r=a[1];200===n?(t.props.setAuthenticated({authenticated:!0,name:r.name}),x.push("/")):console.log("uh oh")}))}},{key:"handleFieldChange",value:function(e){this.setState(Object(d.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(A.a,{container:!0,justify:"center",alignItems:"center",className:t.login},r.a.createElement(B.a,{className:t.avatar},r.a.createElement(P.a,{className:t.icon})),r.a.createElement("form",{onSubmit:function(t){return e.handleSubmit(t)},className:t.form},r.a.createElement(A.a,{container:!0,className:t.input},r.a.createElement(F.a,{label:"Email",variant:"outlined",name:"email",onChange:function(t){return e.handleFieldChange(t)}})),r.a.createElement(A.a,{container:!0,className:t.input},r.a.createElement(F.a,{variant:"outlined",label:"Password",name:"password",type:"password",onChange:function(t){return e.handleFieldChange(t)}})),r.a.createElement(A.a,{container:!0,justify:"center",alignItems:"center",className:t.submit},r.a.createElement(T.a,{fullWidth:!0,type:"submit",variant:"contained",color:"primary"},"Login"))))}}]),t}(r.a.Component);D=Object(I.a)((function(e){return{login:{marginBottom:e.spacing(20),display:"flex",flexDirection:"column",alignItems:"center"},form:{marginTop:e.spacing(2)},submit:{margin:e.spacing(2,0)},input:{margin:e.spacing(2,0)},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main}}}))(D);var J=Object(k.b)(null,(function(e){return{setAuthenticated:function(t){return e(v(t))}}}))(D),M=(a(94),a(68)),L=a.n(M),R=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={name:"",email:"",password:"",password_confirmation:""},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault();var t={name:this.state.name,email:this.state.email,password:this.state.password,password_confirmation:this.state.password_confirmation};N("http://localhost:3000/user","post",JSON.stringify({user:t})).then((function(e){var t=Object(i.a)(e,2),a=t[0];t[1];200!==a?window.location.reload(!1):x.push("/login")}))}},{key:"handleFieldChange",value:function(e){this.setState(Object(d.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(A.a,{container:!0,justify:"center",alignItems:"center",className:t.login},r.a.createElement(B.a,{className:t.avatar},r.a.createElement(L.a,{className:t.icon})),r.a.createElement("form",{onSubmit:function(t){return e.handleSubmit(t)},className:t.form},r.a.createElement(A.a,{container:!0,className:t.input},r.a.createElement(F.a,{label:"Name",variant:"outlined",name:"name",onChange:function(t){return e.handleFieldChange(t)}})),r.a.createElement(A.a,{container:!0,className:t.input},r.a.createElement(F.a,{label:"Email",variant:"outlined",name:"email",onChange:function(t){return e.handleFieldChange(t)}})),r.a.createElement(A.a,{container:!0,className:t.input},r.a.createElement(F.a,{variant:"outlined",label:"Password",name:"password",type:"password",onChange:function(t){return e.handleFieldChange(t)}})),r.a.createElement(A.a,{container:!0,className:t.input},r.a.createElement(F.a,{variant:"outlined",label:"Password Confirmation",name:"password_confirmation",type:"password",onChange:function(t){return e.handleFieldChange(t)}})),r.a.createElement(A.a,{container:!0,justify:"center",alignItems:"center",className:t.submit},r.a.createElement(T.a,{fullWidth:!0,type:"submit",variant:"contained",color:"primary"},"Sign Up"))))}}]),t}(r.a.Component),$=R=Object(I.a)((function(e){return{login:{marginBottom:e.spacing(20),display:"flex",flexDirection:"column",alignItems:"center"},form:{marginTop:e.spacing(2)},submit:{margin:e.spacing(2,0)},input:{margin:e.spacing(2,0)},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main}}}))(R),W=(a(95),a(26)),H=a(141),U=a(103),z=a(139),G=a(140),X=a(70),q=a.n(X),K=Object(U.a)((function(e){return{link:{color:e.palette.primary.contrastText,margin:e.spacing(1)},icon:{color:e.palette.primary.contrastText,margin:e.spacing(0,3,0,0)},logout:{"&:hover":{backgroundColor:e.palette.primary.dark},margin:e.spacing(1)},home:{flexGrow:1}}})),Q=function(e){var t=e.authenticated,a=e.logout,n=K();return r.a.createElement(z.a,{position:"fixed"},r.a.createElement(G.a,null,r.a.createElement(A.a,{container:!0,alignItems:"center",className:n.home},r.a.createElement(H.a,{to:"/",component:W.a,className:n.icon},r.a.createElement(q.a,null)),t&&r.a.createElement(A.a,null,r.a.createElement(H.a,{variant:"button",className:n.link,to:"/budget",component:W.a},"Budget"),"|",r.a.createElement(H.a,{variant:"button",className:n.link,to:"/budget",component:W.a},"Transactions"))),!t&&r.a.createElement(A.a,{container:!0,justify:"flex-end"},r.a.createElement(A.a,{item:!0},r.a.createElement(H.a,{variant:"button",className:n.link,to:"/signup",component:W.a},"Sign up")),"/",r.a.createElement(A.a,{item:!0},r.a.createElement(H.a,{variant:"button",className:n.link,to:"/login",component:W.a},"Log In"))),t&&r.a.createElement(T.a,{variant:"outlined",className:n.logout,onClick:function(){return a()}},"Logout")))},V=(a(97),a(102)),Y=a(71),Z=a.n(Y),ee=a(143),te=a(147),ae=a(144),ne=a(142),re=Object(I.a)({barColorPrimary:{backgroundColor:"#00e676"}})(ne.a),oe=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={income:0,remaining:0,categories:[]},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.getBudget()}},{key:"getBudget",value:function(){var e=this;N("http://localhost:3000/budget","get").then((function(t){var a=Object(i.a)(t,2),n=a[0],r=a[1];200===n?e.setState({income:r.income,categories:r.categories}):console.log("uh oh")}))}},{key:"listCategories",value:function(){var e=this;return this.state.categories.map((function(t){return r.a.createElement(ee.a,{key:t.label,className:e.props.classes.card,raised:!0},r.a.createElement(ae.a,{className:e.props.classes.cardContent},r.a.createElement(A.a,{container:!0,direction:"row",alignItems:"center"},r.a.createElement(A.a,{className:e.props.classes.primaryAmount},r.a.createElement(V.a,{component:"h1",variant:"h6",color:"textPrimary"},t.label)),r.a.createElement(A.a,null,r.a.createElement(V.a,{component:"h1",variant:"h6",color:"textPrimary"},"$",t.monthly_amount))),r.a.createElement(A.a,{container:!0},r.a.createElement(te.a,{className:e.props.classes.progressBox},r.a.createElement(re,{variant:"determinate",value:80,className:e.props.classes.progress})),r.a.createElement(V.a,{component:"p",className:e.props.classes.progressAmount},"$",t.monthly_amount))))}))}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(A.a,{container:!0,alignItems:"flex-start",className:e.budget,justify:"center"},r.a.createElement(A.a,null,r.a.createElement(A.a,{item:!0},r.a.createElement(V.a,{component:"h1",variant:"h4",color:"textPrimary"},"Monthly: $",this.state.income),r.a.createElement(V.a,{component:"h1",variant:"h4",color:"textPrimary"},"Remaining: $",this.state.remaining)),r.a.createElement(A.a,{item:!0},this.listCategories(e)),r.a.createElement(A.a,{container:!0,justify:"center"},r.a.createElement(W.a,{to:"/new_budget"},r.a.createElement(B.a,{className:e.avatar},r.a.createElement(Z.a,{fontSize:"large"}))))))}}]),t}(r.a.Component),ce=Object(I.a)((function(e){return{budget:{padding:e.spacing(5),textAlign:"center"},avatar:{margin:e.spacing(2),backgroundColor:e.palette.secondary.main},card:{width:700,height:60,margin:e.spacing(1.5),backgroundColor:"#393F4A"},cardContent:{textAlign:"start",paddingTop:5},progress:{margin:e.spacing(1,0),width:550},primaryAmount:{flex:1},progressBox:{flex:1},progressAmount:{color:"#00e676"}}}))(oe),ie=(a(98),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={label:"",monthly_amount:0},a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault(),N("http://localhost:3000/budget_category","post",JSON.stringify({budget_category:this.state})).then((function(e){var t=Object(i.a)(e,2),a=t[0];t[1];200===a?x.push("/budget"):console.log("uh oh")}))}},{key:"handleFieldChange",value:function(e){this.setState(Object(d.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"New budget Category")),r.a.createElement("form",{onSubmit:function(t){return e.handleSubmit(t)}},r.a.createElement("input",{name:"label",placeholder:"Label",onChange:function(t){return e.handleFieldChange(t)}}),r.a.createElement("input",{name:"monthly_amount",placeholder:"Monthly Amount",onChange:function(t){return e.handleFieldChange(t)}}),r.a.createElement("input",{type:"submit",value:"Submit"})))}}]),t}(r.a.Component)),le=function(e){var t=e.component,a=e.authenticated,n=Object(h.a)(e,["component","authenticated"]);return r.a.createElement(g.b,Object.assign({},n,{render:function(e){return a?r.a.createElement(t,e):r.a.createElement(g.a,{to:"/login"})}}))},se=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"logout",value:function(){var e=this;N("http://localhost:3000/logout","post").then((function(t){var a=Object(i.a)(t,2),n=a[0];a[1];200===n?(console.log("logged out"),e.props.setAuthenticated({authenticated:!1,name:""})):console.log("uh oh")}))}},{key:"render",value:function(){var e=this;return r.a.createElement(A.a,{container:!0,id:"App"},r.a.createElement("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"}),r.a.createElement("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/icon?family=Material+Icons"}),r.a.createElement(g.c,{history:x},r.a.createElement("header",null,r.a.createElement(Q,{authenticated:this.props.authenticated,logout:function(){return e.logout()}})),r.a.createElement(A.a,{container:!0,className:"Main"},r.a.createElement(g.d,null,r.a.createElement(g.b,{exact:!0,path:"/"},r.a.createElement(A.a,{container:!0,justify:"center",alignItems:"center"},r.a.createElement(V.a,{component:"h1",variant:"h1",color:"textPrimary"},this.props.authenticated&&"Welcome, ".concat(this.props.name,"!"),!this.props.authenticated&&"Hello"))),!this.props.authenticated&&r.a.createElement(g.b,{path:"/login"},r.a.createElement(J,null)),!this.props.authenticated&&r.a.createElement(g.b,{path:"/signup"},r.a.createElement($,null)),r.a.createElement(le,{path:"/budget",component:ce,authenticated:this.props.authenticated}),r.a.createElement(le,{path:"/new_budget",component:ie,authenticated:this.props.authenticated}),r.a.createElement(g.b,null,r.a.createElement(g.a,{to:"/login"}))))))}}]),t}(r.a.Component),me=Object(k.b)((function(e){return{authenticated:e.authenticated,name:e.name}}),(function(e){return{setAuthenticated:function(t){return e(v(t))}}}))(se),ue=a(72),pe=a(145),he=Object(ue.a)({palette:{type:"dark",primary:{light:"#4dabf5",main:"#2196f3",dark:"#1769aa"},secondary:{light:"#f73378",main:"#f50057",dark:"#ab003c"}}});c.a.render(r.a.createElement(k.a,{store:C},r.a.createElement(pe.a,{theme:he},r.a.createElement(me,null))),document.getElementById("root"))}},[[81,1,2]]]);
//# sourceMappingURL=main.35db7faa.chunk.js.map