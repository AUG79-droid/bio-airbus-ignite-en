import { RotateCcw } from "lucide-react";
import { resetBioLab } from "@/data/reset-biolab";
export default function ResetBioLabButton({dark=false}:{dark?:boolean}){
 return <button type="button" data-testid="reset-biolab" onClick={resetBioLab} className={"print:hidden inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold whitespace-nowrap transition-colors "+(dark?"border-amber-400/70 bg-slate-950/80 text-amber-300 hover:bg-slate-800":"border-primary/30 bg-white text-primary hover:bg-primary/10")} title="Clear BioLab progress and return to the cover"><RotateCcw aria-hidden="true" className="h-4 w-4"/>Reset BioLab</button>;
}
