// @vitest-environment jsdom
import {describe,it,expect,beforeEach} from "vitest";
import {clearBioLabStorage,isBioLabStorageKey} from "@/data/reset-biolab";
describe("BioLab full reset",()=>{
 beforeEach(()=>localStorage.clear());
 it("clears all BioLab session, workshop and learning keys but not unrelated application data",()=>{
  const owned=["bio-airbus-ignite-es-v2","bio-airbus-ignite-en-v2","biolab-pilot-track-v1","biolab-pilot-v2:es:id:climate","biolab-pilot-result-v2:attempt","biolab-workshop-host-v1:es:climate","biolab-workshop-player-v1:en:code:1","biolab-workshop-submission-v1:en:code:1:guide","biolab-workshop-guide-v2:es:climate"];
  const others=["navigator-progress","mission-energy-session","biolab-unrelated-key","other-bio-airbus-ignite-es-v2"];
  for(const k of [...owned,...others])localStorage.setItem(k,"saved");
  clearBioLabStorage(localStorage);
  for(const k of owned){expect(isBioLabStorageKey(k)).toBe(true);expect(localStorage.getItem(k)).toBeNull();}
  for(const k of others)expect(localStorage.getItem(k)).toBe("saved");
 });
});
