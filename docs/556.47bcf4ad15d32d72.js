"use strict";(self.webpackChunkRequestForms=self.webpackChunkRequestForms||[]).push([[556],{9556:(F,a,e)=>{e.r(a),e.d(a,{UserHomeModule:()=>s});var l=e(6895),m=e(9299),t=e(4650),c=e(815),d=e(6410),g=e(7392);const h=function(){return["/Dashboard/FormCustomization"]};class r{constructor(o,i,U){this._httpService=o,this._utility=i,this.nav=U,this.formCount=0,this.ActiveFormCount=0,this.TotalFormSubmitionCount=0,this.AverageFormSubmitionCount=0,this.HighestSubmitionCountFormName="",this.HighestFormSubmitionCount=0,this.UserModel={}}ngOnInit(){if(this.usrModelStr=localStorage.getItem("UserModel"),this.UserModel=JSON.parse(this.usrModelStr),0==this._utility.hasValue(this.UserModel))return this._utility.AlertWarning("Please Login"),void this.nav.navigate(["/SignUpIn/true"]);this._httpService.Get("Form/GetUserFormCountMetaData?UserId="+this.UserModel.user_id).subscribe(o=>{this.formCount=o.data.totalForms,this.ActiveFormCount=o.data.activeForms,this.TotalFormSubmitionCount=o.data.totalFormSubmition,this.AverageFormSubmitionCount=o.data.averageSubmitionPerForm,this.HighestSubmitionCountFormName=o.data.highestSubmitionFormName,this.HighestFormSubmitionCount=o.data.highestSubmitionFormCount},o=>{this._utility.AlertWarning(o.error.message)})}}r.\u0275fac=function(o){return new(o||r)(t.Y36(c.O),t.Y36(d.g),t.Y36(m.F0))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-user-home-directive"]],decls:62,vars:11,consts:[[1,"row","text-center","mt-5","pt-3"],[1,"col-12"],[1,"row"],[1,"col-12","text-center","align-items-center"],[1,"btn","btn-primary",3,"routerLink"],[1,"row","text-center","align-items-center","mt-5","pt-4","mb-5"],[1,"col-xl-4","col-lg-4","col-md-4","col-sm-12","col-xs-12"],[1,"text-primary","cursor-pointer",3,"routerLink"],[1,"d-block","d-md-none"],[1,"text-primary","cursor-pointer"]],template:function(o,i){1&o&&(t.TgZ(0,"div")(1,"div")(2,"div",0)(3,"div",1)(4,"h3")(5,"i"),t._uU(6,"Create a form to met your business needs"),t.qZA()()()(),t.TgZ(7,"div",2)(8,"div",3)(9,"button",4),t._uU(10,"Create Form"),t.qZA()()()(),t.TgZ(11,"div")(12,"div",5)(13,"div",6)(14,"span")(15,"h3")(16,"b"),t._uU(17,"Your Forms"),t.qZA()(),t.TgZ(18,"mat-icon"),t._uU(19,"list_alt"),t.qZA()(),t.TgZ(20,"span")(21,"h1"),t._uU(22),t.qZA()(),t.TgZ(23,"span")(24,"h5"),t._uU(25),t.TgZ(26,"span",7),t._uU(27,"Forms"),t.qZA(),t._uU(28,"."),t.qZA()()(),t._UZ(29,"hr",8),t.TgZ(30,"div",6)(31,"span")(32,"h3")(33,"b"),t._uU(34,"Form Submitions"),t.qZA()(),t.TgZ(35,"mat-icon"),t._uU(36,"verified_user"),t.qZA()(),t.TgZ(37,"span")(38,"h1"),t._uU(39),t.qZA()(),t.TgZ(40,"span")(41,"h5"),t._uU(42,"133 forms need to review out of 1484 go to "),t.TgZ(43,"span",9),t._uU(44,"Review Forms"),t.qZA(),t._uU(45,"."),t.qZA()()(),t._UZ(46,"hr",8),t.TgZ(47,"div",6)(48,"span")(49,"h3")(50,"b"),t._uU(51,"Average Submitions (Per Form)"),t.qZA()(),t.TgZ(52,"mat-icon"),t._uU(53,"bar_chart"),t.qZA()(),t.TgZ(54,"span")(55,"h1"),t._uU(56),t.qZA()(),t.TgZ(57,"span")(58,"h5")(59,"span",9),t._uU(60),t.qZA(),t._uU(61),t.qZA()()()()()()),2&o&&(t.xp6(9),t.Q6J("routerLink",t.DdM(9,h)),t.xp6(13),t.Oqu(i.formCount),t.xp6(3),t.AsE("",i.ActiveFormCount," forms are active out of ",i.formCount,", look over "),t.xp6(1),t.Q6J("routerLink",t.DdM(10,h)),t.xp6(13),t.Oqu(i.TotalFormSubmitionCount),t.xp6(17),t.Oqu(i.AverageFormSubmitionCount),t.xp6(4),t.Oqu(i.HighestSubmitionCountFormName),t.xp6(1),t.hij(" form has highest number of submitions, count is ",i.HighestFormSubmitionCount,"."))},dependencies:[g.Hw,m.rH]});const v=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"",component:r,children:[{path:"main-view",component:r}]}];class n{}n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[m.Bz.forChild(v),m.Bz]});var p=e(6748);class s{}s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[l.ez,p.q,n]})}}]);