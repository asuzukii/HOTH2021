/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	const socket = io('localhost:3000');
	let meme = {
		currVideo: -1,
		text: []
    }
	// look up table which in each row has
	// [meme template, the number of inputs we'd want, [input text default_1, input text default_2, ...]]
	// example below
	let lookup = [
		["strike", 3, ["Pins", "Ball", "Arm"]],
		["strike", 3, ["Pins", "Ball", "Arm"]],
		["strike", 3, ["Pins", "Ball", "Arm"]],
		["strike", 3, ["Pins", "Ball", "Arm"]],
		["strike", 3, ["Pins", "Ball", "Arm"]],
		["strike", 3, ["Pins", "Ball", "Arm"]],
		["strike", 3, ["Pins", "Ball", "Arm"]],
		["strike", 3, ["Pins", "Ball", "Arm"]],
		["strike", 4, ["Mordekai", "Rigby", "Intelligence Man", "Paper"]]
	];

	function downloadVid(src) {
		// fix later
		console.log(src);
		const link = document.createElement("a");
        link.href = `download/${src}`;                
		link.setAttribute("download", "video.mp4");
		document.body.appendChild(link);
		link.click();
	}

	socket.on("getVideo", (url) => {
		console.log("Changing source");
		const source = document.createElement("source");
		source.src = "vid/" + url;
		source.type = "video/mp4";
		$("#videoPlayer").append(source);
		$("#videoPlayer").removeClass("hidden");
		$("#download").on("click", function() {
			downloadVid(url);
		});
		$("#download").removeClass("hidden");
	});

	$("article").click(e => {
		meme.currVideo = $(e.currentTarget).attr("value");
		// Make inputs dynamically here based on what currVideo is
		console.log($("article")[0].children);
		let existing_text_list = [];
		for (let i = 0; i < 9; i++) {
			console.log($("article")[i].children);
			console.log(e.currentTarget);
			if ($("article")[i].children.length !== 3 && $("article")[i] !== e.currentTarget) {
				for (let j = $("article")[i].children.length - 1; j > 2; j--) {
					// if ($("article")[i].children[j].text) {
					// 	existing_text_list.push($("article")[i].children[j].text);
					// }
					$("article")[i].removeChild($("article")[i].children[j]);
				}
			}
		}
		if (e.currentTarget.children.length === 3) {
			for (let i = 0; i < lookup[meme.currVideo][1]; i++) {
				if (existing_text_list.length > i) {
					$(e.currentTarget).append(`<input type="text">${existing_text_list[i]}</input>`);
				} else {
					$(e.currentTarget).append(`<input type="text"></input>`);
				}
			}
		}
		$("article").removeClass("vidSelected");
		$(e.currentTarget).addClass("vidSelected");
	});

	// For fun, maybe don't do this lol
	// $("#userText").on("change", function() {
	// 	socket.emit('makeMeme', meme);
	// })

	$("#submit").click(() => {
        meme.text = $("#userText").val();
		if ((meme.currVideo === -1) || meme.text.length === 0) {
			// TODO: Stop user from making meme without text or selecting a video
		} else {
			meme.currVideo = lookup[meme.currVideo][0]; // get the meme template name.
			// logging to check if valid data is being taken in
			console.log(`make a meme with vid #${meme.currVideo} and text: ${meme.text}`)
            socket.emit('makeMeme', meme);		 
		}
	});

	// stuff from template below
	var	$window = $(window),
		$body = $('body');
	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);