export default async function handler(req, res) {
	const { musicname } = req.query;

	try {
		const response = await fetch(
			"http://127.0.0.1:8000/music/scrap/?query=" + musicname
		);
		const data = await response.json();
		res.status(200).json({
			detail: data.status,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
