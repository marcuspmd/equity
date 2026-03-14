#!/bin/bash

# Image Management Helper Script
# Provides easy commands for managing images with Nano Banana integration

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGES_DIR="$PROJECT_ROOT/public/images"
SCRIPTS_DIR="$PROJECT_ROOT/scripts"

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

show_help() {
    cat << EOF
${BLUE}🖼️  Image Management Helper${NC}

${YELLOW}Usage:${NC}
  ./scripts/images.sh [command] [options]

${YELLOW}Commands:${NC}
  download        Download missing images (Wikipedia)
  download-nano   Download using Nano Banana API
  validate        Validate image integrity
  stats           Show image statistics
  list            List all images
  clean           Delete all images (BE CAREFUL!)
  help            Show this help message

${YELLOW}Nano Banana Integration:${NC}
  ./scripts/images.sh download-nano [API_KEY]

  Examples:
    ./scripts/images.sh download-nano
    ./scripts/images.sh download-nano your_api_key_here
    NANO_BANANA_API_KEY=key ./scripts/images.sh download-nano

${YELLOW}Environment Variables:${NC}
  NANO_BANANA_API_KEY    Your Nano Banana API key

${YELLOW}Examples:${NC}
  # Quick validation
  ./scripts/images.sh validate

  # Download with statistics
  ./scripts/images.sh download && ./scripts/images.sh stats

  # Use Nano Banana (requires API key)
  NANO_BANANA_API_KEY=your_key ./scripts/images.sh download-nano

  # Full setup: validate, download, check stats
  ./scripts/images.sh validate && \\
  ./scripts/images.sh download && \\
  ./scripts/images.sh stats

${YELLOW}API Key Setup:${NC}
  1. Get your Nano Banana API key from: https://www.banana.dev/
  2. Set it as environment variable: export NANO_BANANA_API_KEY=your_key
  3. Or pass it as argument: ./scripts/images.sh download-nano your_key
  4. Or add to .env file in project root

${YELLOW}Troubleshooting:${NC}
  • If images don't download: Check internet connection
  • If validation fails: Try re-downloading with --force
  • If Nano Banana fails: Falls back to Wikipedia automatically
  • Check logs for detailed error messages

EOF
}

# Main commands
cmd_download() {
    print_header "🖼️  Downloading Missing Images"
    print_info "Using Wikipedia API (free, no key required)"

    cd "$PROJECT_ROOT"
    node "$SCRIPTS_DIR/download-images-duckduckgo.mjs"
}

cmd_download_nano() {
    local api_key="${1:-$NANO_BANANA_API_KEY}"

    print_header "🖼️  Downloading Images with Nano Banana"

    if [ -z "$api_key" ]; then
        print_warning "No API key provided!"
        echo -e "${YELLOW}Setup:${NC}"
        echo "  1. Get key from: https://www.banana.dev/"
        echo "  2. Pass as argument: ./scripts/images.sh download-nano YOUR_KEY"
        echo "  3. Or set environment: export NANO_BANANA_API_KEY=YOUR_KEY"
        echo ""
        print_info "Falling back to Wikipedia API..."
        cmd_download
        return
    fi

    print_success "Using API key: ${api_key:0:10}***"

    cd "$PROJECT_ROOT"
    export NANO_BANANA_API_KEY="$api_key"
    node "$SCRIPTS_DIR/manage-images.mjs"
}

cmd_validate() {
    print_header "🔍 Validating Images"

    cd "$PROJECT_ROOT"
    node "$SCRIPTS_DIR/validate-images.mjs" validate
}

cmd_stats() {
    print_header "📊 Image Statistics"

    cd "$PROJECT_ROOT"
    node "$SCRIPTS_DIR/validate-images.mjs" stats
}

cmd_list() {
    print_header "📋 Image List"

    cd "$PROJECT_ROOT"
    node "$SCRIPTS_DIR/manage-images.mjs" --list
}

cmd_clean() {
    print_warning "This will DELETE all images from $IMAGES_DIR"
    read -p "Are you sure? Type 'yes' to confirm: " confirm

    if [ "$confirm" = "yes" ]; then
        print_info "Deleting all images..."
        rm -rf "$IMAGES_DIR"/*.{jpg,jpeg,png,gif,webp}
        print_success "Images deleted"
    else
        print_info "Cleanup cancelled"
    fi
}

# Parse command
COMMAND="${1:-help}"

case "$COMMAND" in
    download)
        cmd_download
        ;;
    download-nano)
        cmd_download_nano "$2"
        ;;
    validate)
        cmd_validate
        ;;
    stats)
        cmd_stats
        ;;
    list)
        cmd_list
        ;;
    clean)
        cmd_clean
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $COMMAND"
        echo ""
        show_help
        exit 1
        ;;
esac
