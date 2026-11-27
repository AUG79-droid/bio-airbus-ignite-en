import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { join } from "node:path";
const photos=JSON.parse(await readFile(new URL("../src/data/nature-photos.json",import.meta.url),"utf8"));
const dir="public/images/nature";
await mkdir(dir,{recursive:true});
const valid=b=>b.length>10000&&b[0]===255&&b[1]===216&&b[2]===255;
for (const [id,photo] of Object.entries(photos)) {
 const path=join(dir,id+"-photo.jpg");
 try {if(valid(await readFile(path))){console.log(id+": local photo OK");continue;}}catch{}
 let saved=false;
 for(let attempt=0;attempt<3;attempt++){
  try{
   const res=await fetch(photo.url,{headers:{"User-Agent":"BioInspiredInnovationLab/1.0 (public educational photo asset preparation; https://github.com/AUG79-droid/bio-airbus-ignite)"},signal:AbortSignal.timeout(30000)});
   if(!res.ok)throw Error("HTTP "+res.status);
   const bytes=Buffer.from(await res.arrayBuffer());
   if(!valid(bytes))throw Error("invalid JPEG");
   await writeFile(path+".tmp",bytes);await rename(path+".tmp",path);
   console.log(id+": photo ready ("+bytes.length+" bytes)");saved=true;break;
  }catch(err){console.warn(id+": "+err.message);if(attempt<2)await new Promise(r=>setTimeout(r,2000*(attempt+1)));}
 }
 if(!saved)throw Error("Cannot prepare required photo "+id+"; do not deploy incomplete library.");
}
