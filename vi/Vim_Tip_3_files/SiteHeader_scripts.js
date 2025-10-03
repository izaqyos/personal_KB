var script_loaded = true;
var load_timeout = 15000; //15 sec
function onDemand(fn_str, srcs) {
return function() {
var args = arguments;
var current_time = 0;
var current_script;
var load_script = function() {
if(current_time >= load_timeout) {
alert("Could not load JavaScript: " + current_script);
return;
}
if(script_loaded == true) {
if(srcs.length != 0) {
script_loaded = false;
current_time = 0;
var head = document.getElementsByTagName("head")[0];
var script = document.createElement("script");
current_script = srcs.shift();
script.src = current_script;
head.appendChild(script);
}
else {
return eval(fn_str + ".apply(window, args);");
}
}
current_time += 25;
window.setTimeout(load_script, 25);
}
load_script();
return false;
}
}
function getHostName() {
var left = PageOracle.getBaseURL().replace(/http:\/\/[^/]*/, '') + '/';
return "http://" + window.location.host + left;
}
var p_ajs = getHostName()+'static_core/scripts/general/AJS.js';
var p_ajs_adapter = getHostName()+'static_core/scripts/general/AJS_adapter.js';
var path_ajs = [p_ajs, p_ajs_adapter];
var path_greybox = getHostName()+'static_core/greybox/greybox.js';
GB_IMG_DIR = getHostName() + "static_core/greybox/";
GB_show = onDemand("GB_show", path_ajs.concat(path_greybox));
GB_showFullScreen = onDemand("GB_showFullScreen", path_ajs.concat(path_greybox));
GB_showImage = onDemand("GB_showImage", path_ajs.concat(path_greybox));
function showLogin() {
var url = getHostName() + "users/showLogin";
GB_show("Login into the system", url, 250, 350);
return false;
}
if(!Blog)
  var Blog = {};

Blog.postComment_real = function() {
    var form = AJS.$('CMS_CommentForm');
    var name = AJS.$f(form, 'author').value;
    var comment = AJS.$f(form, 'content').value;
    var btn_submit = AJS.$('btn_submit');

    if(name == '' || comment == '') {
      alert("Name or comment can't be empty.")
      return false;
    }

    btn_submit.disabled = true;

    var d = AJS.getRequest("blog/addComment");
    d.addCallback(function() {
      window.location.reload();
    });
    d.sendReq(AJS.formContents(form));
    return false;
}
Blog.postComment = onDemand("Blog.postComment_real", path_ajs);
if(!Blog)
  var Blog = {};

Blog.postComment_real = function() {
    var form = AJS.$('CMS_CommentForm');
    var name = AJS.$f(form, 'author').value;
    var comment = AJS.$f(form, 'content').value;
    var btn_submit = AJS.$('btn_submit');

    if(name == '' || comment == '') {
      alert("Name or comment can't be empty.")
      return false;
    }

    btn_submit.disabled = true;

    var d = AJS.getRequest("blog/addComment");
    d.addCallback(function() {
      window.location.reload();
    });
    d.sendReq(AJS.formContents(form));
    return false;
}
Blog.postComment = onDemand("Blog.postComment_real", path_ajs);
