(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{101:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return DB})),__webpack_require__.d(__webpack_exports__,"e",(function(){return shuffle})),__webpack_require__.d(__webpack_exports__,"c",(function(){return getHint})),__webpack_require__.d(__webpack_exports__,"b",(function(){return checkIndexDBsupport})),__webpack_require__.d(__webpack_exports__,"f",(function(){return useDB})),__webpack_require__.d(__webpack_exports__,"d",(function(){return getLang}));var C_Users_colto_Desktop_projects_quizMySelf_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(165),C_Users_colto_Desktop_projects_quizMySelf_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(C_Users_colto_Desktop_projects_quizMySelf_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__),C_Users_colto_Desktop_projects_quizMySelf_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(227),C_Users_colto_Desktop_projects_quizMySelf_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(64),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(0),idb__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(355),detect_browser_language__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(346),detect_browser_language__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(detect_browser_language__WEBPACK_IMPORTED_MODULE_5__),DB=null;function shuffle(array){for(var i=array.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),temp=array[i];array[i]=array[j],array[j]=temp}return array}var getHint=function getHint(data,activeStep){var hintString="○",rightAnswer=data[activeStep].answer||"";rightAnswer.length>2&&(hintString=rightAnswer.substring(0,1)+new Array(rightAnswer.length-1).fill("○").join(""));return hintString},checkIndexDBsupport=function checkIndexDBsupport(){window.indexedDB||console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")},useDB=function useDB(){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_3__.useState)(!0),_useState2=Object(C_Users_colto_Desktop_projects_quizMySelf_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a)(_useState,2),loading=_useState2[0],setLoading=_useState2[1];return!DB&&loading&&Object(idb__WEBPACK_IMPORTED_MODULE_4__.a)("Selfquestion",7,{upgrade:function upgrade(db,oldVersion,newVersion,transaction){oldVersion?transaction.done.then(Object(C_Users_colto_Desktop_projects_quizMySelf_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.a)(C_Users_colto_Desktop_projects_quizMySelf_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark((function _callee(){var cursor;return C_Users_colto_Desktop_projects_quizMySelf_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,null==db?void 0:db.transaction("question","readwrite").store.openCursor();case 2:cursor=_context.sent;case 3:if(!cursor){_context.next=14;break}return void 0===cursor.value.type&&(cursor.value.type="essayQ"),void 0===cursor.value.priority&&(cursor.value.priority=9),_context.next=8,cursor.update(cursor.value);case 8:return console.log("udpated"),_context.next=11,cursor.continue();case 11:cursor=_context.sent,_context.next=3;break;case 14:case"end":return _context.stop()}}),_callee)})))):db.createObjectStore("question",{keyPath:"id",autoIncrement:!0}).createIndex("date","date")},blocked:function blocked(){console.info("blcoked")},blocking:function blocking(){console.info("blocking")},terminated:function terminated(){console.info("terminated")}}).catch((function(e){console.error(e)})).then((function(v){DB=v||null})).finally((function(){setLoading(!1)})),{loading:loading}},getLang=function getLang(){return getUrlLang()||localStorage.getItem("currentLang")||detect_browser_language__WEBPACK_IMPORTED_MODULE_5___default()()},getUrlLang=function getUrlLang(){var url_string=window.location.href;return new URL(url_string).searchParams.get("ln")}},219:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_material_ui_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(728),_material_ui_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(734),_material_ui_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(729),_material_ui_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(730),_material_ui_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(731),_material_ui_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(732),_material_ui_core__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(733),_App__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(224),Transition=react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef((function Transition(props,ref){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__.a,Object.assign({direction:"up",ref:ref},props))}));__webpack_exports__.a=function SurrenderModal(_ref){var modalHook=_ref.modalHook,handleClickNextBtn=_ref.handleClickNextBtn,open=modalHook.open,closeModal=modalHook.closeModal,info=modalHook.info;if(!info)return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null);var title=info.title,Commentary=info.Commentary;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.a,{open:open,onClose:closeModal,TransitionComponent:Transition,keepMounted:!0,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.a,{id:"alert-dialog-slide-title"},title),Commentary&&react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__.a,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,{id:"alert-dialog-slide-description"},Commentary)),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.a,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,{onClick:function handleClickNext(){modalHook.closeModal(),handleClickNextBtn()},color:"primary"},_App__WEBPACK_IMPORTED_MODULE_8__.a.go_to_next_quiz," 👉"))))}},224:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return LANG}));__webpack_require__(64);var react=__webpack_require__(0),classCallCheck=(__webpack_require__(351),__webpack_require__(77),__webpack_require__(331)),createClass=__webpack_require__(343),possibleConstructorReturn=__webpack_require__(354),getPrototypeOf=__webpack_require__(344),inherits=__webpack_require__(356),makeStyles=(react.Component,__webpack_require__(759),__webpack_require__(761)),createStyles=__webpack_require__(762),LANG=(__webpack_require__(763),__webpack_require__(769),__webpack_require__(764),__webpack_require__(765),__webpack_require__(345),__webpack_require__(101),__webpack_require__(710),__webpack_require__(347),__webpack_require__(348),__webpack_require__(350),__webpack_require__(349),__webpack_require__(711),__webpack_require__(771),__webpack_require__(772),__webpack_require__(766),{self_quiz:"self quiz",make_quiz:"make quiz",manage:"manage",exame:"exame",right_answer:"right answer",answer:"answer",question:"question",add:"add",create_some_quiz:"Create quizzes",Added_to_quiz_list:"Added to quiz list",Can_not_added_to_quiz_list:"Can not added to quiz list",Hope_this_app_help_your_learning:"Hope this app help your learning",will_remember_quiz:"We will remember your quizzes",check_right_answer:"Check right answer.",index:"index",quiz:"quiz",lets_solve_quiz:"Lets solve quizzes",submit:"submit",it_is_right_answer:"It is right answer",it_is_wrong_answer:"It is wrong answer",do_manage_quiz:"Manage quizzes",delete:"Delete",answer_is_sample:"Answer is 'sample'",sample:"sample",It_is_perfect:"It is perfect",lang:"Language",lang_choice:"select language",lang_setting:"Language setting",setting:"setting",snow:"Snow",hint:"Hint",show_detail:"show detail",add_img:"add img",retry:"retry",samll_text_add_to_question:"small text add to question",explane_about_answer:"explane about answer",go_to_next_quiz:"Ok, next",answer_is_xxx:"Correct answer is",fisrt_quiz:"📣 First quiz ",custom_hint:"custom_hint",exame_setting:"Exam config",max_count_setting:"max-count quiz",quiz_method:"quiz method",ai:"A.I",created:"created",random:"random",choice:"chocie",is_this_true:"Is this true?"});Object(makeStyles.a)((function(theme){return{root:{flexGrow:1},bottomNav:{position:"fixed",left:0,right:0,bottom:0}}})),Object(makeStyles.a)((function(theme){return Object(createStyles.a)({root:{transform:"translateZ(0px)",flexGrow:1},radioGroup:{margin:theme.spacing(1,0)},speedDial:{position:"fixed","&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft":{bottom:theme.spacing(2),right:theme.spacing(2)},"&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight":{top:theme.spacing(2),left:theme.spacing(2)}}})}))},347:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/favi.9c0eaf15.png"},372:function(module,exports,__webpack_require__){__webpack_require__(373),__webpack_require__(519),module.exports=__webpack_require__(520)},437:function(module,exports){},520:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(342);module._StorybookPreserveDecorators=!0,Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(701)],module)}.call(this,__webpack_require__(521)(module))},701:function(module,exports,__webpack_require__){var map={"./page/createQuestion/components/SurrenderModal.stories.tsx":702};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=701},702:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"standard",(function(){return standard}));var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_SurrenderModal__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(219),_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(125);__webpack_exports__.default={title:"--2",component:_SurrenderModal__WEBPACK_IMPORTED_MODULE_1__.a,decorators:[_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.withKnobs]};var standard=function standard(){var isOpen=Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.boolean)("open",!0),comment=Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.text)("Commentary","what is going on here?"),title=Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.text)("title","Storybook");return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SurrenderModal__WEBPACK_IMPORTED_MODULE_1__.a,{modalHook:{closeModal:function closeModal(){},info:{title:react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span",null,title),Commentary:react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span",null,comment)},open:isOpen,openModal:function openModal(){},setOpen:function setOpen(){}},handleClickNextBtn:function handleClickNextBtn(){}})};standard.story={name:"Default"}},710:function(module,exports,__webpack_require__){},711:function(module,exports,__webpack_require__){}},[[372,4,5]]]);
//# sourceMappingURL=main.0ba1587cf284667cb786.bundle.js.map