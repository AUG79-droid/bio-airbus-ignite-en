export type Report={title:string;subtitle:string;language:"es"|"en";blocks:{heading:string;paragraphs:string[]}[]};
export function openPdfReport(report:Report){
 const win=window.open("","_blank");if(!win)return false;win.opener=null;
 const d=win.document;d.title=report.title;d.documentElement.lang=report.language;
 const css=d.createElement("style");css.textContent="@page{size:A4;margin:17mm}*{box-sizing:border-box}body{font:11pt/1.5 Arial,sans-serif;color:#162b3b;max-width:850px;margin:30px auto;padding:0 20px}h1{font-size:24pt;color:#102c44}h2{font-size:15pt;color:#155d78;break-after:avoid;margin:20px 0 8px}p{white-space:pre-wrap;overflow-wrap:anywhere;margin:0 0 9px;orphans:3;widows:3}header{border-bottom:2px solid #155d78;margin-bottom:20px}button{background:#155d78;color:white;padding:12px 20px;border:0;border-radius:6px;cursor:pointer}aside{padding:15px;background:#eef3f6;margin-bottom:20px}@media print{aside{display:none}body{margin:0;padding:0;max-width:none}}";d.head.append(css);
 const add=(parent:HTMLElement,tag:string,value:string)=>{const el=d.createElement(tag);el.textContent=value;parent.append(el);return el;};
 const bar=d.createElement("aside");d.body.append(bar);add(bar,"p",report.language==="es"?"Pulsa el botón y elige «Guardar como PDF» como destino de impresión.":"Click the button and choose “Save as PDF” as the print destination.");add(bar,"button",report.language==="es"?"Imprimir / Guardar como PDF":"Print / Save as PDF").onclick=()=>win.print();
 const head=d.createElement("header");d.body.append(head);add(head,"p","BioLab");add(head,"h1",report.title);add(head,"p",report.subtitle);
 for(const b of report.blocks){const section=d.createElement("section");d.body.append(section);add(section,"h2",b.heading);for(const p of b.paragraphs)add(section,"p",p);}
 return true;
}
