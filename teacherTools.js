
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
    var subjectList;

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


exports.newSubjectInfo = function(){
      return new SubjectInfo();
}

function SubjectInfo() {
      var subjectNum;
    var subjectName;
     var className;

}

exports.newLectureInfo = function(){
      return new LectureInfo();
}

function LectureInfo() {
      var lecNum;
    var lecName;
     
}

exports.newActivityInfo = function(){
      return new ActivityInfo();
}

function ActivityInfo() {
      var actImg;
    var actName;
    var actType;
    var actNum;
     
}



exports.TEACHER=1;
exports.STUDENT=2;

exports.MOBILE=1;
exports.WEBPAGE=2;


exports.CLIENT_REQUEST_LOGIN = 101;
exports.SERVER_RESPONSE_LOGIN = 102;


exports.CLIENT_REQUEST_SUBJECTLIST = 103;
exports. SERVER_RESPONSE_SUBJECTLIST = 104;
exports. CLIENT_REQUEST_LECTURELIST = 105;
exports. SERVER_RESPONSE_LECTURELIST = 106;
exports. CLIENT_REQUEST_MENU = 107;
exports. SERVER_RESPONSE_MENU = 108;
exports. CLIENT_REQUEST_STARTACTIVITY = 109;
exports. SERVER_RESPONSE_STARTACTIVITY = 110;
exports. CLIENT_REQUEST_CONTENTLIST = 111;
exports. SERVER_RESPONSE_CONTENTLIST = 112;



exports. SERVER_REQUEST_STARTGROUPACTIVITY = 113; 
exports. CLIENT_RESPONSE_STARTGROUPACTIVITY = 114;
exports. CLIENT_REQUEST_GROUPDECISION = 115;
exports. SERVER_RESPONSE_GROUPDECISION = 116;
exports. SERVER_REQUEST_GROUPIN = 117;
exports. CLIENT_RESPONSE_GROUPIN = 118;
exports. CLIENT_REQUEST_GROUPINGCOMPLETE = 119; 
exports. SERVER_RESPONSE_GROUPINGCOMPLETE = 120;


exports. SERVER_REQUEST_STARTATTENDACTIVITY = 135;
exports. CLIENT_RESPONSE_STARTATTENDACTIVITY = 136;
exports. SERVER_REQUEST_ATTEND = 137;
exports. CLIENT_RESPONSE_ATTEND = 138;
exports. CLIENT_REQUEST_ATTENDSEND = 139;
exports. SERVER_RESPONSE_ATTENDSEND = 140;






    exports. SERVER_REQUEST_STARTPPTACTIVITY = 121;
    exports. CLIENT_RESPONSE_STARTPPTACTIVITY = 122;
    exports. CLIENT_REQUEST_PPTSHARE = 123;
    exports. SERVER_RESPONSE_PPTSHARE = 124;
    exports. SERVER_REQUEST_STARTWORKSHEETACTIVITY = 125;
    exports. CLIENT_RESPONSE_STARTWORKSHEETACTIVITY = 126;
    exports. SERVER_REQUEST_WORKSHEETPROGRESS = 127;
    exports. CLIENT_RESPONSE_WORKSHEETPROGRESS = 128;
    exports. SERVER_REQUEST_STARTREPRESENTATIONACTIVITY = 129; 
    exports. CLIENT_RESPONSE_STARTREPRESENTATIONACTIVITY = 130;
    exports. SERVER_REQUEST_REPRESENTATIONPROGRESS = 131;
    exports. CLIENT_RESPONSE_REPRESENTATIONPROGRESS = 132;
    exports. SERVER_REQUEST_REPRESENTATIONSEND = 133;
    exports. CLIENT_RESPONSE_REPRESENTATIONSEND = 134;
