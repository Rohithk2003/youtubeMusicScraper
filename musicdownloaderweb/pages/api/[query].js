// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const AutoComplete = require("youtube-autocomplete");

export default async function handler(req, res) {
	const { query } = req.query;

	try {
		const response = await fetch(
			"http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
				query
		);
		const data = await response.json();
		res.status(200).json({
			detail: data[1],
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
