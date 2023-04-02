(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,a){},26:function(e,t,a){e.exports=a(40)},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(21),i=a.n(r),o=(a(31),a(2)),c=a(3),u=a(5),l=a(4),m=a(6),h=a(22),y=a(1),d=(a(19),a(14)),f=a(11),g=a.n(f),p=(a(32),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this))).submitQuestion=function(e){e.preventDefault(),g.a.ajax({url:"/questions",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({question:a.state.question,answer:a.state.answer,difficulty:a.state.difficulty,category:a.state.category}),xhrFields:{withCredentials:!0},crossDomain:!0,success:function(e){document.getElementById("add-question-form").reset()},error:function(e){alert("Unable to add question. Please try your request again")}})},a.handleChange=function(e){a.setState(Object(d.a)({},e.target.name,e.target.value))},a.state={question:"",answer:"",difficulty:1,category:1,categories:{}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;g.a.ajax({url:"/categories",type:"GET",success:function(t){e.setState({categories:t.categories})},error:function(e){alert("Unable to load categories. Please try your request again")}})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"add-form"},s.a.createElement("h2",null,"Add a New Trivia Question"),s.a.createElement("form",{className:"form-view",id:"add-question-form",onSubmit:this.submitQuestion},s.a.createElement("label",null,"Question",s.a.createElement("input",{type:"text",name:"question",onChange:this.handleChange})),s.a.createElement("label",null,"Answer",s.a.createElement("input",{type:"text",name:"answer",onChange:this.handleChange})),s.a.createElement("label",null,"Difficulty",s.a.createElement("select",{name:"difficulty",onChange:this.handleChange},s.a.createElement("option",{value:"1"},"1"),s.a.createElement("option",{value:"2"},"2"),s.a.createElement("option",{value:"3"},"3"),s.a.createElement("option",{value:"4"},"4"),s.a.createElement("option",{value:"5"},"5"))),s.a.createElement("label",null,"Category",s.a.createElement("select",{name:"category",onChange:this.handleChange},Object.keys(this.state.categories).map(function(t){return s.a.createElement("option",{key:t,value:t},e.state.categories[t])}))),s.a.createElement("input",{type:"submit",className:"button",value:"Submit"})))}}]),t}(n.Component)),v=(a(33),function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).state={visibleAnswer:!1},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"flipVisibility",value:function(){this.setState({visibleAnswer:!this.state.visibleAnswer})}},{key:"render",value:function(){var e=this,t=this.props,a=t.question,n=t.answer,r=t.category,i=t.difficulty;return s.a.createElement("div",{className:"Question-holder"},s.a.createElement("div",{className:"Question"},a),s.a.createElement("div",{className:"Question-status"},s.a.createElement("img",{className:"category",alt:"".concat(r.toLowerCase()),src:"".concat(r.toLowerCase(),".svg")}),s.a.createElement("div",{className:"difficulty"},"Difficulty: ",i),s.a.createElement("img",{src:"delete.png",alt:"delete",className:"delete",onClick:function(){return e.props.questionAction("DELETE")}})),s.a.createElement("div",{className:"show-answer button",onClick:function(){return e.flipVisibility()}},this.state.visibleAnswer?"Hide":"Show"," Answer"),s.a.createElement("div",{className:"answer-holder"},s.a.createElement("span",{style:{visibility:this.state.visibleAnswer?"visible":"hidden"}},"Answer: ",n)))}}]),t}(n.Component)),E=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(s)))).state={query:""},a.getInfo=function(e){e.preventDefault(),a.props.submitSearch(a.state.query)},a.handleInputChange=function(){a.setState({query:a.search.value})},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("form",{onSubmit:this.getInfo},s.a.createElement("input",{placeholder:"Search questions...",ref:function(t){return e.search=t},onChange:this.handleInputChange}),s.a.createElement("input",{type:"submit",value:"Submit",className:"button"}))}}]),t}(n.Component),b=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).getQuestions=function(){g.a.ajax({url:"/questions?page=".concat(e.state.page),type:"GET",success:function(t){e.setState({questions:t.questions,totalQuestions:t.total_questions,categories:t.categories,currentCategory:t.current_category})},error:function(e){alert("Unable to load questions. Please try your request again")}})},e.getByCategory=function(t){g.a.ajax({url:"/categories/".concat(t,"/questions"),type:"GET",success:function(t){e.setState({questions:t.questions,totalQuestions:t.total_questions,currentCategory:t.current_category})},error:function(e){alert("Unable to load questions. Please try your request again")}})},e.submitSearch=function(t){g.a.ajax({url:"/questions",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({searchTerm:t}),xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){e.setState({questions:t.questions,totalQuestions:t.total_questions,currentCategory:t.current_category})},error:function(e){alert("Unable to load questions. Please try your request again")}})},e.questionAction=function(t){return function(a){"DELETE"===a&&window.confirm("are you sure you want to delete the question?")&&g.a.ajax({url:"/questions/".concat(t),type:"DELETE",success:function(t){e.getQuestions()},error:function(e){alert("Unable to load questions. Please try your request again")}})}},e.state={questions:[],page:1,totalQuestions:0,categories:{},currentCategory:null},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getQuestions()}},{key:"selectPage",value:function(e){var t=this;this.setState({page:e},function(){return t.getQuestions()})}},{key:"createPagination",value:function(){for(var e=this,t=[],a=Math.ceil(this.state.totalQuestions/10),n=function(a){t.push(s.a.createElement("span",{key:a,className:"page-num ".concat(a===e.state.page?"active":""),onClick:function(){e.selectPage(a)}},a))},r=1;r<=a;r++)n(r);return t}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"question-view"},s.a.createElement("div",{className:"categories-list"},s.a.createElement("h2",{onClick:function(){e.getQuestions()}},"Categories"),s.a.createElement("ul",null,Object.keys(this.state.categories).map(function(t){return s.a.createElement("li",{key:t,onClick:function(){e.getByCategory(t)}},e.state.categories[t],s.a.createElement("img",{className:"category",alt:"".concat(e.state.categories[t].toLowerCase()),src:"".concat(e.state.categories[t].toLowerCase(),".svg")}))})),s.a.createElement(E,{submitSearch:this.submitSearch})),s.a.createElement("div",{className:"questions-list"},s.a.createElement("h2",null,"Questions"),this.state.questions.map(function(t,a){return s.a.createElement(v,{key:t.id,question:t.question,answer:t.answer,category:e.state.categories[t.category],difficulty:t.difficulty,questionAction:e.questionAction(t.id)})}),s.a.createElement("div",{className:"pagination-menu"},this.createPagination())))}}]),t}(n.Component),q=(a(34),function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"navTo",value:function(e){window.location.href=window.location.origin+e}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App-header"},s.a.createElement("h1",{onClick:function(){e.navTo("")}},"Udacitrivia"),s.a.createElement("h2",{onClick:function(){e.navTo("")}},"List"),s.a.createElement("h2",{onClick:function(){e.navTo("/add")}},"Add"),s.a.createElement("h2",{onClick:function(){e.navTo("/play")}},"Play"))}}]),t}(n.Component)),C=a(25),w=(a(35),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this))).selectCategory=function(e){var t=e.type,n=e.id,s=void 0===n?0:n;a.setState({quizCategory:{type:t,id:s}},a.getNextQuestion)},a.handleChange=function(e){a.setState(Object(d.a)({},e.target.name,e.target.value))},a.getNextQuestion=function(){var e=Object(C.a)(a.state.previousQuestions);a.state.currentQuestion.id&&e.push(a.state.currentQuestion.id),g.a.ajax({url:"/quizzes",type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify({previous_questions:e,quiz_category:a.state.quizCategory}),xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){a.setState({showAnswer:!1,previousQuestions:e,currentQuestion:t.question,guess:"",forceEnd:!t.question})},error:function(e){alert("Unable to load question. Please try your request again")}})},a.submitGuess=function(e){e.preventDefault();var t=a.evaluateAnswer();a.setState({numCorrect:t?a.state.numCorrect+1:a.state.numCorrect,showAnswer:!0})},a.restartGame=function(){a.setState({quizCategory:null,previousQuestions:[],showAnswer:!1,numCorrect:0,currentQuestion:{},guess:"",forceEnd:!1})},a.evaluateAnswer=function(){var e=a.state.guess.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();return a.state.currentQuestion.answer.toLowerCase().split(" ").every(function(t){return e.includes(t)})},a.state={quizCategory:null,previousQuestions:[],showAnswer:!1,categories:{},numCorrect:0,currentQuestion:{},guess:"",forceEnd:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;g.a.ajax({url:"/categories",type:"GET",success:function(t){e.setState({categories:t.categories})},error:function(e){alert("Unable to load categories. Please try your request again")}})}},{key:"renderPrePlay",value:function(){var e=this;return s.a.createElement("div",{className:"quiz-play-holder"},s.a.createElement("div",{className:"choose-header"},"Choose Category"),s.a.createElement("div",{className:"category-holder"},s.a.createElement("div",{className:"play-category",onClick:this.selectCategory},"ALL"),Object.keys(this.state.categories).map(function(t){return s.a.createElement("div",{key:t,value:t,className:"play-category",onClick:function(){return e.selectCategory({type:e.state.categories[t],id:t})}},e.state.categories[t])})))}},{key:"renderFinalScore",value:function(){return s.a.createElement("div",{className:"quiz-play-holder"},s.a.createElement("div",{className:"final-header"},"Your Final Score is ",this.state.numCorrect),s.a.createElement("div",{className:"play-again button",onClick:this.restartGame},"Play Again?"))}},{key:"renderCorrectAnswer",value:function(){var e=this.evaluateAnswer();return s.a.createElement("div",{className:"quiz-play-holder"},s.a.createElement("div",{className:"quiz-question"},this.state.currentQuestion.question),s.a.createElement("div",{className:"".concat(e?"correct":"wrong")},e?"You were correct!":"You were incorrect"),s.a.createElement("div",{className:"quiz-answer"},this.state.currentQuestion.answer),s.a.createElement("div",{className:"next-question button",onClick:this.getNextQuestion}," ","Next Question"," "))}},{key:"renderPlay",value:function(){return 5===this.state.previousQuestions.length||this.state.forceEnd?this.renderFinalScore():this.state.showAnswer?this.renderCorrectAnswer():s.a.createElement("div",{className:"quiz-play-holder"},s.a.createElement("div",{className:"quiz-question"},this.state.currentQuestion.question),s.a.createElement("form",{onSubmit:this.submitGuess},s.a.createElement("input",{type:"text",name:"guess",onChange:this.handleChange}),s.a.createElement("input",{className:"submit-guess button",type:"submit",value:"Submit Answer"})))}},{key:"render",value:function(){return this.state.quizCategory?this.renderPlay():this.renderPrePlay()}}]),t}(n.Component)),j=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(q,{path:!0}),s.a.createElement(h.a,null,s.a.createElement(y.c,null,s.a.createElement(y.a,{path:"/",exact:!0,component:b}),s.a.createElement(y.a,{path:"/add",component:p}),s.a.createElement(y.a,{path:"/play",component:w}),s.a.createElement(y.a,{component:b}))))}}]),t}(n.Component);i.a.render(s.a.createElement(j,null),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.2da19eea.chunk.js.map