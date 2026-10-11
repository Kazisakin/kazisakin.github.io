// Runs before the page paints, right after the opening screen's markup:
// hides the opening screen if it was already shown this session (or "reduce motion" is on),
// otherwise starts the page at the top.
export const LOADER_SKIP_SCRIPT = `try{var l=document.currentScript.previousElementSibling;if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('kv-loaded')){l.classList.remove('is-active');l.style.display='none'}else{history.scrollRestoration='manual';window.scrollTo(0,0)}}catch(e){}`;
