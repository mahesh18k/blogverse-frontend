import React, { useState, useRef, useEffect } from 'react';
import './LazyImage.css';

const LazyImage = ({
  src,
  alt,
  className = '',
  style = {},
  skeletonVariant = 'default', // 'default', 'card', 'avatar', 'banner'
  width,
  height,
  usePlaceholder = true,
  onLoad,
  onError,
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isInView && !hasError) {
              setIsInView(true);
              setIsLoading(true);
              if (observerRef.current) {
                observerRef.current.unobserve(entry.target);
              }
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.1
        }
      );

      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isInView, hasError]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
    if (onError) onError();
  };

  const combinedStyle = {
    ...style,
    width: width || style.width,
    height: height || style.height
  };

  const renderSkeletonContent = () => {
    switch (skeletonVariant) {
      case 'card':
        return (
          <>
            <div className="skeleton-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <div className="skeleton-text">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line medium"></div>
            </div>
          </>
        );
      case 'avatar':
        return (
          <div className="skeleton-avatar-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        );
      case 'banner':
        return (
          <div className="skeleton-banner-content">
            <div className="skeleton-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          </div>
        );
      default:
        return (
          <div className="skeleton-default-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        );
    }
  };

  const getSkeletonClass = () => {
    switch (skeletonVariant) {
      case 'card':
        return 'image-skeleton-card';
      case 'avatar':
        return 'image-skeleton-avatar';
      case 'banner':
        return 'image-skeleton-banner';
      default:
        return 'image-skeleton-default';
    }
  };

  return (
    <div
      ref={imgRef}
      className={`lazy-image-container ${className}`}
      style={combinedStyle}
    >
      {/* Placeholder/Loading state */}
      {usePlaceholder && !isLoaded && !hasError && (
        <div className={`lazy-image-placeholder image-skeleton ${getSkeletonClass()} ${isLoading ? 'loading' : ''}`}>
          <div className="skeleton-shimmer">
            <div className="skeleton-content">
              {renderSkeletonContent()}
            </div>
          </div>
          {isLoading && (
            <div className="lazy-loading-overlay">
              <div className="lazy-loading-spinner"></div>
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="lazy-image-error">
          <div className="lazy-error-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#dc3545">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <p>Failed to load image</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={loading}
        />
      )}
    </div>
  );
};

export default LazyImage;