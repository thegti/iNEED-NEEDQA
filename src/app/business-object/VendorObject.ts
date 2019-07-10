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

export interface VendorGetModel
{
     Vendor_Reg_No :String;
    Vendor_Address :String
    Vendor_PO_No :String
    Vendor_City :String
    Vendor_Country :String
    Vendor_Name :String
    Vendor_Mobile :String
    Vendor_QID :String
    Vendor_Emailid :String
    Vendor_Plan :String
    Vendor_Account_Expiry :String
    Vendor_Status :String
}

export interface VendorSalesLeadModel
{
    VST_PK :number;
    VST_VENDOR :number;
    VST_EMAIL :String;	
    VST_MOBILE :String;		
    VST_WHATSAPP :String;
    VST_ENQUIRY_TYPE :number;
    VST_ENQUIRY_USE	:number;		
    VST_CURRENCY :number;			
    VST_MIN_VALUE :number;
    VST_MOD_BY :number;				
    VST_MOD_DT :Date;
    VST_VALUE_TYPE :number;

}
export interface VendorNameModel
{
    VND_NAME : String;
    VND_NAME_TEXT : String;
    USER_PK: number,
    VND_CITY   : String;
    VND_MOBILE : String;
    VND_EMAIL  : String;
    PLAN_NAME_TEXT : String;
    VND_CODE   : String;
    VPL_VALID_DATE_TO : Date;
    VND_STATUS : String;
    KWORD_COUNT : String;
    // TOTAL_ROW_COUNT : String;
    TOTAL_ROW_COUNT : number;
    VND_PK : number;
    VKW_PK : number;
    
}
 export interface PlanGetModel
 {
   
    PLN_PK : number,
    PLN_CODE : String,
    PLN_NAME : String,
    PLN_MODE : number,
    PLN_WORDS1 : number,
    PLN_WORDS2 : number,
    PLN_DESC : String,
    PLN_DISP_TEXT1 : String,
    PLN_DISP_TEXT2 : String,
    PLN_DISP_TEXT3 : String,
    PLN_RATE : String,
    DISPLAY_RATE : String
        
 }
 export interface ChangeVendorEmailModel
 {
    VND_PK : number;
    VND_EMAIL  : String;
    VND_NAME : String;
    VND_NEW_EMAIL : String;
 }
