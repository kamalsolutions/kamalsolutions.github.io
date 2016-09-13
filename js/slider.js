function TiltSlider( el, options ) {
	this.el = el;
	// available effects for the animations (animation class names) - when an item comes in or goes out
	this.animEffectsOut = ['moveUpOut','moveDownOut','slideUpOut','slideDownOut','slideLeftOut','slideRightOut'];
	this.animEffectsIn = ['moveUpIn','moveDownIn','slideUpIn','slideDownIn','slideLeftIn','slideRightIn'];
	// the items
	this.items = this.el.querySelector( 'ol.slides' ).children;
	// total number of items
	this.itemsCount = this.items.length;
	if( !this.itemsCount ) return;
	// index of the current item
	this.current = 0;
	this.options = extend( {}, this.options );
	extend( this.options, options );
	this._init();
}


TiltSlider.prototype._initEvents = function() {
	var self = this;
	// show a new item when clicking the navigation "dots"
	this.navDots.forEach( function( dot, idx ) {
		dot.addEventListener( 'click', function() {
			if( idx !== self.current ) {
				self._showItem( idx );
			}
		} );
	} );
}


TiltSlider.prototype._showItem = function( pos ) {
	if( this.isAnimating ) {
		return false;
	}
	this.isAnimating = true;

	classie.removeClass( this.navDots[ this.current ], 'current' );

	var self = this,
		// the current item
		currentItem = this.items[ this.current ];

	this.current = pos;

	// next item to come in
	var nextItem = this.items[ this.current ],
		// set random effects for the items
		outEffect = this.animEffectsOut[ Math.floor( Math.random() * this.animEffectsOut.length ) ],
		inEffect = this.animEffectsIn[ Math.floor( Math.random() * this.animEffectsOut.length ) ];

	currentItem.setAttribute( 'data-effect-out', outEffect );
	nextItem.setAttribute( 'data-effect-in', inEffect );

	classie.addClass( this.navDots[ this.current ], 'current' );

	var cntAnims = 0,
		// the number of elements that actually animate inside the current item
		animElemsCurrentCount = currentItem.querySelector( '.tiltview' ).children.length, 
		// the number of elements that actually animate inside the next item
		animElemsNextCount = nextItem.querySelector( '.tiltview' ).children.length,
		// keep track of the number of animations that are terminated
		animEndCurrentCnt = 0, animEndNextCnt = 0,
		// check function for the end of each animation
		isFinished = function() {
			++cntAnims;
			if( cntAnims === 2 ) {
				self.isAnimating = false;
			}
		},
		// function for the end of the current item animation
		onEndAnimationCurrentItem = function() {
			++animEndCurrentCnt;
			var endFn = function() {
				classie.removeClass( currentItem, 'hide' );
				classie.removeClass( currentItem, 'current' );
				isFinished();
			};

			if( !isSupported ) {
				endFn();
			}
			else if( animEndCurrentCnt === animElemsCurrentCount ) {
				currentItem.removeEventListener( animEndEventName, onEndAnimationCurrentItem );
				endFn();
			}
		},
		// function for the end of the next item animation
		onEndAnimationNextItem = function() {
			++animEndNextCnt;
			var endFn = function() {
				classie.removeClass( nextItem, 'show' );
				classie.addClass( nextItem, 'current' );
				isFinished();
			};

			if( !isSupported ) {
				endFn();
			}
			else if( animEndNextCnt === animElemsNextCount ) {
				nextItem.removeEventListener( animEndEventName, onEndAnimationNextItem );
				endFn();
			}
		};

	if( isSupported ) {
		currentItem.addEventListener( animEndEventName, onEndAnimationCurrentItem );
		nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
	}
	else {
		onEndAnimationCurrentItem();
		onEndAnimationNextItem();
	}

	classie.addClass( currentItem, 'hide' );
	classie.addClass( nextItem, 'show' );
}