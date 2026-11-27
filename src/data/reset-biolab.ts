// The GitHub Pages origin hosts several applications. Never clear the whole origin.
export const RESET_NOTICE="biolab-reset-notice-v1";
export function isBioLabStorageKey(key:string):boolean{
 return /^bio-airbus-ignite(?:-(?:es|en))?-v\d+$/.test(key)
 || /^biolab-pilot-track-v\d+$/.test(key)
 || /^biolab-pilot(?:-result)?-v\d+:/.test(key)
 || /^biolab-workshop-(?:host|player|submission|guide)-v\d+:/.test(key);
}
export function clearBioLabStorage(storage:Storage){
 const keys=Array.from({length:storage.length},(_,i)=>storage.key(i)).filter((k):k is string=>k!==null&&isBioLabStorageKey(k));
 for(const key of keys)storage.removeItem(key);
}
export function returnToCover(){window.location.replace(import.meta.env.BASE_URL);}
export function resetBioLab(){
 if(!window.confirm("Reset BioLab and start from scratch?\n\nALL saved BioLab data in this browser (Spanish and English) will be deleted: teams, challenges, proposals, workshops and assessments. You will return to the cover. Save any reports you want to keep first. Downloaded files, data on other computers and other applications will not be deleted."))return;
 try{
  clearBioLabStorage(window.sessionStorage);
  clearBioLabStorage(window.localStorage);
  // Notify other open BioLab tabs so an old in-memory session cannot continue.
  window.localStorage.setItem(RESET_NOTICE,Date.now().toString());
  window.localStorage.removeItem(RESET_NOTICE);
  returnToCover();
 }catch{
  window.alert("The reset could not be completed. Check your browser's storage permissions.");
 }
}
