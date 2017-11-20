$.getJSON("assets/json/museum.json", data => {
	let i = 0, id = 1;
	data.files.forEach(element => {
		$.getJSON("assets/json/"+element.src, file_data => {
			$(`#list${id}`).append(`
				<li id="${file_data.id}">
					<div class="accueil_img">
						<a href="html/${file_data.type}.html?file=${file_data.id}.json">
							<img class="link" src="assets/images/${file_data.id}/${file_data.profil}" />
						</a>
					</div>
					<div>
						<div class="vertical_bar"></div>
						<p>${file_data.name}</p>
					</div>
				</li>
			`);
		});
		// if(++i == 3) {
		// 	i = 0;
		// 	$('body').append(`<ul id="list${++id}"></ul>`);
		// }
	});
});