const profile = JSON.parse(document.getElementById('profile').dataset.data);
const postMessageUrlList = JSON.parse(
	JSON.parse(document.getElementById('post-message-url-list').dataset.data)
);

postMessageUrlList.forEach((url) => {
	window.opener.postMessage(
		{
			profile,
			accessToken,
			refreshToken,
		},
		url
	);
});
