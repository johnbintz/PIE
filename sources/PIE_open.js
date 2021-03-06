var PIE = window['PIE'];

if( !PIE ) {
    PIE = window['PIE'] = {
        CSS_PREFIX: '-pie-',
        STYLE_PREFIX: 'Pie',
        CLASS_PREFIX: 'pie_'
    };

    // Detect IE6
    if( !window.XMLHttpRequest ) {
        PIE.isIE6 = true;

        // IE6 can't access properties with leading dash, but can without it.
        PIE.CSS_PREFIX = PIE.CSS_PREFIX.replace( /^-/, '' );

        // Regex object for removing pie_hover className
        PIE.hoverClassRE = new RegExp( '\\b' + PIE.CLASS_PREFIX + 'hover\\b', 'g' );
    }

    // Detect IE8
    PIE.ie8DocMode = element.document.documentMode;
    PIE.isIE8 = !!PIE.ie8DocMode;
