// INSTA 
function instalink(){
  window.location.href = "https://www.linkedin.com/";

}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // obtenir la position initiale de la souris
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // appeler la fonction lors du déplacement de la souris
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculer la nouvelle position de la souris
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // définir la nouvelle position de la div
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // arrêter de bouger la div quand on relâche la souris
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// VOLUME

function openVolumeControler(){
  document.querySelector('.volume-control').style.display = 'block';
}

function closeVolumeControler(){
  document.querySelector('.volume-control').style.display = 'none';
}

        
const volumeSlider = document.getElementById('volume-slider');
const audios = document.querySelectorAll('audio');
const frames = document.querySelectorAll('iframe');
const volumePopup = document.querySelector('.volume-control');

audios.forEach(audio => {
  audio.volume = volumeSlider.value;

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
  });
});

frames.forEach(frame => {
  const frameWindow = frame.contentWindow;

  if (frameWindow) {
    frameWindow.addEventListener('load', () => {
      const frameAudios = frameWindow.document.querySelectorAll('audio');

      frameAudios.forEach(frameAudio => {
        frameAudio.volume = volumeSlider.value;

        volumeSlider.addEventListener('input', () => {
          frameAudio.volume = volumeSlider.value;
        });
      });
    });

  }
});


// SCROLL TO NEXT SECTION 
// let currentSection = 1;

// document.addEventListener('wheel', event => {
//   event.preventDefault();

//   const delta = event.deltaY;
//   const sections = document.querySelectorAll('section');
//   const numSections = sections.length;

//   if (delta < 0 && currentSection > 1) {
//     currentSection--;
//   } else if (delta > 0 && currentSection < numSections) {
//     currentSection++;
//   }

//   sections[currentSection - 1].scrollIntoView({behavior: 'smooth'});
// });















