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