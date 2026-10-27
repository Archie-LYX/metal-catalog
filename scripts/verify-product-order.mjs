import fs from 'node:fs';
import assert from 'node:assert/strict';
import { ProductListPage } from '../src/pages/ProductListPage.js';
const c=JSON.parse(fs.readFileSync(new URL('../src/data/catalog.json',import.meta.url)));
let checked=0;
for(const category of c.categories)for(const series of category.series){
 const products=c.products.filter(p=>p.category===category.id&&p.style===series.id).map(p=>({...p,code:p.id}));
 const html=ProductListPage({category,series,products});
 const positions=products.map(p=>({p,position:html.indexOf(`data-nav="#/product/${p.id}"`)})).sort((a,b)=>a.position-b.position);
 assert(positions.every(p=>p.position>=0));
 const order={大门:0,小门:1,推拉门:2};
 for(let i=1;i<positions.length;i++){
  const a=positions[i-1].p,b=positions[i].p;
  const type=category.id==='gates'?(order[a.gateType]??3)-(order[b.gateType]??3):0;
  assert(type<0||(type===0&&a.id.localeCompare(b.id,'en',{numeric:true})<0),`${a.id} before ${b.id}`);
 }
 checked+=products.length;
 if(category.id==='gates')for(const gateType of ['大门','小门','推拉门']){
  const filtered=products.filter(p=>p.gateType===gateType);
  const page=ProductListPage({category,series,products:filtered,selectedGateType:gateType});
  assert(filtered.every(p=>page.includes(`data-nav="#/product/${p.id}"`)));
 }
}
console.log(`Verified ${checked} products: type groups and numeric model order, including gate filters.`);
