(this.webpackJsonpticket=this.webpackJsonpticket||[]).push([[0],{184:function(e,t,n){},185:function(e,t,n){},319:function(e,t,n){"use strict";n.r(t);var a=n(7),i=n(0),s=n.n(i),c=n(39),r=n.n(c),l=(n(184),n.p,n(185),n(62)),o=n(63),d=n(68),u=n(67),h=n(326),j=n(327),m=n(98),p=n(50),b=(n(135),function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).login=function(){var e=a.state.id,t=a.state.pw;fetch("http://localhost:8080/api/login?id="+e+"&password="+t,{method:"GET",cache:"default"}).then((function(e){return e.json().then((function(e){0!=e.code?console.log(e):(console.log(e),a.props.history.push("/tickets"))}))}))},a.state={id:"",pw:""},a}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return Object(a.jsx)("div",{children:Object(a.jsx)("div",{style:{maxWidth:"500px",padding:"15px",margin:"0 auto"},children:Object(a.jsxs)(h.a,{className:"login-form",initialValues:{remember:!0},children:[Object(a.jsx)(h.a.Item,{name:"id",rules:[{required:!0,message:"\u8bf7\u8f93\u5165id"}],children:Object(a.jsx)(j.a,{id:"id",placeholder:"id",onChange:function(t){e.setState({id:t.target.value})}})}),Object(a.jsx)(h.a.Item,{name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801"}],children:Object(a.jsx)(j.a,{id:"pwInput",type:"password",placeholder:"\u5bc6\u7801",onChange:function(t){e.setState({pw:t.target.value})}})}),Object(a.jsx)(h.a.Item,{children:Object(a.jsx)(h.a.Item,{name:"remember",valuePropName:"checked",noStyle:!0,children:Object(a.jsx)(m.a,{children:"\u8bb0\u4f4f\u6211"})})}),Object(a.jsxs)(h.a.Item,{children:[Object(a.jsx)(p.a,{"data-cy":"login",type:"primary",htmlType:"submit",className:"login-form-button",onClick:function(){return e.login()},children:"\u767b\u5f55"}),"\u6216\u8005 ",Object(a.jsx)("a",{"data-cy":"goToRegister",children:Object(a.jsx)("span",{onClick:function(){return e.props.history.push("/register")},children:"\u7acb\u523b\u6ce8\u518c"})})]})]})})})}}]),n}(s.a.Component)),g=n(104),f=n(33),O=n(97),x="http://localhost:8080/api";function y(e,t){0===e.code?t(e.data):alert(e.msg)}var v=function(e,t,n){var a=x+e;console.log(JSON.stringify(t)),fetch(a,{method:"POST",mode:"cors",cache:"default",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json().then((function(e){y(e,n)}))}))},k=function(e,t,n){var a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new URL(e,window.location.origin);return Object.keys(t).forEach((function(e){return n.searchParams.append(e,t[e])})),n}(x+e,t).href;console.log(a),fetch(a,{method:"GET",cache:"default",mode:"cors"}).then((function(e){return e.json().then((function(e){console.log(e),y(e,n)}))}))},w=O.a.Option,T=(h.a.Item,O.a,function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).login=function(){var e=a.state.id,t=a.state.pw;console.log(e),console.log(t),fetch("http://192.168.1.106:8080/login?id="+e+"&password="+t,{method:"POST",mode:"cors",cache:"default"}).then((function(e){return e.json().then((function(e){401==e.status?alert(e.msg):(console.log(e),a.props.history.push("/register"))}))}))},a.state={id:"",nickname:"",pw:"",pw1:"",pw2:""},a}return Object(o.a)(n,[{key:"GotoLogIn",value:function(){this.props.history.push("/login")}},{key:"submitRegister",value:function(){var e=this;this.state.id.length>0&&this.state.nickname.length>0&&this.state.PW.length>0&&v("/user/register",{name:this.state.nickname,id:this.state.id,password:this.state.pw},(function(t){e.login()}))}},{key:"render",value:function(){var e=this;return Object(a.jsx)("div",{children:Object(a.jsx)("div",{style:{maxWidth:"500px",padding:"15px",margin:"0 auto"},children:Object(a.jsxs)(h.a,{style:{maxWidth:"300px",margin:"0 auto"},name:"register",initialValues:{prefix:"86"},scrollToFirstError:!0,children:[Object(a.jsx)(h.a.Item,{name:"id",rules:[{required:!0,message:"\u8bf7\u8f93\u5165id"}],children:Object(a.jsx)(j.a,{id:"idInput",placeholder:"\u8f93\u5165id",onChange:function(t){e.setState({id:t.target.value})}})}),Object(a.jsx)(h.a.Item,{name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801"}],hasFeedback:!0,children:Object(a.jsx)(j.a.Password,{id:"pw1",onChange:function(t){t.target.value===e.state.pw2?e.setState({pw1:t.target.value,pw:t.target.value}):e.setState({pw1:t.target.value})},placeholder:"\u8bbe\u7f6e\u5bc6\u7801"})}),Object(a.jsx)(h.a.Item,{name:"confirm",dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:"\u8bf7\u786e\u8ba4\u5bc6\u7801"},function(e){var t=e.getFieldValue;return{validator:function(e,n){return n&&t("password")!==n?Promise.reject("\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4"):Promise.resolve()}}}],children:Object(a.jsx)(j.a.Password,{id:"pw2",onChange:function(t){t.target.value===e.state.pw1?e.setState({pw2:t.target.value,PW:t.target.value}):e.setState({pw2:t.target.value})},placeholder:"\u786e\u8ba4\u5bc6\u7801"})}),Object(a.jsx)(h.a.Item,{name:"nickname",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6635\u79f0",whitespace:!0}],children:Object(a.jsx)(j.a,{id:"nameInput",placeholder:"\u8bbe\u7f6e\u6635\u79f0",onChange:function(t){e.setState({nickname:t.target.value})}})}),Object(a.jsxs)(h.a.Item,{style:{maxWidth:"200px",margin:"0 auto"},children:[Object(a.jsx)(p.a,{id:"submitButton",type:"primary",htmlType:"submit",style:{float:"left"},onClick:function(){e.submitRegister()},children:"\u6ce8\u518c"}),Object(a.jsx)(p.a,{type:"primary",htmlType:"submit",style:{float:"right"},onClick:function(){return e.GotoLogIn()},children:"\u8fd4\u56de"})]})]})})})}}]),n}(s.a.Component)),I=n(324),S=n(325),C=n(323),N=n(329),P=I.a.Column,M=(I.a.ColumnGroup,S.a.RangePicker),E=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).state={data:null,types:null,selectedType:null,selectedBeginTime:null,selectedEndTime:null,keyword:""},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;k("/ticket/all","",(function(t){console.log(t),e.setState({data:t})})),k("/ticket/allTypes","",(function(t){console.log(t);for(var n=[],i=0;i<t.length;i++)n.push(Object(a.jsx)(O.a,{children:t[i].type_name},t[i].type_name));e.setState({types:n})}))}},{key:"search",value:function(){var e=this;if(null!=this.state.selectedType&&null!=this.state.selectedBeginTime&&null!=this.state.selectedEndTime){var t=new Object;t.type=this.state.selectedType,t.beginTime=this.state.selectedBeginTime,t.endTime=this.state.selectedEndTime,t.keyword=this.state.keyword,v("/ticket/search",t,(function(t){e.setState({data:t})}))}else alert("\u4fe1\u606f\u4e0d\u8db3\uff01")}},{key:"render",value:function(){var e=this;return Object(a.jsxs)(C.a,{span:12,offset:6,children:[Object(a.jsx)(O.a,{style:{width:200},placeholder:"\u9009\u62e9\u95e8\u7968\u7c7b\u578b",onChange:function(t){return e.setState({selectedType:t})},children:this.state.types}),Object(a.jsx)(N.b,{direction:"vertical",size:12,children:Object(a.jsx)(M,{showTime:!0,onChange:function(t){null==t?e.setState({selectedBeginTime:null,selectedEndTime:null}):e.setState({selectedBeginTime:t[0].format("YYYY-MM-DD HH:MM:SS"),selectedEndTime:t[1].format("YYYY-MM-DD HH:MM:SS")})}})}),Object(a.jsx)(j.a,{placeholder:"\u5173\u952e\u5b57",onChange:function(t){return e.setState({keyword:t.target.value})}}),Object(a.jsx)(p.a,{type:"primary",onClick:function(){e.search()},children:"\u641c\u7d22"}),Object(a.jsxs)(I.a,{dataSource:this.state.data,children:[Object(a.jsx)(P,{title:"ticket name",dataIndex:"ticketName"}),Object(a.jsx)(P,{title:"price",dataIndex:"price"}),Object(a.jsx)(P,{title:"available nums",dataIndex:"availableNumber"}),Object(a.jsx)(P,{title:"Type Name",dataIndex:"typeName"}),Object(a.jsx)(P,{title:"\u5f00\u59cb\u65f6\u95f4",dataIndex:"beginTime"}),Object(a.jsx)(P,{title:"\u7ed3\u675f\u65f6\u95f4",dataIndex:"endTime"}),Object(a.jsx)(P,{title:"",render:function(t){return Object(a.jsx)("a",{onClick:function(){return e.props.history.push("/ticketDetail/"+t.tid)},children:"\u8be6\u60c5"})}},"action")]})]})}}]),n}(s.a.Component),D=n(328),B=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).state={ticketName:null,beginTime:null,endTime:null,typeName:null,price:null,availableNumber:null,detail:null},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;k("/ticket/getOne?ticketId="+this.props.match.params.ticketId,"",(function(t){console.log(t),e.setState({ticketName:t.ticketName,beginTime:t.beginTime,endTime:t.endTime,typeName:t.typeName,price:t.price,availableNumber:t.availableNumber,detail:t.detail}),console.log(e.state)}))}},{key:"render",value:function(){return Object(a.jsxs)(D.a,{title:"\u6f14\u51fa\u8be6\u60c5",bordered:!0,children:[Object(a.jsx)(D.a.Item,{label:"\u6f14\u51fa\u540d\u79f0",children:this.state.ticketName}),Object(a.jsx)(D.a.Item,{label:"\u5f00\u59cb\u65f6\u95f4",children:this.state.beginTime}),Object(a.jsx)(D.a.Item,{label:"\u7ed3\u675f\u65f6\u95f4",children:this.state.endTime}),Object(a.jsx)(D.a.Item,{label:"\u6240\u5c5e\u7c7b\u578b",children:this.state.typeName}),Object(a.jsx)(D.a.Item,{label:"\u4ef7\u683c",children:Object(a.jsx)("span",{style:{color:"red"},children:this.state.price})}),Object(a.jsx)(D.a.Item,{label:"\u5269\u4f59\u540d\u989d",children:Object(a.jsx)("span",{style:{color:"blue"},children:this.state.availableNumber})}),Object(a.jsx)(D.a.Item,{label:"\u6f14\u51fa\u8be6\u60c5",span:3,children:this.state.detail})]})}}]),n}(s.a.Component);var F=function(){return Object(a.jsxs)(g.a,{children:[Object(a.jsx)(f.b,{path:"/login",component:b}),Object(a.jsx)(f.b,{path:"/register",component:T}),Object(a.jsx)(f.b,{path:"/tickets",component:E}),Object(a.jsx)(f.a,{path:"/",to:"/login"}),Object(a.jsx)(f.b,{path:"/ticketDetail/:ticketId",component:B})]})},Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,330)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),a(e),i(e),s(e),c(e)}))};r.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(F,{})}),document.getElementById("root")),Y()}},[[319,1,2]]]);
//# sourceMappingURL=main.f3749bdc.chunk.js.map