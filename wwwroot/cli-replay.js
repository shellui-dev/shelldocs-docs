// Replays `shelldocs init` and `shelldocs build` in elements marked [data-cli-replay].
// The lines are the CLI's real output for a new site (ShellDocs.CLI 0.1.17-alpha), shortened.
(function () {
    'use strict';

    // The ShellDocs mark: markdown's heading sign on the 5x5 dot grid.
    const MARK = ['.X.X.', 'XXXXX', '.X.X.', 'XXXXX', '.X.X.'];
    const markHtml = MARK.map(row => [...row].map(ch => `<span class="${ch === 'X' ? 'dot-on' : 'dot-off'}">●</span>`).join(' ')).join('\n');

    const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const g = s => `<span class="t-green">${s}</span>`;
    const c = s => `<span class="t-cyan">${s}</span>`;
    const dim = s => `<span class="t-dim">${s}</span>`;
    const bullet = s => `  ${dim('•')} ${s}`;

    const SCRIPT = [
        { cmd: 'shelldocs init MyDocs --yes' },
        { header: 'the docs framework for .NET' },
        { line: `${dim('Mode')}       create`, wait: 80 },
        { line: `${dim('Site name')}  MyDocs`, wait: 80 },
        { line: `${dim('Theme')}      shadcn`, wait: 80 },
        { line: '', wait: 0 },
        { line: `${dim('$')} ${c('dotnet new blazor -o MyDocs')}` },
        { spin: 'Creating the Blazor Web App...', ms: 1400 },
        { line: 'The template "Blazor Web App" was created successfully.' },
        { line: 'Restore succeeded.' },
        { line: '', wait: 0 },
        { line: `${g('✓')} Wrote <b>15</b> change(s):` },
        { line: bullet(`added ${c('ShellDocs.Components')} to MyDocs.csproj`), wait: 110 },
        { line: bullet(`added ${c('ShellDocs.Tokens')} to MyDocs.csproj`), wait: 110 },
        { line: bullet(`created ${c('content/docs/introduction.md')}`), wait: 110 },
        { line: bullet(`created ${c('Components/Pages/DocsPage.razor')}`), wait: 110 },
        { line: bullet(`patched ${c('Program.cs')}`), wait: 110 },
        { line: bullet(`patched ${c('Components/App.razor')}`), wait: 110 },
        { line: `  ${dim('… and 9 more')}`, wait: 110 },
        { line: '', wait: 0 },
        { cmd: 'cd MyDocs' },
        { cmd: 'shelldocs build --site-url https://docs.example.com' },
        { line: `${dim('prerender:')} discovered ${c('2')} URL(s) from content/` },
        { spin: 'Prerendering...', ms: 1500 },
        { line: `${dim('prerender:')} wrote ${g('2')} page(s)`, wait: 160 },
        { line: `${dim('redirects:')} wrote ${c('1')} redirect page(s)`, wait: 160 },
        { line: `${dim('not found:')} wrote ${c('404.html')}`, wait: 160 },
        { line: `${dim('search:')} wrote ${c('_shelldocs/search.json')} (1 KB)`, wait: 160 },
        { line: `${dim('llms.txt:')} wrote ${c('7')} file(s)`, wait: 160 },
        { line: `${dim('seo:')} sitemap.xml + robots.txt + og meta on ${c('1')} page(s)`, wait: 160 },
        { line: '', wait: 0 },
        { line: `${g('✓')} built to ${c('publish')}` },
        { prompt: true },
    ];

    const sleep = (ms, run) => new Promise((resolve, reject) => {
        const id = setTimeout(() => run.alive && run.el.isConnected ? resolve() : reject(new Error('stopped')), ms);
        run.timers.push(id);
    });

    function append(body, html) {
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = html || '&nbsp;';
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
        return div;
    }

    const promptHtml = (text, cursor) => `<span class="t-prompt">$</span> ${esc(text)}${cursor ? '<span class="t-cursor"></span>' : ''}`;
    const headerHtml = text => `<div class="term-header"><pre class="term-dots">${markHtml}</pre><div class="term-header-text"><b>ShellDocs</b><br>${dim(text)}</div></div>`;

    async function play(el, run) {
        const body = el.querySelector('.term-body');
        body.innerHTML = '';
        for (const step of SCRIPT) {
            if (step.cmd !== undefined) {
                const line = append(body, promptHtml('', true));
                await sleep(450, run);
                for (let i = 1; i <= step.cmd.length; i++) {
                    line.innerHTML = promptHtml(step.cmd.slice(0, i), true);
                    await sleep(35 + Math.random() * 40, run);
                }
                await sleep(350, run);
                line.innerHTML = promptHtml(step.cmd, false);
            } else if (step.header) {
                append(body, '');
                append(body, headerHtml(step.header));
                append(body, '');
                await sleep(500, run);
            } else if (step.line !== undefined) {
                append(body, step.line);
                await sleep(step.wait ?? 220, run);
            } else if (step.spin) {
                const line = append(body, '');
                let i = 0;
                const draw = () => { line.innerHTML = `${g(SPINNER[i++ % SPINNER.length])} ${esc(step.spin)}`; };
                draw();
                const tick = setInterval(draw, 90);
                run.intervals.push(tick);
                try { await sleep(step.ms, run); } finally { clearInterval(tick); }
                line.remove();
            } else if (step.prompt) {
                append(body, promptHtml('', true));
            }
        }
    }

    // Without motion: the finished transcript.
    function renderStatic(el) {
        const body = el.querySelector('.term-body');
        body.innerHTML = '';
        for (const step of SCRIPT) {
            if (step.cmd !== undefined) append(body, promptHtml(step.cmd, false));
            else if (step.header) append(body, headerHtml(step.header));
            else if (step.line !== undefined) append(body, step.line);
        }
        body.scrollTop = body.scrollHeight;
    }

    async function loop(el) {
        const run = { alive: true, el, timers: [], intervals: [] };
        el.__cliRun = run;
        try {
            while (run.alive && el.isConnected) {
                await play(el, run);
                await sleep(4500, run);
            }
        } catch { /* stopped */ }
        if (el.__cliRun === run) stop(el);
    }

    function stop(el) {
        const run = el.__cliRun;
        if (!run) return;
        run.alive = false;
        run.timers.forEach(clearTimeout);
        run.intervals.forEach(clearInterval);
        el.__cliRun = null;
    }

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
        for (const e of entries) {
            if (e.isIntersecting && !e.target.__cliRun) loop(e.target);
            else if (!e.isIntersecting) stop(e.target);
        }
    }, { threshold: 0.35 }) : null;

    function attach(root) {
        root.querySelectorAll('[data-cli-replay]:not([data-cli-attached])').forEach(el => {
            el.setAttribute('data-cli-attached', '');
            if (reduceMotion || !io) renderStatic(el);
            else io.observe(el);
        });
    }

    // On a .NET host Blazor replaces the prerendered DOM when the circuit starts, so attach to new nodes as they appear.
    const start = () => {
        attach(document);
        new MutationObserver(() => attach(document)).observe(document.body, { childList: true, subtree: true });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
