exports.action = function(data){
	try{

  
var request = require('request');var cheerio = require('cheerio');

try{
	var ask=JarvisIA.reco
var rgxp = /météo (.+)/i; var match1 = ask.match(rgxp);
var ask="météo "+match1[1]
}

catch(err){JarvisIASpeech('pas de météo connus');console.log("pas de météo");return false}

var url=ask


function meteodujour(url,scrapinfo0){

	url=url.replace(/ sur/gi,'') ;url=url.replace(/ à/gi,'') ; url=url.replace(/ /gi,'+')
	
	request({ uri : 'https://www.bing.com/search?q='+encodeURI(url) }, function(error, response, html){
			 var $ = cheerio.load(html); var resultmeteo=''

var currTemp=$('.wtr_currTemp').text()
var hitghtemp=$('div.wtr_high:nth-child(1)').text()
var lowtemp=$('div.wtr_low:nth-child(2)').text()
var currPreci=$('.wtr_currPerci').text()
var currentwind=$('.wtr_currWind').text()
var currhumidite=$('.wtr_currHumi').text()
var tendance=$('.wtr_caption').text()
var ville=$('.wtr_locTitle').text()
console.log(currTemp+hitghtemp+lowtemp+currPreci+currentwind+currhumidite+tendance)
								
valeurduspeak="température actuelle de "+currTemp+" degrés ; "+" d'amplitude de "+lowtemp+" à "+hitghtemp+ "; risque de "+currPreci
valeurduspeak=valeurduspeak+" ; "+currentwind+ " ; prévision "+tendance+" ; "

	if(valeurduspeak.search(new RegExp('Ensoleillé',"gi"))>-1){//météo
		valeurduspeak=valeurduspeak+"|pense à la crème solaire|pas de pluie pour l'instant|un peux de soleil fait du bien";
	}//fin if nuageux
	if(valeurduspeak.search(new RegExp('nuageux',"gi"))>-1){//météo
		valeurduspeak=valeurduspeak+"|le ciel est couvert|la pluie va peut être arriver|le temps est maussade";
	}//fin if nuageux

	if(valeurduspeak.search(new RegExp('partiellement',"gi"))>-1){//météo
		valeurduspeak=valeurduspeak+"|le temps est incertain";
	}//fin if nuageux

if(currTemp<15){ //météo
		valeurduspeak=valeurduspeak+"|la température est froide";
	}//fin if nuageux


	if(valeurduspeak.search(new RegExp('neige',"gi"))>-1){//météo
		valeurduspeak=valeurduspeak+"|prépare la luge",'sort les skis';
	}//fin if nuageux

if(currTemp==''){JarvisIASpeech("pas de météo, désolez, essai autrement")
	return false
}
										//SCRIBE = SARAH.context.scribe;
											//	SCRIBE.texteplugin(valeurduspeak);
												
												if(valeurduspeak.search(/Ora/ig)>-1){var icone="icones/Orages.gif"}
												if(valeurduspeak.search(/Pluie/ig)>-1){var icone="icones/Pluie.gif"}
												if(valeurduspeak.search(/Nuageux/ig)>-1){var icone="icones/Variable.gif"}
												if(valeurduspeak.search(/Soleil/ig)>-1){var icone="icones/Soleil.gif"}
												if(valeurduspeak.search(/couvert/ig)>-1){var icone="icones/Couvert.gif"}
												if(valeurduspeak.search(/clair/ig)>-1){var icone="icones/Clair.gif"}
												if(valeurduspeak.search(/neige/ig)>-1){var icone="icones/Neige.gif"}	
												if(icone==undefined){var icone="Undefined.gif"}	
													
												//SCRIBE.icone(icone,myIPretour);
												//SCRIBE.activePlugin('MéTéo Mondiale');


alertemeteo(valeurduspeak,ville)

//										callback();return false
  						}//fin if i==20
		
)



}


function alertemeteo(valeurduspeak,ville){
console.log(ville+" le nom de la ville")
ville=ville.split(',') ; ville=ville[0] ; //ville=ville.replace(/-la/gi,'')

request({ uri : 'http://code.postal.fr/code-postal-'+ville+'.html'}, function(error, response, html){
			var $ = cheerio.load(html); 
		
		var codeville=($ ('.content-side > table > tr >  td').eq(1).text())

	
			//console.log( $ ('.content-side > table > tr >  td').eq(3).text()+" : le code INSEE")

codeville=codeville.trim()

console.log("Code postal la ville : "+codeville)			
		request({ uri : 'http://alerte.vigilance-meteo.fr/getwarning_fr.php?plz='+codeville+'&uwz=UWZ-FR&lang=fr'},function(error, response, html){
			var $= cheerio.load(html)
			var alertetexte=$('#content > p:nth-child(3)').text()
			var alertetexte1=$('#content > div:nth-child(5)').text()
			var alertetexte2=$('#content > div:nth-child(11)').text()
			
			console.log(alertetexte1)
			console.log(alertetexte2)
			valeurduspeak=valeurduspeak.replace('km/h',' Kilomètre heure ')
valeurduspeak=alertetexte1+ " ; "+alertetexte2+" ; "+valeurduspeak
JarvisIASpeech("voici mes prévision ; "+valeurduspeak)			
		})

})


	return false
}

scrapinfo0=""
meteodujour(url,scrapinfo0)


}catch(err){console.log(err);return false}
}//fin export