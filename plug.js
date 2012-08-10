/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * TERMS OF REPRODUCTION USE
 *
 * 1. Provide a link back to the original repository (this repository), as
 * 		in, https://github.com/ConnerGDavis/Plugbot, that is well-visible
 * 		wherever the source is being reproduced.  For example, should you 
 * 		display it on a website, you should provide a link above/below that
 *		which the users use, titled something such as "ORIGINAL AUTHOR".  
 *
 * 2. Retain these three comments:  the GNU GPL license statement, this comment,
 * 		and that below it, that details the author and purpose.
 */
 
/**
 * NOTE:  This is all procedural as hell because prototypes and any 
 * 			OOP techniques in Javascript are stupid and confusing.
 * 
 * @author 	Conner Davis ([VIP] ?Log��) 
 * 			Harrison Schneidman ([VIDJ] EX?)
 */

// ==UserScript==
// @name           plug.dj D&B Room Enhanced
// @namespace      Punkred
// @include        http://www.plug.dj/drum-bass/
// @include        www.plug.dj/drum-bass/
// @include        socketio.plug.dj/drum-bass/
// @include        http://socketio.plug.dj/drum-bass/
// @include        http://www.plug.dj/punkreds-room/
// @include        www.plug.dj/punkreds-room/
// @version        1.9
// @updateURL      https://raw.github.com/Punkred/DnBplug/plug/plug.js
// @downloadURL    https://raw.github.com/Punkred/DnBplug/plug/plug.js
// ==/UserScript==

//setInterval (function() {
//RoomUser.audience.roomElements = []; RoomUser.redraw();
//},1000);


function addGlobalStyle(css){
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if(!head){
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}


//
//addGlobalStyle('#audience-canvas {background-image: ;)');

//
//addGlobalStyle('#map-canvas {background-image: url("") ;}');

//
//addGlobalStyle('#audience {background-image: url("") ;}');

//
//addGlobalStyle('#meta-frame {background-image: url("") ;}');

//
//addGlobalStyle('#frame-background {background-image: url("") ;}');

//
addGlobalStyle('#button-lobby {background-image: max-height:0px;max-width:0px;}');

//
addGlobalStyle('#button-vote-positive {background-image: url("http://cloud.github.com/downloads/Punkred/plug.dj-D-B/ButtonVotePositive.png")!important ;}');

//
addGlobalStyle('#button-vote-negative {background-image: url("http://cloud.github.com/downloads/Punkred/plug.dj-D-B/ButtonVoteNegative.png")!important ;}');

//
//addGlobalStyle('#logo {background-image: url("");min-height:33px;min-width:131px;}');

//
//addGlobalStyle('#create-room-button {background-image: url("");min-height:33px;min-width:131px;}');

//
addGlobalStyle('#room-wheel {background-image: max-height:0px;max-width:0px;}');

//
//addGlobalStyle('#user-points {background-image: url("");maxheight:25px;background-size: 100% 100%;max-width:25px;}');

//
//addGlobalStyle('#user-fans {background-image: url("");maxheight:25px;max-width:25px;}');

//
addGlobalStyle('html{background: url("http://cloud.github.com/downloads/Punkred/plug.dj-D-B/roombackground.png") no-repeat scroll center top #000000;');

//
//addGlobalStyle('#button-dj-play.button-dj {background-image: url("")!important;}');

//
//addGlobalStyle('#button-dj-quit.button-dj {background-image: url("")!important;}');

//
//addGlobalStyle('#button-dj-waitlist-join.button-dj {background-image: url("")!important;}');

//
//addGlobalStyle('#button-dj-waitlist-leave.button-dj {background-image: url("")!important;}');

//if you want to change the font, uncomment this part and edit with the font you want, google "font css" or something like that for the codes.
//addGlobalStyle("* {" + "font-family:Cambria,'Times New Roman','Nimbus Roman No9 L','Freeserif',Times,serif; !important;" + "}"); //for font changing

//to change the DJ console, uncomment this and add your own custom URL. I've got no good ideas atm, but feel free to try stuff out :)
//addGlobalStyle('#dj-console, #dj-console {background-image: url("http://i.imgur.com/oW6ir.png");min-height:33px;min-width:131px;}'); //change create room button

//trying to figure out how to change the avatar image, not working atm.
//addGlobalStyle('#user-image, #user-image {background-image: url("http://th09.deviantart.net/fs70/PRE/i/2012/115/f/c/shining_armor_cutie_mark_by_noxwyll-d4xjdre.png");min-height:33px;background-size: 100% 100%;min-width:131px;}');

//THE WORD REPLACEMENT CODE BELOW IS NOT MINE, IT BELONGS TO JOE SIMMONS


var words = {
// Syntax: 'Search word' : 'Replace word',
"Points" : "Points",
"Now Playing" : "Now Playing",
"Time Remaining" : "Time Remaining",
"Volume" : "Volume",
"Current DJ" : "Current DJ",
"Crowd Response" : "Crowd Response",
"Fans":"Fans"};

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}

