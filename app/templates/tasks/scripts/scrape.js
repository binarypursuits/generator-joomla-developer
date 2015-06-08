

var js = [];
var css = [];
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
var utils = require('utils');
var casper = require('casper').create({
	//verbose: true,
	//logLevel: "debug",
	//onError: errorEvent
});

var link = Base64.decode(casper.cli.raw.get('url'));

function errorEvent(e) {
	this.echo('CasperJS Script Eroor');
	this.echo(e);
	this.exit();
}

function getTagAttribute(tag, attribute)
{
	var tags = document.querySelectorAll(tag);
	return Array.prototype.map.call(tags, function(e) {
		return e.getAttribute(attribute);
	});
}
function getScripts2()
{
	return getTagAttribute('script', 'src');
}

function getStyles2()
{
	return getTagAttribute('link', 'href');
}

function getImages()
{
	return getTagAttribute('img', 'src');
}

function getScripts() {
	var tags = document.querySelectorAll('script');
	return Array.prototype.map.call(tags, function(e) {
		return e.getAttribute('src');
	});
}

function getStyles() {
	var tags = document.querySelectorAll('link');
	return Array.prototype.map.call(tags, function(e) {
		return e.getAttribute('href');
	});
}

function deminify(str)
{
	return str.replace('min.js', 'js');
}

function decompress(str)
{
	return str.replace('.js', '-uncompessed.js');
}

casper.start(link, function() {

});

casper.then(function() {

	var tags, temp;

	temp = this.evaluate(getScripts);

	for (var i = 0; i < temp.length; i++)
	{
		if (temp[i].indexOf('.js') > -1)
		{
			if (temp[i].indexOf('/') !== 0 && temp[i].indexOf('http') !== 0)
			{
				temp[i] = '/' + temp[i];
			}

			if (temp[i].indexOf('google-analytics.com') === -1)
			{
				var source = temp[i];

				if (source.indexOf('media/jui/js') > -1)
				{
					if (source.indexOf('html5') === -1 && source.indexOf('jquery-noconflict') === -1)
					{
						if (source.indexOf('min.js') > -1)
						{
							source = deminify(source);
						}
						else
						{
							source = decompress(source);
						}
					}
				}
				else if (source.indexOf('media/system/js') > -1)
				{
					if (source.indexOf('min.js') > -1)
					{
						source = deminify(source);
					}
					else if (source.indexOf('passwordstrength') === -1 || source.indexOf('helpsite') === -1)
					{
						source = decompress(source);
					}
				}

				js.push(source);
			}
		}
	}

	temp = this.evaluate(getStyles);

	for (var i = 0; i < temp.length; i++)
	{
		var href = temp[i];
		if (href.indexOf('.css') > -1)
		{
			if (href.indexOf('/') !== 0 && href.indexOf('http') !== 0)
			{
				href = '/' + href;
			}

			if (href.indexOf('media/jui/css') > -1 && href.indexOf('media/system/css') > -1)
			{
				if (href !== 'jquery.Jcrop.min.css')
				{
					href = deminify(href);
				}
			}

			css.push(href);
		}
	}

});

casper.run(function() {

	var json = {
			"js" : js,
			"css" : css
	};

	this.echo(JSON.stringify(json)).exit();
});