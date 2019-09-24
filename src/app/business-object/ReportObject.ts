export interface TotalReferalsRPT {
    ROW_NUMBER: number;
    KEYWORD: String;
    NO_OF_REFERALS: number;
    NO_OF_DOWNLOADS: number;
}
export interface TotalReferalsAdminRPT {
    ROW_NUMBER: number;
    KEYWORD: String;
    VENDOR_NAME: String;
    NO_OF_REFERALS: number;
    NO_OF_DOWNLOADS: number;
}
export interface VendorDirectoryRPT {
    ROW_NUMBER: number;
    VND_PK: number;
    VND_NAME: String;
    VND_ADDRESS1: String;
    VND_MOBILE: String;
    VND_EMAIL: String;
}
export interface ListOfKeywordsRPT {
    ROW_NUMBER: number;
    KEYWORD: String;
    LEADS_COUNT: number;
    VENDOR_NAME: String;

}
export interface PlanwiseCompanyRPT {
    VENDOR_NAME: String;
    PLAN_NAME: String;
    PLAN_START_DATE: Date;
    PLAN_END_DATE: Date;

}
export interface SubscriptionRPT {
    ROW_NUMBER: number;
    VENDOR_NAME: String;
    PLAN_NAME: String;
    PLAN_DATE: String;
    PLAN_START_DATE: String;
    PLAN_END_DATE: String;

}