//plug enhanced

hhb_debugging = 0; //1 for debugging..
hhb_d = null; //for document.
hhb_all_loaded = false;
hhb_init_ID = null;

hhb_auto = false;
hhb_mehlist_on = true;
hhb_wootlist_on = true;
hhb_undecidedlist_on = false;


function hhb_debug(a, b, c) {
    if (hhb_debugging && typeof (console) !== 'undefined' && typeof (console.log) !== 'undefined') {
        if (typeof (a) !== 'undefined') console.log('a:' + a);
        if (typeof (b) !== 'undefined') console.log('b:' + b);
        if (typeof (c) !== 'undefined') console.log('c:' + c);
    }
}

function hhb_init() {
    //if(hhb_debug)alert("started hhb_init.");
    if (hhb_all_loaded === true) {
        hhb_debug("already init.");
        return;
    }

    if (document.getElementById('audience-canvas') === null) {
        hhb_debug("hhb_init not ready1");
        return; /*not ready yet*/
    }
    if (typeof (unsafeWindow) !== 'undefined' && (typeof (unsafeWindow.API) === 'undefined' || typeof (unsafeWindow.API.getSelf) === 'undefined' || typeof (unsafeWindow.API.getSelf()) === 'undefined')) {
        hhb_debug("hhb_init not ready2");
        return; /*not ready yet*/
    }
    if (typeof (unsafeWindow) === 'undefined' && (typeof (API) === 'undefined' || typeof (API.getSelf) === 'undefined' || typeof (API.getSelf()) === 'undefined')) {
        hhb_debug("hhb_init not ready3");
        return; /*not ready yet. chrome-specific.*/
    }
    //ready.
    clearInterval(hhb_init_ID);

    hhb_debug("hhb_init running...");
    document.getElementById('audience').style.zIndex = "7";
    document.getElementById('audience-canvas').style.zIndex = "8";
    ////////////////////////////////////DRAGGABLE BOX////////////////////////////////////////////
    //Draggable box for greasemonkey, Ty http://userscripts.org/scripts/show/47608
    function dragStart(e) {
        dragObj.elNode = e.target;
        if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
        dragObj.cursorStartX = e.clientX + window.scrollX;
        dragObj.cursorStartY = e.clientY + window.scrollY;
        dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
        dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
        //dragObj.elNode.style.zIndex = ++dragObj.zIndex;
        document.addEventListener("mousemove", dragGo, true);
        document.addEventListener("mouseup", dragStop, true);
        e.preventDefault();
    }

    function dragGo(e) {
        e.preventDefault();
        var x = e.clientX + window.scrollX,
            y = e.clientY + window.scrollY;
        dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
        dragObj.elNode.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";
    }

    function dragStop(e) {
        document.removeEventListener("mousemove", dragGo, true);
        document.removeEventListener("mouseup", dragStop, true);
    }

    var dragObj = new Object(),
        x, y;
    dragObj.zIndex = 0;
    hhb_d = document.createElement('div');
    hhb_d.style.zIndex = "9";
    hhb_d.innerHTML = 'Plug.dj Enhanchments (movable)<br/>';
    hhb_d.setAttribute('id', 'draggable_box');
    hhb_d.setAttribute('style', 'z-index:-1; position:absolute !important; top:' + /*((window.innerHeight/2)-50)+*/ '0px;z-index:99; left:' + /*((window.innerWidth/2)-50)+*/ '0px; -moz-border-radius:6px; cursor:move;');
    hhb_d.addEventListener('mousedown', function (e) {
        dragStart(e);
    }, false);
    document.getElementById('fb-root').parentNode.appendChild(hhb_d);
    /////////////////////////////END OF DRAGGABLE BOX////////////////////////////////////////////
    //hhb_d.innerHTML += '<button id="hhb_autowoot_button" type="button" style="cursor:default;" >Auto-WOOT!: <span style=\'color:rgb(233,6,6);\'>Disabled</span>.</button>';
    hhb_d.innerHTML += '<form style="cursor:default;">' + '<input type="checkbox" id="hhb_mehlist_button" name="MEH-list" checked="checked" /> <span style="color:lime;">MEH-list</span> ' + '<input id="hhb_wootlist_button" type="checkbox" name="WOOT-list" checked="checked" /> <span style="color:lime;">WOOT!-list</span><br/>' + '<input id="hhb_undecidedlist_button" type="checkbox" name="Undecided-list" /><span style="color:lime;">Undecided-list</span>' + '</form>';
    hhb_d.innerHTML += '<span id="hhb_meanlist" style="cursor:default;"></span>';
    document.getElementById('hhb_mehlist_button').addEventListener('change', function () {
        hhb_mehlist_on = !hhb_mehlist_on;
        hhb_meanlist();
    });
    document.getElementById('hhb_wootlist_button').addEventListener('change', function () {
        hhb_wootlist_on = !hhb_wootlist_on;
        hhb_meanlist();
    });
    document.getElementById('hhb_undecidedlist_button').addEventListener('change', function () {
        hhb_undecidedlist_on = !hhb_undecidedlist_on;
        hhb_meanlist();
    });
    //firefox 12 bug? add this code right below creation of the button, and this happens: document.getElementById('hhb_autowoot_button').addEventListener('mouseover',function(){alert("getElementById is returning the correct button object. this event is never activated. button exists, cus im looking right at it.");});
    //document.getElementById('hhb_autowoot_button').addEventListener('click', function (e) {
    //    hhb_auto = !hhb_auto;
    //    var doc = document.getElementById('hhb_autowoot_button');
        //To experience Inception, un-comment the line below, and play with the button :P  (click at it in the corners; at least it works in chrome)
        //		doc =e.target;
    //    if (hhb_auto) {
    //        doc.innerHTML = 'Auto-WOOT!: <span style=\'color:rgb(0,138,5);\'>Enabled</span>.';
    //        hhb_autowoot();
    //    } else {
    //        doc.innerHTML = 'Auto-WOOT!: <span style=\'color:rgb(233,6,6);\'>Disabled</span>.';
    //    }
    //});
    hhb_d = document.getElementById('hhb_meanlist');
    unsafeWindow.API.addEventListener(unsafeWindow.API.VOTE_UPDATE, hhb_meanlist);
    unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_ADVANCE, hhb_wootandlist);
    unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_UPDATE, hhb_wootandlist);
    unsafeWindow.API.addEventListener(unsafeWindow.API.VOTE_SKIP, hhb_wootandlist);
    unsafeWindow.API.addEventListener(unsafeWindow.API.MOD_SKIP, hhb_wootandlist);
    hhb_all_loaded = true;
    hhb_meanlist();
    setInterval(hhb_meanlist, 5000); //
    setInterval(hhb_autowoot, 5000); //i... guess i dont trust the events enough, yet..
}

