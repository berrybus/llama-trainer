(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{2126:function(e,t,s){Promise.resolve().then(s.bind(s,6406))},6406:function(e,t,s){"use strict";let a;s.r(t),s.d(t,{default:function(){return z}});var r,n,i=s(7437),l=s(2265),c=s(4033),o=s(8970),d=s(9734);let u=/^(.+)\/(.+)$/,h=/^(.+)\s+\((.+)\)$/,m=/((identify|name|give) (both|all)|(what (two|three) ))/;function x(e,t){let s=t.trim(),a=function(e,t){let s=new o.Z([e],{includeScore:!0,location:e.length-t.length,distance:1.2*e.length,threshold:2}).search(t);return s.length>0&&void 0!==s[0].score&&s[0].score<=.4}(e,s),r=function(e,t){let s=Math.max(1,e.length);return(0,d.T)(e,t)/s<=.25}(e,s);return a||r}function g(e){let t=h[Symbol.match](e);return null===t?[e]:[t[1],t[2]]}class f{markAnswerAsCorrect(e){let t=this.getStatisticsForQuestion(e);return t.correct+=1,t.total+=1,this.setStatisticsForQuestion(e,t),t}unmarkAnswerAsCorrect(e){let t=this.getStatisticsForQuestion(e);return t.correct-=1,this.setStatisticsForQuestion(e,t),t}unmarkAnswerAsIncorrect(e){let t=this.getStatisticsForQuestion(e);return t.correct+=1,this.setStatisticsForQuestion(e,t),t}markAnswerAsIncorrect(e){let t=this.getStatisticsForQuestion(e);return t.total+=1,this.setStatisticsForQuestion(e,t),t}getStatisticsForQuestion(e){var t;return null!==(t=this.database.get(this.serializeQuestionId(e)))&&void 0!==t?t:{correct:0,total:0}}size(){return this.database.size}isEligibleForPractice(){return this.getPracticeQuestions().length>20}getPracticeQuestions(){return Array.from(this.database.entries()).filter(e=>{let[t,s]=e;return 0!==s.total&&s.correct/s.total<=.5}).map(e=>{let[t,s]=e;return this.deserializeQuestionId(t)})}reset(){this.database=new Map,this.serializeToStorage()}setStatisticsForQuestion(e,t){this.database.set(this.serializeQuestionId(e),t),this.serializeToStorage()}serializeQuestionId(e){return"".concat(e.league,"-").concat(e.day,"-").concat(e.index)}deserializeQuestionId(e){let t=e.split("-");return{league:parseInt(t[0],10),day:parseInt(t[1],10),index:parseInt(t[2],10)}}serializeToStorage(){let e=JSON.stringify(Object.fromEntries(this.database));this.storage.setItem(f.LOCAL_STORAGE_KEY,e)}deserializeFromStorage(){let e=this.storage.getItem(f.LOCAL_STORAGE_KEY);return null===e?new Map:new Map(Object.entries(JSON.parse(e)))}constructor(e){void 0!==e?this.storage=e:this.storage={getItem:e=>null,setItem(e,t){},key:e=>null,clear(){},length:0,removeItem(e){}},this.database=this.deserializeFromStorage()}}f.LOCAL_STORAGE_KEY="answer-history";var p=s(9805),j=s(8636),b=s(887);function y(e){let{onConfirm:t,onCancel:s,isOpen:a}=e,r=(0,l.useRef)(null);return(0,i.jsx)(p.u.Root,{show:a,as:l.Fragment,children:(0,i.jsxs)(j.V,{as:"div",className:"relative z-10",initialFocus:r,onClose:s,children:[(0,i.jsx)(p.u.Child,{as:l.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,i.jsx)("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})}),(0,i.jsx)("div",{className:"fixed inset-0 z-10 overflow-y-auto",children:(0,i.jsx)("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",children:(0,i.jsx)(p.u.Child,{as:l.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:(0,i.jsxs)(j.V.Panel,{className:"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",children:[(0,i.jsx)("div",{className:"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4",children:(0,i.jsxs)("div",{className:"sm:flex sm:items-start",children:[(0,i.jsx)("div",{className:"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",children:(0,i.jsx)(b.Z,{className:"h-6 w-6 text-red-600","aria-hidden":"true"})}),(0,i.jsxs)("div",{className:"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left",children:[(0,i.jsx)(j.V.Title,{as:"h3",className:"text-base font-semibold leading-6 text-gray-900",children:"Reset answer history?"}),(0,i.jsx)("div",{className:"mt-2",children:(0,i.jsx)("p",{className:"text-sm text-gray-500",children:"Are you sure you want to reset your answer history? All of your data will be permanently removed. This action cannot be undone."})})]})]})}),(0,i.jsxs)("div",{className:"bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6",children:[(0,i.jsx)("button",{type:"button",className:"inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",onClick:()=>{t()},children:"Reset History"}),(0,i.jsx)("button",{type:"button",className:"mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",onClick:()=>{s()},ref:r,children:"Cancel"})]})]})})})})]})})}(r=n||(n={}))[r.REGULAR=0]="REGULAR",r[r.PRACTICE=1]="PRACTICE";var w=s(2410),v=s(9150),N=s(5114);function S(e,t){return Math.floor(Math.random()*(t-e+1)+e)}let[C,A]=[60,98],[k,I]=[1,25],[E,R]=[0,5],F={correct:0,total:0},T={};var z=()=>{let[e,t]=(0,l.useState)(!1),[s,r]=(0,l.useState)((0,c.useSearchParams)()),[o,d]=(0,l.useState)(new f(localStorage)),[h,p]=(0,l.useState)({league:0,day:0,index:0}),[j,b]=(0,l.useState)(n.REGULAR),[z,_]=(0,l.useState)(""),[Q,L]=(0,l.useState)(""),[O,P]=(0,l.useState)(""),[M,G]=(0,l.useState)(""),[D,q]=(0,l.useState)(null),[W,U]=(0,l.useState)(""),[V,K]=(0,l.useState)(" "),[J,Y]=(0,l.useState)(" "),[Z,$]=(0,l.useState)(" "),[B,H]=(0,l.useState)(" "),[X,ee]=(0,l.useState)(" "),[et,es]=(0,l.useState)(""),[ea,er]=(0,l.useState)(!0),[en,ei]=(0,l.useState)(!1),[el,ec]=(0,l.useState)(!1),[eo,ed]=(0,l.useState)(!0),[eu,eh]=(0,l.useState)(!1),{reward:em,isAnimating:ex}=(0,N.w5)("rewardId","confetti",{startVelocity:15,spread:90,zIndex:100}),{reward:eg,isAnimating:ef}=(0,N.w5)("rewardId2","confetti",{startVelocity:15,spread:90,zIndex:100}),ep=(0,l.useRef)(null);function ej(e){return null===e?null:parseInt(e,10)}let eb=async()=>{try{console.log("GameMode[gameMode] in fetchData"),console.log(n[j]);let e=j===n.PRACTICE?function(){let e=o.getPracticeQuestions(),t=S(0,e.length);return console.log(e),e[t]}():function(){let e={league:S(C,A),day:S(k,I),index:S(E,R)},t=ej(s.get("league"));null!==t&&t>=C&&t<=A&&(e.league=t);let a=ej(s.get("day"));null!==a&&a>=k&&a<=I&&(e.day=a);let r=ej(s.get("index"));return null!==r&&r>=E&&r<=R&&(e.index=r),e}();p(e),console.log("fetching league ".concat(e.league," on day ").concat(e.day," for mode ").concat(n[j]));let t=await fetch("data/league".concat(e.league,"_day").concat(e.day,".json")),r=await t.json(),i=r.questions[e.index];if(a=i,_(i.prompt),L(i.category),P(r.date),null!=i.image){let e="https://learnedleague.com"+String(a.image);U(e)}else U("")}catch(e){console.error("Error fetching data:",e)}},ey=e=>{"n"===e.key&&eo&&(ev(),e.preventDefault())},ew=e=>{b(e)};(0,l.useEffect)(()=>(document.addEventListener("keydown",ey),()=>{document.removeEventListener("keydown",ey)}),[eo,j]),(0,l.useEffect)(()=>{t(!0),ev()},[]),(0,l.useEffect)(()=>{!eo&&ep.current&&ep.current.focus()},[eo]),(0,l.useEffect)(()=>{console.log("game mode changed"),eb()},[j]);let ev=()=>{if(console.log("handling next"),console.log(eo),eo)eb(),G(""),es(""),eh(!1),K(""),Y(""),$(""),H(""),ee("");else{let e=function(e,t,s){var a;let r;let n=s.trim();if(x(t,n))return!0;let i=(a=t.toLowerCase(),null===(r=u[Symbol.match](a))?[a]:[r[1],r[2]]).flatMap(e=>e.split(", ")).flatMap(g),l=n.split(","),c=i.map(e=>l.map(t=>x(e,t)).includes(!0)).filter(e=>e),o=m.test(e);return c.length>(o?1:0)}(a.prompt,a.answer,et);q({currentData:a,questionId:h,isCorrect:e}),void 0===T[a.category]&&(T[a.category]={correct:0,total:0}),e?(F.correct+=1,T[a.category].correct+=1,er(!0),o.markAnswerAsCorrect(h),F.correct%3==0&&(em(),eg())):(er(!1),o.markAnswerAsIncorrect(h)),G(a.answer),K(a.a_percent),Y(a.b_percent),$(a.c_percent),H(a.d_percent),ee(a.e_percent),F.total+=1,T[a.category].total+=1}console.log("setting is showing answer :".concat(!eo)),ed(!eo)},eN=e=>{eh(!0),e.isCorrect?(F.correct-=1,T[e.currentData.category].correct-=1,o.unmarkAnswerAsCorrect(e.questionId)):(F.correct+=1,T[e.currentData.category].correct+=1,o.unmarkAnswerAsIncorrect(e.questionId)),er(!e.isCorrect)},eS=()=>{o.reset()},eC=e=>{let t="".concat(e.correct,"/").concat(e.total),s=0===e.total?1:e.total,a=e.correct/s*100;return(0,i.jsxs)("span",{children:[t," (",a.toFixed(2),"%)"]})},eA=()=>(0,i.jsx)("button",{className:"btn btn-warning",onClick:()=>D?eN(D):null,disabled:eu,children:eu?"Fixed!":"Wrong?"}),ek=""!==W&&(W.endsWith(".jpg")||W.endsWith(".png")),eI=""!==W&&!(W.endsWith(".jpg")||W.endsWith(".png")),eE=o.isEligibleForPractice();return e?(0,i.jsxs)("div",{className:"container mx-auto",children:[(0,i.jsx)(y,{isOpen:el,onConfirm:()=>{eS(),ec(!1)},onCancel:()=>ec(!1)}),(0,i.jsxs)("div",{className:"flex flex-row items-start gap-4 flex-wrap md:flex-nowrap",children:[(0,i.jsx)("div",{className:"container basis-full shrink-0 md:basis-2/3",children:(0,i.jsx)("div",{className:"card bg-base-100 shadow",children:(0,i.jsxs)("div",{className:"card-body",children:[(0,i.jsxs)("div",{className:"flex flex-row justify-between flex-wrap",children:[(0,i.jsxs)("h3",{className:"card-title",children:[Q," - ",O]}),(0,i.jsxs)("h3",{className:"card-title",children:["League ",h.league," - Day ",h.day]})]}),(0,i.jsx)("p",{children:z}),ek?(0,i.jsx)("figure",{className:"px-10 pt-10",children:(0,i.jsx)("img",{src:W,alt:W})}):"",eI?(0,i.jsx)("a",{className:"link",href:W,target:"_blank",hidden:""==W,children:"Click here"}):"",(0,i.jsxs)("h2",{className:"font-bold mt-2"+(eo?"":" hidden"),children:["ANSWER - ",M]}),(0,i.jsxs)("div",{className:"flex flex-row gap-2 mt-6",children:[(0,i.jsx)("span",{id:"rewardId"}),(0,i.jsx)("input",{type:"text",placeholder:"Type the answer",className:"input input-bordered w-full"+(eo?ea?" input-success":" input-error":""),value:et,onChange:e=>{eo||es(e.target.value)},onKeyDown:e=>{eo||"Enter"!==e.key||""==et||ev()},ref:ep,readOnly:eo}),(0,i.jsx)("span",{id:"rewardId2"}),eo?eu?eA():(0,i.jsx)("div",{className:"tooltip tooltip-warning hidden md:block","data-tip":"Fix incorrect grading",children:eA()}):null,(0,i.jsx)("div",{className:"tooltip tooltip-primary hidden md:block","data-tip":eo?"Shortcut: N":"Shortcut: Enter",children:(0,i.jsx)("button",{className:"btn btn-primary",onClick:ev,disabled:""==et,children:eo?"Next":"Check"})}),(0,i.jsx)("button",{className:"btn btn-primary block md:hidden",onClick:ev,disabled:""==et,children:eo?"Next":"Check"})]})]})})}),(0,i.jsx)("div",{className:"card bg-base-100 shadow basis-full shrink md:basis-1/3",children:(0,i.jsxs)("div",{className:"card-body",children:[(0,i.jsx)("h3",{className:"card-title"+(eo?"":" hidden"),children:"Correct % per level"}),(0,i.jsxs)("table",{className:"table table-compact text-center"+(eo?"":" hidden"),children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{style:{zIndex:10},children:"A"}),(0,i.jsx)("th",{children:"B"}),(0,i.jsx)("th",{children:"C"}),(0,i.jsx)("th",{children:"D"}),(0,i.jsx)("th",{children:"E"})]})}),(0,i.jsx)("tbody",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:V}),(0,i.jsx)("td",{children:J}),(0,i.jsx)("td",{children:Z}),(0,i.jsx)("td",{children:B}),(0,i.jsx)("td",{children:X})]})})]}),(0,i.jsx)("div",{className:"py-1"+(eo?"":" hidden")}),(0,i.jsxs)("div",{className:"flex flex-row justify-between flex-wrap",children:[(0,i.jsxs)("h3",{className:"card-title",children:["Total score: ",eC(F)]}),(0,i.jsx)("button",{className:"btn btn-square btn-sm btn-outline",onClick:()=>{ei(!en)},children:en?(0,i.jsx)(w.OId,{}):(0,i.jsx)(w.hjJ,{})})]}),(0,i.jsxs)("table",{className:"table table-compact text-center w-full"+(en?"":" hidden"),children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{style:{zIndex:10},children:"Category"}),(0,i.jsx)("th",{children:"Score"})]})}),(0,i.jsx)("tbody",{children:Object.entries(T).map(e=>{let[t,s]=e;return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:t}),(0,i.jsx)("td",{children:eC(s)})]},t)})})]}),(0,i.jsx)("div",{className:"divider"}),(0,i.jsxs)("div",{className:"flex flex-row gap-4 flex-wrap",children:[(0,i.jsxs)("div",{className:"flex flex-row items-center",children:[(0,i.jsx)("h3",{className:"text-lg",children:"Mode"}),(0,i.jsx)("div",{className:"tooltip tooltip-primary","data-tip":"Practice mode is available when you answer over 20 questions with <= 50% accuracy",children:(0,i.jsx)(v.ocf,{})})]}),(0,i.jsxs)("div",{className:"btn-group",children:[(0,i.jsx)("button",{className:"btn btn-outline"+(j==n.REGULAR?" btn-active":""),onClick:()=>ew(n.REGULAR),children:"Regular"}),(0,i.jsx)("button",{className:"btn btn-outline"+(j==n.PRACTICE?" btn-active":""),onClick:()=>ew(n.PRACTICE),disabled:!eE,children:"Practice"})]})]}),(0,i.jsx)("div",{className:"py-1"}),(0,i.jsxs)("div",{className:"flex flex-row flex-wrap gap-4 items-center",children:[(0,i.jsxs)("h3",{className:"text-lg",children:["Lifetime questions: ",o.size()]}),(0,i.jsx)("button",{className:"btn btn-sm btn-error",onClick:()=>ec(!0),children:"Reset"})]})]})})]})]}):null}}},function(e){e.O(0,[400,712,541,971,938,744],function(){return e(e.s=2126)}),_N_E=e.O()}]);