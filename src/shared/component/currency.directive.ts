import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive( {
    selector: '[currency]'
} )
export class CurrencyDirective {
    // Allow decimal numbers and negative values
    private regex: RegExp = new RegExp( /^-?[0-9]+(\.[0-9]{0,2})?$/ );

    // Allow key codes for special events. Reflect :
    // Backspace, Tab, End, Home, Delete, Arrows
    private specialKeys: Array<string> = [ 'Del', 'Delete', 'ArrowRight', 'Right', 'ArrowLeft', 'Left', 'Backspace', 'Tab', 'End', 'Home' ];

    constructor( private el: ElementRef ) {
    }

    @HostListener( 'keydown', [ '$event' ] )
    onKeyDown( event: KeyboardEvent ) {

        if ( this.specialKeys.indexOf( event.key ) !== -1 ) {
            return;
        }

        const caretPos = this.el.nativeElement.selectionStart;
        const current: string = this.el.nativeElement.value;

        const next: string = current.slice( 0, caretPos ) + event.key + current.slice( caretPos );
        if ( next && !String( next ).match( this.regex ) ) {
            event.preventDefault();
        }
    }
}