function hhb_wootandlist() {
    hhb_autowoot();
    hhb_meanlist();
}

function hhb_removeElement(e) {
    if (typeof (e) !== 'undefined' && typeof (e.parentNode) !== 'undefined') {
        e.parentNode.removeChild(e);
    }
}

//function hhb_autowoot() {
//    if (!hhb_all_loaded) {
//        return; /*not ready yet*/
//    }
//    if (typeof (unsafeWindow.API.getSelf().vote) !== 'undefined' && unsafeWindow.API.getSelf().vote != 0) { //Sometimes (in chrome at least) "vote" is undefined, and sometimes, its 0... -.- (told boycey/scallywag about it.)
//        /*already decided.*/
//        return;
//    }
//    if (hhb_auto == true) {
//        var evt = document.createEvent("MouseEvents");
//        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //<<simulate mouse click.
//        document.getElementById("button-vote-positive").dispatchEvent(evt);
//    }
//}



function hhb_meanlist() {
    if (!hhb_all_loaded) {
        return; /*not ready yet*/
    }
    var mehlist = '';
    var wootlist = '';
    var undecidedlist = '';
    //alert(typeof(API));
    var a = unsafeWindow.API.getUsers();
    var totalMEHs = 0;
    var totalWOOTs = 0;
    var totalUNDECIDEDs = 0;
    var str = '';
    var myid = unsafeWindow.API.getSelf().id
    for (i in a) { //thanks to... (forgot)someone for the pointers
        str = '<br/><span class="chat-message chat-from-clickable ';
        ///{Omfg, some users dont have these properties (idk why), and it causes exceptions in my codes -.-
        ///if (typeof (a[i].moderator) === 'undefined')
        //a[i].moderator=false;
        //if(typeof(a[i].superuser)==='undefined')
        //a[i].superuser=false;
        //if(typeof(a[i].owner)==='undefined')
        //a[i].owner=false;
        ///}
        if (typeof (a[i].superuser) !== 'undefined' && a[i].superuser == true) {
            str += 'chat-from-super ';
        } else if (typeof (a[i].moderator) !== 'undefined' && a[i].moderator == true) {
            str += 'chat-from-moderator ';
        }
        if (typeof (a[i].owner) !== 'undefined' && a[i].owner != false) {
            str += 'chat-from-host '; //i guess owner==host
        }
        if (a[i].id === myid) {
            str += 'chat-from-you ';
        }
        str += '" onclick="Javascript:void(0);" onmouseover="Javascript:void(0);">' + a[i].username + '</span>'; //TODO: what do we need to do to make the avatar-info-modal thing appear? x.x
        if (typeof (a[i].vote) !== 'undefined' && a[i].vote == -1) {
            //          if (!hhb_mehlist_on) continue;
            totalMEHs++;
            mehlist += str; //
        } else if (typeof (a[i].vote) !== 'undefined' && a[i].vote == +1) {
            //          if (!hhb_wootlist_on) continue;
            totalWOOTs++;
            wootlist += str; //
        } else {
            //          if (!hhb_undecidedlist_on) continue;
            totalUNDECIDEDs++;
            undecidedlist += str; //
        }
    }
    var totalDECIDED = totalWOOTs + totalMEHs;
    var totalMEHsPercentage = Math.round((totalMEHs / totalDECIDED) * 100);
    var totalWOOTsPercentage = Math.round((totalWOOTs / totalDECIDED) * 100);
    if (isNaN(totalMEHsPercentage) || isNaN(totalWOOTsPercentage)) {
        //hhb_debug('calculation failed, defaulting to 0.');
        totalMEHsPercentage = totalWOOTsPercentage = 0;
    }

    mehlist = ' ' + totalMEHs.toString() + ' (' + totalMEHsPercentage.toString() + '&#37;)' + mehlist;
    wootlist = ' ' + totalWOOTs.toString() + ' (' + totalWOOTsPercentage.toString() + '&#37;)' + wootlist;
    undecidedlist = ' ' + totalUNDECIDEDs.toString() + undecidedlist;

    //dmFyIHN0cj0nPHRhYmxlIGJvcmRlcj0iMSIgc3R5bGU9ImJvcmRlci13aWR0aDoxMHB4O2JvcmRlci1jb2xvcjpyZ2IoMjMzLDYsNik7YmFja2dyb3VuZC1jb2xvcjpyZ2IoMjMzLDYsNik7Ij48dHI+PHRkPk1FSC1saXN0Oic7DQpzdHIrPW1laGxpc3Q7DQpzdHIrPSc8L3RkPjwvdHI+PC90YWJsZT48dGFibGUgYm9yZGVyPSIxIiBzdHlsZT0iYm9yZGVyLXdpZHRoOjEwcHg7Ym9yZGVyLWNvbG9yOnJnYigwLDEzOCw1KTtiYWNrZ3JvdW5kLWNvbG9yOnJnYigwLDEzOCw1KTsiPjx0cj48dGQ+V09PVCEtbGlzdDonOw0Kc3RyKz13b290bGlzdDsNCnN0cis9JzwvdGQ+PC90cj48L3RhYmxlPjx0YWJsZSBib3JkZXI9IjEiIHN0eWxlPSJib3JkZXItd2lkdGg6MTBweDtib3JkZXItY29sb3I6cmdiKDEyOCwxMjgsMTI4KTtiYWNrZ3JvdW5kLWNvbG9yOnJnYigxMjgsMTI4LDEyOCk7Ij48dHI+PHRkPlVuZGVjaWRlZCEtbGlzdDonOw0Kc3RyKz11bmRlY2lkZWRsaXN0Ow0Kc3RyKz0nPC90ZD48L3RyPjwvdGFibGU+Jzs=
    str = '<div style="position:absolute; top:auto; left:5px">';
    str += '<div class="frame-background">';
    if (hhb_mehlist_on) {
        str += '<div id="hhb_mehlist_div" style="border:1px solid rgb(233,6,6);"><span style="font-weight:bold">MEH-list:</span>';
        str += mehlist;
        str += '</div>';
    }
    if (hhb_wootlist_on) {
        str += '<div id="hhb_wootlist_div" style="border:1px solid rgb(0,138,5); "><span style="font-weight:bold">WOOT!-list:</span>';
        str += wootlist;
        str += '</div>';
    }
    if (hhb_undecidedlist_on) {
        str += '<div id="hhb_undecidedlist_div" style="border:1px solid rgb(128,128,128); "><span style="font-weight:bold">Undecided!-list:</span>';
        str += undecidedlist;
        str += '</div>';
    }
    str += '</div></div>';
    hhb_d.innerHTML = str;
}


