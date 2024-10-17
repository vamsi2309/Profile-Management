import React, { CSSProperties, FC, HTMLAttributes } from "react";

const animateStyle: CSSProperties = {
  animation: "spin 1.2s linear infinite",
};

const loaderStyle: CSSProperties = {
  height: "100px",
  width: "100px",
  border: "16px solid gray",
  borderRadius: "50%",
  borderTop: "16px solid #3498db",
  position: "absolute",
  left: "43%",
  top: "34%",
  ...animateStyle,
};

const divStyle: CSSProperties = {
  position: "relative",
  height: "100vh",
};

const keyframesStyle = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

const Loader: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} style={divStyle}>
      <style>{keyframesStyle}</style>
      <div style={loaderStyle} />
    </div>
  );
};

export default Loader;
