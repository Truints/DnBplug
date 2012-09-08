//Room
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
//addGlobalStyle('#button-lobby {background-image: max-height:0px;max-width:0px;}');
//
//addGlobalStyle('#button-vote-positive {background-image: url("http://cloud.github.com/downloads/Punkred/DnBplug/ButtonVotePositive.png") ;}');
//
//addGlobalStyle('#button-vote-negative {background-image: url("http://cloud.github.com/downloads/Punkred/DnBplug/ButtonVoteNegative.png")!important ;}');
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
addGlobalStyle('html{background: url("http://cloud.github.com/downloads/Punkred/DnBplug/roombackground.png") no-repeat scroll center top #000000;');
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

//PLUGBOT

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
 * @author 	Conner Davis ([VIP] ?Logïç®) 
 * 			Harrison Schneidman ([VIDJ] EX?)
 */

/**
 * Whether the user has currently enabled auto-woot. 
 */
var autowoot = true;
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
 * Strings that trigger strobe mode
 */
var strobeOn = /starts jammin' out/;
var strobeOff = /stops jammin' out/;
/**
 * Strobe status
 */
var strobeState = false;
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
                        if (isBoris())
        API.sendChat("@" + user.username + ", Hi & Welcome, enjoy your time in our DnB world :)) ");
    });

	/**
	 * Called upon a user exiting the room. 
	 */
	API.addEventListener(API.USER_LEAVE, function(user) {
		if (userList)
			populateUserlist();
	});
	
	API.addEventListener(API.CHAT, checkChat);
}


function checkChat()
{
	checkCustomUsernames();
	checkStrobeString();
}

/**
 * Periodically check the chat history to see if any of the messages
 * match that of the user's chosen custom username FX.  If so, then we
 * need to stylise every instance of those. 
 */
