"""Validate bank shape, source links and coverage using only the standard library."""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
text = (HERE / 'questions.js').read_text()
bank = json.loads(text.split('window.QUIZ_BANK = ', 1)[1].rstrip().removesuffix(';'))
sections = {section['id'] for section in bank['sections']}
assert len(sections) == len(bank['sections'])
seen = set()
covered = set()
for q in bank['questions']:
    assert q['id'] not in seen, q['id']
    seen.add(q['id'])
    assert q['section'] in sections
    assert q['strand'] in ('core', 'tla')
    assert len(q['options']) == 4 and len(set(q['options'])) == 4
    assert isinstance(q['answer'], int) and 0 <= q['answer'] < 4
    assert all(q[field].strip() for field in ('prompt', 'explanation', 'topic', 'chapter'))
    path = HERE.parent / q['source']
    assert path.is_file(), path
    assert path.read_text().splitlines()[0].lstrip('# ') == q['chapter'], path
    covered.add(path.resolve())
chapters = {p.resolve() for p in (HERE.parent / 'book').glob('*/*.md')
            if p.name != '00-part.md' and 'preface' not in p.name and 'afterword' not in p.name}
assert not chapters - covered, f'Uncovered chapters: {chapters - covered}'
assert all(any(q['section'] == section for q in bank['questions']) for section in sections)
assert len({q['source'] for q in bank['questions'] if 'interlude' in q['source']}) == 6
print(f"PASS: {len(seen)} questions, {len(sections)} sections, {len(covered)} chapters and appendices, all 6 interludes.")
