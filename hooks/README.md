# Custom Hooks

## useDeviceType

Hook untuk mendeteksi tipe device dengan lebih akurat, bisa membedakan antara:
- **Mobile device** yang dibuka di desktop mode (resize browser)
- **Desktop device** asli

### Cara Kerja

Hook ini menggunakan beberapa teknik deteksi:

1. **User Agent Detection** - Membaca user agent string untuk mengetahui device type
2. **Touch Capability** - Mendeteksi apakah device memiliki touch capability
3. **Screen Size** - Membandingkan screen width dengan viewport width
4. **Pointer Type** - Menggunakan CSS media queries `(pointer: fine)` dan `(hover: hover)`

### Penggunaan

```javascript
import { useDeviceType, useIsMobileDevice, useIsDesktopDevice } from '@/hooks/useDeviceType';

// Opsi 1: Menggunakan hook lengkap
function MyComponent() {
  const { isMobileDevice, isDesktopDevice, viewportWidth, deviceType } = useDeviceType();
  
  return (
    <div>
      {isMobileDevice && <p>Ini adalah mobile device (meskipun di desktop mode)</p>}
      {isDesktopDevice && <p>Ini adalah desktop device asli</p>}
      <p>Viewport: {viewportWidth}px</p>
      <p>Device Type: {deviceType}</p>
    </div>
  );
}

// Opsi 2: Menggunakan hook sederhana
function MyComponent() {
  const isMobile = useIsMobileDevice();
  const isDesktop = useIsDesktopDevice();
  
  return (
    <div>
      {isMobile && <p>Mobile Device</p>}
      {isDesktop && <p>Desktop Device</p>}
    </div>
  );
}
```

### Return Values

#### useDeviceType()
- `isMobileDevice` (boolean): `true` jika device adalah mobile (meskipun viewport besar)
- `isDesktopDevice` (boolean): `true` jika device adalah desktop asli
- `viewportWidth` (number): Lebar viewport saat ini
- `deviceType` (string): `"mobile"` | `"tablet"` | `"desktop"` | `"unknown"`

#### useIsMobileDevice()
- Returns: `boolean` - `true` jika device mobile

#### useIsDesktopDevice()
- Returns: `boolean` - `true` jika device desktop

### Catatan Penting

⚠️ **Tidak 100% Akurat**: Deteksi device type tidak bisa 100% akurat karena:
- User bisa mengubah user agent
- Beberapa device hybrid (tablet dengan keyboard)
- Browser mobile bisa menyamar sebagai desktop

✅ **Best Practice**: Gunakan kombinasi deteksi ini dengan CSS media queries untuk hasil terbaik.

### Contoh Kasus

**Kasus 1: Mobile di Desktop Mode**
- User membuka website di iPhone
- User resize browser ke desktop mode (viewport > 1024px)
- `isMobileDevice` = `true` (karena user agent dan touch capability)
- `deviceType` = `"mobile"` atau `"tablet"`

**Kasus 2: Desktop Asli**
- User membuka website di laptop Windows
- Viewport > 1024px
- `isDesktopDevice` = `true`
- `deviceType` = `"desktop"`

