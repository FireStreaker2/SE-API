![SE-API](https://socialify.git.ci/FireStreaker2/SE-API/image?description=1&forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Dark)

# About
SE-API is a way for developers to get custom search results, powered by existing search engines. It works by reverse-engineering the actual endpoints used on the official sites, and putting them in their own seperate express route.

# Usage
Base URL: ``https://se-api.firestreaker2.gq``

Available Routes
| Route                  | Accepts  |
-------------------------|----------|
| /bing/{query}          | string   |
| /baidu/{query}         | string   |
| /brave/{query}         | string   |
| /duckduckgo/{query}    | string   |
| /ecosia/{query}        | string   |
| /google/{query}        | string   |
| /yahoo/{query}         | string   |
| /yandex/{query}        | string   |

> For spacing, you can either use a ``+`` or a ``%20``, either works fine for all routes


# Example
JavaScript
```js
const apiUrl = "https://se-api.firestreaker2.gq/google/who+is%20gawr+gu";

// Make a GET request to the API
fetch(apiUrl)
	.then((response) => {
		// Check if the request was successful (status code 200)
		if (response.ok) {
			// Parse the response body as JSON
			return response.json();
		} else {
			// If the request was not successful, handle the error
			throw new Error(`Request failed with status: ${response.status}`);
		}
	})
	.then((data) => {
		// Print the response data
		console.log("Response:", data);
	})
	.catch((error) => {
		// Handle any errors that occurred during the request
		console.error("Error:", error);
	});
```

Response:
```json
{
  "Results": [
    "who is gawr gura",
    "who is gawr gura irl",
    "who is gawr gura dating",
    "who is gawr gura voice actor",
    "what is gawr gura nationality",
    "what is gawr gura net worth",
    "what is gawr gura favorite food",
    "who was gawr gura before hololive",
    "who plays gawr gura",
    "what country is gawr gura from"
  ]
}
```

# Selfhosting
If you would like to selfhost this project, you may.
```bash
$ git clone https://github.com/FireStreaker2/SE-API.git
$ cd SE-API
$ npm i
$ npm start
```

# License
[MIT](https://github.com/FireStreaker2/SE-API/blob/main/LICENSE)