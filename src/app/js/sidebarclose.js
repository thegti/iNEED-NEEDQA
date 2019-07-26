
// document.addEventListener('DOMContentLoaded', function() {
// 		$(".mat-list-item").click(function(){
//             $(".left-positioned").removeClass("open");
//             $(".fuse-sidebar-overlay").removeClass("fuse-sidebar-overlay");
            
// 		});
// 	}, false);
$("body").jParticle({
    
   // number of particles
particlesNumber: 100,

// Distance where link is full opacity
linkDist: 50,

// Distance where particles start linking.
createLinkDist: 150,

// disable links between particles
disableLinks: false,

// disable mouse interaction
disableMouse: false,

// background color
background: 'black',

// Particles and links color.
color: 'white',

// container's width/height
width: null,
height: null,

// Links width in pixels
linksWidth: 1,

particle: {

  // Particles color.
  color: "white",

  // min / max size
  minSize: 2,
  maxSize: 4,

  // animation speed
  speed: 60
}
    
    });
