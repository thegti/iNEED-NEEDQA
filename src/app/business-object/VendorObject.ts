export interface SavaVendorModel{
    VND_PK   : number;
    // VND_CODE   :String;
    VND_NAME :String;
    VND_ADDRESS1 :String;
    VND_ADDRESS2 :String;
    VND_ADDRESS3 :String;
    VND_CITY :String;
    VND_PIN :String;
    VND_COUNTRY :number;
    VND_PHONE :String;
    VND_MOBILE :String;
    VND_EMAIL :String;
    VUT_PASSWORD:String;
    VND_FAX :String;
    VND_WEBSITE :String;
    VND_CURRENCY :number;
    VND_TIN :String;
    VND_STATUS :number;
    VND_ACTIVE :number;
    VND_BIZUNIT :number;
    VND_CRTD_BY :number;
    VND_CRTD_DT :Date;
    VND_MOD_BY :number;
    VND_MOD_DT :Date;
}
export interface VendorKeywordModel
{
    ROW_NO : number;
    VKW_PK : number;
    VKW_KWORD : String;
    VKW_VENDOR : number;
    VKW_KWORD_TYPE : number;
}