if (window.navigator.vendor.match(/Google/)) { //yet another chrome-specific code..
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    unsafeWindow = div.onclick();
};
hhb_init_ID = setInterval(hhb_init, 4999);

/**
 * Whether the user has currently enabled auto-woot. 
 */
var autowoot = false;
/**
 * Whether the user has currently enabled auto-queueing. 
 */
var autoqueue = false;
/**
 * Whether or not the user has enabled hiding this video. 
 */
var hideVideo = false;
/**
 * Whether or not the user has enabled the userlist. 
 */
var userList = false;

/**
 * Whenever a user chooses to apply custom username FX to a
 * user, their username and chosen colour and saved here. 
 */
var customUsernames = new Array();

// TODO:  DJ battle-related.
var points = 0;
var highScore = 0;

/**
 * Initialise all of the Plug.dj API listeners which we use
 * to asynchronously intercept specific events and the data
 * attached with them. 
 */
function initAPIListeners() 
{
	/**
	 * This listens in for whenever a new DJ starts playing. 
	 */
	API.addEventListener(API.DJ_ADVANCE, djAdvanced);

	/**
	 * This listens for whenever a user in the room either WOOT!s
	 * or Mehs the current song. 
	 */
	API.addEventListener(API.VOTE_UPDATE, function(obj) {
		if (userList)
			populateUserlist();
	});

	/**
	 * Whenever a user joins, this listener is called. 
	 */
	API.addEventListener(API.USER_JOIN, function(user) {
		if (userList)
			populateUserlist();
	});

	/**
	 * Called upon a user exiting the room. 
	 */
	API.addEventListener(API.USER_LEAVE, function(user) {
		if (userList)
			populateUserlist();
	});
	
	API.addEventListener(API.CHAT, checkCustomUsernames);
}


