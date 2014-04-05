/*
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.util.MockServer");jQuery.sap.require("sap.ui.base.ManagedObject");jQuery.sap.require("sap.ui.thirdparty.sinon");if(!!sap.ui.Device.browser.internet_explorer){jQuery.sap.require("sap.ui.thirdparty.sinon-ie")}(function(q,D,M,s){var c=M.extend("sap.ui.core.util.MockServer",{constructor:function(i,S,o){M.apply(this,arguments);c._aServers.push(this)},metadata:{properties:{rootUri:"string",requests:{type:"object[]",defaultValue:[]}}},_oServer:null,_aFilter:null,_oMockdata:null,_oMetadata:null,_sMetadataUrl:null,_sMockdataBaseUrl:null,_mEntitySets:null});c.prototype.start=function(){this._oServer=c._getInstance();this._aFilters=[];var r=this.getRequests();var l=r.length;for(var i=0;i<l;i++){var R=r[i];this._addRequestHandler(R.method,R.path,R.response)}};c.prototype.stop=function(){if(this.isStarted()){this._removeAllRequestHandlers();this._removeAllFilters();this._oServer=null}};c.prototype.isStarted=function(){return!!this._oServer};c.prototype._applyQueryOnCollection=function(f,Q,e){var a=Q.split('=');var o=a[1];if(o==="")return;if(o.lastIndexOf(',')===o.length){throw new Error("400")}switch(a[0]){case"top":if(!(new RegExp(/^\d+$/).test(o))){throw new Error("400")}f.results=f.results.slice(0,o);break;case"skip":if(!(new RegExp(/^\d+$/).test(o))){throw new Error("400")}f.results=f.results.slice(o,f.results.length);break;case"orderby":f.results=this._getOdataQueryOrderby(f.results,o);break;case"filter":f.results=this._getOdataQueryFilter(f.results,o);break;case"select":f.results=this._getOdataQuerySelect(f.results,o);break;case"inlinecount":var C=this._getOdataInlineCount(f.results,o);if(C){f.__count=C}break;case"expand":f.results=this._getOdataQueryExpand(f.results,o,e);break;default:throw new Error("400")}};c.prototype._applyQueryOnEntry=function(e,Q,E){var a=Q.split('=');var o=a[1];if(o==="")return;if(o.lastIndexOf(',')===o.length){throw new Error("400")}switch(a[0]){case"filter":return this._getOdataQueryFilter([e],o)[0];case"select":return this._getOdataQuerySelect([e],o)[0];case"expand":return this._getOdataQueryExpand([e],o,E)[0];default:throw new Error("400")}};c.prototype._getOdataQueryOrderby=function(d,o){var p=decodeURIComponent(o).split(',');var C=function compare(a,b){for(var i=0;i<p.length;i++){var S=p[i].split(' ');var e=1;if(S.length>1){switch(S[1]){case'asc':e=1;break;case'desc':e=-1;break;default:throw new Error("400")}}var P=S[0].replace("/",".");if(!a.hasOwnProperty(P))throw new Error("400");if(a[P]<b[P])return-1*e;if(a[P]>b[P])return 1*e}return 0};return d.sort(C)};c.prototype._getOdataQueryFilter=function(d,o){o=decodeURIComponent(o);var O=o.indexOf("(")!=-1?o.split("(")[0]:o.split(" ")[1];var t=this;var G=function(v,V,p,S){var a,b;if(!v){a=o.split(" ");b=t._trim(a[V]);b=((b.charAt(0)=="'")&&(b.charAt(b.length-1)=="'"))?b.substr(1,a[2].length-2):b}else{a=o.split("(")[1].split(")")[0].split(",");b=t._trim(a[V]).substr(1,a[0].length-2)}var P=t._trim(a[p]);if(!d[0].hasOwnProperty(P)){throw new Error("400")}return S(P,b)};switch(O){case"substringof":return G(true,0,1,function(p,v){return q.grep(d,function(m){return(m[p].indexOf(v)!=-1)})});case"startswith":return G(true,1,0,function(p,v){return q.grep(d,function(m){return(m[p].indexOf(v)==0)})});case"endswith":return G(true,1,0,function(p,v){return q.grep(d,function(m){return(m[p].indexOf(v)==(m[p].length-v.length))})});case"eq":return G(false,2,0,function(p,v){return q.grep(d,function(m){return(m[p]==v)})});case"ne":return G(false,2,0,function(p,v){return q.grep(d,function(m){return(m[p]!=v)})});case"gt":return G(false,2,0,function(p,v){return q.grep(d,function(m){return(m[p]>v)})});case"lt":return G(false,2,0,function(p,v){return q.grep(d,function(m){return(m[p]<v)})});case"ge":return G(false,2,0,function(p,v){return q.grep(d,function(m){return(m[p]>=v)})});case"le":return G(false,2,0,function(p,v){return q.grep(d,function(m){return(m[p]<=v)})});default:throw new Error("400")}};c.prototype._getOdataQuerySelect=function(d,o){var p=o.split(',');if(q.inArray("*",p)!==-1){return d}var S=[];q.each(p,function(i,P){if(!d[0].hasOwnProperty(P)){throw new Error("404")}});q.each(d,function(i,a){var P=q.extend(true,{},a);for(var n in P){if(n!=="__metadata"&&q.inArray(n,p)===-1){delete P[n]}}S.push(P)});return S};c.prototype._getOdataInlineCount=function(d,o){var p=o.split(',');if(p.length!==1||(p[0]!=='none'&&p[0]!=='allpages')){throw new Error("400")}if(p[0]==='none'){return}return d.length};c.prototype._getOdataQueryExpand=function(d,o,e){var t=this;var n=o.split(',');var E=t._mEntitySets[e].navprops;q.each(d,function(i,r){q.each(n,function(i,N){var a=N.split("/");var N=a[0];var b=q.extend(true,[],t._resolveNavigation(e,r,N));if(!!b&&a.length>1){var R=a.splice(1,a.length).join("/");b=t._getOdataQueryExpand(b,R,E[N].to.entitySet)}if(E[N].to.multiplicity==="*"){r[N]={results:b}}else{r[N]=b[0]?b[0]:{}}})});return d};c.prototype._refreshData=function(){this._loadMetadata(this._sMetadataUrl);this._mEntitySets=this._findEntitySets(this._oMetadata);if(this._sMockdataBaseUrl==null){this._generateMockdata(this._mEntitySets,this._oMetadata)}else{if(!q.sap.endsWith(this._sMockdataBaseUrl,"/")&&!q.sap.endsWith(this._sMockdataBaseUrl,".json")){this._sMockdataBaseUrl+="/"}this._loadMockdata(this._mEntitySets,this._sMockdataBaseUrl)}};c.prototype._getRootUri=function(){var u=this.getRootUri();u=u&&/([^?#]*)([?#].*)?/.exec(u)[1];return u};c.prototype._loadMetadata=function(m){var o=q.sap.sjax({url:m,dataType:"xml"}).data;this._oMetadata=o;return o};c.prototype._findEntitySets=function(m){var e={};var p=q(m).find("Principal");var d=q(m).find("Dependent");q(m).find("EntitySet").each(function(i,E){var $=q(E);var a=/((.*)\.)?(.*)/.exec($.attr("EntityType"));e[$.attr("Name")]={"name":$.attr("Name"),"schema":a[2],"type":a[3],"keys":[],"keysType":{},"navprops":{}}});var r=function(R,f){var a=q(m).find("End[Role="+R+"]");var E;var b;q.each(a,function(i,v){if(!!q(v).attr("EntitySet")){E=q(v).attr("EntitySet")}else{b=q(v).attr("Multiplicity")}});var P=[];var o=(f)?p:d;q(o).each(function(i,h){if(R==(q(h).attr("Role"))){q(h).children("PropertyRef").each(function(i,j){P.push(q(j).attr("Name"))});return false}});return{"role":R,"entitySet":E,"propRef":P,"multiplicity":b}};q.each(e,function(E,o){var $=q(m).find("EntityType[Name="+o.type+"]");var k=q($).find("PropertyRef");q.each(k,function(i,P){var K=q(P).attr("Name");o.keys.push(K);o.keysType[K]=q($).find("Property[Name="+K+"]").attr("Type")});var n=q(m).find("EntityType[Name="+o.type+"] NavigationProperty");q.each(n,function(i,N){var a=q(N);o.navprops[a.attr("Name")]={"name":a.attr("Name"),"from":r(a.attr("FromRole"),true),"to":r(a.attr("ToRole"),false)}})});return e};c.prototype._findEntityTypes=function(m){var e={};q(m).find("EntityType").each(function(i,E){var $=q(E);e[$.attr("Name")]={"name":$.attr("Name"),"properties":[],"keys":[]};$.find("Property").each(function(i,p){var P=q(p);var t=P.attr("Type");e[$.attr("Name")].properties.push({"schema":t.substring(0,t.lastIndexOf(".")),"type":t.substring(t.lastIndexOf(".")+1),"name":P.attr("Name"),"precision":P.attr("Precision"),"scale":P.attr("Scale")})});$.find("PropertyRef").each(function(i,k){var K=q(k);var p=K.attr("Name");e[$.attr("Name")].keys.push(p)})});return e};c.prototype._findComplexTypes=function(m){var C={};q(m).find("ComplexType").each(function(i,o){var $=q(o);C[$.attr("Name")]={"name":$.attr("Name"),"properties":[]};$.find("Property").each(function(i,p){var P=q(p);var t=P.attr("Type");C[$.attr("Name")].properties.push({"schema":t.substring(0,t.lastIndexOf(".")),"type":t.substring(t.lastIndexOf(".")+1),"name":P.attr("Name"),"precision":P.attr("Precision"),"scale":P.attr("Scale")})})});return C};c.prototype._createKeysString=function(e,E){var t=this;var k="";if(E){q.each(e.keys,function(i,K){if(k){k+=","}var o=E[K];if(e.keysType[K]==="Edm.String"){k+=K+"='"+o+"'"}else if(e.keysType[K]==="Edm.DateTime"){k+=K+"="+t._getDateInMin(o)}else{k+=K+"="+o}})}return k};c.prototype._loadMockdata=function(e,b){var t=this,E={};this._oMockdata={};if(q.sap.endsWith(b,".json")){var r=q.sap.sjax({url:b,dataType:"json"});if(r.success){E=r.data}else{q.sap.log.error("The mockdata for all the entity types could not be found at \""+b+"\"!")}}else{q.each(e,function(a,o){if(!E[o.type]){var d=b+o.type+".json";var r=q.sap.sjax({url:d,dataType:"json"});if(r.success){E[o.type]=r.data}else{q.sap.log.error("The mockdata for entity type \""+o.type+"\" could not be found at \""+b+"\"!")}}})}q.each(e,function(a,o){t._oMockdata[a]=[];if(E[o.type]){q.each(E[o.type],function(i,d){t._oMockdata[a].push(q.extend(true,{},d))})}if(t._oMockdata[a].length>0){t._enhanceWithMetadata(o,t._oMockdata[a])}});return this._oMockdata};c.prototype._enhanceWithMetadata=function(e,m){if(m){var t=this,r=this._getRootUri(),E=e&&e.name;q.each(m,function(i,o){o.__metadata={id:r+E+"("+t._createKeysString(e,o)+")",type:e.schema+"."+e.type,uri:r+E+"("+t._createKeysString(e,o)+")"};q.each(e.navprops,function(k,n){o[k]={__deferred:{uri:r+E+"("+t._createKeysString(e,o)+")/"+k}}})})}};c.prototype._isRequestedKeysValid=function(e,r){if(r.length===1&&!r[0].split('=')[1]){r=[e.keys[0]+"="+r[0]]}for(var i=0;i<r.length;i++){var k=r[i].split('=');var K=this._trim(k[0]);var R=this._trim(k[1]);var f=R.charAt(0);var l=R.charAt(R.length-1);if(e.keysType[K]==="Edm.String"){if(f!=="'"||l!=="'"){return false}}else if(e.keysType[K]==="Edm.DateTime"){if(f==="'"||l!=="'"){return false}}else{if(f==="'"||l==="'"){return false}}}return true};c.prototype._parseKeys=function(k){var r={};var p=k.split(",");for(var i=0;i<p.length;i++){var P=p[i].split("=");if(P.length===2){if(P[1].indexOf('\'')===0){r[P[0]]=P[1].slice(1,P[1].length-1)}else{r[P[0]]=P[1]}}};return r};c.prototype._completeKey=function(e,k,E){if(E){q.each(e.keys,function(i,K){if(k[K]){if(!E[K]){E[K]=k[K]}}else{if(!e.iSequence){e.iSequence=0}e.iSequence++;E[K]=e.type+"_"+E.type+"_"+e.iSequence.toString()}})}};c.prototype._generateDataFromEntity=function(e,I,C){var E={};for(var i=0;i<e.properties.length;i++){var p=e.properties[i];var P="";switch(p.type){case"String":E[p.name]=p.name+"_"+I;break;case"DateTime":var d=new Date();d.setFullYear(2000+Math.floor(Math.random()*20));d.setDate(Math.floor(Math.random()*30));d.setMonth(Math.floor(Math.random()*12));d.setMilliseconds(0);E[p.name]="/Date("+d.getTime()+")/";break;case"Int16":case"Int32":case"Int64":E[p.name]=Math.floor(Math.random()*10000);break;case"Decimal":E[p.name]=Math.floor(Math.random()*1000000)/100;break;case"Boolean":E[p.name]=Math.random()<.5;break;case"Byte":E[p.name]=Math.floor(Math.random()*10);break;case"Double":E[p.name]=Math.random()*10;break;case"Single":E[p.name]=Math.random()*1000000000;break;case"SByte":E[p.name]=Math.floor(Math.random()*10);break;case"Time":E[p.name]=Math.floor(Math.random()*23)+":"+Math.floor(Math.random()*59)+":"+Math.floor(Math.random()*59);break;case"Guid":case"DateTimeOffset":break;default:E[p.name]=this._generateDataFromEntity(C[p.type],I)}}return E};c.prototype._generateDataFromEntitySet=function(e,E,C){var o=E[e.type];var m=[];for(var i=0;i<100;i++){m.push(this._generateDataFromEntity(o,i,C))}return m};c.prototype._generateMockdata=function(e,m){var t=this,r=this._getRootUri(),o={};var E=this._findEntityTypes(m);var C=this._findComplexTypes(m);q.each(e,function(a,b){o[a]=t._generateDataFromEntitySet(b,E,C);q.each(o[a],function(i,d){d.__metadata={uri:r+a+"("+t._createKeysString(b,d)+")",type:b.schema+"."+b.type};q.each(b.navprops,function(k,n){d[k]={__deferred:{uri:r+a+"("+t._createKeysString(b,d)+")/"+k}}})})});this._oMockdata=o};c.prototype._resolveNavigation=function(e,f,n){var E=this._mEntitySets[e];var N=E.navprops[n];if(!N){throw new Error("404")}var a=[];var p=N.from.propRef.length;if(p===0){if(N.to.multiplicity==="*"){return this._oMockdata[N.to.entitySet]}else{a.push(this._oMockdata[N.to.entitySet][0]);return a}}q.each(this._oMockdata[N.to.entitySet],function(I,t){var b=true;for(var i=0;i<p;i++){if(f[N.from.propRef[i]]!=t[N.to.propRef[i]]){b=false;break}}if(b){a.push(t)}});return a};c.prototype.simulate=function(m,a){var t=this;this._sMetadataUrl=m;this._sMockdataBaseUrl=a;this._refreshData();var G=function(e,k){var f;var E=t._mEntitySets[e];var K=E.keys;var d=k.split(',');if(d.length!==K.length||!t._isRequestedKeysValid(E,d)){return f}if(d.length===1&&!d[0].split('=')[1]){d=[K[0]+"="+d[0]]}q.each(t._oMockdata[e],function(I,o){for(var i=0;i<d.length;i++){var h=d[i].split('=');var j=t._trim(h[0]);if(q.inArray(j,K)===-1){return true}var n=t._trim(h[1]);var O=o[j];if(E.keysType[j]==="Edm.String"){n=n.replace(/^\'|\'$/g,'')}else if(E.keysType[j]==="Edm.DateTime"){O=t._getDateInMin(O)}if(O!==n){return true}}f={index:I,entry:o};return false});return f};var r=function(e,k,u){var S=e.name;if(u){var n=e.navprops[u]}if(n){S=n.to.entitySet}return S};var b=function(x,T,k,u){var e=JSON.parse(x.requestBody);if(e){if(k){var K=t._parseKeys(k);t._completeKey(t._mEntitySets[T],K,e)}t._enhanceWithMetadata(t._mEntitySets[T],[e]);return e}return null};var R=[];R.push({method:"GET",path:new RegExp(".*"),response:function(x){if(x.requestHeaders["x-csrf-token"]=="Fetch"){x.respond(200,{"X-CSRF-Token":"42424242424242424242424242424242"})}}});R.push({method:"GET",path:new RegExp("\\$metadata([?#].*)?"),response:function(x){q.sap.require("jquery.sap.xml");x.respond(200,{"Content-Type":"application/xml;charset=utf-8"},q.sap.serializeXML(t._oMetadata))}});R.push({method:"POST",path:new RegExp("\\$batch([?#].*)?"),response:function(x){var f=function(P){switch(P){case 200:return"200 OK";case 204:return"204 No Content";case 201:return"201 Created";case 400:return"400 Bad Request";case 404:return"404 Not Found";default:break}};var B=function(y){var P=JSON.stringify(y.data)||"";if(P=='null'){P=""}return"HTTP/1.1 "+f(y.statusCode)+"\r\nContent-Type: application/json\r\nContent-Length: "+P.length+"\r\ndataserviceversion: 2.0\r\n\r\n"+P+"\r\n"};var d=x.requestBody;var o=new RegExp("--batch_[a-z0-9-]*");var e=o.exec(d)[0];if(!!e){var h=[];var l=d.split(e);var S=x.url.split("$")[0];var n=new RegExp("PUT (.*) HTTP");var p=new RegExp("POST (.*) HTTP");var u=new RegExp("DELETE (.*) HTTP");var v=new RegExp("GET (.*) HTTP");for(var i=1;i<l.length-1;i++){var w=l[i];if(v.test(w)&&w.indexOf("multipart/mixed")==-1){if(n.test(w)||p.test(w)||u.test(w)){x.respond(400,null,"The Data Services Request could not be understood due to malformed syntax");return}var y=q.sap.sjax({url:S+v.exec(w)[1],dataType:"json"});h.push("\r\nContent-Type: application/http\r\n"+"Content-Length: "+B(y).length+"\r\n"+"content-transfer-encoding: binary\r\n\r\n"+B(y))}else{var C=[];var z=q.extend(true,{},t._oMockdata);var A=function(P,I,T){var y=q.sap.sjax({type:T,url:S+P.exec(H)[1],dataType:"json",data:I});if(y.statusCode==400||y.statusCode==404){var L="\r\nHTTP/1.1 "+f(y.statusCode)+"\r\nContent-Type: application/json\r\nContent-Length: 0\r\n\r\n";throw new Error(L)}C.push(B(y))};var E=w.substring(w.indexOf("boundary=")+9,w.indexOf("\r\n\r\n"));var F=w.split("--"+E);try{for(var j=1;j<F.length-1;j++){var H=F[j];if(v.test(H)){t._oMockdata=z;x.respond(400,null,"The Data Services Request could not be understood due to malformed syntax");return}else if(n.test(H)){var I=H.substring(H.indexOf("{"),H.lastIndexOf("}")+1).replace(/\\/g,'');A(n,I,'PUT')}else if(p.test(H)){var I=H.substring(H.indexOf("{"),H.lastIndexOf("}")+1).replace(/\\/g,'');A(p,I,'POST')}else if(u.test(H)){A(u,null,'DELETE')}}var J="\r\nContent-Type: multipart/mixed; boundary=ejjeeffe1\r\n\r\n--ejjeeffe1";for(var k=0;k<C.length;k++){J+="\r\nContent-Type: application/http\r\n"+"Content-Length: "+C[k].length+"\r\n"+"content-transfer-encoding: binary\r\n\r\n"+C[k]+"--ejjeeffe1"}J+="--\r\n";h.push(J)}catch(K){t._oMockdata=z;var L="\r\nContent-Type: application/http\r\n"+"Content-Length: "+K.message.length+"\r\n"+"content-transfer-encoding: binary\r\n\r\n"+K.message;h.push(L)}}}var N="--ejjeeffe0";for(var i=0;i<h.length;i++){N+=h[i]+"--ejjeeffe0"}N+="--";var O={'Content-Type':"multipart/mixed; boundary=ejjeeffe0"};x.respond(202,O,N)}else{x.respond(202)}}});q.each(this._mEntitySets,function(E,o){R.push({method:"GET",path:new RegExp("("+E+")/\\$count/?(.*)?"),response:function(x,E,u){x.respond(200,{"Content-Type":"text/plain;charset=utf-8"},""+t._oMockdata[E].length)}});R.push({method:"GET",path:new RegExp("("+E+")/?(\\?\\$((filter|skip|top|orderby|select|inlinecount|expand)=(.*)))?"),response:function(x,E,u){var d=t._oMockdata[E];if(d){var f={results:q.extend(true,[],d)};if(u){var U=u.replace("?","&").replace(/\$/g,'').split("&");if(U.length>1){U=t._orderQueryOptions(U)}try{q.each(U,function(i,Q){t._applyQueryOnCollection(f,Q,E)})}catch(e){x.respond(parseInt(e.message||e.number,10));return}}x.respond(200,{"Content-Type":"application/json;charset=utf-8"},JSON.stringify({d:f}))}else{x.respond(404)}}});R.push({method:"GET",path:new RegExp("("+E+")\\(([^/\\?#]+)\\)/?(\\?\\$((filter|skip|top|orderby|select|inlinecount|expand)=(.*)))?"),response:function(x,E,k,u){var d=q.extend(true,{},G(E,k));if(!q.isEmptyObject(d)){if(u){var U=u.replace("?","&").replace(/\$/g,'').split("&");if(U.length>1){U=t._orderQueryOptions(U)}try{q.each(U,function(i,Q){d.entry=t._applyQueryOnEntry(d.entry,Q,E)})}catch(e){x.respond(parseInt(e.message||e.number,10));return}}x.respond(200,{"Content-Type":"application/json;charset=utf-8"},JSON.stringify({d:d.entry}))}else{x.respond(404)}}});q.each(o.navprops,function(n,N){R.push({method:"GET",path:new RegExp("("+E+")\\(([^/\\?#]+)\\)/("+n+")/\\$count/?(.*)?"),response:function(x,E,k,d,u){var e=G(E,k);if(e){var f=t._resolveNavigation(E,e.entry,d);x.respond(200,{"Content-Type":"text/plain;charset=utf-8"},""+f.length)}else{x.respond(404)}}});R.push({method:"GET",path:new RegExp("("+E+")\\(([^/\\?#]+)\\)/("+n+")/?(\\?\\$((filter|skip|top|orderby|select|inlinecount|expand)=(.*)))?"),response:function(x,E,k,d,u){var f=G(E,k);if(f){var h,F={};try{h=t._resolveNavigation(E,f.entry,d);if(h){var i=t._mEntitySets[E].navprops[d].to.multiplicity;if(i==="*"){F={results:q.extend(true,[],h)}}else{F=q.extend(true,{},h[0])}if(u){var U=u.replace("?","&").replace(/\$/g,'').split("&");if(U.length>1){U=t._orderQueryOptions(U)}if(i==="*"){q.each(U,function(I,Q){t._applyQueryOnCollection(F,Q,t._mEntitySets[E].navprops[d].to.entitySet)})}else{q.each(U,function(I,Q){F=t._applyQueryOnEntry(F,Q,t._mEntitySets[E].navprops[d].to.entitySet)})}}}x.respond(200,{"Content-Type":"application/json;charset=utf-8"},JSON.stringify({d:F}));return}catch(e){x.respond(parseInt(e.message||e.number,10));return}}x.respond(404)}})});R.push({method:"POST",path:new RegExp("("+E+")(\\(([^/\\?#]+)\\)/?(.*)?)?"),response:function(x,E,d,k,n){var e=null;var f=null;var i=405;var T=r(o,k,n);if(T){var h=b(x,T,k,n);if(h){var u=t._getRootUri()+T+"("+t._createKeysString(t._mEntitySets[T],h)+")";e=JSON.stringify({d:h,uri:u});f={"Content-Type":"application/json;charset=utf-8"};t._oMockdata[T]=t._oMockdata[T].concat([h]);i=201}}x.respond(i,f,e)}});R.push({method:"PUT",path:new RegExp("("+E+")\\(([^/\\?#]+)\\)/?(.*)?"),response:function(x,E,k,n){var i=405;var d=null;var e=null;var T=r(o,k,n);if(T){var f=b(x,T,k,n);if(f){var u=t._getRootUri()+T+"("+t._createKeysString(t._mEntitySets[T],f)+")";e={"Content-Type":"application/json;charset=utf-8"};var h=G(E,k);if(h){t._oMockdata[E][h.index]=f}else{t._oMockdata[T]=t._oMockdata[T].concat([f])}i=204}}x.respond(i,e,d)}});R.push({method:"DELETE",path:new RegExp("("+E+")\\(([^/\\?#]+)\\)/?(.*)?"),response:function(x,E,k,u){var i=200;var e=G(E,k);if(e){t._oMockdata[E].splice(e.index,1)}else{i=400}x.respond(i,null,null)}})});this.setRequests(R)};c.prototype._orderQueryOptions=function(u){var f,i,S,t,o,a,e,O=[];q.each(u,function(I,Q){switch(Q.split('=')[0]){case"top":t=q.inArray(Q,u);break;case"skip":S=q.inArray(Q,u);break;case"orderby":o=q.inArray(Q,u);break;case"filter":f=q.inArray(Q,u);break;case"select":a=q.inArray(Q,u);break;case"inlinecount":i=q.inArray(Q,u);break;case"expand":e=q.inArray(Q,u);break}});if(f>=0)O.push(u[f]);if(i>=0)O.push(u[i]);if(S>=0)O.push(u[S]);if(t>=0)O.push(u[t]);if(a>=0)O.push(u[a]);if(o>=0)O.push(u[o]);if(e>=0)O.push(u[e]);return O};c.prototype._removeAllRequestHandlers=function(){var r=this.getRequests();var l=r.length;for(var i=0;i<l;i++){c._removeResponse(r[i].response)}};c.prototype._removeAllFilters=function(){for(var i=0;i<this._aFilters.length;i++){c._removeFilter(this._aFilters[i])}this._aFilters=null};c.prototype._addRequestHandler=function(m,p,r){m=m?m.toUpperCase():m;if(typeof m!=="string"){throw new Error("Error in request configuration: value of 'method' has to be a string")}if(!(typeof p==="string"||p instanceof RegExp)){throw new Error("Error in request configuration: value of 'path' has to be a string or a regular expression")}if(typeof r!=="function"){throw new Error("Error in request configuration: value of 'response' has to be a function")}var u=this._getRootUri();u=u&&new RegExp(this._escapeStringForRegExp(u));if(p&&!(p instanceof RegExp)){p=new RegExp(this._createRegExpPattern(p))}var R=this._createRegExp(u?u.source+p.source:p.source);this._addFilter(this._createFilter(m,R));this._oServer.respondWith(m,R,r);q.sap.log.debug("MockServer: adding "+m+" request handler for pattern "+R)};c.prototype._createRegExp=function(p){return new RegExp("^"+p+"$")};c.prototype._createRegExpPattern=function(p){return p.replace(/:([\w\d]+)/g,"([^\/]+)")};c.prototype._escapeStringForRegExp=function(S){return S.replace(/[\\\/\[\]\{\}\(\)\-\*\+\?\.\^\$\|]/g,"\\$&")};c.prototype._trim=function(S){return S&&S.replace(/^\s+|\s+$/g,"")};c.prototype._getDateInMin=function(S){if(!S)return;return"datetime'"+new Date(Number(S.replace("/Date(",'').replace(")/",''))).toJSON().substring(0,19)+"'"};c.prototype._addFilter=function(f){this._aFilters.push(f);c._addFilter(f)};c.prototype._createFilter=function(r,R){return function(m,u,a,U,p){return r===m&&R.test(u)}};c.prototype.destroy=function(S){M.prototype.destroy.apply(this,arguments);this.stop();var a=c._aServers;var i=q.inArray(this,a);a.splice(i,1)};c._aFilters=[];c._oServer=null;c._aServers=[];c._getInstance=function(){if(!this._oServer){this._oServer=window.sinon.fakeServer.create();this._oServer.autoRespond=true}return this._oServer};c.config=function(C){var S=this._getInstance();S.autoRespond=C.autoRespond===false?false:true;S.autoRespondAfter=C.autoRespondAfter||0;S.fakeHTTPMethods=C.fakeHTTPMethods||false};c.respond=function(){this._getInstance().respond()};c.startAll=function(){for(var i=0;i<this._aServers.length;i++){this._aServers[i].start()}};c.stopAll=function(){for(var i=0;i<this._aServers.length;i++){this._aServers[i].stop()}this._getInstance().restore();this._oServer=null};c.destroyAll=function(){this.stopAll();for(var i=0;i<this._aServers.length;i++){this._aServers[i].destroy()}};c._addFilter=function(f){this._aFilters.push(f)};c._removeFilter=function(f){var i=q.inArray(f,this._aFilters);if(i!==-1){this._aFilters.splice(i,1)}return i!==-1};c._removeResponse=function(r){var R=this._oServer.responses;var l=R.length;for(var i=0;i<l;i++){if(R[i].response===r){R.splice(i,1);return true}}return false};window.sinon.FakeXMLHttpRequest.useFilters=true;window.sinon.FakeXMLHttpRequest.addFilter(function(m,u,a,U,p){var f=c._aFilters;for(var i=0;i<f.length;i++){var F=f[i];if(F(m,u,a,U,p)){return false}}return true});var g=function(f){if(/.*\.json$/i.test(f)){return"JSON"}if(/.*\.xml$/i.test(f)){return"XML"}if(/.*metadata$/i.test(f)){return"XML"}return null};window.sinon.FakeXMLHttpRequest.prototype.respondFile=function(S,h,f){var r=q.sap.sjax({url:f,dataType:"text"});if(!r.success)throw new Error("Could not load file from: "+f);var d=r.data;var m=g(f);if(this["respond"+m]){this["respond"+m](S,h,d)}else{this.respond(S,h,d)}};window.sinon.FakeXMLHttpRequest.prototype.respondJSON=function(S,h,j){h=h||{};h["Content-Type"]=h["Content-Type"]||"application/json";this.respond(S,h,typeof j==="string"?j:JSON.stringify(j))};window.sinon.FakeXMLHttpRequest.prototype.respondXML=function(S,h,x){h=h||{};h["Content-Type"]=h["Content-Type"]||"application/xml";this.respond(S,h,x)};sap.ui.core.util.MockServer=c})(jQuery,sap.ui.Device,sap.ui.base.ManagedObject,window.sinon);
