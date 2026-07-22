#!/bin/sh
# Chặn push nếu code đổi mà CHANGELOG.md không đổi.
#
# Dùng theo 2 cách:
#   1. Git hook  — scripts/pre-push gọi lại file này (đọc danh sách ref từ stdin).
#   2. Thủ công  — `npm run changelog:check` so HEAD với nhánh upstream.
#
# Bỏ qua tạm thời (chỉ khi thật sự cần):  SKIP_CHANGELOG=1 git push

set -e

CHANGELOG="CHANGELOG.md"
# Đổi các đường dẫn này nếu cấu trúc dự án thay đổi.
WATCHED='^(src/|public/|index\.html|package\.json|vite\.config\.ts)'
ZERO="0000000000000000000000000000000000000000"

if [ "$SKIP_CHANGELOG" = "1" ]; then
  echo "⚠️  Bỏ qua kiểm tra changelog (SKIP_CHANGELOG=1)."
  exit 0
fi

# Trả về 1 nếu range có đụng code mà không đụng changelog.
check_range() {
  range="$1"
  changed=$(git diff --name-only "$range")
  [ -z "$changed" ] && return 0

  echo "$changed" | grep -Eq "$WATCHED" || return 0
  echo "$changed" | grep -Fxq "$CHANGELOG" && return 0

  echo ""
  echo "✖ Push bị chặn: có thay đổi code nhưng $CHANGELOG chưa được cập nhật."
  echo ""
  echo "  Khoảng commit: $range"
  echo "  File đã đổi:"
  echo "$changed" | grep -E "$WATCHED" | sed 's/^/    - /'
  echo ""
  echo "  Cách xử lý:"
  echo "    1. Thêm mục vào phần [Chưa phát hành] trong $CHANGELOG"
  echo "    2. git add $CHANGELOG && git commit --amend --no-edit   (hoặc commit mới)"
  echo "    3. git push"
  echo ""
  return 1
}

# --- Chế độ hook: đọc từng ref từ stdin -------------------------------------
if [ "$1" = "--hook" ]; then
  failed=0
  while read -r _local_ref local_sha _remote_ref remote_sha; do
    [ "$local_sha" = "$ZERO" ] && continue            # đang xoá nhánh
    if [ "$remote_sha" = "$ZERO" ]; then              # nhánh mới trên remote
      base=$(git merge-base "$local_sha" HEAD@{upstream} 2>/dev/null || echo "")
      [ -z "$base" ] && continue                      # không đối chiếu được thì bỏ qua
      range="$base..$local_sha"
    else
      range="$remote_sha..$local_sha"
    fi
    check_range "$range" || failed=1
  done
  exit $failed
fi

# --- Chế độ thủ công --------------------------------------------------------
upstream=$(git rev-parse --abbrev-ref '@{upstream}' 2>/dev/null || echo "")
if [ -z "$upstream" ]; then
  echo "Nhánh này chưa có upstream — không có gì để so sánh. Bỏ qua."
  exit 0
fi

check_range "$upstream..HEAD"
echo "✓ $CHANGELOG đã được cập nhật cho các commit sắp push."
