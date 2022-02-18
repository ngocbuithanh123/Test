var defaultURL = "http://3.211.184.6/Sweepstakes.Web/"
var defaultAPI = "http://3.211.184.6/Sweepstakes.Web.Api/"
var defaultConfig = {
    BillAcceptorPort: "COM1",
    BillAcceptorIdealTime: 30,
    EstablishmentID: 40,
    KioskID: "18",
    APIURL: "http://59.162.181.93/Sweepstakes.Web.Api/",
    SiteURL: "http://59.162.181.93/Sweepstakes.Web/",
    UserInactiveTimeInSeconds: 600,
    BonusInfoText: "3 or more Scatter symbols appearing randomly on the reels in the main game actives the bonus features."
}
var defaultURI = {
    LOGIN: "Customer/CheckLogin",
    // GET_DATA: "Customer/GetCustomerSweepstakeList",
    GET_DATA: "Custom/GetCustomerByEstablishment",
    GET_COUPON_LIST: "Custom/GetCustomerCouponListWithUrl?customerid=",
    GET_COUPON_CATERGORY_LIST: "Admin/GetCouponCategoryList?searchtext=",
    GET_PERCHASE_COUPON_LIST: "Custom/GetCouponListWithUrl?fkcouponcategoryid=",
    GET_COUPON_BUY: "Custom/CouponBuy",
    GET_REDEEM: 'Customer/AddCustomerSweepstakesRedeem',
    GET_FORGOT_PASSWORD: "Sweepstakes.Web/Default/ForgotPasswordApps?Email=",
    GET_ADD_UPDATE_CUSTOMER_BALANCE: "/Customer/AddUpdateCustomerBankBalance",
    GET_CHECK_BALANCE: "Establishment/EstablishmentBalanceCheck?establishmentid=",
    POST_ADD_CUSTOMER_COUPON: "Customer/AddCustomerCoupon",
    POST_ADD_CUSTOMER_COUPON_LOG: "Customer/AddCustomerCouponpointLog",
    POST_ADD_UPDATE_CUSTOMER: "Customer/AddUpdateCustomer",
}
function getConfig() {
    fetch('./config.json')
        .then(r => r.text())
        .then(text => {
            defaultConfig = JSON.parse(text)
            defaultAPI = defaultConfig.APIURL
            defaultURL = defaultConfig.SiteURL
        })
}
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
getConfig()
var defaultFunc = {
    formatDate: (dataAsString) => {
        let date = new Date(dataAsString)
        let dataConvert = date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
        return dataConvert
    },
    ageTest: (dataAsString) => {
        // let ageTest = Date.parse(dataAsString.replace(/-/g,'/'))
        // let now = Date.now()
        // if(now - ageTest >= 18 * 3600 *24 * 365){
        if (getAge(dataAsString)>=18) {
            return true
        }
        return false
    }
}
function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, '');

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early

    if (phoneNumberLength < 4) return phoneNumber;

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        6
    )}-${phoneNumber.slice(6, 10)}`;
}
export {
    defaultURL,
    defaultURI,
    defaultAPI,
    defaultFunc,
    defaultConfig,
    formatPhoneNumber
}