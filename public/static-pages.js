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

// Start original GIFs automatically, with a still first frame for reduced motion.
for (const player of document.querySelectorAll('.gif-player[data-gif]')) {
 const image = player.querySelector('img'), button = player.querySelector('button'), status = player.querySelector('[role="status"]');
 const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
 const setPlaying = (playing) => { image.src=playing ? player.dataset.gif : image.dataset.poster; button.setAttribute('aria-pressed',String(playing)); button.textContent=playing ? button.dataset.stop : button.dataset.play; };
 const sync = () => setPlaying(player.dataset.autoplay === 'true' && !preference.matches);
 button.hidden=false;
 button.addEventListener('click', () => {
  status.hidden=true;
  setPlaying(button.getAttribute('aria-pressed')!=='true');
 });
 image.addEventListener('error', () => { if(button.getAttribute('aria-pressed')==='true') setPlaying(false); status.hidden=false; });
 preference.addEventListener('change', sync);
 sync();
}
