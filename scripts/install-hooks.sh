#!/bin/sh
# Cài git hook pre-push cho repo hiện tại.
set -e

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "✖ Thư mục này chưa phải git repo."
  echo "  Chạy 'git init' trước, rồi chạy lại 'npm run hooks:install'."
  exit 1
fi

hooks_dir="$(git rev-parse --git-path hooks)"
mkdir -p "$hooks_dir"
cp scripts/pre-push "$hooks_dir/pre-push"
chmod +x "$hooks_dir/pre-push" scripts/check-changelog.sh

echo "✓ Đã cài hook pre-push vào $hooks_dir/pre-push"
echo "  Từ giờ, push mà chưa cập nhật CHANGELOG.md sẽ bị chặn."
