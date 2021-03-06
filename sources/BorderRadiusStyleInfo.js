/**
 * Handles parsing, caching, and detecting changes to border-radius CSS
 * @constructor
 * @param {Element} el the target element
 */
(function() {

PIE.BorderRadiusStyleInfo = PIE.StyleInfoBase.newStyleInfo( {

    cssProperty: 'border-radius',
    styleProperty: 'borderRadius',

    parseCss: function( css ) {
        var p = null, x, y,
            tokenizer, token, length,
            hasNonZero = false;

        function newLength( v ) {
            return new PIE.Length( v );
        }

        if( css ) {
            tokenizer = new PIE.Tokenizer( css );

            function collectLengths() {
                var arr = [], num;
                while( ( token = tokenizer.next() ) && token.isLengthOrPercent() ) {
                    length = newLength( token.value );
                    num = length.getNumber();
                    if( num < 0 ) {
                        return null;
                    }
                    if( num > 0 ) {
                        hasNonZero = true;
                    }
                    arr.push( length );
                }
                return arr.length > 0 && arr.length < 5 ? {
                        'tl': arr[0],
                        'tr': arr[1] || arr[0],
                        'br': arr[2] || arr[0],
                        'bl': arr[3] || arr[1] || arr[0]
                    } : null;
            }

            // Grab the initial sequence of lengths
            if( x = collectLengths() ) {
                // See if there is a slash followed by more lengths, for the y-axis radii
                if( token ) {
                    if( token.type & PIE.Tokenizer.Type.OPERATOR && token.value === '/' ) {
                        y = collectLengths();
                    }
                } else {
                    y = x;
                }

                // Treat all-zero values the same as no value
                if( hasNonZero && x && y ) {
                    p = { x: x, y : y };
                }
            }
        }

        return p;
    }
} );

var ZERO = PIE.Length.ZERO,
    zeros = { 'tl': ZERO, 'tr': ZERO, 'br': ZERO, 'bl': ZERO };
PIE.BorderRadiusStyleInfo.ALL_ZERO = { x: zeros, y: zeros };

})();