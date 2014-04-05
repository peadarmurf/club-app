/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.RadioButtonRenderer");jQuery.sap.require("sap.ui.core.ValueStateSupport");sap.m.RadioButtonRenderer={};
sap.m.RadioButtonRenderer.render=function(r,R){if(!R.getVisible()){return}var e=R.getEnabled();var t=e?0:-1;var b=false;r.addClass("sapMRb");if(e){r.addClass("sapMPointer")}r.write("<div");r.writeControlData(R);r.writeAccessibilityState(R,{role:"radio",checked:R.getSelected()===true,disabled:!e});if(R.getSelected()){r.addClass("sapMRbSel")}if(!e){b=true;r.addClass("sapMRbDis")}r.writeClasses();r.writeAttribute("tabIndex","-1");var T=sap.ui.core.ValueStateSupport.enrichTooltip(R,R.getTooltip_AsString());if(T){r.writeAttributeEscaped("title",T)}r.write(">");r.write("<div class='sapMRbB'");r.writeAttribute("id",R.getId()+"-Button");r.writeAttribute("tabindex",R.hasOwnProperty("_iTabIndex")?R._iTabIndex:t);r.write(">");r.write("<div");r.addClass("sapMRbBOut");if(e&&sap.ui.Device.system.desktop){r.addClass("sapMRbHoverable")}r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMRbBInn");r.writeClasses();r.write(">");r.write("<input type='radio' tabindex='-1'");r.writeAttribute("id",R.getId()+"-RB");r.writeAttributeEscaped("name",R.getGroupName());if(R.getSelected()){r.writeAttribute("checked","checked")}if(!e){r.writeAttribute("disabled","disabled")}if(b){r.writeAttribute("readonly","readonly");r.writeAttribute("disabled","disabled")}r.write(" />");r.write("</div></div>");r.write("</div>");r.renderControl(R._oLabel);r.write("</div>")};