/**
 * Periodically check the chat history to see if any of the messages
 * match that of the user's chosen custom username FX.  If so, then we
 * need to stylise every instance of those. 
 */
function checkCustomUsernames() 
{
	$('span[class*="chat-from"]').each(function() {
		for (var custom in customUsernames) 
		{
			var check = customUsernames[custom].split(":");
			if (check[0] == $(this).text()) 
			{
				$(this).css({ color: "#" + check[1]});
				break;
			}
		}
	});
}


/**
 * Renders all of the Plug.bot "UI" that is visible beneath the video
 * player. 
 */
function displayUI()
{
	$("#plugbot-warning").remove();
	$('#playback').append('<div id="plugbot-warning" style="background-color:#0a0a0a;opacity:0.91;width:100%;padding:12px 0 12px 0;color:#fff;text-align:center;opacity:0;font-variant:small-caps;font-size:15px">'
		+ 'it is recommended that you extend the chatbox while using plug.bot <br />so you have as much storage for ' 
		+ 'custom usernames as possible.  <br />however, it is not necessary.</div>');
	
	/*
	 * Be sure to remove any old instance of the UI, in case the user
	 * reloads the script without refreshing the page (updating.)
	 */
	$('#plugbot-ui').remove();

	/*
	 * Generate the HTML code for the UI.
	 */
	$('#chat').prepend('<div id="plugbot-ui"></div>');
	$('#plugbot-ui').append(
			'<p id="plugbot-btn-lobby" style="color:#ED1C24"><b><a style="color: #FF6600" href="http://www.plug.dj/">lobby</a></b></p>'
		+	'<p id="plugbot-btn-woot" style="color:#ED1C24">auto-woot</p>'
		+ 	'<p id="plugbot-btn-queue" style="color:#ED1C24">auto-queue</p>'
		+ 	'<p id="plugbot-btn-hidevideo" style="color:#ED1C24">hide video</p>'
		+ 	'<p id="plugbot-btn-minecraft" style="color:#ED1C24"><a style="color: #3FFF00" href="http://www.mediafire.com/?gcv0eu8u68wtetu" target="_blank">minecraft: 108.246.72.228</a></p>'
//		+ 	'<p id="plugbot-btn-userlist" style="color:#ED1C24">userlist</p>'
		+ 	'<p id="plugbot-btn-facebook" style="color:#ED1C24"><a style="color: #3FFF00" href="http://www.facebook.com/groups/349429268437488/" target="_blank">facebook</a></p>'
	);
} //3FFF00


