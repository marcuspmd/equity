#!/usr/bin/env bash

# Quick Reference Card for Image Management
# Copy commands directly into your terminal

##############################################
# 🚀 QUICK START
##############################################

# Show all images
npm run images:list

# Validate all images
npm run images:check

# Get image statistics
npm run images:stats

##############################################
# 📥 DOWNLOADING IMAGES
##############################################

# Download missing images (Wikipedia - recommended)
npm run images:download

# Download with multiple fallbacks
npm run images:manage

# Force re-download ALL images
npm run images:manage:force

# Download using Nano Banana API (requires API key)
NANO_BANANA_API_KEY=your_key npm run images:manage

# Using bash script helper
./scripts/images.sh download          # Wikipedia
./scripts/images.sh download-nano     # Nano Banana (with env var)
./scripts/images.sh download-nano abc123  # Nano Banana (with key)

##############################################
# ✅ VALIDATION & CHECKING
##############################################

# Validate image integrity
npm run images:validate

# Show statistics
npm run images:stats

# Full validation report
npm run images:check

# Using bash script
./scripts/images.sh validate
./scripts/images.sh stats
./scripts/images.sh list

##############################################
# 🔧 DIRECT COMMANDS
##############################################

# Simple download (DuckDuckGo API)
node scripts/download-images-duckduckgo.mjs

# Advanced management with Nano Banana support
node scripts/manage-images.mjs
node scripts/manage-images.mjs --force
node scripts/manage-images.mjs --list
node scripts/manage-images.mjs --help
NANO_BANANA_API_KEY=key node scripts/manage-images.mjs

# Validation tool
node scripts/validate-images.mjs validate
node scripts/validate-images.mjs stats
node scripts/validate-images.mjs all

##############################################
# 🔑 NANO BANANA API SETUP
##############################################

# 1. Get API key from https://www.banana.dev/

# 2. Export as environment variable (temporary)
export NANO_BANANA_API_KEY="your_api_key"

# 3. Or add to ~/.bashrc or ~/.zshrc (permanent)
echo 'export NANO_BANANA_API_KEY="your_api_key"' >> ~/.zshrc

# 4. Or create .env file in project root
echo 'NANO_BANANA_API_KEY=your_api_key' > .env

# 5. Load and use
source .env
npm run images:manage

##############################################
# 📊 CURRENT STATUS
##############################################

# Total images: 120 ✅
# Size: 17.28 MB
# Formats: 111 JPEG, 9 PNG
# Average size: 147.5 KB
# Status: All validated ✅

##############################################
# 💡 TIPS & TRICKS
##############################################

# Combined validation and stats
npm run images:check

# Download and validate in sequence
npm run images:download && npm run images:check

# Watch for image changes (requires 'watch' command)
watch npm run images:stats

# Generate image manifest (requires 'generate-images-md.mjs')
node scripts/generate-images-md.mjs

# Re-download failed images
npm run images:manage:force

# List missing images from images.md
npm run images:list | grep "❌"

##############################################
# 🐛 TROUBLESHOOTING
##############################################

# Check npm scripts availability
npm run --list

# Debug download process
set -x  # Enable debug
npm run images:download
set +x  # Disable debug

# Check specific API availability
curl -s https://en.wikipedia.org/w/api.php?action=query | head

# Force re-download with Nano Banana
NANO_BANANA_API_KEY=your_key npm run images:manage:force

# List images with status
npm run images:manage --list

##############################################
# 📝 FILE STRUCTURE
##############################################

# Images stored at:
# public/images/
# ├── sarah-kunst.jpg
# ├── adele-goldstine.jpg
# └── ...

# Image list in:
# public/images/images.md

# Scripts located in:
# scripts/
# ├── download-images-duckduckgo.mjs   (Simple downloader)
# ├── manage-images.mjs                 (Advanced manager)
# ├── validate-images.mjs               (Validator)
# └── images.sh                         (Bash helper)

##############################################
