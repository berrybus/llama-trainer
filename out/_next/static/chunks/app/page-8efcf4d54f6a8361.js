(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{6545:function(e,t,s){Promise.resolve().then(s.bind(s,6491))},6491:function(e,t,s){"use strict";let a;s.r(t),s.d(t,{default:function(){return _}});var r,n,l=s(9268),i=s(6006),c=s(6008),o=s(184),d=s(6267);let h=/^(.+)\/(.+)$/,u=/^(.+)\s+\((.+)\)$/,m=/((identify|name|give) (both|all)|(what (two|three) ))/;function x(e,t){let s=t.trim(),a=function(e,t){let s=new o.Z([e],{includeScore:!0,location:e.length-t.length,distance:1.2*e.length,threshold:2}),a=s.search(t);return a.length>0&&void 0!==a[0].score&&a[0].score<=.4}(e,s),r=function(e,t){let s=Math.max(1,e.length);return(0,d.T)(e,t)/s<=.25}(e,s);return a||r}function g(e){let t=u[Symbol.match](e);return null===t?[e]:[t[1],t[2]]}class f{markAnswerAsCorrect(e){let t=this.getStatisticsForQuestion(e);return t.correct+=1,t.total+=1,this.setStatisticsForQuestion(e,t),t}markAnswerAsIncorrect(e){let t=this.getStatisticsForQuestion(e);return t.total+=1,this.setStatisticsForQuestion(e,t),t}getStatisticsForQuestion(e){var t;return null!==(t=this.database.get(this.serializeQuestionId(e)))&&void 0!==t?t:{correct:0,total:0}}size(){return this.database.size}isEligibleForPractice(){return this.getPracticeQuestions().length>20}getPracticeQuestions(){return Array.from(this.database.entries()).filter(e=>{let[t,s]=e;return 0!==s.total&&s.correct/s.total<=.5}).map(e=>{let[t,s]=e;return this.deserializeQuestionId(t)})}reset(){this.database=new Map,this.serializeToStorage()}setStatisticsForQuestion(e,t){this.database.set(this.serializeQuestionId(e),t),this.serializeToStorage()}serializeQuestionId(e){return"".concat(e.league,"-").concat(e.day,"-").concat(e.index)}deserializeQuestionId(e){let t=e.split("-");return{league:parseInt(t[0],10),day:parseInt(t[1],10),index:parseInt(t[2],10)}}serializeToStorage(){let e=JSON.stringify(Object.fromEntries(this.database));this.storage.setItem(f.LOCAL_STORAGE_KEY,e)}deserializeFromStorage(){let e=this.storage.getItem(f.LOCAL_STORAGE_KEY);return null===e?new Map:new Map(Object.entries(JSON.parse(e)))}constructor(e){void 0!==e?this.storage=e:this.storage={getItem:e=>null,setItem(e,t){},key:e=>null,clear(){},length:0,removeItem(e){}},this.database=this.deserializeFromStorage()}}f.LOCAL_STORAGE_KEY="answer-history";var p=s(9738),j=s(4398),b=s(5807);function y(e){let{onConfirm:t,onCancel:s,isOpen:a}=e,r=(0,i.useRef)(null);return(0,l.jsx)(p.u.Root,{show:a,as:i.Fragment,children:(0,l.jsxs)(j.V,{as:"div",className:"relative z-10",initialFocus:r,onClose:s,children:[(0,l.jsx)(p.u.Child,{as:i.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,l.jsx)("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})}),(0,l.jsx)("div",{className:"fixed inset-0 z-10 overflow-y-auto",children:(0,l.jsx)("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",children:(0,l.jsx)(p.u.Child,{as:i.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:(0,l.jsxs)(j.V.Panel,{className:"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",children:[(0,l.jsx)("div",{className:"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4",children:(0,l.jsxs)("div",{className:"sm:flex sm:items-start",children:[(0,l.jsx)("div",{className:"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",children:(0,l.jsx)(b.Z,{className:"h-6 w-6 text-red-600","aria-hidden":"true"})}),(0,l.jsxs)("div",{className:"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left",children:[(0,l.jsx)(j.V.Title,{as:"h3",className:"text-base font-semibold leading-6 text-gray-900",children:"Reset answer history?"}),(0,l.jsx)("div",{className:"mt-2",children:(0,l.jsx)("p",{className:"text-sm text-gray-500",children:"Are you sure you want to reset your answer history? All of your data will be permanently removed. This action cannot be undone."})})]})]})}),(0,l.jsxs)("div",{className:"bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6",children:[(0,l.jsx)("button",{type:"button",className:"inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",onClick:()=>{t()},children:"Reset History"}),(0,l.jsx)("button",{type:"button",className:"mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:()=>{s()},ref:r,children:"Cancel"})]})]})})})})]})})}(r=n||(n={}))[r.REGULAR=0]="REGULAR",r[r.PRACTICE=1]="PRACTICE";var w=s(6338),v=s(1033);function N(e,t){return Math.floor(Math.random()*(t-e+1)+e)}let[S,C]=[60,96],[E,k]=[1,25],[A,R]=[0,5],I={correct:0,total:0},T={},F=()=>{let[e,t]=(0,i.useState)(!1),[s,r]=(0,i.useState)((0,c.useSearchParams)()),[o,d]=(0,i.useState)(new f(localStorage)),[u,p]=(0,i.useState)({league:0,day:0,index:0}),[j,b]=(0,i.useState)(n.REGULAR),[F,_]=(0,i.useState)(""),[z,L]=(0,i.useState)(""),[O,P]=(0,i.useState)(""),[Q,M]=(0,i.useState)(""),[G,D]=(0,i.useState)(""),[U,W]=(0,i.useState)(" "),[q,K]=(0,i.useState)(" "),[J,V]=(0,i.useState)(" "),[Y,Z]=(0,i.useState)(" "),[$,B]=(0,i.useState)(" "),[H,X]=(0,i.useState)(""),[ee,et]=(0,i.useState)(!0),[es,ea]=(0,i.useState)(!1),[er,en]=(0,i.useState)(!1),[el,ei]=(0,i.useState)(!0),ec=(0,i.useRef)(null);function eo(e){return null===e?null:parseInt(e,10)}let ed=async()=>{try{console.log("GameMode[gameMode] in fetchData"),console.log(n[j]);let e=j===n.PRACTICE?function(){let e=o.getPracticeQuestions(),t=N(0,e.length);return console.log(e),e[t]}():function(){let e={league:N(S,C),day:N(E,k),index:N(A,R)},t=eo(s.get("league"));null!==t&&t>=S&&t<=C&&(e.league=t);let a=eo(s.get("day"));null!==a&&a>=E&&a<=k&&(e.day=a);let r=eo(s.get("index"));return null!==r&&r>=A&&r<=R&&(e.index=r),e}();p(e),console.log("fetching league ".concat(e.league," on day ").concat(e.day," for mode ").concat(n[j]));let t=await fetch("data/league".concat(e.league,"_day").concat(e.day,".json")),r=await t.json(),l=r.questions[e.index];if(a=l,_(l.prompt),L(l.category),P(r.date),null!=l.image){let e="https://learnedleague.com"+String(a.image);D(e)}else D("")}catch(e){console.error("Error fetching data:",e)}},eh=e=>{"n"===e.key&&el&&(em(),e.preventDefault())},eu=e=>{b(e)};(0,i.useEffect)(()=>(document.addEventListener("keydown",eh),()=>{document.removeEventListener("keydown",eh)}),[el,j]),(0,i.useEffect)(()=>{t(!0),em()},[]),(0,i.useEffect)(()=>{!el&&ec.current&&ec.current.focus()},[el]),(0,i.useEffect)(()=>{console.log("game mode changed"),ed()},[j]);let em=()=>{if(console.log("handling next"),console.log(el),el)ed(),M(""),X(""),W(""),K(""),V(""),Z(""),B("");else{let e=function(e,t,s){var a;let r;let n=s.trim();if(x(t,n))return!0;let l=(a=t.toLowerCase(),null===(r=h[Symbol.match](a))?[a]:[r[1],r[2]]).flatMap(e=>e.split(", ")).flatMap(g),i=n.split(","),c=l.map(e=>i.map(t=>x(e,t)).includes(!0)).filter(e=>e),o=m.test(e);return c.length>(o?1:0)}(a.prompt,a.answer,H);void 0===T[a.category]&&(T[a.category]={correct:0,total:0}),e?(I.correct+=1,T[a.category].correct+=1,et(!0),o.markAnswerAsCorrect(u)):(et(!1),o.markAnswerAsIncorrect(u)),M(a.answer),W(a.a_percent),K(a.b_percent),V(a.c_percent),Z(a.d_percent),B(a.e_percent),I.total+=1,T[a.category].total+=1}console.log("setting is showing answer :".concat(!el)),ei(!el)},ex=()=>{o.reset()},eg=e=>{if(!el){let t=e.target.value;X(t)}},ef=e=>{el||"Enter"!==e.key||""==H||em()},ep=()=>{ea(!es)},ej=e=>{let t="".concat(e.correct,"/").concat(e.total),s=0===e.total?1:e.total,a=e.correct/s*100;return(0,l.jsxs)("span",{children:[t," (",a.toFixed(2),"%)"]})},eb=""!==G&&(G.endsWith(".jpg")||G.endsWith(".png")),ey=""!==G&&!(G.endsWith(".jpg")||G.endsWith(".png")),ew=o.isEligibleForPractice();return e?(0,l.jsxs)("div",{className:"container mx-auto",children:[(0,l.jsx)(y,{isOpen:er,onConfirm:()=>{ex(),en(!1)},onCancel:()=>en(!1)}),(0,l.jsxs)("div",{className:"flex flex-row items-start gap-4 flex-wrap md:flex-nowrap",children:[(0,l.jsx)("div",{className:"container basis-full shrink-0 md:basis-2/3",children:(0,l.jsx)("div",{className:"card bg-base-100 shadow",children:(0,l.jsxs)("div",{className:"card-body",children:[(0,l.jsxs)("div",{className:"flex flex-row justify-between flex-wrap",children:[(0,l.jsxs)("h3",{className:"card-title",children:[z," - ",O]}),(0,l.jsxs)("h3",{className:"card-title",children:["League ",u.league," - Day ",u.day]})]}),(0,l.jsx)("p",{children:F}),eb?(0,l.jsx)("figure",{className:"px-10 pt-10",children:(0,l.jsx)("img",{src:G,alt:G})}):"",ey?(0,l.jsx)("a",{className:"link",href:G,target:"_blank",hidden:""==G,children:"Click here"}):"",(0,l.jsxs)("h2",{className:"font-bold mt-2"+(el?"":" hidden"),children:["ANSWER - ",Q]}),(0,l.jsxs)("div",{className:"flex flex-row gap-4 mt-6",children:[(0,l.jsx)("input",{type:"text",placeholder:"Type the answer",className:"input input-bordered w-full"+(el?ee?" input-success":" input-error":""),value:H,onChange:eg,onKeyDown:ef,ref:ec,readOnly:el}),(0,l.jsx)("div",{className:"tooltip tooltip-primary hidden md:block","data-tip":el?"Shortcut: N":"Shortcut: Enter",children:(0,l.jsx)("button",{className:"btn btn-primary",onClick:em,disabled:""==H,children:el?"Next":"Check"})}),(0,l.jsx)("button",{className:"btn btn-primary block md:hidden",onClick:em,disabled:""==H,children:el?"Next":"Check"})]})]})})}),(0,l.jsx)("div",{className:"card bg-base-100 shadow basis-full shrink md:basis-1/3",children:(0,l.jsxs)("div",{className:"card-body",children:[(0,l.jsx)("h3",{className:"card-title"+(el?"":" hidden"),children:"Correct % per level"}),(0,l.jsxs)("table",{className:"table table-compact text-center"+(el?"":" hidden"),children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{style:{zIndex:10},children:"A"}),(0,l.jsx)("th",{children:"B"}),(0,l.jsx)("th",{children:"C"}),(0,l.jsx)("th",{children:"D"}),(0,l.jsx)("th",{children:"E"})]})}),(0,l.jsx)("tbody",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:U}),(0,l.jsx)("td",{children:q}),(0,l.jsx)("td",{children:J}),(0,l.jsx)("td",{children:Y}),(0,l.jsx)("td",{children:$})]})})]}),(0,l.jsx)("div",{className:"py-1"+(el?"":" hidden")}),(0,l.jsxs)("div",{className:"flex flex-row justify-between flex-wrap",children:[(0,l.jsxs)("h3",{className:"card-title",children:["Total score: ",ej(I)]}),(0,l.jsx)("button",{className:"btn btn-square btn-sm btn-outline",onClick:ep,children:es?(0,l.jsx)(w.OId,{}):(0,l.jsx)(w.hjJ,{})})]}),(0,l.jsxs)("table",{className:"table table-compact text-center w-full"+(es?"":" hidden"),children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{style:{zIndex:10},children:"Category"}),(0,l.jsx)("th",{children:"Score"})]})}),(0,l.jsx)("tbody",{children:Object.entries(T).map(e=>{let[t,s]=e;return(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:t}),(0,l.jsx)("td",{children:ej(s)})]},t)})})]}),(0,l.jsx)("div",{className:"divider"}),(0,l.jsxs)("div",{className:"flex flex-row gap-4 flex-wrap",children:[(0,l.jsxs)("div",{className:"flex flex-row items-center",children:[(0,l.jsx)("h3",{className:"text-lg",children:"Mode"}),(0,l.jsx)("div",{className:"tooltip tooltip-primary","data-tip":"Practice mode is available when you answer over 20 questions with <= 50% accuracy",children:(0,l.jsx)(v.ocf,{})})]}),(0,l.jsxs)("div",{className:"btn-group",children:[(0,l.jsx)("button",{className:"btn btn-outline"+(j==n.REGULAR?" btn-active":""),onClick:()=>eu(n.REGULAR),children:"Regular"}),(0,l.jsx)("button",{className:"btn btn-outline"+(j==n.PRACTICE?" btn-active":""),onClick:()=>eu(n.PRACTICE),disabled:!ew,children:"Practice"})]})]}),(0,l.jsx)("div",{className:"py-1"}),(0,l.jsxs)("div",{className:"flex flex-row flex-wrap gap-4 items-center",children:[(0,l.jsxs)("h3",{className:"text-lg",children:["Lifetime questions: ",o.size()]}),(0,l.jsx)("button",{className:"btn btn-sm btn-error",onClick:()=>en(!0),children:"Reset"})]})]})})]})]}):null};var _=F}},function(e){e.O(0,[266,776,551,667,139,744],function(){return e(e.s=6545)}),_N_E=e.O()}]);