/**
 * Prompt the user to provide a new custom username FX. 
 */
function promptCustomUsername() {
	var check = prompt("Format:  username:color\n(For color codes, Google 'Hexadecimal color chart')");
	
	customUsernames.push(check);
	
	$('#space').after('<span id="' + check + '" onclick="removeCustomUsername(\'' + check + '\');$(this).next().remove();$(this).remove();" style="cursor:pointer;color:#' + check.split(":")[1] + '">- ' + check.split(":")[0] 
		+ '</span><br />');
		
	checkCustomUsernames();
}


/**
 * Remove an existing entry in the custom username FX. 
 */
function removeCustomUsername(data) {
	delete customUsernames[data];
}


/**
 * For every button on the Plug.bot UI, we have listeners backing them
 * that are built to intercept the user's clicking each button.  Based 
 * on the button that they clicked, we can execute some logic that will
 * in some way affect their experience. 
 */
function initUIListeners()
{	
//	$("#plugbot-btn-userlist").on("click", function() {
//		userList = !userList;
//		$(this).css("color", userList ? "#3FFF00" : "#ED1C24");
//		$("#plugbot-userlist").css("visibility", userList ? ("visible") : ("hidden"));
//		if (!userList) {
//			$("#plugbot-userlist").empty();
//		} else {
//			populateUserlist();
//		}
//	});

	$("#plugbot-btn-woot").on("click", function() {
		autowoot = !autowoot;
		$(this).css("color", autowoot ? "#3FFF00" : "#ED1C24");
		if (autowoot)
			$("#button-vote-positive").click();
	});

	$("#plugbot-btn-hidevideo").on("click", function() {
		hideVideo = !hideVideo;
		$(this).css("color", hideVideo ? "#3FFF00" : "#ED1C24");
		$("#yt-frame").animate({"height": (hideVideo ? "0px" : "271px")}, {duration: "fast"});
		$("#playback .frame-background").animate({"opacity": (hideVideo ? "0" : "0.91")}, {duration: "medium"});
	});

	$("#plugbot-btn-queue").on("click", function() {
		autoqueue = !autoqueue;
		$(this).css("color", autoqueue ? "#3FFF00" : "#ED1C24");
		$("#button-dj-waitlist-" + (autoqueue ? "join" : "leave")).click();
	});
}

