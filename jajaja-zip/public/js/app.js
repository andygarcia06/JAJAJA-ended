


//POPUP WRAPPER
const jajajaWrapper = document.querySelector('.jajaja-wrapper');
const zIndex = 1;
        
function openWrapper() {
    jajajaWrapper.style.display = 'block';
    bringToFront(popup);
    }
        
function closeWrapper() {
    jajajaWrapper.style.display = 'none';
  }

  


// BRING TO FRONT

function bringToFront(popup) {
  let popups = document.querySelectorAll('.popup');
  popups.forEach(function (popup) {
    popup.classList.remove('active');
  });

  popup.classList.add('active');
}


    
//PRELOADER






// const popupCorbeille = document.getElementsByClassName('popup-corbeille')

// function popupCorbeilleOpen(){
//   popupCorbeille.style.display = 'block';
// }

// function popupCorbeilleClosed(){
//   popupCorbeille.style.display = 'none';
// }





// FULL SCREEN API

let fullScreenElement = document.querySelector('.fullscreen-btn');
    const removeFullScreenElement = document.querySelector('.exit-fullscreen-btn');


function fullscreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
            
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

function fullScreenEvent() {
    document.documentElement.requestFullscreen();
    fullScreenElement.innerHTML = 'exit full screen';
    fullScreenElement.classList.remove('fullscreen-btn');
    fullScreenElement.classList.add('exit-fullscreen-btn');
    const removeFullScreenElement = document.querySelector('.exit-fullscreen-btn');

    function closeFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          removeFullScreenElement.innerHTML = 'Fullscreen';
          fullScreenElement.classList.remove('exit-fullscreen-btn');
          fullScreenElement.classList.add('fullscreen-btn');
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }

      }

      console.log(removeFullScreenElement)

      removeFullScreenElement.addEventListener('click', closeFullscreen)
}


fullScreenElement.addEventListener('click',fullScreenEvent);

// NAVIGATION

const arrowToNext = document.querySelectorAll('.to-next-section[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior : 'smooth'
        });
    });
});


window.onResize = function() {
  if (window.innerWidth <= 1000) section1.classList.add('container');
  else section1.classList.remove('container');
};



// FORMULAIRE

function validateForm() {
    const name = document.forms["contactForm"]["name"].value;
    const email = document.forms["contactForm"]["email"].value;
    const message = document.forms["contactForm"]["message"].value;

    const regex = /^[a-zA-Z0-9\s]+$/; // vérifie si les caractères sont alphanumériques

    if (name == "") {
        alert("Veuillez entrer votre nom");
        return false;
    }
    if (!regex.test(name)) {
        alert("Le nom ne doit contenir que des caractères alphanumériques");
        return false;
    }
    if (email == "") {
        alert("Veuillez entrer votre adresse e-mail");
        return false;
    }
    if (message == "") {
        alert("Veuillez entrer un message");
        return false;
    }
    if (!regex.test(message)) {
        alert("Le message ne doit contenir que des caractères alphanumériques");
        return false;
    }
    return true;
}


// POPUP CONTACTS

const popupContact = document.getElementById("jajaja-contact-trigger");
const audio = document.getElementById("audioPlayer"); 



function triggerContacts() {
  const popup = document.querySelector('.popup-contacts');
  // Définir la position de la popup
  popup.style.position = "absolute";
  popup.style.display = "block";
  popup.style.width = '10%';
  popup.style.left = event.clientX + "px";
  popup.style.top = event.clientY + "px";
  // Ajouter la popup au document
  document.body.appendChild(popup);
}

function contactTrigger(){
    const popup = document.querySelector('.popup-contact')
    // Définir la position de la popup
    popup.style.position = "absolute";
    popup.style.display = "block";
    popup.style.left = 50+ "%";
    popup.style.top =45 + "vh";
    // Ajouter le contenu souhaité à la popup
    // Ajouter la popup au document
    document.body.appendChild(popup);
    bringToFront(popup);
}

