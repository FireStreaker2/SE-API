const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send(
		"<script>window.location.href = 'https://github.com/FireStreaker2/SE-API'</script>"
	);
});

app.get("/bing/:query", async (req, res) => {
	const query = req.params.query;
	await axios
		.get(
			`https://www.bing.com/AS/Suggestions?pt=page.chrometab&mkt=en-us&qry=${query}&cvid=727`
		)
		.then((response) => {
			let results = [];
			let match;
			let regex = />([^<]+)<\/span>/g;
			let data = response.data;
			data = data.replace(/<strong>/g, "");
			data = data.replace(/<\/strong>/g, "");

			while ((match = regex.exec(data)) !== null) {
				results.push(match[1]);
			}

			res.json({ Results: results });
		})
		.catch((error) => {
			console.error(error);
			res.json({ Status: 500, Message: "Internal Server Error" });
		});
});

app.listen(port, () => {
	console.log(`App is running at http://localhost:${port}`);
});
