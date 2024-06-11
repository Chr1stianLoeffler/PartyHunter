// @ts-nocheck
import type { PageLoad } from './$types';

export const load = async ({ fetch }: Parameters<PageLoad>[0]) => {
<<<<<<< HEAD
    console.log("Hello World")
=======
>>>>>>> 66367344da65412c629232627e2b3af1b2f64837
    const response = await fetch('/api/events', {method: 'GET'});
    const events = await response.json();

    return {
        events
    };
};
