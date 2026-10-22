(function () {
  'use strict';
  const { sections, questions } = window.QUIZ_BANK;
  const engine = window.QuizEngine;
  const byId = Object.fromEntries(questions.map(q => [q.id, q]));
  const sectionById = Object.fromEntries(sections.map(s => [s.id, s]));
  const key = 'rust-by-design-knowledge-v1';
  let storageAvailable = true;
  let state = { history: {}, session: null };
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && typeof saved.history === 'object' && saved.history !== null) {
      for (const [id, value] of Object.entries(saved.history)) {
        if (byId[id] && value && typeof value.correct === 'boolean' && Number.isInteger(value.attempts) && value.attempts > 0) state.history[id] = value;
      }
      if (engine.validSession(saved.session, byId)) state.session = saved.session;
    }
  } catch { storageAvailable = false; }
  const settings = { selected: new Set(sections.map(s => s.id)), count: '10', strand: 'all', mode: 'practice' };
  let view = 'home';
  const main = document.getElementById('main');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const percent = (a, b) => b ? Math.round(a / b * 100) : 0;
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(state)); }
    catch { storageAvailable = false; }
  }
  function stats(pool = questions) {
    const attempted = pool.filter(q => state.history[q.id]);
    const correct = attempted.filter(q => state.history[q.id].correct).length;
    return { seen: attempted.length, correct, missed: attempted.length - correct };
  }
  function source(q) {
    return `<a class="source-link" href="../${escape(q.source)}" target="_blank" rel="noopener">Revisit: ${escape(q.chapter)} <span aria-hidden="true">↗</span></a>`;
  }
  function focusMain() { main.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
  function renderNav() {
    document.getElementById('section-nav').innerHTML = sections.map(s => `<button class="section-nav ${settings.selected.size === 1 && settings.selected.has(s.id) ? 'selected' : ''}" data-action="focus-section" data-id="${s.id}"><span class="part-index">${s.part}</span>${escape(s.title)}</button>`).join('');
  }
  function available() { return engine.eligible(questions, [...settings.selected], settings.strand); }
  function storageNote() { return !storageAvailable ? '<p class="storage-warning" role="status">Browser storage is unavailable. You can still practise, but progress may not survive closing this page.</p>' : ''; }
  function home() {
    view = 'home';
    document.getElementById('breadcrumb').textContent = 'Knowledge check';
    renderNav();
    const st = stats();
    const missed = questions.filter(q => state.history[q.id]?.correct === false);
    main.innerHTML = `${storageNote()}
      <section class="hero"><div><div class="eyebrow"><span class="green-line"></span> FROM READING TO REASONING</div><h1>Know the <em>why.</em><br>Not just the syntax.</h1><p>Put your understanding of <i>Rust by Design</i> to the test.<br class="desktop-break"> Small questions. Real design decisions. A clearer picture of what sticks.</p></div><div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="code-tile tile-back">&amp;T</div><div class="code-tile tile-front">{<span>?</span>}</div><div class="art-caption">UNDERSTAND → APPLY → REFINE</div></div></section>
      <section class="stats" aria-label="Your progress"><div><span class="stat-value">${questions.length}</span><span>questions to explore</span></div><div><span class="stat-value">${sections.length.toString().padStart(2, '0')}</span><span>book sections</span></div><div><span class="stat-value">${st.seen}<small> / ${questions.length}</small></span><span>questions attempted</span></div><div><span class="stat-value">${st.seen ? percent(st.correct, st.seen) + '<small>%</small>' : '—'}</span><span>correct on latest attempts</span></div></section>
      ${state.session ? `<div class="resume-banner"><div><strong>${state.session.finished ? 'Your last session is ready to revisit.' : 'Pick up where you left off.'}</strong><span>${engine.score(state.session, byId).answered} of ${state.session.items.length} answered · ${state.session.mode === 'test' ? 'Test' : 'Practice'} mode</span></div><button class="secondary" data-action="resume">${state.session.finished ? 'View results' : 'Resume session'} <span aria-hidden="true">↗</span></button></div>` : ''}
      <div class="study-layout"><section class="section-picker"><div class="section-heading"><div><div class="eyebrow">THE CURRICULUM</div><h2>Choose your ground.</h2></div><button class="text-button" data-action="toggle-all">${settings.selected.size === sections.length ? 'Clear selection' : 'Select all'}</button></div><p class="muted section-intro">Focus on one part, or connect the ideas across the book.</p><div class="section-grid">${sections.map(s => {
        const pool = questions.filter(q => q.section === s.id); const progress = stats(pool);
        return `<label class="section-card ${settings.selected.has(s.id) ? 'is-selected' : ''}"><div class="card-top"><span class="chapter-tag">${s.id === 'appendices' ? 'APPENDICES' : 'PART ' + s.part}</span><input type="checkbox" name="sections" value="${s.id}" ${settings.selected.has(s.id) ? 'checked' : ''} aria-label="Include ${escape(s.title)}"></div><h3>${escape(s.title)}</h3><p>${escape(s.topics)}</p><div class="card-bottom"><span>${pool.length} questions</span><span>${progress.seen ? `${progress.correct}/${pool.length} correct` : 'Not explored yet'}</span></div><div class="track" aria-hidden="true"><span style="width:${percent(progress.correct, pool.length)}%"></span></div></label>`;
      }).join('')}</div></section>
      <aside class="session-panel"><div class="panel-heading"><span class="eyebrow">MAKE IT YOURS</span><span aria-hidden="true">↗</span></div><h2>Your next session</h2><p class="muted">A little deliberate practice goes a long way.</p><form id="session-form"><fieldset><legend>How would you like to learn?</legend><div class="mode-options"><label><input type="radio" name="mode" value="practice" ${settings.mode === 'practice' ? 'checked' : ''}><span><strong>Practice</strong><small>Feedback after each answer</small></span></label><label><input type="radio" name="mode" value="test" ${settings.mode === 'test' ? 'checked' : ''}><span><strong>Test yourself</strong><small>Answers revealed at the end</small></span></label></div></fieldset><label class="field-label" for="strand">Subject strand</label><select id="strand" name="strand"><option value="all" ${settings.strand === 'all' ? 'selected' : ''}>Rust, workshop & TLA+</option><option value="core" ${settings.strand === 'core' ? 'selected' : ''}>Rust & workshop only</option><option value="tla" ${settings.strand === 'tla' ? 'selected' : ''}>TLA+ & formal methods</option></select><label class="field-label" for="count">Session length</label><select id="count" name="count"><option value="10" ${settings.count === '10' ? 'selected' : ''}>10 questions · a quick check</option><option value="20" ${settings.count === '20' ? 'selected' : ''}>20 questions · a deeper dive</option><option value="all" ${settings.count === 'all' ? 'selected' : ''}>All matching questions</option></select><div class="session-summary" id="session-summary" aria-live="polite"></div><button class="primary start-button" type="submit" id="start-button">Start session <span aria-hidden="true">→</span></button></form><p class="panel-footnote">No timer. No pressure. Just you and the ideas.</p><div class="review-box"><div><strong>Give the tricky ones another go.</strong><p id="review-description">${missed.length ? `${missed.length} question${missed.length === 1 ? '' : 's'} to revisit across the book.` : 'Missed questions will be collected here.'}</p></div><button class="text-button" data-action="review-missed" ${missed.length ? '' : 'disabled'}>Review missed <span aria-hidden="true">→</span></button></div></aside></div>
      <div class="bottom-note"><span class="tiny-mark">↳</span><p><strong>Understanding takes more than recognition.</strong> After answering, explain the reasoning in your own words. Then take it back to the chapter and try an exercise.</p></div>`;
    updateSummary();
  }
  function updateSummary() {
    const pool = available();
    const count = settings.count === 'all' ? pool.length : Math.min(Number(settings.count), pool.length);
    const parts = new Set(pool.map(q => q.section)).size;
    document.getElementById('session-summary').innerHTML = `<strong>${count} question${count === 1 ? '' : 's'}</strong><span>from ${parts} section${parts === 1 ? '' : 's'} · ${pool.length} available</span>${!count ? '<small>Select a section with questions in this strand.</small>' : ''}`;
    document.getElementById('start-button').disabled = count === 0;
  }
  function start(pool, count, mode) {
    if (!pool.length) return;
    state.session = engine.createSession(pool, count, mode);
    persist(); quiz(); focusMain();
  }
  function quiz() {
    const session = state.session;
    if (!session) return home();
    if (session.finished) return results();
    view = 'quiz';
    const item = session.items[session.index]; const q = byId[item.id]; const section = sectionById[q.section];
    const answered = engine.score(session, byId).answered;
    document.getElementById('breadcrumb').textContent = session.mode === 'practice' ? 'Practice session' : 'Test yourself';
    const feedback = item.submitted && session.mode === 'practice';
    main.innerHTML = `${storageNote()}<div class="quiz-toolbar"><button class="text-button" data-action="home">← Back to overview</button><span class="mode-badge">${session.mode === 'practice' ? 'PRACTICE' : 'TEST YOURSELF'}</span></div><section class="quiz-shell"><div class="question-progress"><span>QUESTION <strong>${String(session.index + 1).padStart(2, '0')}</strong> / ${String(session.items.length).padStart(2, '0')}</span><span>${answered} answered</span></div><div class="track quiz-track" role="progressbar" aria-label="Questions answered" aria-valuemin="0" aria-valuemax="${session.items.length}" aria-valuenow="${answered}"><span style="width:${percent(answered, session.items.length)}%"></span></div><div class="question-context"><span>${section.id === 'appendices' ? 'APPENDICES' : 'PART ' + section.part} · ${escape(section.title)}</span><span>${escape(q.topic)}</span></div><h1 class="question-title">${escape(q.prompt)}</h1>${q.code ? `<pre class="code-block"><span>RUST</span><code>${escape(q.code)}</code></pre>` : ''}<fieldset class="answers" ${item.submitted ? 'disabled' : ''}><legend class="sr-only">Choose one answer</legend>${item.order.map((optionIndex, index) => {
      const correct = optionIndex === q.answer; const selected = item.choice === optionIndex;
      return `<label class="answer ${selected ? 'chosen' : ''} ${feedback && correct ? 'correct' : ''} ${feedback && selected && !correct ? 'incorrect' : ''}"><input type="radio" name="answer" value="${optionIndex}" ${selected ? 'checked' : ''}><span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span class="answer-text">${escape(q.options[optionIndex])}</span>${feedback && correct ? '<span class="answer-status">Correct answer ✓</span>' : feedback && selected ? '<span class="answer-status">Your answer ×</span>' : ''}</label>`;
    }).join('')}</fieldset>${feedback ? `<section class="feedback ${item.choice === q.answer ? 'positive' : 'negative'}" aria-live="polite"><div class="eyebrow">${item.choice === q.answer ? 'THAT’S THE IDEA' : 'A GOOD ONE TO REVISIT'}</div><p>${escape(q.explanation)}</p>${source(q)}</section>` : item.submitted ? '<p class="test-saved" role="status">Answer saved. Your explanation will be available with the results.</p>' : ''}<div class="quiz-actions"><span class="muted">${item.submitted ? 'Take a moment to explain the why.' : 'Choose one answer. Keyboard: 1–4.'}</span><button class="primary" data-action="${item.submitted ? 'next' : 'submit-answer'}" ${item.choice === null ? 'disabled' : ''}>${item.submitted ? session.index === session.items.length - 1 ? 'See results' : 'Next question' : session.mode === 'practice' ? 'Check answer' : 'Lock in answer'} <span aria-hidden="true">→</span></button></div></section><p class="quiz-save-note">${storageAvailable ? 'Your place is saved automatically in this browser.' : 'Your progress is kept for this visit only.'}</p>`;
  }
  function submitAnswer() {
    const session = state.session; const item = session.items[session.index];
    if (item.submitted || item.choice === null) return;
    item.submitted = true;
    // In test mode defer history updates too, so the overview cannot reveal answers.
    if (session.mode === 'practice') record(item);
    persist(); quiz();
    main.querySelector('.quiz-actions button').focus();
  }
  function record(item) {
    state.history[item.id] = { correct: item.choice === byId[item.id].answer, attempts: (state.history[item.id]?.attempts || 0) + 1, updated: Date.now() };
  }
  function next() {
    const session = state.session;
    if (!session.items[session.index].submitted) return;
    if (session.index < session.items.length - 1) session.index++;
    else {
      if (session.mode === 'test' && !session.finished) session.items.forEach(record);
      session.finished = true;
    }
    persist(); quiz(); focusMain();
  }
  function results() {
    view = 'results';
    const session = state.session; const score = engine.score(session, byId);
    const missed = session.items.filter(item => item.choice !== byId[item.id].answer);
    document.getElementById('breadcrumb').textContent = 'Session results';
    const title = score.percent === 100 ? 'That’s a strong foundation.' : score.percent >= 70 ? 'The ideas are taking shape.' : 'You’ve found your next steps.';
    main.innerHTML = `${storageNote()}<div class="quiz-toolbar"><button class="text-button" data-action="home">← Back to overview</button><span class="mode-badge">SESSION COMPLETE</span></div><section class="results-hero"><div><div class="eyebrow">A MOMENT TO REFLECT</div><h1>${title}</h1><p class="muted">${score.correct} correct out of ${score.total}. ${missed.length ? 'Use the explanations below to turn the gaps into understanding.' : 'Try explaining each decision without the answer choices, then return to the exercises.'}</p><div class="button-row">${missed.length ? '<button class="primary" data-action="retry-session">Practise missed questions →</button>' : ''}<button class="secondary" data-action="home">Choose another session</button></div></div><div class="score-ring" style="--score:${score.percent}%"><div><strong>${score.percent}<small>%</small></strong><span>THIS SESSION</span></div></div></section><section class="breakdown"><div class="eyebrow">BY SUBJECT AREA</div><h2>Where you stand.</h2><div class="breakdown-grid">${sections.filter(s => session.items.some(item => byId[item.id].section === s.id)).map(s => {
      const items = session.items.filter(item => byId[item.id].section === s.id); const correct = items.filter(item => item.choice === byId[item.id].answer).length;
      return `<div class="breakdown-item"><div><strong>${escape(s.title)}</strong><span>${correct} / ${items.length}</span></div><div class="track"><span style="width:${percent(correct, items.length)}%"></span></div></div>`;
    }).join('')}</div></section><section class="answer-review"><div class="section-heading"><h2>Take the reasoning with you.</h2><span class="muted">${missed.length} to revisit</span></div><p class="muted">Missed answers are expanded. Open any question to revisit the explanation.</p>${session.items.map((item, index) => {
      const q = byId[item.id]; const correct = item.choice === q.answer;
      return `<details class="review-item" ${correct ? '' : 'open'}><summary><span class="review-icon ${correct ? 'good' : 'bad'}" aria-label="${correct ? 'Correct' : 'Incorrect'}">${correct ? '✓' : '×'}</span><span><small>${String(index + 1).padStart(2, '0')} · ${escape(q.topic)}</small>${escape(q.prompt)}</span><span class="expand-icon" aria-hidden="true">+</span></summary><div class="review-content">${q.code ? `<pre class="code-block"><code>${escape(q.code)}</code></pre>` : ''}<p class="your-answer">Your answer: ${escape(q.options[item.choice])}</p>${!correct ? `<p class="right-answer">Correct answer: ${escape(q.options[q.answer])}</p>` : ''}<p>${escape(q.explanation)}</p>${source(q)}</div></details>`;
    }).join('')}</section>`;
  }
  document.addEventListener('change', event => {
    const target = event.target;
    if (target.name === 'sections') {
      target.checked ? settings.selected.add(target.value) : settings.selected.delete(target.value);
      target.closest('.section-card').classList.toggle('is-selected', target.checked);
      document.querySelector('[data-action="toggle-all"]').textContent = settings.selected.size === sections.length ? 'Clear selection' : 'Select all';
      renderNav(); updateSummary();
    } else if (['mode', 'strand', 'count'].includes(target.name)) { settings[target.name] = target.value; updateSummary(); }
    else if (target.name === 'answer' && view === 'quiz') {
      const item = state.session.items[state.session.index]; if (item.submitted) return;
      item.choice = Number(target.value); persist();
      document.querySelectorAll('.answer').forEach(label => label.classList.toggle('chosen', label.contains(target)));
      main.querySelector('.quiz-actions button').disabled = false;
    }
  });
  document.addEventListener('submit', event => {
    if (event.target.id !== 'session-form') return;
    event.preventDefault();
    const pool = available(); start(pool, settings.count === 'all' ? pool.length : Number(settings.count), settings.mode);
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-action]'); if (!button || button.disabled) return;
    event.preventDefault();
    switch (button.dataset.action) {
      case 'home': home(); focusMain(); break;
      case 'focus-section': settings.selected = new Set([button.dataset.id]); home(); focusMain(); break;
      case 'toggle-all': settings.selected = settings.selected.size === sections.length ? new Set() : new Set(sections.map(s => s.id)); home(); document.querySelector('[data-action="toggle-all"]').focus(); break;
      case 'resume': quiz(); focusMain(); break;
      case 'review-missed': { const pool = questions.filter(q => state.history[q.id]?.correct === false); start(pool, pool.length, 'practice'); break; }
      case 'retry-session': { const pool = state.session.items.filter(item => item.choice !== byId[item.id].answer).map(item => byId[item.id]); start(pool, pool.length, 'practice'); break; }
      case 'submit-answer': submitAnswer(); break;
      case 'next': next(); break;
      case 'reset': document.getElementById('reset-dialog').showModal(); break;
      case 'cancel-reset': document.getElementById('reset-dialog').close(); break;
      case 'confirm-reset': state = { history: {}, session: null }; persist(); document.getElementById('reset-dialog').close(); home(); focusMain(); break;
    }
  });
  document.addEventListener('keydown', event => {
    if (view !== 'quiz' || event.altKey || event.ctrlKey || event.metaKey || document.querySelector('dialog[open]')) return;
    if (/^[1-4]$/.test(event.key) && !['SELECT', 'TEXTAREA'].includes(event.target.tagName) && !(event.target.tagName === 'INPUT' && event.target.type !== 'radio')) {
      const input = main.querySelectorAll('.answer input')[Number(event.key) - 1];
      if (input && !input.closest('fieldset').disabled) { input.click(); input.focus(); event.preventDefault(); }
    }
  });
  home();
})();
