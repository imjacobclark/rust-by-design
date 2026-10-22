/* Pure quiz operations, shared by the UI and the browser test runner. */
(function () {
  function shuffle(values, random = Math.random) {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function eligible(bank, sections, strand) {
    return bank.filter(q => sections.includes(q.section) && (strand === 'all' || q.strand === strand));
  }
  // Round-robin shuffled sections so a short mixed quiz has broad coverage.
  function sample(bank, count, random = Math.random) {
    const groups = new Map();
    for (const q of shuffle(bank, random)) {
      if (!groups.has(q.section)) groups.set(q.section, []);
      groups.get(q.section).push(q);
    }
    const buckets = shuffle([...groups.values()], random);
    const picked = [];
    while (picked.length < Math.min(count, bank.length)) {
      for (const bucket of buckets) {
        if (bucket.length && picked.length < count) picked.push(bucket.pop());
      }
    }
    return shuffle(picked, random);
  }
  function createSession(bank, count, mode, random = Math.random) {
    return {
      mode,
      items: sample(bank, count, random).map(q => ({ id: q.id, order: shuffle(q.options.map((_, i) => i), random), choice: null, submitted: false })),
      index: 0,
      finished: false,
      created: Date.now()
    };
  }
  function score(session, byId) {
    const answered = session.items.filter(item => item.submitted);
    const correct = answered.filter(item => item.choice === byId[item.id].answer).length;
    return { answered: answered.length, correct, total: session.items.length, percent: Math.round(100 * correct / (session.items.length || 1)) };
  }
  function validSession(session, byId) {
    return session && ['practice', 'test'].includes(session.mode) && Array.isArray(session.items) && session.items.length > 0 &&
      Number.isInteger(session.index) && session.index >= 0 && session.index < session.items.length && typeof session.finished === 'boolean' &&
      session.items.every(item => item && typeof item === 'object') &&
      new Set(session.items.map(item => item.id)).size === session.items.length && session.items.every(item => {
        const q = byId[item.id];
        return q && Array.isArray(item.order) && item.order.length === q.options.length && new Set(item.order).size === q.options.length &&
          item.order.every(i => Number.isInteger(i) && i >= 0 && i < q.options.length) && typeof item.submitted === 'boolean' &&
          (item.choice === null ? !item.submitted : Number.isInteger(item.choice) && item.choice >= 0 && item.choice < q.options.length);
      }) && (!session.finished || session.items.every(item => item.submitted));
  }
  window.QuizEngine = { shuffle, eligible, sample, createSession, score, validSession };
})();
