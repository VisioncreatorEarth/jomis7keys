/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Redirect www to root domain
	const url = new URL(event.request.url);
	if (url.hostname === 'www.quantensprung.ist') {
		return new Response(null, {
			status: 301,
			headers: {
				Location: `https://quantensprung.ist${url.pathname}${url.search}`
			}
		});
	}

	return await resolve(event);
}
