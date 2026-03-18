/**
 * Design System Preview - Figma Plugin (single file, no build required)
 * Save code.js and re-run the plugin in Figma to see changes.
 */

const UI_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
*{box-sizing:border-box}
body{margin:0;padding:12px;font-family:'Inter',-apple-system,sans-serif;font-size:12px;color:#333;background:#fff;height:100vh;overflow-y:auto}
h2{margin:0 0 10px 0;font-size:13px;font-weight:600}
.section{margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #f0f0f0}
.section:last-child{border-bottom:none}
.badge{font-size:10px;font-weight:500;padding:2px 6px;background:#e8e8e8;border-radius:4px;color:#666;margin-left:6px}
.loading{padding:24px;text-align:center;color:#888}
.token-row{display:flex;align-items:center;gap:10px;padding:8px 10px;margin-bottom:6px;background:#fafafa;border-radius:6px;border:1px solid #eee}
.token-swatch{width:28px;height:28px;border-radius:4px;flex-shrink:0;border:1px solid rgba(0,0,0,0.1)}
.token-name{font-weight:500}
.token-ref{font-size:11px;color:#888;font-family:monospace;margin:2px 0}
.token-value{font-size:11px;color:#666;font-family:monospace}
.token-type{font-size:10px;color:#999}
.card{display:inline-block;padding:10px 14px;margin:4px 4px 4px 0;background:#f5f5f5;border-radius:6px;font-size:11px;cursor:pointer}
.card:hover{background:#e0e0e0}
.component-chips{display:flex;flex-wrap:wrap;gap:6px}
.token-group{margin-bottom:16px}
.token-group-title{font-size:11px;font-weight:600;color:#666;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #e8e8e8}
.collection-group{margin-bottom:24px;padding:12px;background:#fafafa;border-radius:8px;border:1px solid #eee}
.collection-title{font-size:12px;font-weight:700;color:#333;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #ddd}
.accordion-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none}
.accordion-header:hover{opacity:0.85}
.accordion-chevron{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;color:#4a4a4a;transition:transform 0.2s;flex-shrink:0}
.accordion-chevron svg{width:16px;height:16px}
.accordion.collapsed .accordion-chevron{transform:rotate(180deg)}
.accordion-body{overflow:hidden}
.accordion.collapsed .accordion-body{display:none}
.style-chip{display:inline-block;padding:6px 10px;margin:4px 4px 4px 0;border-radius:6px;font-size:11px}
.style-chip.fill{background:#e8f4fd}
.style-chip.text{background:#f0f0f0}
.style-chip.effect{background:#f5e6ff}
.style-chip.grid{background:#e6fff0}
.empty{color:#999;font-size:11px;padding:12px 0}
.page{display:none}
.page.active{display:block}
.nav{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.nav-btn{padding:6px 12px;border-radius:6px;font-size:11px;font-weight:500;background:#f0f0f0;border:none;cursor:pointer;color:#333}
.nav-btn:hover{background:#e5e5e5}
.nav-btn.active{background:#333;color:#fff}
</style>
</head>
<body>
<div id="loading" class="loading">Loading design system...</div>
<div id="content" style="display:none">
<div class="nav">
<button class="nav-btn active" data-section="tokens">Token</button>
<button class="nav-btn" data-section="components">Component</button>
<button class="nav-btn" data-section="styles">Style</button>
</div>
<div id="tokens" class="section page active"></div>
<div id="components" class="section page"></div>
<div id="styles" class="section page"></div>
</div>
<script>
const content=document.getElementById('content'),loading=document.getElementById('loading');
function escapeHtml(s){const d=document.createElement('div');d.textContent=s!=null?s:'';return d.innerHTML}
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    var el=document.getElementById(btn.dataset.section);
    if(el)el.classList.add('active');
  });
});
document.getElementById('components').addEventListener('click',e=>{
  const n=e.target.closest('.card[data-node-id]');
  if(n)parent.postMessage({pluginMessage:{type:'scroll-to-node',nodeId:n.dataset.nodeId}},'*');
});
document.getElementById('content').addEventListener('click',function(e){
  var h=e.target.closest('.accordion-header');
  if(h)h.closest('.accordion').classList.toggle('collapsed');
});
window.onmessage=event=>{
  const msg=event.data.pluginMessage;
  if(!msg)return;
  if(msg.type==='loading'&&!msg.value)loading.style.display='none';
  if(msg.type==='ds-data'&&msg.data){loading.style.display='none';content.style.display='block';render(msg.data);}
};
function render(data){
  const{tokens=[],components=[],styles=[]}=data;
  const tokensEl=document.getElementById('tokens');
  var byCollection={};
  tokens.forEach(t=>{
    var coll=t.collectionName||'Other';
    if(!byCollection[coll])byCollection[coll]=[];
    byCollection[coll].push(t);
  });
  var collOrder=Object.keys(byCollection).sort((a,b)=>a==='Other'?1:b==='Other'?-1:a.localeCompare(b));
  function groupsFromList(list){
    var g={};
    list.forEach(t=>{
      var path=t.name.includes('/')?t.name.split('/').slice(0,-1).join('/'):'Other';
      if(!g[path])g[path]=[];
      g[path].push(t);
    });
    return Object.keys(g).sort((a,b)=>a==='Other'?1:b==='Other'?-1:a.localeCompare(b)).map(k=>({title:k,list:g[k]}));
  }
  tokensEl.innerHTML=tokens.length
    ?'<h2>Token <span class="badge">'+tokens.length+'</span></h2>'+collOrder.map(coll=>{
      var subGroups=groupsFromList(byCollection[coll]);
      return '<div class="accordion collection-group"><div class="accordion-header collection-title"><span>'+escapeHtml(coll)+' <span class="badge">'+byCollection[coll].length+'</span></span><span class="accordion-chevron"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div><div class="accordion-body">'+
        subGroups.map(function(sg){
          return '<div class="accordion token-group"><div class="accordion-header token-group-title"><span>'+escapeHtml(sg.title)+' <span class="badge">'+sg.list.length+'</span></span><span class="accordion-chevron"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div><div class="accordion-body">'+sg.list.map(t=>{
            var refLine=t.referencedName?'<div class="token-ref">'+escapeHtml(t.referencedName)+'</div>':'';
            return '<div class="token-row">'+(t.type==='COLOR'&&t.value?'<div class="token-swatch" style="background:'+t.value+'"></div>':'')+
            '<div><div class="token-name">'+escapeHtml(t.name)+'</div>'+refLine+'<div class="token-value">'+escapeHtml(String(t.value))+'</div>'+
            '<div class="token-type">'+t.type+'</div></div></div>';
          }).join('')+'</div></div>';
        }).join('')+'</div></div>';
    }).join('')
    :'<h2>Token <span class="badge">0</span></h2><p class="empty">No variables.</p>';
  var compByGroup={};
  components.forEach(c=>{
    var g=c.name.includes('/')?c.name.split('/').slice(0,-1).join('/'):'Other';
    if(!compByGroup[g])compByGroup[g]=[];
    compByGroup[g].push(c);
  });
  var compGroupOrder=Object.keys(compByGroup).sort((a,b)=>a==='Other'?1:b==='Other'?-1:a.localeCompare(b));
  const compEl=document.getElementById('components');
  compEl.innerHTML=components.length
    ?'<h2>Component <span class="badge">'+components.length+'</span></h2>'+compGroupOrder.map(g=>{
      var list=compByGroup[g];
      return '<div class="accordion token-group"><div class="accordion-header token-group-title"><span>'+escapeHtml(g)+' <span class="badge">'+list.length+'</span></span><span class="accordion-chevron"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div><div class="accordion-body"><div class="component-chips">'+list.map(c=>'<span class="card" data-node-id="'+c.id+'" title="'+escapeHtml(c.description||'')+'">'+escapeHtml(c.name)+'</span>').join('')+'</div></div></div>';
    }).join('')
    :'<h2>Component <span class="badge">0</span></h2><p class="empty">No components.</p>';
  compEl.onclick=function(e){var n=e.target.closest('.card[data-node-id]');if(n)parent.postMessage({pluginMessage:{type:'scroll-to-node',nodeId:n.dataset.nodeId}},'*');};
  const labels={FILL:'Color',TEXT:'Text style',EFFECT:'Effect',GRID:'Grid'},byType={FILL:[],TEXT:[],EFFECT:[],GRID:[]};
  styles.forEach(s=>{(byType[s.styleType]||byType.FILL).push(s);});
  const styleHtml=['FILL','TEXT','EFFECT','GRID'].map(type=>{
    var list=byType[type];
    if(!list.length)return'';
    return '<div class="accordion token-group"><div class="accordion-header token-group-title"><span>'+labels[type]+' <span class="badge">'+list.length+'</span></span><span class="accordion-chevron"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div><div class="accordion-body"><div>'+list.map(s=>'<span class="style-chip '+type.toLowerCase()+'">'+escapeHtml(s.name)+'</span>').join('')+'</div></div></div>';
  }).filter(Boolean).join('');
  document.getElementById('styles').innerHTML=styles.length?'<h2>Style <span class="badge">'+styles.length+'</span></h2>'+styleHtml:'<h2>Style <span class="badge">0</span></h2><p class="empty">No styles.</p>';
}
</script>
</body>
</html>`;

function resolveVariableWithRef(variable, variableMap, visited) {
  visited = visited || {};
  variableMap = variableMap || {};
  if (visited[variable.id]) return { value: '', referencedName: null };
  visited[variable.id] = true;

  const values = variable.valuesByMode;
  const modeId = Object.keys(values)[0];
  if (!modeId) return { value: '', referencedName: null };
  const val = values[modeId];

  if (typeof val === 'object' && val !== null && val.type === 'VARIABLE_ALIAS') {
    const refId = val.id != null ? val.id : val.value;
    if (!refId) return { value: '', referencedName: null };
    const refVar = variableMap[refId];
    if (!refVar) return { value: '', referencedName: null };
    var resolved = resolveVariableWithRef(refVar, variableMap, visited);
    return { value: resolved.value, referencedName: refVar.name };
  }

  if (typeof val === 'object' && val !== null && 'r' in val && 'g' in val && 'b' in val) {
    const r = Math.round(val.r * 255), g = Math.round(val.g * 255), b = Math.round(val.b * 255);
    const a = (val.a != null) ? val.a : 1;
    const hex = function(n) { return ('0' + n.toString(16)).slice(-2); };
    var v = a < 1 ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : '#' + hex(r) + hex(g) + hex(b);
    return { value: v, referencedName: null };
  }
  var strVal = typeof val === 'object' ? '' : (val != null ? String(val) : '');
  return { value: strVal, referencedName: null };
}

async function extractDS() {
  const tokens = [], components = [], styles = [];
  const seenComp = new Set();
  try {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const variableMap = {};
    for (const col of collections) {
      for (const varId of col.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(varId);
        if (!variable) continue;
        variableMap[variable.id] = variable;
      }
    }
    for (const col of collections) {
      for (const varId of col.variableIds) {
        const variable = variableMap[varId];
        if (!variable) continue;
        var r = resolveVariableWithRef(variable, variableMap);
        tokens.push({ id: variable.id, name: variable.name, type: variable.resolvedType, value: r.value, referencedName: r.referencedName, collectionName: col.name });
      }
    }
    await figma.loadAllPagesAsync();
    const compNodes = figma.root.findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET'] });
    for (const node of compNodes) {
      if (node.type === 'COMPONENT') {
        const comp = node;
        if (comp.parent && comp.parent.type === 'COMPONENT_SET') continue;
        if (!seenComp.has(comp.id)) {
          seenComp.add(comp.id);
          components.push({ id: comp.id, name: comp.name, description: comp.description || undefined, key: comp.key || '' });
        }
      } else if (node.type === 'COMPONENT_SET') {
        const set = node;
        if (!seenComp.has(set.id)) {
          seenComp.add(set.id);
          components.push({ id: set.id, name: set.name, description: set.description || undefined, key: set.key || '' });
        }
      }
    }
    const paintStyles = await figma.getLocalPaintStylesAsync();
    for (const s of paintStyles) styles.push({ id: s.id, name: s.name, styleType: 'FILL' });
    const textStyles = await figma.getLocalTextStylesAsync();
    for (const s of textStyles) styles.push({ id: s.id, name: s.name, styleType: 'TEXT' });
    const effectStyles = await figma.getLocalEffectStylesAsync();
    for (const s of effectStyles) styles.push({ id: s.id, name: s.name, styleType: 'EFFECT' });
    const gridStyles = await figma.getLocalGridStylesAsync();
    for (const s of gridStyles) styles.push({ id: s.id, name: s.name, styleType: 'GRID' });
  } catch (e) { /* ignore */ }
  return { tokens, components, styles };
}

async function scrollToNode(nodeId) {
  try {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (node && 'x' in node) {
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
      return true;
    }
  } catch (_) {}
  return false;
}

figma.showUI(UI_HTML, { width: 420, height: 680 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'scroll-to-node' && msg.nodeId) await scrollToNode(msg.nodeId);
};

(async () => {
  figma.ui.postMessage({ type: 'loading', value: true });
  const data = await extractDS();
  figma.ui.postMessage({ type: 'ds-data', data });
  figma.ui.postMessage({ type: 'loading', value: false });
})();
