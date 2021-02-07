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
		["dodge", 3, ["text1", "text2", "text3"]],
		["panda", 4, ["1", "2", "3", "4"]],
		// ["strike", 3, ["Pins", "Ball", "Arm"]],
		// ["strike", 3, ["Pins", "Ball", "Arm"]],
		// ["strike", 3, ["Pins", "Ball", "Arm"]],
		// ["strike", 3, ["Pins", "Ball", "Arm"]],
		// ["strike", 3, ["Pins", "Ball", "Arm"]],
		// ["strike", 4, ["Mordekai", "Rigby", "Intelligence Man", "Paper"]]
	];
	function downloadVid(src) {
		const link = document.createElement("a");
        link.href = `download/${src}`;                
		link.setAttribute("download", "video.mp4");
		document.body.appendChild(link);
		link.click();
	}

	socket.on("getVideo", (url) => {
		$("#videoContainer").empty();
		$("#videoContainer").append(`<video id="videoPlayer" controls loop autoplay width="250"></video><button id="download">Download Meme</button>`);
		const source = document.createElement("source");
		source.src = "vid/" + url;
		source.type = "video/mp4";
		$("#videoPlayer").append(source);
		$("#download").on("click", function() {
			downloadVid(url);
		});
		$("#download").removeClass("hidden");
	});

	// $("input").on("change", (e) => {
	// 	meme.size[$(e.currentTarget).attr("position")] = $(e.currentTarget).attr("value");
		
	// });
	//     
	$("article").click(e => {
		meme.currVideo = $(e.currentTarget).attr("value");
		// Make inputs dynamically here based on what currVideo is
		console.log($("article")[0].children);
		// for each article, check if there are existing input lines (exluding the one that was clicked)
		for (let i = 0; i < 3; i++) {
			if ($("article")[i].children.length !== 3 && $("article")[i] !== e.currentTarget) {
				let j = $("article")[i].children.length - 3;
				if (meme.text.length !== 0) {
					while (j > 0) {
						if ($("article")[i].children[3].value) {
							meme.text.push($("article")[i].children[3].value);
						} else {
							meme.text.push("");
						}
						$("article")[i].removeChild($("article")[i].children[3]);
						j--;
					}
				}
			}
		}
        if (e.currentTarget.children.length === 3) {
			for (let i = 0; i < lookup[meme.currVideo][1]; i++) {
				if (meme.text.length > i) {
					$(e.currentTarget).append(`<input type="text" value=${meme.text[i]} required></input>`);
				} else {
					$(e.currentTarget).append(`<input type="text"></input>`);
				}
			}
		}
		console.log(meme.text);
		$("article").removeClass("vidSelected");
		$(e.currentTarget).addClass("vidSelected");
	});

	// For fun, maybe don't do this lol
	// $("#userText").on("change", function() {
	// 	socket.emit('makeMeme', meme);
	// })

	$(".submit").click(() => {
		//console.log($("article.vidSelected").length === 0);
		const inputs = $("article.vidSelected > input")
		for (let i = 0; i < inputs.length; i++) {
			meme.text[i] = $(inputs[i]).val();
		}
		if (meme.currVideo === -1) {
		 	// TODO: Stop user from making meme without text or selecting a video
			console.log("something is not filled in right")
		} else {
			meme.currVideo = lookup[meme.currVideo][0]; // get the meme template name.
			// logging to check if valid data is being taken in
			console.log(`make a meme with vid ${meme.currVideo} and text: ${meme.text}`);
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