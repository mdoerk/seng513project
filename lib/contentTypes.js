/* 
 * contentTypes.js 
 * Cotains Helper methods for getting the content type of files
 */

var defaultType = 'application/octet-stream'; 
var mimeTypes = {
	// Application
	'.a'    : 'application/octet-stream',
	'.ai'   : 'application/postscript',
	'.atom' : 'application/atom+xml',
	'.bat'  : 'application/x-msdownload',
	'.bin'  : 'application/octet-stream',
	'.cab'  : 'application/vnd.ms-cab-compressed',
	'.dll'  : 'application/x-msdownload',
	'.dmg'  : 'application/octet-stream',
	'.doc'  : 'application/msword',
	'.dot'  : 'application/msword',
	'.dtd'  : 'application/xml-dtd',
	'.eml'  : 'message/rfc822',
	'.eps'  : 'application/postscript',
	'.exe'  : 'application/x-msdownload',
	'.gtar' : 'application/x-gtar',
	'.gz'	  : 'application/x-gzip',
	'.gz'   : 'application/x-gzip',
	'.iso'  : 'application/octet-stream',
	'.js'   : 'application/javascript',
	'.json' : 'application/json',
	'.latex': 'application/x-latex',
	'.odp'  : 'application/vnd.oasis.opendocument.presentation',
	'.ods'  : 'application/vnd.oasis.opendocument.spreadsheet',
	'.odt'  : 'application/vnd.oasis.opendocument.text',
	'.pkg'  : 'application/octet-stream',
	'.ppt'  : 'application/vnd.ms-powerpoint',
	'.ps'   : 'application/postscript',
	'.rar'  : 'application/x-rar-compressed',
	'.swf'  : 'application/x-shockwave-flash',
	'.tar'  : 'application/x-tar',
	'.tbz'  : 'application/x-bzip-compressed-tar',
	'.torrent' : 'application/x-bittorrent',
	'.xhtml': 'application/xhtml+xml',
	'.xls'  : 'application/vnd.ms-excel',
	'.zip'  : 'application/zip',
	// Audio 
	'.aif'  : 'audio/x-aiff',
	'.aiff' : 'audio/x-aiff', 
	'.au'	  : 'audio/basic',
	'.m3u'  : 'audio/x-mpegurl',
	'.mid'  : 'audio/midi', 
	'.midi' : 'audio/midi', 
	'.mp3'  : 'audio/mpeg',
	'.ogg'  : 'audio/ogg', 
	'.ra'	  : 'audio/x-realaudio',
	'.ram'  : 'audio/x-pn-realaudio',
	'.rm'   : 'audio/x-pn-realaudio',
	'.snd'  : 'audio/basic',
	'.wav'  : 'audio/x-wav',
	'.wax'  : 'audio/x-ms-wax',
	'.wma'  : 'audio/x-ms-wma',
	// Image
	'.bmp'  : 'image/bmp',
	'.gif'  : 'image/gif',
	'.jpg'  : 'image/jpeg',
	'.jpeg' : 'image/jpeg',
	'.png'  : 'image/png',
	'.svg'  : 'image/svg+xml',
	'.svgz' : 'image/svg+xml',
	'.tiff' : 'image/tiff',
	'.ico'  : 'image/vnd.microsoft.icon',
	// Text
	'.c'    : 'text/x-c',
	'.cc'   : 'text/x-c',
	'.h'    : 'text/x-c',
	'.hh'   : 'text/x-c',
	'.css'  : 'text/css',
	'.conf' : 'text/plain',
	'.cpp'  : 'text/x-c',
	'.css'  : 'text/css',
	'.csv'  : 'text/csv',
	'.diff' : 'text/x-diff',
	'.htm'  : 'text/html',
	'.html' : 'text/html',
	'.java' : 'text/x-java-source',
	'.log'  : 'text/plain',
	'.pl'   : 'text/x-script.perl',
	'.py'   : 'text/x-script.python',
	'.rake' : 'text/x-script.ruby',
	'.rb'   : 'text/x-script.ruby',
	'.rtf'  : 'text/rtf',
	'.rtx'  : 'text/richtext',
	'.css'  : 'text/css',
	'.txt'  : 'text/plain',
	'.text' : 'text/plain',
	'.xml'  : 'text/xml',
	'.xsl'  : 'text/xml',
	// Video
	'.3gp'  : 'video/3gpp',
	'.avi'  : 'video/x-msvideo',	
	'.flv'  : 'video/x-flv',
	'.m4v'  : 'video/mp4',
	'.mov'  : 'video/quicktime',
	'.movie': 'video/x-sgi-movie',
	'.mp4'  : 'video/mp4',
	'.mp4v' : 'video/mp4',
	'.mpg'  : 'video/mpeg',
	'.mpeg' : 'video/mpeg',
	'.qt'   : 'video/quicktime',
	'.webm' : 'video/webm',
	'.wmv'  : 'video/x-ms-wmv',
	'.css'  : 'video/x-msvideo'
};

/* 
 * Returns a mime-type based on a file extension
 * 
 * 'ext' The file extension 
 */ 
exports.lookupMime = function(ext) {
	var mimeType = mimeTypes[ext]; 
	if (typeof mimeType == 'undefined') {
		return defaultType; 
	}
	return mimeType; 
}; 
