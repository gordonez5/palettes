'use strict';
console.log( 'app started' );

var $cards = $( '#cards' );

$cards.on('click', '.card__swatch', function( e ) {
	e.preventDefault();
	var $this = $( this );
	$this.toggleClass( 'hide-rgb' );
});


var view = (function( $ ) {

	function render( data ) {

		console.log( data.palettes );
		var $colours = $( '#cards' );
		var cardsTemplate = $( '#cardsTemplate' ).html();

		for (var i = 0; i < data.palettes.length; i++) {
			console.log( data.palettes[i] );
		}

		$colours.html( Mustache.render(
			cardsTemplate,
			{ data: data.palettes }
		) );

	}

	function toggle() {

		// $( '.cardgroup' ).removeClass( 'active' );
		$cards.on('click', '.cardgroup h2', function() {
			$( this ).parent( '.cardgroup' ).toggleClass( 'active' );
		});

	}

	return {
		render: render,
		toggle: toggle
	}

})( jQuery );


var ajax = (function( $ ) {

	function get( site ) {

		var xhr = new XMLHttpRequest();
		var url = './palettes.json';
		xhr.open('GET', url, true);
		// xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				view.render( data );
				view.toggle();
			}
		}
		xhr.send();
	}

	return {
		get: get
	}

})( jQuery );
