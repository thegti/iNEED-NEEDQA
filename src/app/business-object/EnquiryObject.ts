export interface SavaEnquiryModel {
    VNQ_PK: number;
    VNQ_DATE: Date;
    // VNQ_TRX_NO  :String;
    VNQ_TYPE: number;
    VNQ_LOCATION_MODE: number;
    VNQ_LOCATION: String;
    VNQ_PERSON_NAME: String;
    VNQ_EMAIL: String;
    VNQ_MOBILE: String;
    VNQ_QTY: number;
    VNQ_UOM: number;
    VNQ_USE: number;
    VNQ_CURRENCY: number;
    VNQ_DESC: String;
    VNQ_KWORD: String;
    VNQ_VALUE: Number;
    VNQ_STATUS: number;
    VNQ_ACTIVE: number;
    VNQ_BIZUNIT: number;
    VNQ_CRTD_BY: number;
    VNQ_CRTD_DT: Date;
    VNQ_MOD_BY: number;
    VNQ_MOD_DT: Date;
    VNQ_DOC_ATTACH : String;

}
export interface EnquiryDaysLeftModel {
    VNQ_PDF_ID : String;
    NO_OF_DAYS : number;
}

