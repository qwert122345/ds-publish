"use strict";
/// <reference types="@figma/plugin-typings" />
/**
 * 디자인시스템 미리보기 - Figma Plugin
 * 현재 파일의 토큰·컴포넌트·스타일을 표시
 */
figma.showUI(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0; padding: 12px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 12px; color: #333; background: #fff;
      height: 100vh; overflow-y: auto;
    }
    h2 { margin: 0 0 10px 0; font-size: 13px; font-weight: 600; }
    .section {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    .section:last-child { border-bottom: none; }
    .badge { font-size: 10px; font-weight: 500; padding: 2px 6px; background: #e8e8e8; border-radius: 4px; color: #666; margin-left: 6px; }
    .loading { padding: 24px; text-align: center; color: #888; }
    .token-row {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 10px; margin-bottom: 6px;
      background: #fafafa; border-radius: 6px; border: 1px solid #eee;
    }
    .token-swatch {
      width: 28px; height: 28px; border-radius: 4px; flex-shrink: 0;
      border: 1px solid rgba(0,0,0,0.1);
    }
    .token-name { font-weight: 500; }
    .token-value { font-size: 11px; color: #666; font-family: monospace; }
    .token-type { font-size: 10px; color: #999; }
    .card {
      display: inline-block;
      padding: 10px 14px; margin: 4px 4px 4px 0;
      background: #f5f5f5; border-radius: 6px;
      font-size: 11px; cursor: pointer;
    }
    .card:hover { background: #e0e0e0; }
    .token-group { margin-bottom: 16px; }
    .token-group-title {
      font-size: 11px; font-weight: 600; color: #666;
      margin-bottom: 8px; padding-bottom: 4px;
      border-bottom: 1px solid #e8e8e8;
    }
    .style-chip {
      display: inline-block;
      padding: 6px 10px; margin: 4px 4px 4px 0;
      border-radius: 6px; font-size: 11px;
    }
    .style-chip.fill { background: #e8f4fd; }
    .style-chip.text { background: #f0f0f0; }
    .style-chip.effect { background: #f5e6ff; }
    .style-chip.grid { background: #e6fff0; }
    .empty { color: #999; font-size: 11px; padding: 12px 0; }
    .nav { display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; }
    .nav-btn {
      padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 500;
      background: #f0f0f0; border: none; cursor: pointer; color: #333;
    }
    .nav-btn:hover { background: #e5e5e5; }
    .nav-btn.active { background: #333; color: #fff; }
  </style>
</head>
<body>
  <div id="loading" class="loading">디자인시스템 불러오는 중...</div>
  <div id="content" style="display:none">
    <div class="nav">
      <button class="nav-btn active" data-section="tokens">토큰</button>
      <button class="nav-btn" data-section="components">컴포넌트</button>
      <button class="nav-btn" data-section="styles">스타일</button>
    </div>
    <div id="tokens" class="section"></div>
    <div id="components" class="section"></div>
    <div id="styles" class="section"></div>
  </div>

  <script>
    const content = document.getElementById('content');
    const loading = document.getElementById('loading');

    function escapeHtml(s) {
      const d = document.createElement('div');
      d.textContent = s ?? '';
      return d.innerHTML;
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const id = btn.dataset.section;
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (!msg) return;

      if (msg.type === 'loading' && !msg.value) {
        loading.style.display = 'none';
      }
      if (msg.type === 'ds-data' && msg.data) {
        loading.style.display = 'none';
        content.style.display = 'block';
        render(msg.data);
      }
    };

    function render(data) {
      const { tokens = [], components = [], styles = [] } = data;

      const tokensEl = document.getElementById('tokens');
      tokensEl.innerHTML = tokens.length
        ? \`<h2>토큰 <span class="badge">\${tokens.length}개</span></h2>\` + tokens.map(t => \`
          <div class="token-row">
            \${t.type === 'COLOR' && t.value ? \`<div class="token-swatch" style="background:\${t.value}"></div>\` : ''}
            <div>
              <div class="token-name">\${escapeHtml(t.name)}</div>
              <div class="token-value">\${escapeHtml(String(t.value))}</div>
              \${t.collectionName ? \`<div class="token-type">\${escapeHtml(t.collectionName)} · \${t.type}</div>\` : ''}
            </div>
          </div>
        \`).join('')
        : '<h2>토큰 <span class="badge">0개</span></h2><p class="empty">Variables가 없습니다.</p>';

      const compEl = document.getElementById('components');
      compEl.innerHTML = components.length
        ? \`<h2>컴포넌트 <span class="badge">\${components.length}개</span></h2>\` + components.map(c =>
          \`<span class="card" title="\${escapeHtml(c.description || '')}">\${escapeHtml(c.name)}</span>\`
        ).join('')
        : '<h2>컴포넌트 <span class="badge">0개</span></h2><p class="empty">컴포넌트가 없습니다.</p>';

      const labels = { FILL: '색상', TEXT: '타이포', EFFECT: '효과', GRID: '그리드' };
      const byType = { FILL: [], TEXT: [], EFFECT: [], GRID: [] };
      styles.forEach(s => { (byType[s.styleType] || byType.FILL).push(s); });
      const styleHtml = ['FILL','TEXT','EFFECT','GRID'].map(type => {
        const list = byType[type];
        if (!list.length) return '';
        return \`<div style="margin-bottom:10px"><div style="font-size:10px;color:#666;margin-bottom:6px">\${labels[type]}</div><div>\${list.map(s => \`<span class="style-chip \${type.toLowerCase()}">\${escapeHtml(s.name)}</span>\`).join('')}</div></div>\`;
      }).filter(Boolean).join('');

      const stylesEl = document.getElementById('styles');
      stylesEl.innerHTML = styles.length
        ? \`<h2>스타일 <span class="badge">\${styles.length}개</span></h2>\${styleHtml}\`
        : '<h2>스타일 <span class="badge">0개</span></h2><p class="empty">스타일이 없습니다.</p>';
    }
  </script>
</body>
</html>
`, { width: 420, height: 680 });
function resolveVariableValue(variable) {
    var _a;
    const values = variable.valuesByMode;
    const modeId = Object.keys(values)[0];
    if (!modeId)
        return '';
    const val = values[modeId];
    if (typeof val === 'object' && val !== null && 'r' in val && 'g' in val && 'b' in val) {
        const rgb = val;
        const r = Math.round(rgb.r * 255);
        const g = Math.round(rgb.g * 255);
        const b = Math.round(rgb.b * 255);
        const a = (_a = rgb.a) !== null && _a !== void 0 ? _a : 1;
        const hex = (n) => ('0' + n.toString(16)).slice(-2);
        return a < 1 ? `rgba(${r},${g},${b},${a})` : `#${hex(r)}${hex(g)}${hex(b)}`;
    }
    return val;
}
async function extractDS() {
    var _a;
    const tokens = [];
    const components = [];
    const styles = [];
    const seenComp = new Set();
    try {
        const collections = await figma.variables.getLocalVariableCollectionsAsync();
        for (const col of collections) {
            for (const varId of col.variableIds) {
                const variable = await figma.variables.getVariableByIdAsync(varId);
                if (!variable)
                    continue;
                tokens.push({
                    id: variable.id,
                    name: variable.name,
                    type: variable.resolvedType,
                    value: resolveVariableValue(variable),
                    collectionName: col.name,
                });
            }
        }
        await figma.loadAllPagesAsync();
        const compNodes = figma.root.findAllWithCriteria({
            types: ['COMPONENT', 'COMPONENT_SET'],
        });
        for (const node of compNodes) {
            if (node.type === 'COMPONENT') {
                const comp = node;
                if (((_a = comp.parent) === null || _a === void 0 ? void 0 : _a.type) === 'COMPONENT_SET')
                    continue;
                if (!seenComp.has(comp.id)) {
                    seenComp.add(comp.id);
                    components.push({
                        id: comp.id,
                        name: comp.name,
                        description: comp.description || undefined,
                        key: comp.key || '',
                    });
                }
            }
            else if (node.type === 'COMPONENT_SET') {
                const set = node;
                if (!seenComp.has(set.id)) {
                    seenComp.add(set.id);
                    components.push({
                        id: set.id,
                        name: set.name,
                        description: set.description || undefined,
                        key: set.key || '',
                    });
                }
            }
        }
        const paintStyles = await figma.getLocalPaintStylesAsync();
        for (const s of paintStyles)
            styles.push({ id: s.id, name: s.name, styleType: 'FILL' });
        const textStyles = await figma.getLocalTextStylesAsync();
        for (const s of textStyles)
            styles.push({ id: s.id, name: s.name, styleType: 'TEXT' });
        const effectStyles = await figma.getLocalEffectStylesAsync();
        for (const s of effectStyles)
            styles.push({ id: s.id, name: s.name, styleType: 'EFFECT' });
        const gridStyles = await figma.getLocalGridStylesAsync();
        for (const s of gridStyles)
            styles.push({ id: s.id, name: s.name, styleType: 'GRID' });
    }
    catch (e) {
        console.error('DS extract error:', e);
    }
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
    }
    catch (_a) {
        //
    }
    return false;
}
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'scroll-to-node' && msg.nodeId) {
        await scrollToNode(msg.nodeId);
    }
};
(async () => {
    figma.ui.postMessage({ type: 'loading', value: true });
    const data = await extractDS();
    figma.ui.postMessage({ type: 'ds-data', data });
    figma.ui.postMessage({ type: 'loading', value: false });
})();
