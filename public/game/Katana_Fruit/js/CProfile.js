var _oProfile;

function CProfile(){

    var CustomerID = 143;
    var BankBalance;
    var WalletBalance;
    var SweepstakesPoints;

    this.GetPlayerData = function(data){
        CustomerID = data[0].FKCustomerID;
        BankBalance = data[0].BankBalance;
        WalletBalance = data[0].WalletBalance;
        SweepstakesPoints = data[0].SweepstakesPoints;
    };

    this.GetPlayerID = function(){
        return CustomerID;
    };

    this.GetWalletBalance = function(){
        return WalletBalance;
    };

    this.refreshWalletBalance = function(value){
        WalletBalance = value;
    };

    this.GetSweepstakesPoints = function(){
        return SweepstakesPoints;
    };

    this.refreshSweepstakesPoints = function(value){
        SweepstakesPoints += value;
    };

    this.GetBankBalance = function(){
        return BankBalance;
    };

    this.refreshBankBalance = function(value){
        BankBalance = value
    };
}