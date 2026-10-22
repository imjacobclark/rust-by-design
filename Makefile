# Rust by Design — build targets
#   make pdf      whole book -> dist/rust-by-design.pdf
#   make parts    whole book + one PDF per part
#   make html     HTML only (handy for quick previews in a browser)
#   make clean

PY := python3

.PHONY: pdf parts html clean

pdf:
	$(PY) pipeline/build.py

parts:
	$(PY) pipeline/build.py --parts

html:
	$(PY) pipeline/build.py --html

clean:
	rm -rf build dist
