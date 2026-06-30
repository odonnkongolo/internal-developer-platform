// ── Threat Intel Dashboard ──────────────────────
const API_URL = '/health';

const dom = {
    banner:     document.getElementById('status-banner'),
    label:      document.getElementById('status-label'),
    service:    document.getElementById('card-service'),
    version:    document.getElementById('card-version'),
    env:        document.getElementById('card-env'),
    time:       document.getElementById('card-time'),
    json:       document.getElementById('json-output'),
    refreshBtn: document.getElementById('refresh-btn'),
};

// ── Fetch health ───────────────────────────────
async function fetchHealth() {
    dom.banner.className = 'status-banner status-loading';
    dom.label.textContent = 'Checking service…';

    try {
        const res  = await fetch(API_URL);
        const data = await res.json();

        // Update status banner
        const healthy = data.status === 'Healthy';
        dom.banner.className = `status-banner ${healthy ? 'status-healthy' : 'status-down'}`;
        dom.label.textContent = healthy ? 'All systems operational' : `Status: ${data.status}`;

        // Update cards
        dom.service.textContent = data.service  || '—';
        dom.version.textContent = `v${data.version}` || '—';
        dom.env.textContent     = data.environment || '—';
        dom.time.textContent    = new Date().toLocaleTimeString();

        // Render pretty JSON
        dom.json.innerHTML = syntaxHighlight(JSON.stringify(data, null, 2));
    } catch (err) {
        dom.banner.className = 'status-banner status-down';
        dom.label.textContent = 'Service unreachable';
        dom.json.innerHTML = `<span class="json-muted">Error: ${err.message}</span>`;
    }
}

// ── JSON syntax highlighting ───────────────────
function syntaxHighlight(json) {
    return json.replace(
        /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g,
        (match) => {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                cls = /:$/.test(match) ? 'json-key' : 'json-string';
            } else if (/true|false/.test(match)) {
                cls = 'json-bool';
            }
            return `<span class="${cls}">${match}</span>`;
        }
    );
}

// ── Event listeners ────────────────────────────
dom.refreshBtn.addEventListener('click', fetchHealth);

// Initial fetch
fetchHealth();

// Auto-refresh every 30 seconds
setInterval(fetchHealth, 30000);
