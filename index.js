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
	await axios
		.get(
			`https://www.bing.com/AS/Suggestions?pt=page.chrometab&mkt=en-us&qry=${req.params.query}&cvid=727`
		)
		.then((response) => {
			const data = response.data.replace(/<\/?strong>/g, "");

			const results = Array.from(
				data.matchAll(/>([^<]+)<\/span>/g),
				(match) => match[1]
			);

			res.json({ Results: results });
		})
		.catch((error) => {
			console.error(error);
			res.json({ Status: 500, Message: "Internal Server Error" });
		});
});

app.get("/brave/:query", async (req, res) => {
	await axios
		.get(`https://search.brave.com/api/suggest?q=${req.params.query}`)
		.then((response) => {
			const data = response.data[1];

			res.json({ Results: data });
		})
		.catch((error) => {
			console.error(error);
			res.json({ Status: 500, Message: "Internal Server Error" });
		});
});

app.get("/duckduckgo/:query", async (req, res) => {
	await axios
		.get(`https://duckduckgo.com/ac/?q=${req.params.query}&kl=wt-wt`)
		.then((response) => {
			const data = response.data;
			const results = [];

			data.forEach((item) => {
				results.push(item.phrase);
			});

			res.json({ Results: results });
		})
		.catch((error) => {
			console.error(error);
			res.json({ Status: 500, Message: "Internal Server Error" });
		});
});

app.get("/yahoo/:query", async (req, res) => {
	await axios
		.get(
			`https://search.yahoo.com/sugg/gossip/gossip-us-fastbreak/?pq=&command=${req.params.query}&output=sd1`
		)
		.then((response) => {
			const data = response.data;

			const results = data.r.filter((item) => item.k).map((item) => item.k);

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
