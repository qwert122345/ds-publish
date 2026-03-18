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
@keyframes ds-spin{to{transform:rotate(360deg)}}
.spinner{width:32px;height:32px;border:3px solid #e0e0e0;border-top-color:#0d99ff;border-radius:50%;animation:ds-spin 0.7s linear infinite;flex-shrink:0;-webkit-animation:ds-spin 0.7s linear infinite}
.loading{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:40px 24px;color:#666;min-height:200px;background:#f8f8f8}
.loading .spinner{flex-shrink:0}
.loading-inline{display:flex;align-items:center;gap:10px;padding:16px;color:#666}
.loading-inline .spinner{width:20px;height:20px;border-width:2px}
.token-row{display:flex;align-items:center;gap:10px;padding:8px 10px;margin-bottom:6px;background:#fafafa;border-radius:6px;border:1px solid #eee}
.token-swatch{width:28px;height:28px;border-radius:4px;flex-shrink:0;border:1px solid rgba(0,0,0,0.1)}
.token-name{font-weight:500}
.token-ref{font-size:11px;color:#888;font-family:monospace;margin:2px 0}
.token-value{font-size:11px;color:#666;font-family:monospace}
.token-type{font-size:10px;color:#999}
.comp-row{display:flex;align-items:center;gap:10px;padding:8px 10px;margin-bottom:6px;background:#fafafa;border-radius:6px;border:1px solid #eee;cursor:pointer;transition:background 0.15s,border-color 0.15s}
.comp-row:hover{background:#e8f4fd;border-color:#0d99ff}
.comp-row .comp-go{opacity:0;margin-left:auto;color:#0d99ff;transition:opacity 0.15s}
.comp-row:hover .comp-go{opacity:1}
.comp-thumb{width:36px;height:36px;border-radius:4px;flex-shrink:0;border:1px solid rgba(0,0,0,0.1);object-fit:contain;background:#fff}
.comp-name{font-weight:500;font-size:11px}
.style-row{display:flex;align-items:center;gap:10px;padding:8px 10px;margin-bottom:6px;background:#fafafa;border-radius:6px;border:1px solid #eee}
.style-row.fill{background:#fafafa}
.style-row.text{background:#f5f5f5}
.style-row.effect{background:#faf5ff}
.style-row.grid{background:#fafafa}
.style-swatch{width:28px;height:28px;border-radius:4px;flex-shrink:0;border:1px solid rgba(0,0,0,0.1)}
.style-icon{width:28px;height:28px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#888;font-size:14px;font-weight:700}
.card{display:inline-flex;align-items:center;justify-content:center;width:140px;min-width:140px;padding:10px 14px;margin:4px 4px 4px 0;background:#f5f5f5;border-radius:6px;font-size:11px;cursor:pointer;text-align:center;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.card:hover{background:#e0e0e0}
.component-chips{display:flex;flex-wrap:wrap;gap:6px}
.singles-section{margin-top:20px;padding-top:16px;border-top:1px solid #e8e8e8}
.singles-section .component-chips{gap:8px}
.token-group{margin-bottom:16px}
.token-group-title{font-size:11px;font-weight:600;color:#666;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #e8e8e8}
.collection-group{margin-bottom:24px;padding:12px;background:#fafafa;border-radius:8px;border:1px solid #eee}
.collection-title{font-size:12px;font-weight:700;color:#333;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #ddd}
.publish-tabs{display:flex;gap:4px;margin-bottom:12px}
.publish-tab{padding:6px 12px;border-radius:6px;font-size:11px;font-weight:500;background:#f0f0f0;border:none;cursor:pointer;color:#666}
.publish-tab:hover{background:#e5e5e5;color:#333}
.publish-tab.active{background:#333;color:#fff}
.publish-panel{display:none}
.publish-panel.active{display:block}
.accordion-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none}
.accordion-header:hover{opacity:0.85}
.accordion-chevron{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;color:#4a4a4a;transition:transform 0.2s;flex-shrink:0}
.accordion-chevron svg{width:16px;height:16px}
.accordion.collapsed .accordion-chevron{transform:rotate(180deg)}
.accordion-body{overflow:hidden}
.accordion.collapsed .accordion-body{display:none}
.style-chip{display:inline-flex;align-items:center;justify-content:center;width:140px;min-width:140px;padding:6px 10px;margin:4px 4px 4px 0;border-radius:6px;font-size:11px;text-align:center;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.style-chip.fill{background:#e8f4fd}
.style-chip.text{background:#f0f0f0}
.style-chip.effect{background:#f5e6ff}
.style-chip.grid{background:#e6fff0}
.empty{color:#999;font-size:11px;padding:12px 0}
.page{display:none}
.page.active{display:block}
.nav-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap}
.nav{display:flex;gap:6px;flex-wrap:wrap}
.export-btn{padding:6px 12px;border-radius:6px;font-size:11px;font-weight:500;background:#0d99ff;color:#fff;border:none;cursor:pointer;flex-shrink:0}
.export-btn:hover{background:#0b85dd}
.export-btn:disabled{background:#ccc;cursor:not-allowed}
.nav-btn{padding:6px 12px;border-radius:6px;font-size:11px;font-weight:500;background:#f0f0f0;border:none;cursor:pointer;color:#333}
.nav-btn:hover{background:#e5e5e5}
.nav-btn.active{background:#333;color:#fff}
</style>
</head>
<body>
<div id="loading" class="loading"><div class="spinner"></div><span>Loading design system...</span></div>
<div id="content" style="display:none">
<div class="nav-row">
<div class="nav">
<button class="nav-btn active" data-section="tokens">Token</button>
<button class="nav-btn" data-section="components">Component</button>
<button class="nav-btn" data-section="styles">Style</button>
</div>
<div style="display:flex;gap:6px"><button id="open-web-btn" class="export-btn" title="Open in browser">Open in browser</button><button id="export-web-btn" class="export-btn" style="background:#666" title="Export JSON">Export</button></div>
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
  const n=e.target.closest('.comp-row[data-node-id]');
  if(n)parent.postMessage({pluginMessage:{type:'scroll-to-node',nodeId:n.dataset.nodeId}},'*');
});
document.getElementById('content').addEventListener('click',function(e){
  var h=e.target.closest('.accordion-header');
  if(h){h.closest('.accordion').classList.toggle('collapsed');return;}
  var pt=e.target.closest('.publish-tab');
  if(pt){
    var container=pt.closest('.section');
    if(!container)return;
    container.querySelectorAll('.publish-tab').forEach(function(b){b.classList.remove('active');});
    pt.classList.add('active');
    var pub=pt.dataset.publish;
    container.querySelectorAll('.publish-panel').forEach(function(p){p.classList.toggle('active',p.dataset.publish===pub);});
  }
});
window.onmessage=event=>{
  const msg=event.data.pluginMessage;
  if(!msg)return;
  if(msg.type==='loading'&&!msg.value)loading.style.display='none';
  if(msg.type==='ds-data'&&msg.data){loading.style.display='none';content.style.display='block';render(msg.data);}
  if(msg.type==='components-loaded'&&msg.components){mergeComponents(msg.components);}
};
parent.postMessage({pluginMessage:{type:'ui-ready'}},'*');
function isTokenUnpublished(t){return ((t.collectionName||'').charAt(0)==='.'||(t.name||'').charAt(0)==='.');}
function isCompUnpublished(c){return (c.name||'').charAt(0)==='.';}
var cachedData=null;
function mergeComponents(components){if(!cachedData)return;cachedData.components=components;cachedData.componentsLoading=false;render(cachedData);}
function render(data){
  cachedData=data;
  const{tokens=[],components=[],styles=[]}=data;
  const tokensEl=document.getElementById('tokens');
  var tokPub=tokens.filter(function(t){return !isTokenUnpublished(t);});
  var tokUnpub=tokens.filter(isTokenUnpublished);
  function byCollection(list){
    var out={};
    list.forEach(t=>{var c=t.collectionName||'Other';if(!out[c])out[c]=[];out[c].push(t);});
    return out;
  }
  function groupsFromList(list){
    var g={};
    list.forEach(t=>{var path=t.name.includes('/')?t.name.split('/').slice(0,-1).join('/'):'Other';if(!g[path])g[path]=[];g[path].push(t);});
    return Object.keys(g).sort((a,b)=>a==='Other'?1:b==='Other'?-1:a.localeCompare(b)).map(k=>({title:k,list:g[k]}));
  }
  function renderTokenContent(list){
    if(!list.length)return'<p class="empty">No items.</p>';
    var byColl=byCollection(list);
    var collOrder=Object.keys(byColl).sort((a,b)=>a==='Other'?1:b==='Other'?-1:a.localeCompare(b));
    return collOrder.map(coll=>{
      var subGroups=groupsFromList(byColl[coll]);
      if(byColl[coll].length===1){
        var t=byColl[coll][0];
        var refLine=t.referencedName?'<div class="token-ref">'+escapeHtml(t.referencedName)+'</div>':'';
        return '<div class="token-row">'+(t.type==='COLOR'&&t.value?'<div class="token-swatch" style="background:'+t.value+'"></div>':'')+
        '<div><div class="token-name">'+escapeHtml(t.name)+'</div>'+refLine+'<div class="token-value">'+escapeHtml(String(t.value))+'</div>'+
        '<div class="token-type">'+t.type+'</div></div></div>';
      }
      return '<div class="accordion collection-group"><div class="accordion-header collection-title"><span>'+escapeHtml(coll)+' <span class="badge">'+byColl[coll].length+'</span></span><span class="accordion-chevron"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div><div class="accordion-body">'+
        subGroups.map(function(sg){
          if(sg.list.length===1){
            var t=sg.list[0];
            var refLine=t.referencedName?'<div class="token-ref">'+escapeHtml(t.referencedName)+'</div>':'';
            return '<div class="token-row">'+(t.type==='COLOR'&&t.value?'<div class="token-swatch" style="background:'+t.value+'"></div>':'')+
            '<div><div class="token-name">'+escapeHtml(t.name)+'</div>'+refLine+'<div class="token-value">'+escapeHtml(String(t.value))+'</div>'+
            '<div class="token-type">'+t.type+'</div></div></div>';
          }
          return '<div class="accordion token-group"><div class="accordion-header token-group-title"><span>'+escapeHtml(sg.title)+' <span class="badge">'+sg.list.length+'</span></span><span class="accordion-chevron"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div><div class="accordion-body">'+sg.list.map(t=>{
            var refLine=t.referencedName?'<div class="token-ref">'+escapeHtml(t.referencedName)+'</div>':'';
            return '<div class="token-row">'+(t.type==='COLOR'&&t.value?'<div class="token-swatch" style="background:'+t.value+'"></div>':'')+
            '<div><div class="token-name">'+escapeHtml(t.name)+'</div>'+refLine+'<div class="token-value">'+escapeHtml(String(t.value))+'</div>'+
            '<div class="token-type">'+t.type+'</div></div></div>';
          }).join('')+'</div></div>';
        }).join('')+'</div></div>';
    }).join('');
  }
  var tokenTabsHtml='';
  if(tokPub.length||tokUnpub.length){
    tokenTabsHtml='<div class="publish-tabs" data-context="tokens"><button class="publish-tab active" data-publish="1">Published <span class="badge">'+tokPub.length+'</span></button><button class="publish-tab" data-publish="0">Not published <span class="badge">'+tokUnpub.length+'</span></button></div>'+
      '<div class="publish-panel active" data-publish="1">'+renderTokenContent(tokPub)+'</div>'+
      '<div class="publish-panel" data-publish="0">'+renderTokenContent(tokUnpub)+'</div>';
  }
  tokensEl.innerHTML=tokens.length
    ?'<h2>Token <span class="badge">'+tokens.length+'</span></h2>'+tokenTabsHtml
    :'<h2>Token <span class="badge">0</span></h2><p class="empty">No variables.</p>';

  var compPub=components.filter(function(c){return !isCompUnpublished(c);});
  var compUnpub=components.filter(isCompUnpublished);
  function compByGroup(list){
    var g={};
    list.forEach(c=>{var p=c.name.includes('/')?c.name.split('/')[0]:(c.name||'Other');if(!g[p])g[p]=[];g[p].push(c);});
    return Object.keys(g).sort((a,b)=>a==='Other'?1:b==='Other'?-1:a.localeCompare(b)).map(k=>({title:k,list:g[k]}));
  }
  function renderCompContent(list){
    if(!list.length)return'<p class="empty">No items.</p>';
    var groups=compByGroup(list);
    var multi=groups.filter(function(gr){return gr.list.length>1;});
    multi.sort(function(a,b){return (a.title||'').localeCompare(b.title||'');});
    var singles=groups.filter(function(gr){return gr.list.length===1;}).reduce(function(a,gr){return a.concat(gr.list);},[]);
    singles.sort(function(a,b){return (a.name||'').localeCompare(b.name||'');});
    function compRow(c){var thumb=c.preview?'<img class="comp-thumb" src="data:image/png;base64,'+c.preview+'" alt="">':'<div class="comp-thumb" style="background:#e8e8e8"></div>';var goSvg='<svg class="comp-go" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7h-10v10"/></svg>';var tip=escapeHtml(c.description||'')||'Click to go to component in canvas';return '<div class="comp-row" data-node-id="'+c.id+'" title="'+tip+'">'+thumb+'<div class="comp-name">'+escapeHtml(c.name)+'</div>'+goSvg+'</div>';}
    var html=multi.map(function(gr){
      gr.list.sort(function(a,b){return (a.name||'').localeCompare(b.name||'');});
      return '<div class="accordion token-group"><div class="accordion-header token-group-title"><span>'+escapeHtml(gr.title)+' <span class="badge">'+gr.list.length+'</span></span><span class="accordion-chevron"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div><div class="accordion-body">'+gr.list.map(compRow).join('')+'</div></div>';
    }).join('');
    if(singles.length)html+='<div class="singles-section">'+singles.map(compRow).join('')+'</div>';
    return html;
  }
  var compTabsHtml='';
  if(compPub.length||compUnpub.length){
    compTabsHtml='<div class="publish-tabs" data-context="components"><button class="publish-tab active" data-publish="1">Published <span class="badge">'+compPub.length+'</span></button><button class="publish-tab" data-publish="0">Not published <span class="badge">'+compUnpub.length+'</span></button></div>'+
      '<div class="publish-panel active" data-publish="1">'+renderCompContent(compPub)+'</div>'+
      '<div class="publish-panel" data-publish="0">'+renderCompContent(compUnpub)+'</div>';
  }
  const compEl=document.getElementById('components');
  var compLoading=data.componentsLoading;
  compEl.innerHTML=compLoading
    ?'<h2>Component <span class="badge">...</span></h2><div class="loading-inline"><div class="spinner"></div><span>Loading components...</span></div>'
    :(components.length?'<h2>Component <span class="badge">'+components.length+'</span></h2>'+compTabsHtml:'<h2>Component <span class="badge">0</span></h2><p class="empty">No components.</p>');
  const labels={FILL:'Color',TEXT:'Text style',EFFECT:'Effect',GRID:'Grid'},byType={FILL:[],TEXT:[],EFFECT:[],GRID:[]};
  styles.forEach(s=>{(byType[s.styleType]||byType.FILL).push(s);});
  function styleRow(s){
    var pre='';
    if(s.styleType==='FILL'&&s.color){pre='<div class="style-swatch" style="background:'+s.color+'"></div>';}
    else if(s.styleType==='TEXT'){pre='<div class="style-icon">Aa</div>';}
    else if(s.styleType==='EFFECT'){pre='<div class="style-icon" style="font-size:12px">◆</div>';}
    else if(s.styleType==='GRID'){pre='<div class="style-icon" style="font-size:10px">▦</div>';}
    else{pre='<div class="style-swatch" style="background:#e8e8e8"></div>';}
    return '<div class="style-row '+s.styleType.toLowerCase()+'">'+pre+'<div class="comp-name">'+escapeHtml(s.name)+'</div></div>';
  }
  const styleHtml=['FILL','TEXT','EFFECT','GRID'].map(type=>{
    var list=byType[type];
    if(!list.length)return'';
    if(list.length===1)return '<div class="token-group"><div class="token-group-title">'+labels[type]+' <span class="badge">1</span></div>'+styleRow(list[0])+'</div>';
    return '<div class="accordion token-group"><div class="accordion-header token-group-title"><span>'+labels[type]+' <span class="badge">'+list.length+'</span></span><span class="accordion-chevron"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div><div class="accordion-body">'+list.map(styleRow).join('')+'</div></div>';
  }).filter(Boolean).join('');
  document.getElementById('styles').innerHTML=styles.length?'<h2>Style <span class="badge">'+styles.length+'</span></h2>'+styleHtml:'<h2>Style <span class="badge">0</span></h2><p class="empty">No styles.</p>';
  var eb=document.getElementById('export-web-btn'),ob=document.getElementById('open-web-btn');
  if(eb){eb.disabled=!!data.componentsLoading;eb.onclick=function(){if(!cachedData||cachedData.componentsLoading)return;var j=JSON.stringify({tokens:cachedData.tokens,components:cachedData.components,styles:cachedData.styles});var a=document.createElement('a');a.href='data:application/json;charset=utf-8,'+encodeURIComponent(j);a.download='design-system.json';a.click();};}
  if(ob){ob.disabled=!!data.componentsLoading;ob.onclick=function(){if(!cachedData||cachedData.componentsLoading)return;var d={tokens:cachedData.tokens,components:cachedData.components,styles:cachedData.styles};var j=JSON.stringify(d).replace(/</g,'\\'+'u003c');var t='<!DOCTYPE html><html><head><meta charset="utf-8"><title>Design System</title><link rel="stylesheet" href=""><style>*{box-sizing:border-box}body{margin:0;padding:24px;font:12px/1.5 Inter,sans-serif}.badge{font-size:10px;padding:2px 6px;background:#e8e8e8;border-radius:4px}.token-row,.comp-row,.style-row{display:flex;align-items:center;gap:10px;padding:8px;margin:4px 0;background:#fafafa;border-radius:6px}.token-swatch,.style-swatch,.comp-thumb{width:28px;height:28px;border-radius:4px;flex-shrink:0;border:1px solid rgba(0,0,0,.1)}.comp-thumb{width:36px;height:36px;object-fit:contain}.accordion-header{cursor:pointer;display:flex;justify-content:space-between}.accordion.collapsed .accordion-body{display:none}.nav{display:flex;gap:6px;margin-bottom:12px}.nav-btn{padding:6px 12px;border-radius:6px;border:none;cursor:pointer;background:#f0f0f0}.nav-btn.active{background:#333;color:#fff}</style></head><body><h1>Design System Preview</h1><div class="nav"><button class="nav-btn active" data-p="tokens">Token</button><button class="nav-btn" data-p="components">Component</button><button class="nav-btn" data-p="styles">Style</button></div><div id="tokens"></div><div id="components" style="display:none"></div><div id="styles" style="display:none"></div><script type="application/json" id="e">'+j+'<\\/script><script>(function(){var D=JSON.parse(document.getElementById("e").textContent),E=function(s){var d=document.createElement("div");d.textContent=s!=null?s:"";return d.innerHTML},R=function(){function T(l){if(!l.length)return"";var o={};l.forEach(function(t){var c=(t.collectionName||"Other");if(!o[c])o[c]=[];o[c].push(t)});return Object.keys(o).sort().map(function(k){return o[k].map(function(t){return"<div class=token-row>"+(t.type==="COLOR"&&t.value?"<div class=token-swatch style=background:"+t.value+"></div>":"")+"<div><b>"+E(t.name)+"</b><div style=font-size:11px;color:#666>"+E(t.value)+"</div></div></div>"}).join("")}).join("")}function C(l){if(!l.length)return"";var g={};l.forEach(function(c){var p=(c.name||"").split("/")[0]||"Other";if(!g[p])g[p]=[];g[p].push(c)});return Object.keys(g).sort().map(function(k){var arr=g[k];return arr.map(function(c){var th=c.preview?"<img class=comp-thumb src=data:image/png;base64,"+c.preview+">":"<div class=comp-thumb style=background:#e8e8e8></div>";return"<div class=comp-row>"+th+"<div>"+E(c.name)+"</div></div>"}).join("")}).join("")}function S(l){if(!l.length)return"";return l.map(function(s){var p=s.styleType==="FILL"&&s.color?"<div class=style-swatch style=background:"+s.color+"></div>":"<div class=style-swatch style=background:#e8e8e8></div>";return"<div class=style-row>"+p+"<div>"+E(s.name)+"</div></div>"}).join("")}document.getElementById("tokens").innerHTML="<h2>Token <span class=badge>"+(D.tokens||[]).length+"</span></h2>"+T(D.tokens||[]);document.getElementById("components").innerHTML="<h2>Component <span class=badge>"+(D.components||[]).length+"</span></h2>"+C(D.components||[]);document.getElementById("styles").innerHTML="<h2>Style <span class=badge>"+(D.styles||[]).length+"</span></h2>"+S(D.styles||[]);document.querySelectorAll(".nav-btn").forEach(function(b){b.onclick=function(){document.querySelectorAll(".nav-btn").forEach(function(x){x.classList.remove("active")});b.classList.add("active");["tokens","components","styles"].forEach(function(id){document.getElementById(id).style.display=b.dataset.p===id?"block":"none"})}})})();<\\/script></body></html>';var b=new Blob([t],{type:"text/html"});var u=URL.createObjectURL(b);window.open(u);};}
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

function paintToHex(p) {
  if (!p || p.type !== 'SOLID' || !p.color) return null;
  var r = Math.round((p.color.r || 0) * 255), g = Math.round((p.color.g || 0) * 255), b = Math.round((p.color.b || 0) * 255);
  var a = (p.opacity != null) ? p.opacity : 1;
  var hex = function (n) { return ('0' + Math.round(n).toString(16)).slice(-2); };
  return a < 1 ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : '#' + hex(r) + hex(g) + hex(b);
}
async function extractTokensAndStyles() {
  const tokens = [], styles = [];
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
    const paintStyles = await figma.getLocalPaintStylesAsync();
    for (const s of paintStyles) {
      var color = null;
      if (s.paints && s.paints[0] && s.paints[0].type === 'SOLID') color = paintToHex(s.paints[0]);
      styles.push({ id: s.id, name: s.name, styleType: 'FILL', color: color });
    }
    const textStyles = await figma.getLocalTextStylesAsync();
    for (const s of textStyles) styles.push({ id: s.id, name: s.name, styleType: 'TEXT' });
    const effectStyles = await figma.getLocalEffectStylesAsync();
    for (const s of effectStyles) styles.push({ id: s.id, name: s.name, styleType: 'EFFECT' });
    const gridStyles = await figma.getLocalGridStylesAsync();
    for (const s of gridStyles) styles.push({ id: s.id, name: s.name, styleType: 'GRID' });
  } catch (e) { /* ignore */ }
  return { tokens, styles };
}
async function extractComponents() {
  const components = [];
  const seenComp = new Set();
  try {
    await figma.loadAllPagesAsync();
    const compNodes = figma.root.findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET'] });
    const compsToAdd = [];
    for (const node of compNodes) {
      if (node.type === 'COMPONENT') {
        const comp = node;
        if (comp.parent && comp.parent.type === 'COMPONENT_SET') continue;
        if (!seenComp.has(comp.id)) {
          seenComp.add(comp.id);
          compsToAdd.push({ node: comp, id: comp.id, name: comp.name, description: comp.description || undefined, key: comp.key || '' });
        }
      } else if (node.type === 'COMPONENT_SET') {
        const set = node;
        if (!seenComp.has(set.id)) {
          seenComp.add(set.id);
          compsToAdd.push({ node: set, id: set.id, name: set.name, description: set.description || undefined, key: set.key || '' });
        }
      }
    }
    for (const c of compsToAdd) {
      var preview = null;
      try {
        var exportNode = c.node;
        if (c.node.type === 'COMPONENT_SET' && c.node.defaultVariant) {
          exportNode = c.node.defaultVariant;
        }
        const bytes = await exportNode.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } });
        preview = figma.base64Encode(bytes);
      } catch (_) {}
      components.push({ id: c.id, name: c.name, description: c.description, key: c.key, preview: preview });
    }
  } catch (e) { /* ignore */ }
  return components;
}

async function scrollToNode(nodeId) {
  try {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (!node) return false;
    var p = node.parent;
    while (p && p.type !== 'PAGE') p = p.parent;
    if (p) figma.currentPage = p;
    figma.currentPage.selection = [node];
    figma.viewport.scrollAndZoomIntoView([node]);
    return true;
  } catch (_) {}
  return false;
}

figma.showUI(UI_HTML, { width: 420, height: 680 });

var onUiReadyDone = false;
function onUiReady() {
  if (onUiReadyDone) return;
  onUiReadyDone = true;
  var loadStart = Date.now();
  var MIN_LOADING_MS = 800;
  function ensureMinLoading() {
    var elapsed = Date.now() - loadStart;
    return elapsed >= MIN_LOADING_MS ? Promise.resolve() : new Promise(function (r) { setTimeout(r, MIN_LOADING_MS - elapsed); });
  }
  figma.ui.postMessage({ type: 'loading', value: true });
  extractTokensAndStyles().then(function (ts) {
    return ensureMinLoading().then(function () {
      figma.ui.postMessage({ type: 'ds-data', data: { tokens: ts.tokens, components: [], styles: ts.styles, componentsLoading: true } });
      figma.ui.postMessage({ type: 'loading', value: false });
      return extractComponents();
    });
  }).then(function (components) {
    figma.ui.postMessage({ type: 'components-loaded', components: components || [] });
  });
}
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'scroll-to-node' && msg.nodeId) await scrollToNode(msg.nodeId);
  if (msg.type === 'ui-ready') onUiReady();
};
setTimeout(onUiReady, 150);
