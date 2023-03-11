import { derived, writable } from 'svelte/store';

export const duration = writable( 86 );

export const minutes = derived(
	duration,
	$duration => $duration % 60
);

export const hours = derived(
	duration,
	$duration => Math.floor( $duration / 60 ) % 24
);

export const days = derived(
	duration,
	$duration => Math.floor( $duration / ( 60 * 24 ) )
);