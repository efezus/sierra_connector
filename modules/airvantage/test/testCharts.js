var content= '\n\
<!DOCTYPE html>\n\
<html>\n\
  <head>\n\
    <meta charset=\"utf-8\">\n\
 	<link rel=\"stylesheet\"  href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css\"/>\n\
	<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js\"></script>\n\
	<script type=\"text/javascript\" src=\'https://www.google.com/jsapi?autoload={\"modules\":[{ \"name\":\"visualization\",\"version\":\"1\", \n\
         \"packages\":[\"charteditor\", \"corechart\"]\n\
         }] \n\
      }\'></script> \n\
  </head>\n\
  <script>\n\
\n\
  	google.setOnLoadCallback(loadChart);\n\
\n\
    var wrapper;\n\
	\n\
	$.urlParam = function(name){\n\
    		var results = new RegExp(\'[\\?&]\' + name + \'=([^&#]*)\').exec(window.location.href);\n\
    		if (results==null){\n\
      			return null;\n\
    		}else{\n\
       			return results[1] || 0;\n\
    		}\n\
	}\n\
	\n\
	$.getUrlVars = function() {\n\
    	var vars = [], hash;\n\
    	var hashes = window.location.href.slice(window.location.href.indexOf(\'?\') + 1).split(\'&\');\n\
    	for(var i = 0; i < hashes.length; i++)\n\
    	{\n\
        	hash = hashes[i].split(\'=\');\n\
        	vars.push(hash[0]);\n\
        	vars[hash[0]] = hash[1];\n\
    	}\n\
    	return vars;\n\
	}\n\
		\n\
		var baseURL = window.location.origin + window.location.pathname.substring(0,window.location.pathname.indexOf(\"modules/airvantage/test/testCharts.js\"))\n\
   		var token = $.urlParam(\'auth_token\')\n\
	\n\
	\n\
	var params = {}\n\
	$.getUrlVars().forEach(function(param) {\n\
		if(param != \'auth_token\') {\n\
		   params[param] = $.urlParam(param);\n\
		}\n\
	});\n\
	\n\
	var options = {\n\
		type: \"POST\",\n\
		url: baseURL + \"modules/airvantage/test/test.js\",\n\
		success: function() {},\n\
		failure: function() {},\n\
		dataType: \"json\",\n\
		data: params\n\
	};\n\
	\n\
	if(token) {\n\
		options[\"headers\"] = { \"Authorization\":  \"bearer \" + token };\n\
	}\n\
\n\
 	function loadChart() {\n\
		var chart_content = {\"options\":{\"hAxis\":{\"useFormatFromData\":true,\"viewWindow\":null,\"minValue\":null,\"maxValue\":null,\"viewWindowMode\":null},\"legacyScatterChartLabels\":true,\"legend\":\"right\",\"title\":\"Chart Title\",\"vAxes\":[{\"title\":null,\"minValue\":null,\"maxValue\":null,\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null}},{\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null}],\"curveType\":\"\",\"booleanRole\":\"certainty\",\"lineWidth\":2,\"width\":600,\"height\":371,\"series\":{\"0\":{\"hasAnnotations\":true}},\"annotations\":{\"domain\":{}}},\"state\":{},\"view\":{\"columns\":[{\"calc\":\"emptyString\",\"sourceColumn\":0,\"type\":\"string\"},0,{\"sourceColumn\":1,\"properties\":{\"role\":\"annotation\"},\"label\":\"Black Ink Level\"},{\"sourceColumn\":2,\"properties\":{\"role\":\"annotationText\"},\"label\":\"Black Ink Level\"}],\"rows\":null},\"isDefaultVisualization\":false,\"chartType\":\"LineChart\"};\n\
		delete chart_content.containerId;\n\
		chart_content[\"containerId\"] = \"scriptrChart\"\n\
   		wrapper = new google.visualization.ChartWrapper(chart_content);\n\
		$.ajax(options).done(function(response) {\n\
		  	  	$(\".loading-google-frame\").hide();\n\
				setDataSource(response.response.result);\n\
				$(\"#scriptrChart\").show();\n\
		 	 })\n\
		 	 .fail(function(response ) {\n\
		 		var out = \"\";\n\
			if(response.status == 0 && response.statusText == \"error\" && response.readyState == 0 && response.responseText == \"\"){\n\
				out += \"An error has occurred. This is most likely a cross-domain issue. In case you modified the response object in your script, try adding response.addHeaders(configuration.crossDomainHeaders) to your code.\";\n\
			}else{\n\
				var output = response;\n\
				if(response.responseJSON){\n\
					out += \"Your chart data source script returned a \"+ response.responseJSON.response.metadata.errorCode + \" error.\"\n\
				}\n\
			}\n\
			$(\"#scriptrChart\").html(out);\n\
				$(\".loading-google-frame\").hide();\n\
				$(\"#scriptrChart\").show();\n\
		  	})\n\
		  	.always(function(data) {\n\
			});\n\
  	}\n\
	\n\
    function setDataSource(data) {\n\
	  	wrapper.setDataTable(data);\n\
	  	if(wrapper.getChartType() != null) {\n\
	  		wrapper.draw();\n\
	  	}\n\
    }\n\
\n\
    function drawChart() {\n\
        wrapper.draw();\n\
    }\n\
\n\
    </script>\n\
  <body>\n\
	  <div style=\"display: none;\" id=\"scriptrChart\"></div>\n\
      <div class=\'loading-google-frame\' style=\"padding: 100px;\"><i class=\'fa fa-spinner fa-spin fa-3x\'></i></div>\n\
  </body>\n\
</html>\n\
';  response.write(content);response.close();