/**
 * Copyright 2017 appero GmbH
 * All rights reserved.
 *
 * creationDate: Dec 19, 2016
 * author: hschmidt
 */
({
    /**
     * Starts inital component rendering right after init event is fired
     */
    render : function(component, helper) {
        return this.superRender();
    },

    /**
     * Called after DOM tree has been initially rendered
     */
    afterRender : function(component, helper) {
        this.superAfterRender();
    },

    /**
     * Checks if any components are dirty to invoke a re-render
     */
    rerender : function(component, helper) {
        this.superRerender();
    },

    /**
     * Called when components are going to unrender
     */
    unrender : function(component, helper) {
        this.superUnrender();
    }
})