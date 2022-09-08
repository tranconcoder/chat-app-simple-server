const profile = JSON.parse(document.getElementById('profile').dataset.profile);

console.log(profile);
console.log(postMessageUrlList);

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
