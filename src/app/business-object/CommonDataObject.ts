export interface LocationModel{
    CON_PK : number;
    CON_NAME :String;
    CON_CODE :String;
    CON_GROUP :number;
    CON_VALUE :number;
    CON_DEFAULT :number;
    CON_DESC :String;
    CON_GROUP_Type :number;
    CON_GROUP_Type_Name :String;
    
}

export interface KeywordModel{
    VKW_KWORD_TYPE : number;
    VKW_KWORD : String;
}
export interface UomModel{
    UOM_PK  : number;
    UOM_CODE  : String;
    UOM_NAME :String;
}
export interface CountryModel{
    CNT_PK  : number;
    CNT_CODE  : String;
    CNT_NAME   : String;
}
export interface OtpModel{
    NAME  : number;
    EMAIL  : String;
    MOBILE_NO   : String;
    OTP:String;
}


