## 🚀 Element Hider Pro - Chrome Extension 🪄  
**Hide any webpage element with XPath magic!**  

![Demo](https://img.shields.io/badge/Demo-YouTube-red) ![License](https://img.shields.io/badge/License-MIT-blue)  

---

## 🌟 Features  
- **Default Rules for YouTube** 🎯  
  - Hide Video Titles 🚫📺  
  - Remove Top Control Bar 🎮  
  - Toggle Channel/Uploader Details 👤  

- **Custom XPath Rules** 🔍  
  - Add **any element** via XPath ✨  
  - Give rules **custom names** 🏷️  
  - Toggle visibility instantly ✅  

- **Clean Material UI** 🎨  
  - Modern switches & animations 🛠️  
  - Responsive design 📱  
  - Auto-save preferences 💾  

- **Advanced Tech** ⚡  
  - Handles dynamic content (e.g., infinite scroll) 🔄  
  - Lightweight & fast 🚄  

---

## 📥 Installation  
### Method 1: Load Unpacked Extension  
1. **Clone the repo**:  
   ```bash  
   git clone https://github.com/your-username/element-hider-pro.git  
   ```  
2. **Open Chrome**:  
   - Go to `chrome://extensions`  
   - Enable **Developer mode** (top-right toggle) 👩💻  

3. **Load Extension**:  
   - Click **Load unpacked** ➕  
   - Select the `element-hider-pro` folder  

### Method 2: Install from Chrome Web Store *(Coming Soon!)*  

---

## 🎯 Use Cases  
### 1. **YouTube Focus Mode** 🎥  
   - Hide distracting titles, descriptions, and channel details while watching videos.  
   - Example XPaths:  
     ```xpath  
     //ytd-watch-metadata//div[@id="title"]  
     //ytd-video-owner-renderer  
     ```  

### 2. **Custom Webpage Cleanup** 🌐  
   - Remove ads, cookie banners, or spoilers from **any site**!  
   - Example: Hide Twitter/X trends:  
     ```xpath  
     //div[@aria-label="Timeline: Trending now"]  
     ```  

---

## 🛠️ How to Get XPath of an Element  
1. **Right-click** the element you want to hide ➡️ **Inspect**  
2. In **DevTools**, right-click the HTML element ➡️ **Copy** ➡️ **Copy XPath** 📋  
   ![XPath Demo](demo/xpath-demo.gif)  
3. Paste it into the extension’s **Add XPath** dialog!  

---

## 🤝 Contributing  
1. Fork the repo 🍴  
2. Create a branch: `git checkout -b feature/amazing-feature`  
3. Commit changes: `git commit -m 'Add amazing feature'`  
4. Push: `git push origin feature/amazing-feature`  
5. Open a **Pull Request**!  

---

## 📜 License  
**MIT License** © 2023 [Your Name]  
> "Permission is hereby granted, free of charge..."  

---

## 🙏 Acknowledgments  
- Inspired by YouTube’s cluttered UI 😅  
- Built with Chrome Extension’s powerful `MutationObserver` API 🧪  

---
