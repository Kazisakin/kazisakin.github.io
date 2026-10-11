// Runs before paint, right after the page-transition overlay: if we arrived through a wipe,
// start with the screen covered so the columns can lift away without a flash.
export const WIPE_SCRIPT = `try{if(sessionStorage.getItem('kv-wipe')){sessionStorage.removeItem('kv-wipe');document.currentScript.previousElementSibling.classList.add('is-covered')}}catch(e){}`;
