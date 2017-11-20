$.getJSON(`../assets/json/${window.location.search.substr(1).split("=")[1]}`, data => {
	$('body').append(`<img id="holo" src="../assets/images/${data.id}/${data.hologram}" />`);
	$("audio").attr("src", `../assets/audio/${data.id}/${data.audio}`);
});

$("#img_audio").click(function() {
	console.log()
	$(this).hide();
	$("audio")[0].play();
	$("audio")[0].onended = () => {
		$(this).show();
	}
});