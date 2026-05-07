import React from "react";
import "./SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster"></div>
      <div className="skeleton-line title"></div>
      <div className="skeleton-line small"></div>
    </div>
  );
}

export default SkeletonCard;