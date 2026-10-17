# TITAN OS — Multi-Platform Releases & Deployment

### 📱 Android (Signed Release APKs)
Pre-compiled and cryptographically signed with release keystore (`SHA-256 with RSA 2048-bit`, Android APK Signature Scheme v2):
- **ARM64 (v8a modern 64-bit devices):** `releases/android/titan-os-arm64-v8a-release-signed.apk` (3.26 MB)
- **ARMv7a (32-bit legacy devices):** `releases/android/titan-os-armeabi-v7a-release-signed.apk` (3.26 MB)
- **Universal (All Android devices):** `releases/android/titan-os-universal-release-signed.apk` (3.26 MB)

#### Installation:
```bash
adb install releases/android/titan-os-arm64-v8a-release-signed.apk
```
Or transfer directly to your Android device and tap to install (enable "Install unknown apps" in Settings).

---

### 💻 Windows Desktop (.exe)
- **Standalone Executable:** Located in `dist-electron/win-unpacked/TITAN-OS.exe` (247 MB)
- **Launch Command:**
```powershell
.\dist-electron\win-unpacked\TITAN-OS.exe
```

---

### 🍏 iOS (Xcode Workspace)
- **Project Location:** `ios/App/App.xcworkspace`
- **Engine:** Capacitor 8 iOS Native Bridge with Swift 5
- **Building on macOS:**
```bash
npx cap open ios
# Or open in Xcode:
open ios/App/App.xcworkspace
# Select your Development Team in Signing & Capabilities -> Product -> Archive -> Export .ipa
```

---

### 🌐 Web & Live Dev Server
- Dev URL: `http://localhost:5173/`
- Production Build: `npm run build` (outputs to `/dist`)
