# 🖼️ Image Management Guide

Complete guide for managing images in the "Pioneering Women in Tech" gallery project.

## 📊 Current Status

✅ **120 images** downloaded and validated
- **111 JPEG** files
- **9 PNG** files
- **17.28 MB** total size
- Average: **147.5 KB** per image

All images are healthy and properly formatted.

## 🚀 Quick Commands

### Download Images
```bash
# Download missing images (skips existing)
npm run images:download

# Manage images with fallback sources
npm run images:manage

# Force re-download all images
npm run images:manage:force
```

### View & Validate
```bash
# List all images
npm run images:list

# Validate image integrity
npm run images:validate

# Show image statistics
npm run images:stats

# Full validation report
npm run images:check
```

## 🔗 Image Sources (Fallback Order)

The image management system uses multiple sources with intelligent fallback:

1. **Nano Banana API** (if configured)
   ```bash
   NANO_BANANA_API_KEY=your_api_key npm run images:manage
   ```

2. **Wikipedia API**
   - Free, no authentication required
   - High-quality biographical images
   - Automatically handles redirects

3. **WikiCommons API**
   - Free media repository
   - Comprehensive coverage
   - Open-source images

## 📝 Configuration

### Using Google Nano Banana API

To use the Nano Banana API for image search:

```bash
# Set API key (replace with your actual key)
export NANO_BANANA_API_KEY="your_api_key_here"

# Download with Nano Banana
npm run images:manage
```

The system will:
1. Try Nano Banana API first
2. Fall back to Wikipedia if Nano Banana fails
3. Fall back to WikiCommons if Wikipedia fails

### Environment Setup

Create a `.env` file in the project root (optional):

```
NANO_BANANA_API_KEY=your-api-key
```

Then load it before running commands:
```bash
source .env
npm run images:manage
```

## 📋 Image List Format

The `public/images/images.md` file should follow this format:

```markdown
# Pioneering Women in Tech - Image Gallery

![Person Name](./person-name.jpg) Person Name
![Another Person](./another-person.jpg) Another Person
```

Each line should have:
- Image alt text: `Person Name`
- Image filename: `./person-name.jpg` or `./person-name.png`
- Display name (optional)

## 🔍 Scripts Reference

### `download-images-duckduckgo.mjs`
Simple downloader using Wikipedia API. Single execution.
- Downloads missing images only
- No force re-download option
- Good for initial setup

**Usage:**
```bash
node scripts/download-images-duckduckgo.mjs
npm run images:download
```

### `manage-images.mjs`
Advanced image manager with multiple options.
- Multiple source fallbacks
- Force re-download capability
- Nano Banana API support
- Configurable behavior

**Usage:**
```bash
# Show help
node scripts/manage-images.mjs --help

# Download missing images
npm run images:manage

# Force re-download all
npm run images:manage:force

# List images without downloading
npm run images:manage:list

# With Nano Banana API
NANO_BANANA_API_KEY=key npm run images:manage
```

### `validate-images.mjs`
Image validation and statistics tool.
- Checks file integrity
- Verifies image format (JPEG, PNG, WebP, GIF)
- Reports file size issues
- Provides statistics

**Usage:**
```bash
# Validate all images
node scripts/validate-images.mjs validate
npm run images:validate

# Get statistics
node scripts/validate-images.mjs stats
npm run images:stats

# Full report
node scripts/validate-images.mjs all
npm run images:check
```

## 📊 Validation Report

The validator checks:
- ✅ **File Size**: Must be > 1KB (eliminates empty/corrupted files)
- ✅ **Magic Bytes**: Verifies actual image format
- ✅ **Format Support**: JPEG, PNG, WebP, GIF
- ✅ **File Integrity**: Checks read access

Example output:
```
🔍 Validating images...

📊 Found 120 image files

✅ ada-lovelace.png: PNG (533.1KB)
✅ adele-goldberg.jpg: JPEG (37.9KB)
...

📊 Summary:
✅ Valid: 120
❌ Invalid: 0
💾 Total size: 17.28MB
```

## 🐛 Troubleshooting

### Images Not Downloading

1. **Check internet connection**
   ```bash
   curl -I https://en.wikipedia.org/
   ```

2. **Run with verbose output**
   ```bash
   npm run images:manage
   # Look for specific person names that failed
   ```

3. **Force re-download specific person**
   ```bash
   NANO_BANANA_API_KEY=key npm run images:manage:force
   ```

### Image Quality Issues

If images are too small (< 1KB validation error):

1. Validate to find problematic images
   ```bash
   npm run images:validate
   ```

2. Re-download specific images
   ```bash
   npm run images:manage:force
   ```

3. Manually add images to `public/images/` directory

### API Errors

**Wikipedia API Error:**
- Usually rate-limiting related
- Wait 30 seconds and retry
- Check Wikipedia has content for the person

**Nano Banana API Error:**
- Verify API key is valid
- Check quota usage in Nano Banana dashboard
- Fallback to Wikipedia will be attempted

## 🎯 Best Practices

1. **Validate after downloading**
   ```bash
   npm run images:check
   ```

2. **Use Nano Banana for better results** (if available)
   ```bash
   NANO_BANANA_API_KEY=your_key npm run images:manage
   ```

3. **Keep images.md updated**
   - Add new images to the markdown file
   - Follow the naming convention
   - Re-run download script

4. **Monitor image statistics**
   ```bash
   npm run images:stats
   ```

## 📞 Support

For issues with:
- **Wikipedia API**: Visit https://www.wikipedia.org/
- **Nano Banana API**: Check https://www.banana.dev/
- **WikiCommons**: Visit https://commons.wikimedia.org/

## 📝 Notes

- Image searches use the person's name as defined in `images.md`
- The system automatically handles HTTP redirects
- Rate limiting (300ms between requests) to avoid API throttling
- All scripts are Node.js ES modules (`.mjs`)
- No external database required
