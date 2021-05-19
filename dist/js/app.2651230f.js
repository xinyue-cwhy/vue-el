(function(e){function t(t){for(var r,s,i=t[0],u=t[1],l=t[2],f=0,p=[];f<i.length;f++)s=i[f],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&p.push(a[s][0]),a[s]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);c&&c(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var c=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"150b":function(e,t,n){},3469:function(e,t,n){},"4b19":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],s={name:"app"},i=s,u=n("2877"),l=Object(u["a"])(i,a,o,!1,null,null,null),c=l.exports,f=n("8c4f"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login"},[n("div",{staticClass:"loginbox"},[e._m(0),n("el-form",{ref:"loginFormRef",staticClass:"form",attrs:{model:e.loginForm,rules:e.loginFormRules}},[n("el-form-item",{attrs:{prop:"username"}},[n("el-input",{attrs:{placeholder:"用户名","prefix-icon":"iconfont icon-user"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),n("el-form-item",{attrs:{prop:"password"}},[n("el-input",{attrs:{placeholder:"密码","prefix-icon":"iconfont icon-3702mima"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1),n("el-form-item",{staticClass:"btns"},[n("el-button",{attrs:{type:"primary"},on:{click:e.login}},[e._v("登录")]),n("el-button",{attrs:{type:"info"},on:{click:e.reset}},[e._v("重置")])],1)],1)],1)])},d=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"imgbox"},[r("img",{attrs:{src:n("cf05"),alt:""}})])}],m=n("1da1"),g=(n("96cf"),{data:function(){return{loginForm:{username:"admin",password:"123456"},loginFormRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:12,message:"长度在 6 到 12 个字符",trigger:"blur"}]}}},methods:{reset:function(){this.$refs.loginFormRef.resetFields()},login:function(){var e=this;this.$refs.loginFormRef.validate(function(){var t=Object(m["a"])(regeneratorRuntime.mark((function t(n){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$http.post("login",e.loginForm);case 4:if(r=t.sent,a=r.data,200==a.meta.status){t.next=9;break}return e.$message.error("用户名或密码错误"),t.abrupt("return");case 9:e.$message.success("登陆成功"),window.sessionStorage.setItem("token",a.data.token),e.$router.push("/home");case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}}),b=g,h=(n("a701"),Object(u["a"])(b,p,d,!1,null,"5a592104",null)),v=h.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticClass:"contain"},[n("el-header",[n("div",[n("span",[e._v("电商后台管理项目")])]),n("el-button",{attrs:{type:"info"},on:{click:e.back}},[e._v("退出")])],1),n("el-container",[n("el-aside",{attrs:{width:"200px"}},[n("el-menu",{attrs:{"background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"}},[n("el-submenu",{attrs:{index:"1"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-location"}),n("span",[e._v("导航一")])]),n("el-menu-item",{attrs:{index:"4"}},[n("i",{staticClass:"el-icon-setting"}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v("导航四")])])],2)],1)],1),n("el-main",[e._v("Main")])],1)],1)},x=[],y={data:function(){return{menuList:[]}},created:function(){this.getlist()},methods:{back:function(){window.sessionStorage.clear(),this.$router.push("/login")},getlist:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("menus");case 2:if(n=t.sent,r=n.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error(r.meta.msg));case 6:e.menuList=r.data,console.log(r);case 8:case"end":return t.stop()}}),t)})))()}}},_=y,k=(n("d2ff"),Object(u["a"])(_,w,x,!1,null,"2e090006",null)),$=k.exports;r["default"].use(f["a"]);var O=[{path:"/",redirect:"/login"},{path:"/login",component:v},{path:"/home",component:$}],F=new f["a"]({routes:O});F.beforeEach((function(e,t,n){if("/login"===e.path)return n();var r=window.sessionStorage.getItem("token");if(!r)return n("/login");n()}));var j=F,R=(n("0fb7"),n("450d"),n("f529")),S=n.n(R),C=(n("8bd8"),n("4cb2")),P=n.n(C),E=(n("ce18"),n("f58e")),M=n.n(E),q=(n("4ca3"),n("443e")),I=n.n(q),L=(n("de31"),n("c69e")),T=n.n(L),J=(n("a769"),n("5cc3")),z=n.n(J),A=(n("adec"),n("3d2d")),U=n.n(A),B=(n("a673"),n("7b31")),D=n.n(B),G=(n("10cb"),n("f3ad")),H=n.n(G),K=(n("eca7"),n("3787")),N=n.n(K),Q=(n("425f"),n("4105")),V=n.n(Q),W=(n("1951"),n("eedf")),X=n.n(W);r["default"].use(X.a),r["default"].use(V.a),r["default"].use(N.a),r["default"].use(H.a),r["default"].use(D.a),r["default"].use(U.a),r["default"].use(z.a),r["default"].use(T.a),r["default"].use(I.a),r["default"].use(M.a),r["default"].use(P.a),r["default"].prototype.$message=S.a;n("150b"),n("82da");var Y=n("bc3a"),Z=n.n(Y);Z.a.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/",Z.a.interceptors.request.use((function(e){return e.headers.Authorization=window.sessionStorage.getItem("token"),e})),r["default"].prototype.$http=Z.a,r["default"].config.productionTip=!1,new r["default"]({router:j,render:function(e){return e(c)}}).$mount("#app")},"82da":function(e,t,n){},a701:function(e,t,n){"use strict";n("3469")},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},d2ff:function(e,t,n){"use strict";n("4b19")}});
//# sourceMappingURL=app.2651230f.js.map