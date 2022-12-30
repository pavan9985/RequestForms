export interface FormCustomize {
    user_id : number;
    FormName : string;
    FormObject : string;
}

export interface FormUpdateCustomize {
    user_id : number;
    FormName : string;
    FormObject : string;
    formId:number;
}


export interface FormCofigModel {
    formId : number;
    formConfigType : number;
    formConfigSource : string;
}
