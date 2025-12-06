/**
 * Helper function to split text into individual characters with spans
 */
export const splitToChars = (text, className = "") => {
  return text.split("").map((char, index) => {
    if (char === " ") {
      return (
        <span
          key={`space-${index}`}
          className={className}
          style={{ display: "block", height: "0.5em" }}
        ></span>
      );
    }
    return (
      <span key={`char-${index}`} className={className}>
        {char}
      </span>
    );
  });
};

/**
 * Helper function to get abbreviation (first letter + "..")
 */
export const getAbbreviation = (name) => {
  if (!name) return "";
  const firstLetter = name.charAt(0).toUpperCase();
  return `${firstLetter}..`;
};

/**
 * Helper function to get first word + ".."
 */
export const getFirstWordAbbreviation = (text) => {
  if (!text) return "";
  const firstWord = text.split(" ")[0];
  return `${firstWord}..`;
};

/**
 * Helper function to get first letter + ".."
 */
export const getFirstLetterAbbreviation = (text) => {
  if (!text) return "";
  const firstLetter = text.charAt(0).toUpperCase();
  return `${firstLetter}..`;
};

