(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{775:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return ExpendButtonStyle})),__webpack_require__.d(__webpack_exports__,"b",(function(){return useStyles})),__webpack_require__.d(__webpack_exports__,"c",(function(){return veritcalWrapStyle}));var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(761),ExpendButtonStyle={width:"100%",borderRadius:0,borderTop:"1px solid #ddd"},useStyles=Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__.a)((function(theme){return console.log(theme.palette),{root:{"& .MuiTextField-root,.fileUploader,.MuiButton-root,.MuiFormControl-root,.optionAddBtn":{marginBottom:theme.spacing(2),marginLeft:0,marginRight:0,width:"100%"},"& .lastBtn,.addImgBtn":{margin:0}},card:{marginBottom:theme.spacing(3)},optionFiled:{"& .trashCanButton":{display:"none"},"&:hover .trashCanButton":{display:"block","&:hover":{color:theme.palette.error.main}},"& .checkIcon":{color:theme.palette.success.main}}}})),veritcalWrapStyle=Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__.a)((function(theme){return{root:{paddingTop:theme.spacing(6),paddingBottom:theme.spacing(14)},space3:{marginBottom:theme.spacing(3)}}}))},913:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var slicedToArray=__webpack_require__(64),react=__webpack_require__(0),react_default=__webpack_require__.n(react),makeStyles=__webpack_require__(761),createStyles=__webpack_require__(762),ExpansionPanel=__webpack_require__(911),ExpansionPanelSummary=__webpack_require__(903),ExpansionPanelDetails=__webpack_require__(904),Typography=__webpack_require__(358),ExpandMore=__webpack_require__(783),ExpandMore_default=__webpack_require__.n(ExpandMore),Translate=__webpack_require__(862),Translate_default=__webpack_require__.n(Translate),AccountBalance=__webpack_require__(864),AccountBalance_default=__webpack_require__.n(AccountBalance),App=__webpack_require__(224),ListItem=__webpack_require__(854),ListItemIcon=__webpack_require__(855),ListItemText=__webpack_require__(856),FormControl=__webpack_require__(787),IconButton=__webpack_require__(888),RestorePage=__webpack_require__(863),RestorePage_default=__webpack_require__.n(RestorePage),InputLabel=__webpack_require__(794),Select=__webpack_require__(812),useStyles=Object(makeStyles.a)((function(theme){return Object(createStyles.a)({formControl:{margin:theme.spacing(1),minWidth:120},selectEmpty:{marginTop:theme.spacing(2)}})})),components_Select=function SelectBox(_ref){var value=_ref.value,_onChange=_ref.onChange,id=_ref.id,children=_ref.children,label=_ref.label,classes=useStyles(),inputLabel=react_default.a.useRef(null),_React$useState=react_default.a.useState(0),_React$useState2=Object(slicedToArray.a)(_React$useState,2),labelWidth=_React$useState2[0],setLabelWidth=_React$useState2[1];return react_default.a.useEffect((function(){setLabelWidth(inputLabel.current.offsetWidth)}),[]),react_default.a.createElement(FormControl.a,{className:classes.formControl,variant:"outlined"},react_default.a.createElement(InputLabel.a,{htmlFor:id},label),react_default.a.createElement(Select.a,{native:!0,ref:inputLabel,value:value,labelWidth:labelWidth,onChange:function onChange(e){var _e$target=e.target,name=_e$target.name,value=_e$target.value;_onChange(value,name)},inputProps:{name:"age",id:id}},children))},style=__webpack_require__(775),Setting_useStyles=Object(makeStyles.a)((function(theme){return Object(createStyles.a)({root:{width:"100%"},heading:{fontSize:theme.typography.pxToRem(15),fontWeight:theme.typography.fontWeightRegular},list:{padding:0}})}));__webpack_exports__.default=function Setting(){var wrapClasses=Object(style.c)(),classes=Setting_useStyles(),_useState=Object(react.useState)(localStorage.getItem("currentLang")),_useState2=Object(slicedToArray.a)(_useState,2),selectLang=_useState2[0],setSelectLang=_useState2[1],_useState3=Object(react.useState)(localStorage.getItem("exam-count")||10),_useState4=Object(slicedToArray.a)(_useState3,2),examCount=_useState4[0],setExamCount=_useState4[1],_useState5=Object(react.useState)(localStorage.getItem("exam-method")||"ai"),_useState6=Object(slicedToArray.a)(_useState5,2),examMethod=_useState6[0],setExamMethod=_useState6[1],settings=[{title:react_default.a.createElement(react.Fragment,null,react_default.a.createElement(ListItem.a,{className:classes.list},react_default.a.createElement(ListItemIcon.a,null,react_default.a.createElement(Translate_default.a,null)),react_default.a.createElement(ListItemText.a,{primary:App.a.lang_setting}))),content:react_default.a.createElement("div",null,react_default.a.createElement(FormControl.a,{variant:"outlined"},react_default.a.createElement(components_Select,{label:App.a.lang,value:selectLang,onChange:function handleLangChange(lang){setSelectLang(lang),localStorage.setItem("currentLang",lang)},id:"langBox"},react_default.a.createElement("option",{value:"ko"},"한국어"),react_default.a.createElement("option",{value:"en"},"English"),react_default.a.createElement("option",{value:"ar"},"عربى"))),react_default.a.createElement(IconButton.a,{onClick:function onClick(){window.location.search="",window.location.href="http://quizmyself.net/#/setting"},color:"primary","aria-label":"Refresh to new langage"},react_default.a.createElement(RestorePage_default.a,{fontSize:"large"})))},{title:react_default.a.createElement(react.Fragment,null,react_default.a.createElement(ListItem.a,{className:classes.list},react_default.a.createElement(ListItemIcon.a,null,react_default.a.createElement(AccountBalance_default.a,null)),react_default.a.createElement(ListItemText.a,{primary:App.a.exame_setting}))),content:react_default.a.createElement("div",null,react_default.a.createElement(FormControl.a,{variant:"outlined"},react_default.a.createElement(components_Select,{label:App.a.max_count_setting,value:examCount,onChange:function handleCountChange(count){setExamCount(count.toString()),localStorage.setItem("exam-count",count.toString())},id:"langBox"},react_default.a.createElement("option",{value:"5"},"5"),react_default.a.createElement("option",{value:"10"},"10"),react_default.a.createElement("option",{value:"15"},"15"),react_default.a.createElement("option",{value:"20"},"20"),react_default.a.createElement("option",{value:"25"},"25"),react_default.a.createElement("option",{value:"30"},"30"),react_default.a.createElement("option",{value:"40"},"40"),react_default.a.createElement("option",{value:"50"},"50"),react_default.a.createElement("option",{value:"100"},"100"),react_default.a.createElement("option",{value:"1000"},"1000"),react_default.a.createElement("option",{value:"10000"},"10000")),react_default.a.createElement(components_Select,{label:App.a.quiz_method,value:examMethod,onChange:function handleMethodChange(method){setExamMethod(method),localStorage.setItem("exam-method",method)},id:"langBox"},react_default.a.createElement("option",{value:"ai"},App.a.ai),react_default.a.createElement("option",{value:"random"},App.a.random),react_default.a.createElement("option",{value:"create"},App.a.created))))}];return react_default.a.createElement("div",{className:wrapClasses.root},settings.map((function(s){return react_default.a.createElement(ExpansionPanel.a,null,react_default.a.createElement(ExpansionPanelSummary.a,{expandIcon:react_default.a.createElement(ExpandMore_default.a,null),"aria-controls":"panel1a-content",id:"panel1a-header"},react_default.a.createElement(Typography.a,{className:classes.heading},s.title)),react_default.a.createElement(ExpansionPanelDetails.a,null,s.content))})))}}}]);
//# sourceMappingURL=12.0ba1587cf284667cb786.bundle.js.map