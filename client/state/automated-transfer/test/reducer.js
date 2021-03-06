/** @format */

/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { transferStates } from '../constants';
import { status } from '../reducer';
import { AUTOMATED_TRANSFER_ELIGIBILITY_UPDATE as ELIGIBILITY_UPDATE } from 'state/action-types';

describe( 'state', () => {
	describe( 'automated-transfer', () => {
		describe( 'reducer', () => {
			describe( 'eligibility', () => {
				const update = { type: ELIGIBILITY_UPDATE };

				test( 'should set inquiring status when first polling eligibility', () => {
					expect( status( null, update ) ).to.equal( transferStates.INQUIRING );
				} );

				test( 'should not overwrite the status when a valid state already exists', () => {
					expect( status( transferStates.START, update ) ).to.equal( transferStates.START );
				} );
			} );
		} );
	} );
} );
