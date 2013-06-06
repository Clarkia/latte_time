
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


exports.newIdSocekt = function(){
      return new ID_SOCKET_PAIR();
}

function ID_SOCKET_PAIR() {
      var id;
    var socket;
    var deviceType;
    var manType;

}

exports.TEACHER=1;
exports.STUDENT=2;

exports.MOBILE=1;
exports.WEBPAGE=2;

exports.CLIENT_REQUEST_LOGIN   = 201;
exports.SERVER_RESPONSE_LOGIN  = 202;


exports.SERVER_REQUEST_STARTGROUPACTIVITY=	203;
exports.CLIENT_RESPONSE_STARTGROUPACTIVITY=	204;
exports.SERVER_REQUEST_GROUPDECISION=	205;
	
exports.CLIENT_RESPONSE_GROUPDECISION=	206;
exports.CLIENT_REQUEST_GROUPATTEND=	207;
exports.SERVER_RESPONSE_GROUPATTEND=	208;
exports.SERVER_REQUEST_GROUPIN=	209;
	
exports.CLIENT_RESPONSE_GROUPIN=	210;
exports.SERVER_REQUEST_GROUPINGCOMPLETE=	211;
exports.CLIENT_RESPONSE_GROUPINGCOMPLETE=	212;
exports.SERVER_REQUEST_STARTPPTACTIVITY=	213;
exports.CLIENT_RESPONSE_STARTPPTACTIVITY=	214;
exports.SERVER_REQUEST_PPTSHARE=	215;
exports.CLIENT_RESPONSE_PPTSHARE=	216;
exports.SERVER_REQUEST_STARTWORKSHEETACTIVITY=	217;
exports.CLIENT_RESPONSE_STARTWORKSHEETACTIVITY=	218;
exports.CLIENT_REQUEST_WORKSHEETPROGRESS=	219;
exports.SERVER_RESPONSE_WORKSHEETPROGRESS=	220;
exports.CLIENT_REQUEST_WORKSHEETRESULT=	221;
exports.SERVER_RESPONSE_WORKSHEETRESULT=	222;
exports.SERVER_REQUEST_STARTREPRESENTATIONACTIVITY=	223;
exports.CLIENT_RESPONSE_STARTREPRESENTATIONACTIVITY=	224;
exports.CLIENT_REQUEST_REPRESENTATIONPROGRESS=	225;
exports.SERVER_RESPONSE_REPRESENTATIONPROGRESS=	226;
exports.CLIENT_REQUEST_REPRESENTATIONSYNC=	227;
exports.SERVER_RESPONSE_REPRESENTATIONSYNC=	228;
exports.SERVER_REQUEST_REPRESENTATIONSYNC=	229;
exports.CLIENT_RESPONSE_REPRESENTATIONSYNC=	230;
exports.CLIENT_REQUEST_REPRESENTATIONSEND=	231;
exports.SERVER_RESPONSE_REPRESENTATIONSEND=	232;
exports.SERVER_REQUEST_STARTATTENDACTIVITY=	233;
exports.CLIENT_RESPONSE_STARTATTENDACTIVITY=	234;
exports.CLIENT_REQUEST_ATTEND=	235;
exports.SERVER_RESPONSE_ATTEND=	236;

