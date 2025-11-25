"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Components";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

const ImageLightbox = ({ images, isOpen, onClose, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex || 0);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        setScale(1);
        setPosition({ x: 0, y: 0 });
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    if (!isOpen) return;
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    setScale((prev) => Math.min(Math.max(1, prev + delta), 4));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Calculate boundaries to prevent dragging outside viewport when zoomed
      if (scale > 1 && imgRef.current) {
        const imgElement = imgRef.current;
        const rect = imgElement.getBoundingClientRect();
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        // Calculate the actual scaled dimensions
        const scaledWidth = rect.width;
        const scaledHeight = rect.height;

        // Calculate max translation to keep image edges within viewport
        const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
        const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);

        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY)),
        });
      } else {
        // At scale 1, allow free movement for swipe detection
        setPosition({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setLastTouchDistance(distance);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const newX = e.touches[0].clientX - dragStart.x;
      const newY = e.touches[0].clientY - dragStart.y;

      // Calculate boundaries for touch as well when zoomed
      if (scale > 1 && imgRef.current) {
        const imgElement = imgRef.current;
        const rect = imgElement.getBoundingClientRect();
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        const scaledWidth = rect.width;
        const scaledHeight = rect.height;

        const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
        const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);

        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY)),
        });
      } else {
        setPosition({ x: newX, y: newY });
      }
    } else if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (lastTouchDistance > 0) {
        const scaleChange = distance / lastTouchDistance;
        setScale((prev) => Math.min(Math.max(1, prev * scaleChange), 4));
      }
      setLastTouchDistance(distance);
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsDragging(false);
      setLastTouchDistance(0);
    }
  };

  const swipeStartRef = useRef({ x: 0, y: 0 });

  const handleSwipe = (startX, endX) => {
    const diff = startX - endX;
    if (Math.abs(diff) > 50 && scale === 1) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleTouchStartSwipe = (e) => {
    swipeStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEndSwipe = (e) => {
    const swipeStart = swipeStartRef.current;
    if (!swipeStart.x || !swipeStart.y) return;
    const swipeEndX = e.changedTouches[0].clientX;
    const swipeEndY = e.changedTouches[0].clientY;
    const diffX = swipeStart.x - swipeEndX;
    const diffY = swipeStart.y - swipeEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      handleSwipe(swipeStart.x, swipeEndX);
    }
    swipeStartRef.current = { x: 0, y: 0 };
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget && scale === 1) {
          onClose();
        }
      }}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Close Button */}
      <Button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 hover:border-red-500 w-10 h-10 md:w-auto md:h-auto md:px-3 md:py-1.5 p-0 flex items-center justify-center rounded-lg transition-all duration-300 group shadow-lg hover:shadow-red-500/50"
      >
        <X className="w-6 h-6 md:w-4 md:h-4 md:mr-2 group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden md:inline">Close</span>
      </Button>

      {/* Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => {
          handleTouchStart(e);
          handleTouchStartSwipe(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={(e) => {
          handleTouchEnd(e);
          handleTouchEndSwipe(e);
        }}
        style={{
          cursor: isDragging ? "grabbing" : scale > 1 ? "move" : "grab",
        }}
      >
        <img
          ref={imgRef}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${
              position.y / scale
            }px)`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
          draggable={false}
        />
      </div>

      {/* Swipe Buttons */}
      {images.length > 1 && (
        <div className="absolute top-1/2 left-2 right-2 md:left-12 md:right-12 flex justify-between transform -translate-y-1/2 z-[10001] pointer-events-none">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="lightbox-swipe-btn-left !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0 pointer-events-auto"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="lightbox-swipe-btn-right !bg-black/50 !text-white hover:!bg-black/80 hover:!bg-opacity-80 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group animate-pulse-slow border-0 w-8 h-8 p-0 pointer-events-auto"
          >
            <ArrowRight className="w-4 h-4 transition-transform duration-300" />
          </Button>
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg border border-gray-700">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Zoom Indicator */}
      {scale > 1 && (
        <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg border border-gray-700">
          {Math.round(scale * 100)}%
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;

