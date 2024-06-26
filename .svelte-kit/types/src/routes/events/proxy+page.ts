// @ts-nocheck
import type { PageLoad } from './$types';

export const load = async ({ fetch }: Parameters<PageLoad>[0]) => {
    console.log("Hello World")
    const response = await fetch('/api/events', {method: 'GET'});
    const events = await response.json();

    return {
        events
    };
};
