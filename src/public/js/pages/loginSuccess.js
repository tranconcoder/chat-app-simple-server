const profile = JSON.parse(document.getElementById('profile').dataset.profile);

const urlList = ['http://localhost:4000', 'http://192.168.152.67:4000'];

urlList.forEach((url) => {
	window.opener.postMessage(
		{
			profile,
			accessToken,
			refreshToken,
		},
		url
	);
});