function checkCustomUsernames() 
{
	$('span[class*="chat-from"]').each(function() 
	{
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
 * Cheat mode strobe
 */
 
var strobeID = null;
function strobe()
{
	$(RoomUser.audience.canvas).toggle();
	$(RoomUser.audience.imageMap).toggle();
}

function strobeSwap()
{
	if(strobeID) clearTimeout(strobeID);
	if (strobeState) strobeID = setInterval(strobe, 160);
		setTimeout(function(){strobe()},5000);
}

function checkStrobeString()
{
	var oldState = strobeState;
	$('div[class*="chat-emote"]>span[class*="chat-text"]').each(function() 
	{
		if ($(this).text().match(strobeOn)) strobeState = true;
		if ($(this).text().match(strobeOff)) strobeState = false;
	});
	
	if (oldState != strobeState) strobeSwap();
}

/**
 * Renders all of the Plug.bot "UI" that is visible beneath the video
 * player. 
 */
function displayUI()
{
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
			'<p id="plugbot-btn-woot" style="color:#F88017">auto-woot</p>'
		+ 	'<p id="plugbot-btn-queue" style="color:#F88017">auto-queue</p>'
		+ 	'<p id="plugbot-btn-hidevideo" style="color:#F88017">hide video</p>'
//		+ 	'<p id="plugbot-btn-userlist" style="color:#ED1C24">userlist</p>'
		+ 	'<p id="plugbot-btn-facebook" style="color:#ED1C24"><a style="color: #F88017" href="http://www.facebook.com/groups/349429268437488/" target="_blank">facebook</a></p>'
		+ 	'<p id="plugbot-btn-youtube" style="color:#ED1C24"><a style="color: #F88017" href="http://www.youtube.com/user/LoLPunkred/videos" target="_blank">punks youtube</a></p>'
		+ 	'<p id="plugbot-btn-youtube" style="color:#ED1C24"><a style="color: #F88017" href="http://www.youtube.com/user/LedgeSounds/videos" target="_blank">ledges youtube</a></p>'
		+ 	'<h2 id="plugbot-btn-minecraft" style="color:#F88017"> <a style="color:#3FFF00"> Minecraft Server </a> </br> Server Status: <a style="color:#3FFF00"> Online </a> </br> Server Ip: <a style="color:#3FFF00"> 108.246.72.228 </a> </br> Minecraft Download: <a style="color: #3FFF00" href="https://github.com/downloads/Punkred/DnBplug/Minecraft%20v1.3.1.zip" target="_blank">[X]</a></h2>'
    );
}


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
	customUsernames.splice(data, 1);
}


/**
 * For every button on the Plug.bot UI, we have listeners backing them
 * that are built to intercept the user's clicking each button.  Based 
 * on the button that they clicked, we can execute some logic that will
 * in some way affect their experience. 
 */
function initUIListeners()
{	
/*	$("#plugbot-btn-userlist").on("click", function() {
		userList = !userList;
		$(this).css("color", userList ? "#3FFF00" : "#ED1C24");
		$("#plugbot-userlist").css("visibility", userList ? ("visible") : ("hidden"));
		if (!userList) {
			$("#plugbot-userlist").empty();
		} else {
			populateUserlist();
		}
	});
*/
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
	 * If they want the video to be hidden, be sure to re-hide it.
	 */
	if (hideVideo)
	{
		$("#yt-frame").css("height", "0px");
		$("#playback .frame-background").css("opacity", "0.0");
	}
	
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
	 * Update the current # of users in the room.
	 */
	$('#plugbot-userlist').append('<h1 style="text-indent:12px;color:#42A5DC;font-size:14px;font-variant:small-caps;">Users: ' + API.getUsers().length + '</h1>');

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
		appendUser(user)
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
function appendUser(user) 
{
	var username 	= user.username;
	var vote 		= user.vote;
	
	/*
	 * Some variables that we'll either be setting as true/false
	 * (some conditionals that do major changes to their look in the userlist)
	 * or setting a value to.
	 */
	var colour;
	var currentDj = false;
	var moderator = user.moderator;
	if (API.getSuperUsers() != null) 	var su = user.superuser;
	if (API.getHost() != null) 			var host = user.owner;
	var img;

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
			if (su)
				img = "http://i.imgur.com/XA1DE.png";
			break;
		case 0:		// Undecided
			colour = "FFFFFF";
			if (moderator) 
				img = "http://i.imgur.com/sRsU0.png";
			if (host)
				img = "http://i.imgur.com/6Bq5W.png";
			if (su)
				img = "http://i.imgur.com/veoVS.png";
			break;
		case -1:	// Meh
			colour = "ED1C24";
			if (moderator)
				img = "http://i.imgur.com/JPA1Q.png";
			if (host)
				img = "http://i.imgur.com/wVLR3.png";
			if (su)
				img = "http://i.imgur.com/5LcI3.png";
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
	if (img == undefined && (moderator || host || su)) 
	{
		colour = "FFFFFF";
		img = moderator ? "http://i.imgur.com/sRsU0.png" : "http://i.imgur.com/6Bq5W.png";
	}

	/*
	 * Apply the HTML code to the page that actually displays them
	 * inside the userlist.
	 */
	$('#plugbot-userlist').append(
		((moderator || host || su) ? '<img src="' + img + '" align="left" style="margin-left:6px" alt="Moderator" />' : '') 
		+ '<p style="' + ((moderator || host || su) ? 'text-indent:6px !important;' : '') 
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
	+ '#plugbot-ui p { background-color: #0b0b0b; height: 32px; padding-top: 8px; padding-left: 8px; cursor: pointer; font-variant: small-caps; width: 84px; font-size: 15px; margin: 0; }'
	+ '#plugbot-ui h2 { background-color: #0b0b0b; height: 112px; width: 156px; margin: 0; color: #fff; font-size: 13px; font-variant: small-caps; padding: 8px 0 0 12px; border-top: 1px dotted #292929; }'
//    + '#plugbot-userlist { border: 6px solid rgba(10, 10, 10, 0.8); border-left: 0 !important; background-color: #000000; padding: 8px 0px 20px 0px; width: 12%; }'
//    + '#plugbot-userlist p { margin: 0; padding-top: 2px; text-indent: 24px; font-size: 10px; }'
//    + '#plugbot-userlist p:first-child { padding-top: 0px !important; }'
    + '#plugbot-queuespot { color: #42A5DC; text-align: left; font-size: 15px; margin-left: 8px }');

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

//autochat
function isBoris() { return API.getSelf().username == "d(-_-)b Tom"; }

if (isBoris())
{
    window.setInterval(function() {
    API.sendChat("Check out our Room's Custom Background Script @ http://userscripts.org/scripts/show/140077 and Facebook Group @ http://tinyurl.com/c7dbewy :) ");
    }, (1000 * 60 * 60));
}

//elements removal
 setTimeout(function(){	
 RoomUser.audience.roomElements = []; RoomUser.redraw();
 },2000);