# Rust by Design — knowledge check

A dependency-free, browser-based study companion. **89 questions across nine
book sections**, including the six TLA+ interludes. Each question has an
explanation and a link to its Markdown chapter.

## Run

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open **http://localhost:8000/knowledge-check/**. Serve the repository root so
chapter links under `../book/` work. No install, build, account or network
service is needed. You can also open `index.html` directly, though browser
storage behaviour for `file:` URLs varies.

## Study

- Select one or more book sections, then choose 10, 20 or all matching questions.
  A shorter bank automatically reduces the session length. Mixed quizzes sample
  across sections before taking more questions from any one section.
- Filter to Rust/workshop questions, TLA+ questions, or both.
- **Practice** reveals the answer and explanation after each submission.
  **Test yourself** holds feedback until you finish.
- Answers and question order are shuffled. Choose with a mouse, keyboard radio
  controls, or number keys 1–4; then explicitly check/lock in your answer.
- Return to the overview or reload and use **Resume session**. Starting a new
  session replaces the saved session. Practice answers already submitted stay
  in your history; incomplete test sessions do not update history.
- Results include a section breakdown, all explanations and a retry of missed
  answers. The overview's **Review missed** uses the latest completed attempt
  for each question across all sections, regardless of current filters.
- Progress is stored in this browser's localStorage. “Correct on latest attempts”
  measures attempted questions, not mastery of unseen material. Resetting progress
  requires confirming in the dialog. Storage failure leaves the quiz usable for
  the current visit.

Chapter links open the original Markdown in another tab. Depending on your
browser, it may display or download the file. The quiz works offline when its
files and the book remain on disk; it has no external fonts, scripts or trackers.

## Files and maintenance

- `questions.js`: curated bank, stable question IDs, source paths and explanations.
  `answer` is the index in the unshuffled options array. Add questions by following
  an existing object; keep IDs stable to preserve progress. The UI derives counts
  from the bank.
- `engine.js`: pure filtering, balanced sampling, option shuffling, scoring and
  saved-session validation.
- `app.js`: interface and browser persistence.
- `style.css`: responsive layouts, keyboard focus and reduced-motion support.
- `tests.html`: browser-run assertions for the question bank and quiz engine.
- `validate.py`: standard-library check of question data and chapter coverage.

Run `python3 knowledge-check/validate.py` from the repository root. Open
`http://localhost:8000/knowledge-check/tests.html` for the engine tests.

Questions follow the book's current source, rather than serving as a general
reference for the latest library APIs. The preface and afterword are framing;
their design themes are tested in Foundations and the reference shelf. Every
teaching chapter and appendix has at least one question. Recognition questions
complement, rather than replace, the book's coding exercises.
