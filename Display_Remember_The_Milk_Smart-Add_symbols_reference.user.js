// ==UserScript==
// @name           Display Remember The Milk Smart-Add symbols reference
// @namespace      amaisaeta.seesaa.net
// @description    Display the Remember The Milk's smart-add symbols under the task input field.
// @match          *://www.rememberthemilk.com/*
// @version        1.00.20120330
// @license        MIT License; http://www.opensource.org/licenses/mit-license.php
// ==/UserScript==

(function() {
	// Reference block's ID.
	const id = 'amaisaeta-rememberthemilk-smartadd-symbols-ref-list';

	var addBox = document.getElementById('add-box');
	if(!addBox) return 0;	// not tasklist.

	addStyles();
	addBox.appendChild(createRefList());

	function createRefList() {
		// Get hidden Smart-Adds Reference HTML-elements.
		const origin = document.getElementById('smartadd-cheat').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
		const originKeys   = origin.getElementsByClassName('smartadd-col1');
		const originValues = origin.getElementsByClassName('smartadd-col2');

		// Insert
		var csheet = document.createElement('dl');
		csheet.id = id;
		for(var i = 0; i < originKeys.length; ++i) {
			let appendChild = function(elem, childElemName, txt) {
				elem.appendChild(document.createElement(childElemName))
					.appendChild(document.createTextNode(txt));
			}

			appendChild(csheet, 'dt', originKeys[i].innerHTML);
			appendChild(csheet, 'dd', originValues[i].innerHTML);
		}
		return csheet;
	}

	function addStyles() {
		var elem = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
		elem.type = 'text/css';
		addRule(elem, '#'+id, '{ display: block; color: grey; mergin-left: 1em; }');
		addRule(elem, '#'+id+'>dt', '{ display: inline-block; padding-right: 0.5em; font-weight: bold; }');
		addRule(elem, '#'+id+'>dd', '{ display: inline-block; padding-right: 1.5em; }');
		addRule(elem, '#'+id+'>dd:after', '{ content: ","; }');
		addRule(elem, '#'+id+'>dd:last-child:after', '{ content: ""; }');

		function addRule(styleElem, selector, rule) styleElem.sheet.insertRule(selector + rule, styleElem.sheet.cssRules.length);
	}
})();
