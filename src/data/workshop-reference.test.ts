import {describe,it,expect} from "vitest";
import {pools,modelPool,canvasKeys} from "./workshop";
import {referenceSolutions} from "./reference-solutions";
describe("common educational reference coverage",()=>{
 it("contains one complete reference for every one of the 19 challenges",()=>{
  const challenges=Object.values(pools).flat();
  expect(challenges).toHaveLength(19);
  expect(Object.keys(referenceSolutions)).toHaveLength(19);
  for(const c of challenges){
   const r=referenceSolutions[c.id];
   expect(r,c.id).toBeDefined();
   expect(modelPool.some(m=>m.name===r.recommendedModel),c.id+" model").toBe(true);
   for(const k of canvasKeys)expect(r.answer[k].trim().length,c.id+" "+k).toBeGreaterThan(8);
   expect(r.mechanism.length).toBeGreaterThan(15);
   expect(r.caution.length).toBeGreaterThan(15);
   expect(r.check.length).toBeGreaterThanOrEqual(4);
  }
 });
});