function openPopupMusic(){
    const popup = document.querySelector('.popup-music');
    popup.style.display = 'block';
    bringToFront(popup);
}

function windowNotMuted() {
  setTimeout(() => {
    audio.load();
    audio.play();
  },4000);

}

// Close POPUP

function closePopupContact() {
  const popupContact = document.querySelector('.popup-contact');
  popupContact.style.display = 'none';
}

function closePopupContacts(){
    const popupContact = document.querySelector('.popup-contact');
    const popupContacts = document.querySelector('.popup-contacts');
    popupContact.style.display = 'none';
    popupContacts.style.display = 'none';

}

function closePopupMusic(){
    const popupMusic = document.querySelector('.popup-music');
    popupMusic.style.display = 'none';

}

//MUSIC CONTROLEUR

const tracks = ["./public/audio/Mexican 2.wav", "./public/audio/Mexican 2.wav", "./public/audio/Mexican 2.wav"];
const currentTrackIndex = 0;
const audioSource = document.getElementById("audioSource");
const playPauseButton = document.getElementById("playPauseButton"); 
const muteButton = document.querySelector('#mute-btn');
const canvas = document.getElementById("audioCanvas"); // Récupère le canvas
const canvasCtx = canvas.getContext("2d"); 
const audioCtx = new AudioContext(); // Crée un contexte audio
const audioSrc = audioCtx.createMediaElementSource(audio); 
const analyser = audioCtx.createAnalyser(); // Crée un analyseur de fréquence
analyser.fftSize = 2048; // Définit la taille de la FFT (Fast Fourier Transform)

  // Connecte la source audio à l'analyseur de fréquence
  audioSrc.connect(analyser);
  // Connecte l'analyseur de fréquence à la sortie audio
  analyser.connect(audioCtx.destination);

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  audioSource.src = tracks[currentTrackIndex];
  audio.load();
  audio.play();
  playPauseButton.innerHTML = '<i class="fi fi-rr-pause"></i>';
}

function previousTrack() {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = tracks.length - 1;
  }
  audioSource.src = tracks[currentTrackIndex];
  audio.load();
  audio.play();
  playPauseButton.innerHTML = '<i class="fi fi-rr-pause"></i>'; 
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseButton.innerHTML = '<i class="fi fi-rr-pause"></i>'; 
  } else {
    audio.pause();
    playPauseButton.innerHTML =' <i class="fi fi-rr-play"></i>';
  }
}

function toggleMute() {
  if (audio.muted) {
    audio.muted = false;
    muteButton.innerHTML = '<p>mute</p>'
    
  } else {
    audio.muted = true;
    muteButton.innerHTML = '<p>unmute</p>'
  }
} 



function shareAudio() {
    const audioUrl = audioSource.src;
    const twitterShareUrl = "https://twitter.com/intent/tweet?text=Écoutez%20ce%20morceau%20!&url=" + encodeURIComponent(audioUrl);
    const facebookShareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(audioUrl);

    window.open(twitterShareUrl, "_blank", "width=550,height=420");
    window.open(facebookShareUrl, "_blank", "width=550,height=420");
  };

  // Fonction pour dessiner l'onde sonore
function drawWaveform() {
    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "black";
    canvasCtx.beginPath();
    let sliceWidth = canvas.width / bufferLength;
    let x = 0;
    analyser.getByteTimeDomainData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
    let v = dataArray[i] / 128.0;
    let y = v * canvas.height / 2;
    if (i === 0) {
    canvasCtx.moveTo(x, y);
    } else {
    canvasCtx.lineTo(x, y);
    }
    x += sliceWidth;
    }
    canvasCtx.stroke();
    requestAnimationFrame(drawWaveform);
    }
     drawWaveform();

    // MUTE/UNMUTE

const muteAll = document.querySelector("#jajaja-volume");
muteAll.addEventListener("click", function() {
  setMute(!mediaElements[0].muted); // 
});





























