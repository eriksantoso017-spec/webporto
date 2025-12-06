import { splitToChars } from "./textUtils";

/**
 * Komponen untuk render responsive text dengan multiple breakpoints
 * @param {Object} props
 * @param {Object} props.breakpoints - Object dengan key breakpoint dan value JSX content
 * @param {string} props.baseClass - Base class untuk semua span elements
 * @param {string} props.defaultKey - Key untuk default/fallback content
 */
export const ResponsiveText = ({ breakpoints, baseClass = "", defaultKey = "full" }) => {
  return (
    <>
      {Object.entries(breakpoints).map(([key, content]) => (
        <span key={key} className={`${baseClass}-${key}`}>
          {content}
        </span>
      ))}
    </>
  );
};

/**
 * Helper untuk membuat responsive text dengan format standar
 */
export const createResponsiveText = (variants, baseClass) => {
  return <ResponsiveText breakpoints={variants} baseClass={baseClass} />;
};

/**
 * Helper untuk membuat text dengan character splitting
 */
export const createCharSplitText = (text, charClass, colorClass = "") => {
  return (
    <span className={colorClass}>
      {splitToChars(text, charClass)}
    </span>
  );
};

