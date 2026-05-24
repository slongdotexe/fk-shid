#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MOBILE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

xcodebuild \
  -workspace "${MOBILE_DIR}/ios/LinkLaundryStage.xcworkspace" \
  -scheme LinkLaundryStage \
  -configuration Release \
  -destination "generic/platform=iOS" \
  clean archive \
  -archivePath "${MOBILE_DIR}/build/LinkLaundryStage.xcarchive"

xcodebuild \
  -exportArchive \
  -archivePath "${MOBILE_DIR}/build/LinkLaundryStage.xcarchive" \
  -exportPath "${MOBILE_DIR}/build/adhoc-ipa" \
  -exportOptionsPlist "${SCRIPT_DIR}/ExportOptionsAdHoc.stage.plist"

