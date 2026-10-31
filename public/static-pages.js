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
