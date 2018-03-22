'use strict';
// console.log( 'app started' );

var $cards = $( '#cards' );

$cards.on( 'click', '.card__swatch', function() {
	var $this = $( this );
	colours.switchMode( $this );
});

$( '#switch' ).on('change', '[name="switch_mode"]', function() {
	var val = $( this ).val();
	colours.switchAll( val );
});


var colours = (function( $ ) {

	var modes = ['hex', 'rgb', 'hsl'];
	var length = modes.length;

	function getBrightness() {

		var $swatches = $cards.find( '.card__swatch' );
		$swatches.each(function(index, el) {
			var $el = $( el );
			var hsl = $el.next( '.inputs' )
				.find( '[data-format="hsl"]' )
				.val()
				.replace( '%)', '' )
				.split(',');
			// $el.attr( 'brightness', hsl[2] );
			if ( hsl[2] >= 85 ) {
				$el.addClass( 'pale' );
				// $el.attr( 'data-bright', true );
			} else {
				// $el.attr( 'data-bright', false );
			}
		});

	}

	function switchAll( val ) {

		var $swatches = $cards.find( '.card__swatch' );
		$swatches.each(function(index, el) {
			$( el ).attr('data-colourmode', val);
		});

	}

	function switchMode( $el ) {
		var currentMode = $el.attr('data-colourmode');
		var index = modes.indexOf(currentMode);
		// console.log('length: ' + length);
		// console.log('index: ' + index);
		if ( index === (length - 1) ) {
			// console.log('index matches last item in array');
			$el.attr('data-colourmode', modes[0]);
		} else {
			// console.log('nope');
			$el.attr('data-colourmode', modes[index + 1]);
		}

	}

	return {
		getBrightness: getBrightness,
		switchAll: switchAll,
		switchMode: switchMode
	}

})( jQuery );


var view = (function( $ ) {

	function render( data ) {

		// console.log( data.palettes );
		var $colours = $( '#cards' );
		var cardsTemplate = $( '#cardsTemplate' ).html();

		/*
		for (var i = 0; i < data.palettes.length; i++) {
			console.log( data.palettes[i] );
		}
		*/

		// Render mustache template
		$colours.html( Mustache.render(
			cardsTemplate,
			{ data: data.palettes }
		) );

		// trigger function to identify pale colours
		colours.getBrightness();

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
