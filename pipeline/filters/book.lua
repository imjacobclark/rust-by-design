--[[
  book.lua — the single pandoc filter for the Rust guide.

  The Markdown sources are written to read well on GitHub *and* to print well.
  Rather than litter them with pandoc-only syntax, this filter recognises a few
  plain-Markdown conventions and upgrades them for the PDF:

  1. Headings
       "# Part II: ..."   -> unnumbered part divider  (class "part")
       chapters inside "# Part 0: ..." -> unnumbered "Workshop N" (class "workshop")
       "# Preface" / "# Appendix X: ..." -> unnumbered (class "frontmatter"/"appendix")
       "# Interlude: ..." -> unnumbered "TLA+ Interlude N" chapter (class "interlude")

  2. Callouts (GitHub alert syntax, plus a few custom kinds)
       > [!NOTE] Optional title
       > body...
     Kinds: NOTE TIP IMPORTANT WARNING CAUTION PATTERN EXERCISE CHECKPOINT

  3. Code blocks
       ```mermaid           -> <pre class="mermaid"> rendered by mermaid.js
       first line "// file: src/main.rs" (or "# file: flake.nix", "\\* file: X.tla")
                            -> stripped and shown as a filename tab
       ```text / ```output  -> styled as terminal / compiler output
]]

local stringify = pandoc.utils.stringify

local CALLOUT_KINDS = {
  NOTE = "Note",
  TIP = "Tip",
  IMPORTANT = "Important",
  WARNING = "Warning",
  CAUTION = "Caution",
  PATTERN = "Pattern",
  EXERCISE = "Exercise",
  CHECKPOINT = "Checkpoint",
}

-- ---------------------------------------------------------------- headings

function Header(h)
  if h.level ~= 1 then return nil end
  local text = stringify(h.content)
  if text:match("^Part%s+[0IVXLC]+") then
    h.classes:insert("part")
    h.classes:insert("unnumbered")
  elseif text:match("^Interlude:") then
    -- "# Interlude: Title" -> unnumbered "TLA+ Interlude N" chapter. The prefix
    -- is replaced by a small tag that shows in the contents only.
    h.classes:insert("interlude")
    h.classes:insert("unnumbered")
    local rest = pandoc.List(h.content)
    if rest[1] and rest[1].t == "Str" and rest[1].text == "Interlude:" then rest:remove(1) end
    while rest[1] and rest[1].t == "Space" do rest:remove(1) end
    local content = pandoc.List({ pandoc.Span(pandoc.Str("TLA+"), { class = "interlude-tag" }), pandoc.Space() })
    content:extend(rest)
    h.content = content
  elseif text:match("^Appendix") then
    h.classes:insert("appendix")
    h.classes:insert("unnumbered")
  elseif text:match("^Preface") or text:match("^Foreword") or text:match("^Afterword") then
    h.classes:insert("frontmatter")
    h.classes:insert("unnumbered")
  else
    h.classes:insert("chapter")
  end
  return h
end

-- ---------------------------------------------------------------- part pages

-- A part file looks like:
--     # Part II: The Cloudflare DDNS Daemon
--     *An italic one-paragraph lede.*
-- We split "Part II" into a kicker, and wrap heading + lede in a full-page div.
local function is_part(b)
  return b.t == "Header" and b.level == 1 and b.classes:includes("part")
end

local function lede_of(b)
  if b and b.t == "Para" and #b.content == 1 and b.content[1].t == "Emph" then
    return b.content[1].content
  end
end

function Pandoc(doc)
  local out, i = pandoc.List(), 1
  local blocks = doc.blocks
  local in_workshop = false
  local h1_unnumbered = false
  while i <= #blocks do
    local b = blocks[i]
    -- Sections inside an unnumbered chapter (preface, workshop, appendix)
    -- are unnumbered too, rather than continuing the previous chapter's count.
    if b.t == "Header" and b.level == 1 then
      h1_unnumbered = b.classes:includes("unnumbered") or in_workshop
    elseif b.t == "Header" and h1_unnumbered and not b.classes:includes("unnumbered") then
      b.classes:insert("unnumbered")
    end
    -- Chapters in "Part 0" (the workshop) are unnumbered "Workshop N" chapters,
    -- so the book's chapter numbers start at Part I.
    if b.t == "Header" and b.level == 1 and b.classes:includes("chapter") and in_workshop then
      b.classes = pandoc.List({ "workshop", "unnumbered" })
    end
    if is_part(b) then
      local text = stringify(b.content)
      in_workshop = text:match("^Part%s+0") ~= nil
      local kicker, title = text:match("^(Part%s+[0IVXLC]+)%s*[:.—-]%s*(.+)$")
      if kicker then
        b.content = pandoc.List({
          pandoc.Span(pandoc.Str(kicker), { class = "part-kicker" }),
          pandoc.Span(pandoc.Str(title), { class = "part-title" }),
        })
      end
      local page = pandoc.List({ b })
      local lede = lede_of(blocks[i + 1])
      if lede then
        page:insert(pandoc.Div(pandoc.Plain(lede), { class = "part-lede" }))
        i = i + 1
      end
      out:insert(pandoc.Div(page, { class = "part-page" }))
    else
      out:insert(b)
    end
    i = i + 1
  end
  doc.blocks = out
  return doc
end

-- ---------------------------------------------------------------- callouts

local function callout_from(bq)
  local first = bq.content[1]
  if not first or (first.t ~= "Para" and first.t ~= "Plain") then return nil end

  -- pandoc parses "[!NOTE]" as Str "[!NOTE]" (no matching link reference).
  local head = first.content[1]
  if not head or head.t ~= "Str" then return nil end
  local kind = head.text:match("^%[!(%u+)%]$")
  if not kind or not CALLOUT_KINDS[kind] then return nil end

  -- Everything on the same line after the marker is the title; the rest of
  -- the first paragraph (after a SoftBreak) is body.
  local title, rest, seen_break = pandoc.List(), pandoc.List(), false
  for i = 2, #first.content do
    local el = first.content[i]
    if not seen_break and (el.t == "SoftBreak" or el.t == "LineBreak") then
      seen_break = true
    elseif seen_break then
      rest:insert(el)
    else
      title:insert(el)
    end
  end
  while #title > 0 and title[1].t == "Space" do title:remove(1) end

  local label = CALLOUT_KINDS[kind]
  local heading = pandoc.List({ pandoc.Span(pandoc.Str(label), { class = "callout-kind" }) })
  if #title > 0 then
    heading:insert(pandoc.Span(title, { class = "callout-title-text" }))
  end

  local body = pandoc.List()
  if #rest > 0 then body:insert(pandoc.Para(rest)) end
  for i = 2, #bq.content do body:insert(bq.content[i]) end

  local blocks = pandoc.List({ pandoc.Div(pandoc.Plain(heading), { class = "callout-title" }) })
  blocks:insert(pandoc.Div(body, { class = "callout-body" }))
  return pandoc.Div(blocks, { class = "callout callout-" .. kind:lower() })
end

function BlockQuote(bq)
  return callout_from(bq)
end

-- ---------------------------------------------------------------- code

-- Pipe tables need "|" escaped as "\|" even inside `code`; GitHub drops the
-- backslash when rendering, so we do too.
function Code(c)
  c.text = c.text:gsub("\\|", "|")
  return c
end

local function html_escape(s)
  return (s:gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"))
end

function CodeBlock(cb)
  if cb.classes:includes("mermaid") then
    return pandoc.RawBlock("html",
      '<figure class="diagram"><pre class="mermaid">' .. html_escape(cb.text) .. "</pre></figure>")
  end

  if cb.classes:includes("output") then
    cb.classes = pandoc.List({ "text" })
    cb.attributes["data-kind"] = "output"
  end

  -- "// file: path" or "# file: path" on the first line becomes a filename tab.
  local first, rest = cb.text:match("^([^\n]*)\n?(.*)$")
  local filename = first and (first:match("^%s*//%s*file:%s*(%S+)%s*$")
                           or first:match("^%s*#%s*file:%s*(%S+)%s*$")
                           or first:match("^%s*%-%-%s*file:%s*(%S+)%s*$")
                           or first:match("^%s*\\%*%s*file:%s*(%S+)%s*$"))
  local lang = cb.classes[1] or "text"

  if filename then
    cb.text = rest
  end

  local label = filename or (lang ~= "text" and lang or nil)
  if cb.attributes["data-kind"] == "output" then label = "output" end
  if lang == "sh" or lang == "bash" or lang == "console" or lang == "shell" then
    label = filename or "shell"
  end

  local classes = { "codeblock", "lang-" .. lang }
  if filename then table.insert(classes, "has-file") end

  local children = pandoc.List()
  if label then
    children:insert(pandoc.Div(pandoc.Plain(pandoc.Str(label)), { class = "codeblock-label" }))
  end
  children:insert(cb)
  return pandoc.Div(children, { class = table.concat(classes, " ") })
end
