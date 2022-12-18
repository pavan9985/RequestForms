export class FieldModel {

    constructor(
        // public FieldTypeId?: number, 
        // public FieldLable? : string,
        // public Required?: boolean,
        // public MinLength?: string,
        // public MaxLength?: string,
        // public LowerCase?: boolean,
        // public UpperCase?: boolean,
        // public EmailFormat?:boolean,
        // public Options?: string[],
        ) {} 

        FieldTypeId : number = 0;
        FieldLable:string = '';
    Required:boolean =false;
    MinLength:string ='';
    MaxLength:string ='';
    LowerCase:boolean =false;
    UpperCase:boolean =false;
    EmailFormat:boolean = false;
    UploadFileTypeId :number=0; 
    Options:any = null;
    RowIndex:number=0;
    ColIndex:number=0;


    bind(object: any) {
        return Object.assign(this, object);
    }  

}
