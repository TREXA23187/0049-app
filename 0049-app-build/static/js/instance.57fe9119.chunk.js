(self.webpackChunk_0049_app=self.webpackChunk_0049_app||[]).push([[896],{69291:function(e,n,t){"use strict";t.d(n,{A8:function(){return u},Bi:function(){return h},CK:function(){return l},D0:function(){return o},F6:function(){return Z},FI:function(){return g},Fs:function(){return s},IX:function(){return i},KG:function(){return v},Mn:function(){return c},NY:function(){return d},ZS:function(){return x},dV:function(){return a},fZ:function(){return p},gw:function(){return f},vr:function(){return m}});var r=t(48845);function s(e){return(0,r.v_)("api/v1/console/instance",e)}function i(){return(0,r.U2)("api/v1/console/instance/list")}function a(e){return(0,r.v_)("api/v1/console/instance/operate",e)}function o(e){return(0,r.IV)("api/v1/console/instance",e)}function c(e){return(0,r.v_)("api/v1/console/template",e)}function u(){return(0,r.U2)("api/v1/console/template/list")}function l(e){return(0,r.IV)("api/v1/console/template",e)}function d(e){return(0,r.v_)("api/v1/console/model",e)}function p(){return(0,r.U2)("api/v1/console/model/list")}function f(e){return(0,r.IV)("api/v1/console/model",e)}function m(e){return(0,r.v_)("api/v1/console/task",e)}function x(){return(0,r.U2)("api/v1/console/task/list")}function Z(e){return(0,r.IV)("api/v1/console/task",e)}function h(e){return(0,r.v_)("api/v1/console/image",e)}function v(){return(0,r.U2)("api/v1/console/image/list")}function g(e){return(0,r.U2)("api/v1/console/image/info",e)}},69762:function(e){e.exports={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_BASE_URL_DEV:"localhost",REACT_APP_BASE_URL_PRO:"47.243.60.114"}},70188:function(e,n,t){"use strict";t.d(n,{_:function(){return s}});var r=t(69762),s="production"===r.NODE_ENV?r.REACT_APP_BASE_URL_PRO:r.REACT_APP_BASE_URL_DEV},48845:function(e,n,t){"use strict";t.d(n,{IV:function(){return u},U2:function(){return o},v_:function(){return c}});var r=t(31243),s=t(70188),i=t(42434),a=r.Z.create({baseURL:"http://".concat(s._,":3000"),timeout:3e4});function o(e,n){return a.get(e,{params:n})}function c(e,n){return a.post(e,n)}function u(e,n){return a.delete(e,{params:n})}a.interceptors.request.use((function(e){var n,t;return e.headers.token=null!==(n=null===(t=i.ls.get("user"))||void 0===t?void 0:t.token)&&void 0!==n?n:"",e}),(function(e){return Promise.reject(e)})),a.interceptors.response.use((function(e){return 10001===e.data.code?(i.ls.get("user")&&i.ls.remove("user"),void window.location.replace("/login")):e.data}),(function(e){return Promise.reject(e)}))},91798:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return R}});var r=t(74165),s=t(15861),i=t(29439),a=t(72791),o=t(87309),c=t(66106),u=t(30914),l=t(34664),d=t(3859),p=t(95058),f=t(2964),m=t(77106),x=t(77027),Z=t(87888),h=t(16726),v=t(23414),g=t(80184);function j(e){var n=e.data,t=e.onCardClick,r=n.title,s=n.description,a=n.instance_id,o=n.status,c=n.url,u=x.ZP.useMessage(),l=(0,i.Z)(u,2),d=l[0],p=l[1];return(0,g.jsxs)(g.Fragment,{children:[p,(0,g.jsxs)(Z.Z,{title:r,bordered:!1,hoverable:!0,style:{margin:"10px 5px",height:"230px",position:"relative",minWidth:"280px"},onClick:function(){return t(n)},children:[(0,g.jsx)("div",{children:s}),(0,g.jsxs)("div",{children:["instance id:",a.slice(0,12)]}),(0,g.jsx)("div",{style:{position:"absolute",left:"30px",bottom:"20px"},children:"running"===o?(0,g.jsxs)("div",{children:[(0,g.jsx)(h.Z,{status:"success"})," ",(0,g.jsx)("span",{children:o})]}):(0,g.jsxs)("div",{children:[(0,g.jsx)(h.Z,{status:"error"})," ",(0,g.jsx)("span",{children:o})]})}),(0,g.jsxs)("div",{style:{position:"absolute",right:"30px",bottom:"20px"},children:[c,(0,g.jsx)(v.Z,{style:{marginLeft:5,fontSize:16,cursor:"pointer"},onClick:function(e){e.stopPropagation(),navigator.clipboard.writeText(c),d.success("copied")}})]})]})]})}var y=t(1413),I=t(90098),_=t(17828),b=t(83099),k=t(376),w=t(9555),C=t(67174),P=t(69291),S=t(59029);function F(e){var n=e.data,t=e.open,c=e.isEdit,u=e.onClose,l=e.refreshList,d=e.imageList,p=n.title,f=n.description,m=n.instance_id,Z=n.task,v=n.url,j=n.created_at,F=(0,a.useState)(n.status),E=(0,i.Z)(F,2),T=E[0],R=E[1];(0,a.useEffect)((function(){R(n.status)}),[n]);var A=(0,S.QT)(function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,P.dV)(n);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),{manual:!0}),D=A.loading,L=A.run,U=I.Z.useForm(),V=(0,i.Z)(U,1)[0],B=x.ZP.useMessage(),z=(0,i.Z)(B,2),O=z[0],K=z[1],N=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var n,t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=V.getFieldsValue(),e.next=3,(0,P.Fs)(n);case 3:0===(t=e.sent).code?(O.success("instance created successfully"),l(),u()):O.error(t.msg);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,g.jsxs)(g.Fragment,{children:[K,(0,g.jsx)(_.Z,{title:c?"Create Instance":"Instance Detail",placement:"right",onClose:u,open:t,extra:!c&&"not exist"===T&&(0,g.jsx)(b.Z,{children:(0,g.jsx)(o.ZP,{danger:!0,size:"small",onClick:(0,s.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,P.D0)({id:m});case 2:0===e.sent.code?(O.success("removed"),l(),u()):O.error("remove failed");case 4:case"end":return e.stop()}}),e)}))),children:"Remove"})}),children:c?(0,g.jsxs)(I.Z,{name:"create_instance_form",style:{maxWidth:"85%"},labelCol:{span:8},wrapperCol:{span:16},initialValues:(0,y.Z)({template:"default"},n),form:V,onFinish:N,onFinishFailed:function(e){console.log("Failed:",e)},autoComplete:"off",children:[(0,g.jsx)(I.Z.Item,{label:"Name",name:"name",rules:[{required:!0,message:"Please input name"}],children:(0,g.jsx)(k.Z,{})}),(0,g.jsx)(I.Z.Item,{label:"Description",name:"description",rules:[{required:!0,message:"Please input description"}],children:(0,g.jsx)(k.Z,{})}),(0,g.jsx)(I.Z.Item,{label:"Image",name:"image",rules:[{required:!0,message:"Please select image"}],children:(0,g.jsx)(w.Z,{options:null===d||void 0===d?void 0:d.map((function(e){return{value:e.repository,label:e.repository}}))})}),(0,g.jsx)(I.Z.Item,{label:"URL",name:"url",children:(0,g.jsx)(k.Z,{})}),(0,g.jsx)(I.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,g.jsx)(o.ZP,{type:"primary",htmlType:"submit",children:"Submit"})})]}):(0,g.jsxs)(C.Z,{title:p,column:1,children:[(0,g.jsxs)(C.Z.Item,{label:"Description",children:[" ",f]}),(0,g.jsx)(C.Z.Item,{label:"Instance ID:",children:m}),(0,g.jsx)(C.Z.Item,{label:"Task",children:Z}),(0,g.jsx)(C.Z.Item,{label:"URL",children:v}),(0,g.jsx)(C.Z.Item,{label:"Status",children:"running"===T?(0,g.jsxs)("div",{children:[(0,g.jsx)(h.Z,{status:"success"})," ",(0,g.jsx)("span",{children:T})," ",(0,g.jsx)(o.ZP,{danger:!0,loading:D,onClick:(0,s.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L({instance_id:m,operation:"stop"});case 2:0===e.sent.code&&(R("exited"),l());case 4:case"end":return e.stop()}}),e)}))),size:"small",style:{marginLeft:"30px"},children:"stop"})]}):"exited"===T?(0,g.jsxs)("div",{children:[(0,g.jsx)(h.Z,{status:"error"})," ",(0,g.jsx)("span",{children:T}),(0,g.jsx)(o.ZP,{type:"primary",loading:D,onClick:(0,s.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L({instance_id:m,operation:"start"});case 2:0===e.sent.code&&(R("running"),l());case 4:case"end":return e.stop()}}),e)}))),size:"small",style:{marginLeft:"30px"},children:"start"}),(0,g.jsx)(o.ZP,{danger:!0,loading:D,onClick:(0,s.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L({instance_id:m,operation:"remove"});case 2:0===e.sent.code&&(R("not exist"),l());case 4:case"end":return e.stop()}}),e)}))),size:"small",style:{marginLeft:"10px"},children:"remove"})]}):(0,g.jsxs)("div",{children:[(0,g.jsx)(h.Z,{status:"error"})," ",(0,g.jsx)("span",{children:T})]})}),(0,g.jsx)(C.Z.Item,{label:"created at",children:new Date(j).toString()})]})})]})}var E=t(11188);function T(e){var n=e.data,t=e.open,a=e.isEdit,c=e.onClose,u=e.refreshList,l=e.showBuildingAlert,d=n.repository,p=n.size,f=n.created_at,m=n.tag,Z=n.image_id,h=(0,S.QT)((0,s.Z)((0,r.Z)().mark((function e(){var n,t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,P.ZS)();case 2:return t=e.sent,e.abrupt("return",(null===(n=t.data)||void 0===n?void 0:n.list)||[]);case 4:case"end":return e.stop()}}),e)})))),v=h.data,j=h.loading,b=I.Z.useForm(),F=(0,i.Z)(b,1)[0],E=x.ZP.useMessage(),T=(0,i.Z)(E,2),R=T[0],A=T[1],D=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var n,t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=F.getFieldsValue(),e.next=3,(0,P.Bi)(n);case 3:0===(t=e.sent).code?(R.success(t.msg),u(),c(),l(n.repository)):R.error(t.msg);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,g.jsxs)(g.Fragment,{children:[A,(0,g.jsx)(_.Z,{title:a?"Create Image":"Image Detail",placement:"right",onClose:c,open:t,children:a?(0,g.jsxs)(I.Z,{name:"create_image_form",style:{maxWidth:"85%"},labelCol:{span:8},wrapperCol:{span:16},initialValues:(0,y.Z)({tag:"latest"},n),form:F,onFinish:D,onFinishFailed:function(e){console.log("Failed:",e)},autoComplete:"off",children:[(0,g.jsx)(I.Z.Item,{label:"Repository",name:"repository",rules:[{required:!0,message:"Please input repository"}],children:(0,g.jsx)(k.Z,{})}),(0,g.jsx)(I.Z.Item,{label:"Task",name:"task",rules:[{required:!0,message:"Please select task"}],children:(0,g.jsx)(w.Z,{options:null===v||void 0===v?void 0:v.map((function(e){return{value:e.name,label:e.name}}))})}),(0,g.jsx)(I.Z.Item,{label:"Tag",name:"tag",rules:[{required:!0,message:"Please input tag"}],children:(0,g.jsx)(k.Z,{})}),(0,g.jsx)(I.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,g.jsx)(o.ZP,{type:"primary",htmlType:"submit",loading:j,children:"Submit"})})]}):(0,g.jsxs)(C.Z,{title:d,column:1,children:[(0,g.jsxs)(C.Z.Item,{label:"Repository",children:[" ",d]}),(0,g.jsx)(C.Z.Item,{label:"Tag",children:m}),(0,g.jsx)(C.Z.Item,{label:"Image ID",children:Z}),(0,g.jsx)(C.Z.Item,{label:"Size",children:p?(p/1e6).toFixed(2)+"MB":""}),(0,g.jsx)(C.Z.Item,{label:"created at",children:new Date(f).toString()})]})})]})}function R(){var e=(0,E.$)().t,n=(0,a.useState)(!1),t=(0,i.Z)(n,2),x=t[0],Z=t[1],h=(0,a.useState)(!1),v=(0,i.Z)(h,2),y=v[0],I=v[1],_=(0,a.useState)({}),b=(0,i.Z)(_,2),k=b[0],w=b[1],C=(0,a.useState)({}),R=(0,i.Z)(C,2),A=R[0],D=R[1],L=(0,a.useState)(!1),U=(0,i.Z)(L,2),V=U[0],B=U[1],z=(0,a.useState)(!1),O=(0,i.Z)(z,2),K=O[0],N=O[1],q=(0,a.useState)(!1),M=(0,i.Z)(q,2),W=M[0],Q=M[1],H=(0,a.useState)(!1),G=(0,i.Z)(H,2),X=G[0],Y=G[1],$=(0,a.useRef)(null),J=function(e){B(!1),Z(!0),w(e)},ee=(0,S.QT)((0,s.Z)((0,r.Z)().mark((function e(){var n,t,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,P.IX)();case 2:return s=e.sent,e.abrupt("return",(null===(n=s.data)||void 0===n||null===(t=n.list)||void 0===t?void 0:t.reverse())||[]);case 4:case"end":return e.stop()}}),e)})))),ne=ee.data,te=ee.refresh,re=(0,S.QT)((0,s.Z)((0,r.Z)().mark((function e(){var n,t,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,P.KG)();case 2:return s=e.sent,e.abrupt("return",(null===(n=s.data)||void 0===n||null===(t=n.list)||void 0===t?void 0:t.reverse())||[]);case 4:case"end":return e.stop()}}),e)})))),se=re.data,ie=re.refresh,ae=re.run;(0,a.useEffect)((function(){ae()}),[X]);var oe=[{title:e("Repository"),dataIndex:"repository",key:"repository"},{title:e("Tag"),dataIndex:"tag",key:"tag",render:function(e){return e.length>250?e.slice(1,250)+"...":e}},{title:e("Status"),dataIndex:"status",key:"status"},{title:e("Image ID"),dataIndex:"image_id",key:"image_id",render:function(e){return e?e.slice(0,20):""}},{title:e("Size"),dataIndex:"size",key:"size",render:function(e){return e?(e/1e6).toFixed(2)+"MB":""}},{title:e("Action"),render:function(n){return(0,g.jsxs)("div",{children:[(0,g.jsx)(o.ZP,{type:"link",onClick:function(){N(!1),D(n),I(!0)},children:e("Detail")}),(0,g.jsx)(o.ZP,{type:"text",danger:!0,disabled:!0,onClick:(0,s.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),children:e("Remove")})]})}}],ce=[{key:"instance",label:"Instances",children:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(c.Z,{children:(0,g.jsx)(u.Z,{span:2,children:(0,g.jsx)(o.ZP,{type:"primary",style:{margin:"0 10px"},onClick:function(){w({}),B(!0),Z(!0)},children:"New Instance"})})}),(0,g.jsx)(c.Z,{gutter:12,children:null===ne||void 0===ne?void 0:ne.map((function(e,n){return(0,g.jsx)(u.Z,{span:8,children:(0,g.jsx)(j,{onCardClick:J,data:e})},n)}))}),!(null!==ne&&void 0!==ne&&ne.length)&&(0,g.jsx)(l.Z,{})]})},{key:"image",label:"Images",children:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(c.Z,{style:{marginBottom:"10px"},children:(0,g.jsx)(u.Z,{span:2,children:(0,g.jsx)(o.ZP,{type:"primary",style:{margin:"0 10px"},onClick:function(){D({}),N(!0),I(!0)},children:"New Image"})})}),(0,g.jsx)(d.Z,{columns:oe,dataSource:se,pagination:{defaultPageSize:5},rowKey:"id"})]})}];return(0,g.jsxs)("div",{style:{position:"relative"},children:[(0,g.jsx)(p.Z,{defaultActiveKey:"1",items:ce,type:"card",onChange:Y}),W&&(0,g.jsx)(f.Z,{message:"The image is being built.",type:"info",showIcon:!0,icon:(0,g.jsx)(m.Z,{}),style:{position:"absolute",right:0,top:0,width:230}}),(0,g.jsx)(F,{data:k,isEdit:V,open:x,imageList:se,refreshList:te,onClose:function(){w({}),Z(!1)}}),(0,g.jsx)(T,{data:A,isEdit:K,showBuildingAlert:function(e){Q(!0),$=setInterval((0,s.Z)((0,r.Z)().mark((function n(){var t;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,P.FI)({repository:e});case 2:0!==(t=n.sent).code||t.data||(ie(),Q(!1),clearInterval($));case 4:case"end":return n.stop()}}),n)}))),2e3)},open:y,refreshList:ie,onClose:function(){D({}),I(!1)}})]})}},24654:function(){}}]);
//# sourceMappingURL=instance.57fe9119.chunk.js.map