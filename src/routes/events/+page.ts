import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    console.log("Hello World")
    const response = await fetch('/api/events', {method: 'GET'});
    const events = await response.json();

    return {
        events
    };
};
