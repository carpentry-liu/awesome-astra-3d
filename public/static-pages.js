for (const image of document.querySelectorAll('.image-container img')) {
 const fail = () => { image.hidden = true; const fallback=image.parentElement.querySelector('.image-fallback'); if(fallback) fallback.hidden=false; };
 image.addEventListener('error',fail);
 if(image.complete && image.naturalWidth===0) fail();
}
for (const video of document.querySelectorAll('.clip video')) {
 const fail = () => { video.hidden=true; const fallback=video.parentElement.querySelector('.video-fallback'); if(fallback) fallback.hidden=false; };
 video.addEventListener('error',fail);
 if(video.error) fail();
}

// GIFs load only after an explicit play action, including reduced-motion users.
for (const player of document.querySelectorAll('.gif-player[data-gif]')) {
 const image = player.querySelector('img'), button = player.querySelector('button'), status = player.querySelector('[role="status"]');
 const stop = () => { image.src=image.dataset.poster; button.setAttribute('aria-pressed','false'); button.textContent=button.dataset.play; };
 button.hidden=false;
 button.addEventListener('click', () => {
  status.hidden=true;
  if(button.getAttribute('aria-pressed')==='true') stop();
  else { image.src=player.dataset.gif; button.setAttribute('aria-pressed','true'); button.textContent=button.dataset.stop; }
 });
 image.addEventListener('error', () => { if(button.getAttribute('aria-pressed')==='true') stop(); status.hidden=false; });
}
