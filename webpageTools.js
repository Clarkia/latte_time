
//**************
// Data types
//**************

exports.newRequest = function(){
       return new Request();
}

function Request(){
       var MessageNum;
    var id;
    var password;
}

exports.newResponse = function(){
      return new Response();
}

function Response() {
      var MessageNum;
    var id;
    var success;

}


exports.CLIENT_REQUEST_LOGIN  =  301;
exports.SERVER_RESPONSE_LOGIN=	302;
exports.CLIENT_REQUEST_LOGOUT=	303;
exports.SERVER_RESPONSE_LOGOUT=	304;
exports.CLIENT_REQUEST_CLASSLIST=	305;
exports.SREVER_RESPONSE_CLASSLIST=	306;
exports.CLIENT_REQUEST_VIEWLECTURELIST=	307;
exports.SERVER_RESPONSE_SELECTCLASS=	308;
exports.CLIENT_REQUEST_CLASSORGANIZE=	309;
exports.SERVER_RESPONSE_CLASSORGANIZE=	310;
exports.CLIENT_REQUEST_CLASSSAVE=	311;
	
exports.SERVER_RESPONSE_CLASSSAVE=	312;
exports.CLIENT_REQUEST_PPTLIST=	313;
exports.SERVER_RESPONSE_PPTLIST=	314;
exports.CLIENT_REQUEST_PPTUPLOAD=	315;
exports.SERVER_RESPONSE_PPTUPLOAD=	316;
exports.CLIENT_REQUEST_WORKSHEETLIST=	317;
exports.SERVER_RESPONSE_WORKSHEETLIST=	318;
exports.CLIENT_REQUEST_WORKSHEETUPLOAD=	319;
exports.SERVER_RESPONSE_WORKSHEETUPLOAD	=320;
exports.CLIENT_REQUEST_VIEWATTENDLIST=	321;
exports.SERVER_REQUEST_VIEWATTENDLIST=	322;



