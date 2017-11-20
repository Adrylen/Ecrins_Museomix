function placeImageCenter(src) {
	$('#image_center').attr("src", src);
	
	var img = new Image;
	img.src = $('#image_center').attr("src");

	img.onload = () => {
		let width, i = 0;
		do {
			width = img.width * (1-((i++)*0.1));
		} while(width > 400);
		$('#image_center').width(width);
		
		let height;
		i = 0;
		do {
			height = img.height * (1-((i++)*0.05));
		} while(height > 600);
		$("#image").height(height);

		$("#image").css("margin-top", ($(document).height() / 2 - height / 2 - 15));
		$("#image_center").css("margin-top", height/2 - $('#image_center').height()/2);
		// $("#image_center").height(img.height * (i * 0.1));
	};
}

$.getJSON(`../assets/json/${window.location.search.substr(1).split("=")[1]}`, data => {
	placeImageCenter(`../assets/images/${data.id}/${data.profil}`);

	i = 0;
	data.audio.forEach(element => {
		$("#audio_list").append(`
			<div>
			<img id="${element.id}" width="66px" height="66px" src="../assets/images/boutons/BOUTON-${++i}.jpg" />
			<img id="casque" width="20px" height="20px" src="../assets/images/boutons/CASQUE.jpg" />
			<p>${element.title}</p>
			<audio id="audio_${element.id}"src="../assets/audio/${data.id}/${element.src}"></audio>
			</div>`
		);
		$(`#${element.id}`).click(function() {
			$("audio").each(function() {
				let image = $(this).attr("id").split("_")[1];
				let j = $(`#${image}`).attr("src").match(/[1-5]/g)
				$(`#${image}`).attr("src", `../assets/images/boutons/BOUTON-${j}.jpg`);
				$(this)[0].pause();
				$(this)[0].load();
				$(this).removeClass("active");
			});

			let j = $(this).attr("src").match(/[1-5]/g);
			$(this).attr("src", `../assets/images/boutons/BOUTON-B${j}.jpg`);

			$(`#audio_${element.id}`).addClass("active");
			$(`#audio_${element.id}`)[0].play();
			if(element.image !== undefined) {
				$("#image_center").show();
				$("textarea").prop("disabled", false);
				$("#textarea").hide();

				if(!$(`#audio_${element.id}`).paused) {
					$(`#audio_${element.id}`)[0].onended = () => {
						console.log($(element.id));
						$(this).attr("src", `../assets/images/boutons/BOUTON-${j}.jpg`);
					};
				}
				placeImageCenter(`../assets/images/${data.id}/${element.image}`);
			} else {
				$("#image_center").hide();
				$("#textarea").show();
				$("textarea").attr("placeholder", "Espace de témoignage et de commentaires");
				$("#button").click(() => {
					if($("textarea").val() !== "") {
						// TODO
						console.log($("textarea").val());
						
						$("textarea").val("");
						$("textarea").attr("placeholder", "Merci d'avoir participé");

						$("#image_center").show();
						$("textarea").prop("disabled", false);
						$("#textarea").hide();
						placeImageCenter(`../assets/images/${data.id}/${data.profil}`);
					}
				})
			}
		});
	});
});

$("#textarea").hide();
$('#quit').click(() => window.location.href="../index.html");