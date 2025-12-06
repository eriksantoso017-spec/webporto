import { splitToChars } from "@/utils/textUtils";

// Landing Title Variants
export const LandingTitleVariants = () => ({
  full: (
    <>
      <span className="text-purple-400">import</span>
      <span className="text-[#D4D4D4]">{" { myPortfolio }"}</span>
    </>
  ),
  break: (
    <>
      <span className="text-purple-400">import</span>
      <span className="text-[#D4D4D4]">
        {" {"}
        <br />
        myPort-
        <br />
        folio
        <br />
        {" }"}
      </span>
    </>
  ),
  vertical: (
    <>
      <span className="text-purple-400 landing-title-vertical-import">
        {splitToChars("import", "landing-char")}
      </span>
      <span className="text-[#D4D4D4] landing-title-vertical-brace">
        {splitToChars(" {", "landing-char")}
      </span>
      <span className="text-[#D4D4D4] landing-title-vertical-portfolio">
        {splitToChars(" myPortfolio ", "landing-char")}
      </span>
      <span className="text-[#D4D4D4] landing-title-vertical-brace">
        {splitToChars(" }", "landing-char")}
      </span>
    </>
  ),
  vvertical: (
    <>
      <span className="text-purple-400 landing-title-vvertical-import">
        {splitToChars("import", "landing-char")}
      </span>
      <span className="text-[#D4D4D4] landing-title-vvertical-brace">
        {splitToChars(" {", "landing-char")}
      </span>
      <span className="text-[#D4D4D4] landing-title-vvertical-portfolio">
        {splitToChars(" myPortfolio ", "landing-char")}
      </span>
      <span className="text-[#D4D4D4] landing-title-vvertical-brace">
        {splitToChars(" }", "landing-char")}
      </span>
    </>
  ),
});

// Landing Subtitle Variants
export const LandingSubtitleVariants = () => ({
  full: "I hate being responsible-Ekko",
  "break-100-140": (
    <>
      I hate being respon-
      <br />
      sible-
      <br />
      Ekko
    </>
  ),
  "break-90-99": (
    <>
      I
      <br />
      hate
      <br />
      being
      <br />
      res-
      <br />
      pon-
      <br />
      sible-
      <br />
      Ekko
    </>
  ),
  vertical: (
    <span className="landing-subtitle-vertical-text">
      {splitToChars("I hate being responsible-Ekko", "landing-char")}
    </span>
  ),
});

