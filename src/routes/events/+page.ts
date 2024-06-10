import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const response = await fetch('/api/events', {method: 'GET'});
    const events = await response.json();

    return {
        events
    };
};
