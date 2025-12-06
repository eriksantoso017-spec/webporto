import { splitToChars } from "@/utils/textUtils";

// Home Title Variants
export const HomeTitleVariants = () => ({
  full: (
    <>
      Hello, I'm <span className="text-purple-500">Erik Santoso</span>
    </>
  ),
  "break-271-280": (
    <>
      Hello, I'm
      <br />
      <span className="text-purple-500">Erik Santoso</span>
    </>
  ),
  "break-221-270": (
    <>
      Hello,
      <br />
      I'm <span className="text-purple-500">Erik</span>
      <br />
      <span className="text-purple-500">Santoso</span>
    </>
  ),
  "break-151-220": (
    <>
      Hello,
      <br />
      I'm
      <br />
      <span className="text-purple-500">Erik</span>
      <br />
      <span className="text-purple-500">Santoso</span>
    </>
  ),
  "break-101-150": (
    <>
      Hello,
      <br />
      I'm
      <br />
      <span className="text-purple-500">Erik</span>
      <br />
      <span className="text-purple-500">Santoso</span>
    </>
  ),
  "break-91-100": (
    <>
      Hel
      <br />
      lo,
      <br />
      I'm
      <br />
      <span className="text-purple-500">Eri</span>
      <br />
      <span className="text-purple-500">k</span>
      <br />
      <span className="text-purple-500">San</span>
      <br />
      <span className="text-purple-500">tos</span>
      <br />
      <span className="text-purple-500">o</span>
    </>
  ),
  "break-90": (
    <>
      <span className="text-white">{splitToChars("Hello, I'm ", "home-char")}</span>
      <span className="text-purple-500">{splitToChars("Erik Santoso", "home-char")}</span>
    </>
  ),
});

// Home Subtitle Variants
export const HomeSubtitleVariants = () => ({
  full: "Undergraduate Communication Student",
  "break-271-280": (
    <>
      Undergraduate Communication
      <br />
      Student
    </>
  ),
  "break-221-270": (
    <>
      Undergraduate
      <br />
      Communication
      <br />
      Student
    </>
  ),
  "break-151-220": (
    <>
      Undergraduate
      <br />
      Communication
      <br />
      Student
    </>
  ),
  "break-101-150": (
    <>
      Undergraduate
      <br />
      Communication
      <br />
      Student
    </>
  ),
  "break-91-100": (
    <>
      Und
      <br />
      erg
      <br />
      rad
      <br />
      uat
      <br />
      e
      <br />
      Com
      <br />
      mun
      <br />
      ica
      <br />
      tion
      <br />
      Stu
      <br />
      den
      <br />t
    </>
  ),
  "break-90": (
    <span className="home-subtitle-break-90-text">
      {splitToChars("Undergraduate Communication Student", "home-char")}
    </span>
  ),
});

// Home Description Variants
export const HomeDescriptionVariants = () => ({
  full: (
    <>
      Part time designer and video editor. Full time Unemployer. Enjoy
      learning new things. Passionate about technology, editing, design,
      cyber security, OSINT and finance.
    </>
  ),
  "break-271-280": (
    <>
      Part time designer and
      <br />
      video editor. Full time
      <br />
      Unemployer. Enjoy learning
      <br />
      new things. Passionate about
      <br />
      technology, editing, design,
      <br />
      cyber security, OSINT and
      <br />
      finance.
    </>
  ),
  "break-221-270": (
    <>
      Part time designer
      <br />
      and video editor.
      <br />
      Full time Unemployer.
      <br />
      Enjoy learning new
      <br />
      things. Passionate about
      <br />
      technology, editing, design,
      <br />
      cyber security, OSINT
      <br />
      and finance.
    </>
  ),
  "break-151-220": (
    <>
      Part time
      <br />
      designer and
      <br />
      video editor.
      <br />
      Full time
      <br />
      Unemployer. Enjoy
      <br />
      learning new
      <br />
      things. Passionate
      <br />
      about technology,
      <br />
      editing, design,
      <br />
      cyber security,
      <br />
      OSINT and
      <br />
      finance.
    </>
  ),
  "break-101-150": (
    <>
      Part
      <br />
      time
      <br />
      designer
      <br />
      and
      <br />
      video
      <br />
      editor.
      <br />
      Full
      <br />
      time
      <br />
      Unemployer.
      <br />
      Enjoy
      <br />
      learning
      <br />
      new
      <br />
      things.
      <br />
      Passionate
      <br />
      about
      <br />
      technology,
      <br />
      editing,
      <br />
      design,
      <br />
      cyber
      <br />
      security,
      <br />
      OSINT
      <br />
      and
      <br />
      finance.
    </>
  ),
  "break-91-100": (
    <>
      Par
      <br />
      t
      <br />
      tim
      <br />
      e
      <br />
      des
      <br />
      ign
      <br />
      er
      <br />
      and
      <br />
      vid
      <br />
      eo
      <br />
      edi
      <br />
      tor.
      <br />
      Ful
      <br />
      l
      <br />
      tim
      <br />
      e
      <br />
      Un
      <br />
      emp
      <br />
      loy
      <br />
      er.
      <br />
      Enj
      <br />
      oy
      <br />
      lea
      <br />
      rni
      <br />
      ng
      <br />
      new
      <br />
      thi
      <br />
      ngs.
      <br />
      Pas
      <br />
      sio
      <br />
      nat
      <br />
      e
      <br />
      abo
      <br />
      ut
      <br />
      tec
      <br />
      hno
      <br />
      log
      <br />
      y,
      <br />
      edi
      <br />
      tin
      <br />
      g,
      <br />
      des
      <br />
      ign
      <br />
      ,
      <br />
      cyb
      <br />
      er
      <br />
      sec
      <br />
      uri
      <br />
      ty,
      <br />
      OSI
      <br />
      NT
      <br />
      and
      <br />
      fin
      <br />
      anc
      <br />
      e.
    </>
  ),
  "break-90": (
    <span className="home-description-break-90-text">
      {splitToChars(
        "Part time designer and video editor. Full time Unemployer. Enjoy learning new things. Passionate about technology, editing, design, cyber security, OSINT and finance.",
        "home-char"
      )}
    </span>
  ),
});

