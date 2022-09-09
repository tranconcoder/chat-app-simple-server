const dataElement = document.getElementById('data');

const profile = JSON.parse(dataElement.dataset.profile);
const accessToken = dataElement.dataset.accessToken;
const refreshToken = dataElement.dataset.refreshToken;
const postMessageUrlList = JSON.parse(dataElement.dataset.postMessageUrlList);

for (const url of postMessageUrlList) {
	window.opener.postMessage(
		{
			profile,
			accessToken,
			refreshToken,
		},
		url
	);
}