/**
 * Called whenever a new DJ begins playing in the room.
 *  
 * @param {Object} obj
 * 				This contains the user (current DJ)'s data.
 */
function djAdvanced(obj) 
{
	/*
	 * If auto-woot is enabled, WOOT! the song.
	 */
	if (autowoot) 
		$("#button-vote-positive").click();

	/*
	 * If auto-queueing has been enabled, and they have just recently
	 * left the waitlist, join them back.
	 */
	if ($("#button-dj-waitlist-join").css("display") === "block" && autoqueue)
		$("#button-dj-waitlist-join").click();

	// TODO: DJ battle-related
	points = 0;
	highScore = 0;
	
	/*
	 * If they want the video to be hidden, be sure to re-hide it.
	 */
	if (hideVideo)
	{
		$("#yt-frame").animate({"height": "0px"}, {duration: "fast"});
		$("#playback .frame-background").animate({"opacity": "0"}, {duration: "medium"});
	}

	/*
	 * If the userlist is enabled, re-populate it.
	 */
	if (userList)
		populateUserlist();
}

/**
 * Generates every user in the room and their current vote as 
 * colour-coded text.  Also, moderators get the star next to
 * their name. 
 */
function populateUserlist() 
{
	/*
	 * Destroy the old userlist DIV and replace it with a fresh
	 * empty one to work with.
	 */
//	$("#plugbot-userlist").remove();
//	$('body').append('<div id="plugbot-userlist"></div>');

	/*
	 * If the user is in the waitlist, show them their current spot.
	 */
	if ($('#button-dj-waitlist-view').attr('title') !== '') {
		if ($('#button-dj-waitlist-leave').css('display') === 'block' && ($.inArray(API.getDJs(), API.getSelf()) == -1)) {
			var spot = $('#button-dj-waitlist-view').attr('title').split('(')[1];
				spot = spot.substring(0, spot.indexOf(')'));
			$('#plugbot-userlist').append('<h1 id="plugbot-queuespot"><span style="font-variant:small-caps">Waitlist:</span> ' + spot + '</h3><br />');
		}
	}

	// TODO:  DJ battle-related
	points = 0;

	/*
	 * An array of all of the room's users.
	 */
	var users = new Array();

	/*
	 * Populate the users array with the next user
	 * in the room (this is stored alphabetically.)
	 */
	for (user in API.getUsers())
	{
		users.push(API.getUsers()[user]);
	}

	/*
	 * For every user, call the #appendUser(username, vote) method
	 * which will display their username with any colour coding that
	 * they match.
	 */
	for (user in users) 
	{
		var user = users[user];
		appendUser(user.username, user.vote)
	}

	// TODO: DJ battle-related
	if (points > highScore)
		highScore = points;
}


/**
 * Appends another user's username to the userlist.
 *  
 * @param {Object} username
 * 				The username of this user.
 * @param {Object} vote
 * 				Their current 'vote', which may be:
 * 					-1 	: Meh
 *					0	: 'undecided' (hasn't voted yet)
 * 					1	: WOOT!
 */
