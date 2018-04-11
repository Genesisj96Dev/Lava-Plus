var $ = jQuery.noConflict();

/* Global variables */

"use strict";
var $document = $(document),
	$window = $(window),
	plugins = {
		parallax: $('.content--parallax, .carusel--parallax'),
		googleMap: $('#map'),
		preloader: $('.loader'),
		panel: $('.panel'),
		menu: $('nav .menu'),
		counter: $('#counterBlock'),
		animation: $('.animation'),
		servicesCarousel: $('.services-box-mobile'),
		permissionCarousel: $('.permission-box-mobile'),
		blogCarousel: $('.carousel-blog'),
		productCarousel: $('.product-box-mobile'),
		postCarousel: $('.post-carousel'),
		postGallery: $('.blog-isotope')
	}

/* Initialize All Scripts */

$document.ready(function () {

	var windowWidth = window.innerWidth || $(window).width();

	// parallax image from data attribute
	if (plugins.parallax.length) {
		plugins.parallax.each(function () {
			$this = $(this);
			var attr = $this.attr('data-image');
			$this.css({
				'background-image': 'url(' + attr + ')'
			});
		})
	}

	// faq 	accordion active class
	if (plugins.panel.length) {
		plugins.panel
			.on('show.bs.collapse', function (e) {
				$(e.target).prev('.panel-heading').addClass('active');
			})
			.on('hide.bs.collapse', function (e) {
				$(e.target).prev('.panel-heading').removeClass('active');
			});
	}

	// navigation
	if (plugins.menu.length > 0) {
		var $touch = $('#touch-menu');
		$('li', plugins.menu)
			.on('mouseenter', function () {
				$(this).addClass('hover');
			})
			.on('mouseleave', function () {
				$(this).removeClass('hover');
			});
		$touch.on('click', function (e) {
			e.preventDefault();
			plugins.menu.slideToggle();
		});
	}


	
	// post more ajax load
	var $postMoreLink = $('.view-more-post'),
		$postPreload = $('#postPreload');
	
	$postMoreLink.on('click', function () {
		var item;
		var target = $(this).attr('data-load');
		$(this).hide();
		$.ajax({
			url: target,
			success: function (data) {
				$postPreload.append(data);
				if (plugins.postGallery.length) {
					$(' > div', $postPreload).each(function () {
						item = $(this);
						$postgallery.append(item).isotope('appended', item);
					});
				}
			}
		});
	})
	
	$window.on('load', function () {

		// remove preloader on page load
		if (plugins.preloader.length) {
			plugins.preloader.delay(500).fadeOut('slow');
		}

		function createMap(id, mapZoom) {
			// Create google map
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(22.757450, -102.504607), // Glasgow
				// How you would like to style the map. 
				// This is where you would paste any style found on Snazzy Maps.
				zoom: 17,
				scrollwheel: false,
				styles: [{
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#d1d1d1"
					}]
				}, {
					"featureType": "transit",
					"stylers": [{
						"color": "#808080"
					}, {
						"visibility": "off"
					}]
				}, {
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#d1d1d1"
					}]
				}, {
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#d1d1d1"
					}]
				}, {
					"featureType": "road.local",
					"elementType": "geometry.fill",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#ffffff"
					}, {
						"weight": 1.8
					}]
				}, {
					"featureType": "road.local",
					"elementType": "geometry.stroke",
					"stylers": [{
						"color": "#d7d7d7"
					}]
				}, {
					"featureType": "poi",
					"elementType": "geometry.fill",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#ebebeb"
					}]
				}, {
					"featureType": "administrative",
					"elementType": "geometry",
					"stylers": [{
						"color": "#d1d1d1"
					}]
				}, {
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#ffffff"
					}]
				}, {
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#ffffff"
					}]
				}, {
					"featureType": "landscape",
					"elementType": "geometry.fill",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#fafafa"
					}]
				}, {
					"featureType": "road",
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#d6d6d6"
					}]
				}, {
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#bfbfbf"
					}]
				}, {
					"featureType": "poi",
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				}, {
					"featureType": "poi",
					"elementType": "labels",
					"stylers": [{
						"visibility": "on"
					}]
				}, {
					"featureType": "road.arterial",
					"elementType": "geometry.stroke",
					"stylers": [{
						"color": "#d6d6d6"
					}]
				}, {
					"featureType": "road",
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				}, {}, {
					"featureType": "poi",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#f1f1f1"
					}]
				}]
			};
			// Get the HTML DOM element that will contain your map 
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById(id);
			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);
			var image = 'img/map.png';
			// Let's also add a marker while we're at it
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(22.7574501, -102.504607),
				map: map,
				icon:image
			});

		}
		if (plugins.googleMap.length) {
			createMap('map')
		}
	});

	// window resize events
	$window.on('resize', function () {
		setTimeout(function () {
			var windowWidth = window.innerWidth || $(window).width();
			if (windowWidth < 768) {
				slickMobile(plugins.permissionCarousel);
			}
			if (windowWidth > 991 && plugins.menu.is(':hidden')) {
				plugins.menu.removeAttr('style');
			}
			//onScrollInit(plugins.animation, windowWidth);
		}, 500);
	});

});