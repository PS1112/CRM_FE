import { Tooltip } from "@mui/material"; 

const TruncatedText = ({ text, maxLength = 30, className = "", textStyleClassName="" }) => {
  const isTruncated = text.length > maxLength;
  const displayText = isTruncated ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className={className}>
      {isTruncated ? (
        <Tooltip title={text}>
          <span style={{ cursor: "pointer" }}>{displayText}</span>
        </Tooltip>
      ) : (
        <span className={textStyleClassName}>{text}</span>
      )}
    </div>
  );
};

export default TruncatedText;