function appendUser(username, vote) 
{
	/*
	 * Some variables that we'll either be setting as true/false
	 * (some conditionals that do major changes to their look in the userlist)
	 * or setting a value to.
	 */
	var colour;
	var currentDj = false;
	var moderator = false;
	if (API.getHost() != null) var host = username == API.getHost().username;
	var img;

	/*
	 * Loop through the room's moderators to detect a match
	 * for this user, in which case we'll prepend the mod
	 * star to their name.
	 */
	for (var i = 0; i < API.getModerators().length; i++) 
	{
		if (API.getModerators()[i].username == username && !host) 
		{
			moderator = true;
		}
	}

	/*
	 * Based on their vote, apply the colour coding.
	 */
	switch (vote) 
	{
		case 1:		// WOOT!
			colour = "3FFF00";
			points++;
			if (moderator)
				img = "http://i.imgur.com/T5G4f.png";
			if (host)
				img = "http://i.imgur.com/Lu1qo.png";
			break;
		case 0:		// Undecided
			colour = "FFFFFF";
			if (moderator) 
				img = "http://i.imgur.com/sRsU0.png";
			if (host)
				img = "http://i.imgur.com/6Bq5W.png";
			break;
		case -1:	// Meh
			colour = "ED1C24";
			if (moderator)
				img = "http://i.imgur.com/JPA1Q.png";
			if (host)
				img = "http://i.imgur.com/wVLR3.png";
			break;
	}

	/*
	 * If they're the current DJ, apply some more special
	 * changes.
	 */
	if (API.getDJs().length > 0 && API.getDJs()[0].username == username) {
		currentDj = true;
		colour = "42A5DC";
		if (moderator)
			img = "http://i.imgur.com/CsK3d.png";
	}

	/*
	 * Sometimes undecided mod star breaks.  This fixes that.
	 */
	if (img == undefined && (moderator || host)) 
	{
		colour = "FFFFFF";
		img = moderator ? "http://i.imgur.com/sRsU0.png" : "http://i.imgur.com/6Bq5W.png";
	}

	/*
	 * Apply the HTML code to the page that actually displays them
	 * inside the userlist.
	 */
	$('#plugbot-userlist').append(
		((moderator || host) ? '<img src="' + img + '" align="left" style="margin-left:6px" alt="Moderator" />' : '') 
		+ '<p style="' + ((moderator || host) ? 'text-indent:6px !important;' : '') 
		+ 'color:#' + colour + ';' + (currentDj ? 'font-weight:bold;font-size:15px' : '') + '"' 
		+ (currentDj ? ('title="' + username + ' is the current DJ!"') : '') + '>' 
		+ username + '</p>'
	);
}


///////////////////////////////////////////////////////////
////////// EVERYTHING FROM HERE ON OUT IS INIT ////////////
///////////////////////////////////////////////////////////

/*
 * Clear the old code so we can properly update everything.
 */
$('#plugbot-css').remove();
$('#plugbot-js').remove();

/*
 * Write the CSS rules that are used for components of the 
 * Plug.bot UI.
 */
$('body').prepend('<style type="text/css" id="plugbot-css">' 
	+ '#plugbot-ui { position: absolute; margin-left: 349px; }'
	+ '#plugbot-ui p { background-color: #0b0b0b; height: 32px; padding-top: 8px; padding-left: 12px; cursor: pointer; font-variant: small-caps; width: 90px; font-size: 12px; margin: 0; }'
	+ '#plugbot-ui h2 { background-color: #0b0b0b; height: 110px; width: 156px; margin: 0; color: #fff; font-size: 13px; font-variant: small-caps; padding: 8px 0 0 12px; border-top: 1px dotted #292929; }'
//    + '#plugbot-userlist { border: 6px solid rgba(10, 10, 10, 0.8); border-left: 0 !important; background-color: #000000; padding: 8px 0px 20px 0px; width: 12%; }'
//    + '#plugbot-userlist p { margin: 0; padding-top: 2px; text-indent: 24px; font-size: 10px; }'
//    + '#plugbot-userlist p:first-child { padding-top: 0px !important; }'
    + '#plugbot-queuespot { color: #42A5DC; text-align: left; font-size: 1.5em; margin-left: 8px }');

/*
 * Hit the woot button, since auto-woot is enabled by default.
 */
$("#button-vote-positive").click();

/*
 * Call all init-related functions to start the software up.
 */
initAPIListeners();
populateUserlist();
displayUI();
initUIListeners();

/*
 * Display a warning telling users that it's preferable to extend
 * the chatbox while using Plug.bot for the most space for custom
 * usernames.
 */
//$(function() {
//	$("#plugbot-warning").animate({"opacity": "0.91"}, {duration: "medium"}).delay(8000).animate({"opacity": "0"}, {duration: "slow"});
//});

