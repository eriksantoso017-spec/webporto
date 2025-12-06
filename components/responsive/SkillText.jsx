import { getAbbreviation } from "@/utils/textUtils";

/**
 * Generate skill-specific responsive text variants
 */
export const getSkillTextVariants = (skillName) => {
  const abbreviation = getAbbreviation(skillName);
  const variants = {
    abbreviation: abbreviation,
    "full-text": skillName,
  };

  // Skill-specific break variants
  switch (skillName) {
    case "Photoshop":
      variants["photoshop-break-250-285"] = (
        <>
          Photo-
          <br />
          shop
        </>
      );
      break;

    case "Communication":
      variants["communication-break-250-274"] = (
        <>
          Comm-
          <br />
          uni-
          <br />
          cation
        </>
      );
      variants["communication-break-275-360"] = (
        <>
          Communi-
          <br />
          cation
        </>
      );
      break;

    case "PowerPoint":
      variants["powerpoint-break-250-286"] = (
        <>
          Power-
          <br />
          Point
        </>
      );
      break;

    case "Time Management":
      variants["timemanagement-break-340-470"] = (
        <>
          Time
          <br />
          Management
        </>
      );
      variants["timemanagement-break-250-339"] = (
        <>
          Time
          <br />
          Manage-
          <br />
          ment
        </>
      );
      break;

    case "Premiere Pro":
      variants["premiere-pro-break-250-320"] = (
        <>
          Premiere
          <br />
          Pro
        </>
      );
      break;

    case "Problem Solving":
      variants["problem-solving-break-250-339"] = (
        <>
          Problem
          <br />
          Solving
        </>
      );
      break;

    case "Team Work":
      variants["team-work-break-250-305"] = (
        <>
          Team
          <br />
          Work
        </>
      );
      break;

    default:
      variants["default-line-break"] = skillName;
      break;
  }

  return variants;
};

