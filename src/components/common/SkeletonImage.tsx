import React, { useState, useEffect, useRef } from 'react';
import './SkeletonImage.css';

export interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  skeletonClassName?: string;
  skeletonBorderRadius?: string | number;
  showSpinner?: boolean;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  containerStyle,
  skeletonClassName = '',
  skeletonBorderRadius,
  showSpinner = false,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    setIsLoaded(true);
    if (onError) onError(e);
  };

  return (
    <div
      className={`skeleton-img-container ${containerClassName} ${isLoaded ? 'skeleton-img-container--loaded' : 'skeleton-img-container--loading'}`}
      style={containerStyle}
    >
      {!isLoaded && !hasError && (
        <div
          className={`skeleton-img-placeholder ${skeletonClassName}`}
          style={{ borderRadius: skeletonBorderRadius }}
          aria-hidden="true"
        >
          <div className="skeleton-img-shimmer" />
          {showSpinner && (
            <div className="skeleton-img-spinner">
              <svg className="skeleton-spinner-svg" viewBox="0 0 50 50">
                <circle
                  className="skeleton-spinner-path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="4"
                />
              </svg>
            </div>
          )}
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`skeleton-img-element ${className} ${isLoaded ? 'skeleton-img--loaded' : 'skeleton-img--loading'}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default SkeletonImage;
