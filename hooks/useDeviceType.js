"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook untuk mendeteksi tipe device (mobile vs desktop)
 * Bisa membedakan antara:
 * - Mobile device yang dibuka di desktop mode (resize browser)
 * - Desktop device asli
 * 
 * @returns {Object} { isMobileDevice, isDesktopDevice, viewportWidth, deviceType }
 */
export function useDeviceType() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobileDevice: false,
    isDesktopDevice: false,
    viewportWidth: 0,
    deviceType: "unknown", // "mobile" | "desktop" | "tablet" | "unknown"
  });

  useEffect(() => {
    const detectDevice = () => {
      // 1. Deteksi viewport width
      const viewportWidth = window.innerWidth;

      // 2. Deteksi touch capability (mobile device biasanya punya touch)
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // 3. Deteksi user agent untuk mobile
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );

      // 4. Deteksi screen size vs viewport (mobile device biasanya punya screen kecil)
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const isSmallScreen = screenWidth < 1024 || screenHeight < 768;

      // 5. Deteksi pointer type (CSS media query)
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const hasHover = window.matchMedia("(hover: hover)").matches;

      // Logika deteksi:
      // Mobile device jika:
      // - User agent menunjukkan mobile DAN
      // - (Memiliki touch capability ATAU screen kecil)
      const isMobileDevice =
        isMobileUA && (hasTouch || isSmallScreen || (!hasFinePointer && !hasHover));

      // Desktop device jika:
      // - Bukan mobile UA DAN
      // - (Memiliki fine pointer DAN hover) ATAU screen besar
      const isDesktopDevice =
        !isMobileUA &&
        ((hasFinePointer && hasHover) || (!isSmallScreen && !hasTouch));

      // Tentukan device type
      let deviceType = "unknown";
      if (isMobileDevice) {
        deviceType = viewportWidth < 768 ? "mobile" : "tablet";
      } else if (isDesktopDevice) {
        deviceType = "desktop";
      } else {
        // Fallback: gunakan viewport width
        if (viewportWidth < 768) {
          deviceType = "mobile";
        } else if (viewportWidth < 1024) {
          deviceType = "tablet";
        } else {
          deviceType = "desktop";
        }
      }

      setDeviceInfo({
        isMobileDevice,
        isDesktopDevice,
        viewportWidth,
        deviceType,
      });
    };

    // Deteksi awal
    detectDevice();

    // Update saat resize
    window.addEventListener("resize", detectDevice, { passive: true });
    window.addEventListener("orientationchange", detectDevice, { passive: true });

    return () => {
      window.removeEventListener("resize", detectDevice);
      window.removeEventListener("orientationchange", detectDevice);
    };
  }, []);

  return deviceInfo;
}

/**
 * Hook sederhana untuk cek apakah device mobile (bukan hanya viewport)
 * @returns {boolean}
 */
export function useIsMobileDevice() {
  const { isMobileDevice } = useDeviceType();
  return isMobileDevice;
}

/**
 * Hook sederhana untuk cek apakah device desktop (bukan hanya viewport)
 * @returns {boolean}
 */
export function useIsDesktopDevice() {
  const { isDesktopDevice } = useDeviceType();
  return isDesktopDevice;
}

