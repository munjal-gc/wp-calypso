/** @format */

/**
 * External dependencies
 */
import { assign } from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import passToChildren from '../';

/**
 * Module variables
 */
var DUMMY_PROPS = { data: [ 1, 2, 3 ] },
	PassThrough;

PassThrough = React.createClass( {
	render: function() {
		return passToChildren( this, DUMMY_PROPS );
	},
} );

describe( 'index', () => {
	var renderer;

	beforeEach( () => {
		renderer = TestUtils.createRenderer();
	} );

	test( 'should accept a single child and pass along props', () => {
		var result;

		renderer.render(
			<PassThrough>
				<div />
			</PassThrough>
		);
		result = renderer.getRenderOutput();

		expect( result.type ).to.equal( 'div' );
		expect( result.props ).to.eql( DUMMY_PROPS );
	} );

	test( 'should accept multiple children and wrap them in a div', () => {
		var result;

		renderer.render(
			<PassThrough>
				<div />
				<div />
			</PassThrough>
		);
		result = renderer.getRenderOutput();

		expect( React.Children.count( result ) ).to.equal( 1 );
		expect( result.type ).to.eql( 'div' );
		expect( React.Children.count( result.props.children ) ).to.equal( 2 );
	} );

	test( 'should accept multiple children and pass along props to each', done => {
		var result;

		renderer.render(
			<PassThrough>
				<div />
				<div />
			</PassThrough>
		);
		result = renderer.getRenderOutput();

		React.Children.forEach( result.props.children, function( child, i ) {
			expect( child.type ).to.equal( 'div' );
			expect( child.props ).to.eql( DUMMY_PROPS );

			if ( 1 === i ) {
				done();
			}
		} );
	} );

	test( 'should accept multiple children, including nulls', () => {
		var result;

		renderer.render(
			<PassThrough>
				{ null }
				<div />
			</PassThrough>
		);
		result = renderer.getRenderOutput();

		expect( React.Children.count( result.props.children ) ).to.equal( 1 );
		expect( React.Children.toArray( result.props.children )[ 0 ].props ).to.eql( DUMMY_PROPS );
	} );

	test( 'should preserve props passed to the children', () => {
		var result;

		renderer.render(
			<PassThrough>
				<div data-preserve />
			</PassThrough>
		);
		result = renderer.getRenderOutput();

		expect( result.type ).to.equal( 'div' );
		expect( result.props ).to.eql(
			assign( {}, DUMMY_PROPS, {
				'data-preserve': true,
			} )
		);
	} );

	test( 'should preserve props passed to the instance itself', () => {
		var result;

		renderer.render(
			<PassThrough data-preserve>
				<div />
			</PassThrough>
		);
		result = renderer.getRenderOutput();

		expect( result.type ).to.equal( 'div' );
		expect( result.props ).to.eql(
			assign( {}, DUMMY_PROPS, {
				'data-preserve': true,
			} )
		);
	} );
} );
