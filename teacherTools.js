 
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

exports.newAttendInfo = function(){
      return new AttendInfo();
}

function AttendInfo() {
      var StudentNum;
    var attendance;
    var attendanceInfoNum;
    var studentImg;
     
}


exports.newPPTInfo = function(){
      return new PPTInfo();
}

function PPTInfo() {
      var routes;
    var pageNum;     
}


exports.newPPTRoute = function(){
      return new PPTRoute();
}

function PPTRoute() {
      var pageNum;
    var route;     
}



exports.newClassState = function(){
     return new ClassState();
}     

function ClassState() {
    var activityStart = 0;
    var activityType;
}

exports.newPPTShare = function(){
     return new PPTShare();
}     

function PPTShare() {
    var pptInfo;
    var mobileSharing = 0;
    var webWatching = 0;
    var id;
}


exports.newGroupShare = function(){
     return new GroupShare();
}     

function GroupShare() {
    var groupList;
    var groupNum = 0;  
}

exports.newGroupInfo = function(){
     return new GroupInfo();
}     

function GroupInfo() {
    var studentNum;
    var studentList;  
}




exports.TEACHER=1;
exports.STUDENT=2;

exports.MOBILE=1;
exports.WEBPAGE=2;

exports.PPT = "PPT";
exports.WORKSHEET =  "WORKSHEET";
exports.ATTENDANCE =  "ATTENDANCE";
exports.GROUP =  "GROUP";


exports.CLIENT_REQUEST_LOGIN = 101;
exports.SERVER_RESPONSE_LOGIN = 102;
exports.CLIENT_REQUEST_SUBJECTLIST = 103;
exports. SERVER_RESPONSE_SUBJECTLIST = 104;
exports. CLIENT_REQUEST_LECTURELIST = 105;
exports. SERVER_RESPONSE_LECTURELIST = 106;
exports. CLIENT_REQUEST_MENU = 107;
exports. SERVER_RESPONSE_MENU = 108;
exports. CLIENT_REQUEST_STARTFIXACTIVITY = 109;
exports. SERVER_RESPONSE_STARTFIXACTIVITY = 110;

exports. CLIENT_REQUEST_CONTENTLIST = 111;
exports. SERVER_RESPONSE_CONTENTLIST = 112;
exports. CLIENT_REQUEST_GROUPDECISION = 113;
exports. SERVER_RESPONSE_GROUPDECISION = 114;

exports. SERVER_REQUEST_GROUPIN = 115;
exports. CLIENT_RESPONSE_GROUPIN = 116;
exports. CLIENT_REQUEST_GROUPINGCOMPLETE = 117;
exports. SERVER_RESPONSE_GROUPINGCOMPLETE = 118;

exports. CLIENT_REQUEST_PPTINFO =	119;
exports. SERVER_RESPONSE_PPTINFO = 120;

exports. SERVER_REQUEST_STARTWORKSHEETACTIVITY = 121;
exports. CLIENT_RESPONSE_STARTWORKSHEETACTIVITY = 122;
exports. SERVER_REQUEST_WORKSHEETPROGRESS = 123;
exports. CLIENT_RESPONSE_WORKSHEETPROGRESS = 124;
exports. SERVER_REQUEST_STARTREPRESENTATIONACTIVITY = 125; 
exports. CLIENT_RESPONSE_STARTREPRESENTATIONACTIVITY = 	126;
exports. SERVER_REQUEST_REPRESENTATIONPROGRESS =	127; 
exports. CLIENT_RESPONSE_REPRESENTATIONPROGRESS = 128;
exports. SERVER_REQUEST_REPRESENTATIONSEND = 129;
exports. CLIENT_RESPONSE_REPRESENTATIONSEND = 130;
  
exports. CLIENT_REQUEST_ATTENDINFO =	131;
exports. SERVER_RESPONSE_ATTENDINFO	= 132;
exports. SERVER_REQUEST_ATTEND =	133;
exports. CLIENT_RESPONSE_ATTEND =	134;
exports. CLIENT_REQUEST_ATTENDSEND  =	135;
exports. SERVER_RESPONSE_ATTENDSEND =	136;

exports. CLIENT_REQUEST_CONNECTION  = 137;
exports. SERVER_RESPONSE_CONNECTION =	138;

exports. CLIENT_REQUEST_PPTSHARE  =	139;
exports. SERVER_RESPONSE_PPTSHARE =		140;
exports. CLIENT_REQUEST_PPTRETREIVE  =	141;
exports. SERVER_RESPONSE_PPTRETREIVE = 142;






////////////////


exports.CLIENT_REQUEST_SHARESTART = 401;
exports.SERVER_RESPONSE_SHARESTART = 	402;
exports.SERVER_REQUEST_PPTSHARE = 403;
exports.CLIENT_RESPONSE_PPTSHARE = 404;
exports.SERVER_REQUEST_PPTRETRETREIVE = 405;
exports.CLIENT_RESPONSE_PPTRETRETREIVE = 406;



