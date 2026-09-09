#!/usr/bin/env bash
set -euo pipefail

MANIFEST="packages/ui/package.json"
CHANGELOG="CHANGELOG.md"
PACKAGE="@75neo/ui"
MAIN_BRANCH="master"

usage() {
  cat <<'USAGE'
Release @75neo/ui.

  scripts/release.sh prepare <version>   bump the manifest, write the changelog, open the pull request
  scripts/release.sh publish <version>   tag the merged commit and create the GitHub release

Land every other change on master first, each with its own conventional commit type. The release
pull request then carries nothing but the version bump and the new changelog section.
USAGE
}

die() {
  echo "error: $*" >&2
  exit 1
}

step() {
  echo "==> $*"
}

require_tool() {
  command -v "$1" > /dev/null 2>&1 || die "$1 is not installed."
}

repo_root() {
  git rev-parse --show-toplevel 2>/dev/null || die "not inside a git repository."
}

current_version() {
  node -p "require('./$MANIFEST').version"
}

validate_version() {
  [[ $1 =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$ ]] || die "\"$1\" is not a semantic version."
}

newer_than_current() {
  local next=$1 current
  current=$(current_version)
  [ "$next" != "$current" ] || die "$MANIFEST is already at $next."
  [ "$(printf '%s\n%s\n' "$current" "$next" | sort -V | head -1)" = "$current" ] ||
    die "$next is older than the current $current."
}

require_clean_tree() {
  git diff --quiet && git diff --cached --quiet || die "commit or stash your changes first."
}

require_main_branch() {
  local branch
  branch=$(git rev-parse --abbrev-ref HEAD)
  [ "$branch" = "$MAIN_BRANCH" ] || die "run this from $MAIN_BRANCH, currently on $branch."
}

require_synced() {
  git fetch --quiet origin "$MAIN_BRANCH"
  [ "$(git rev-parse HEAD)" = "$(git rev-parse "origin/$MAIN_BRANCH")" ] ||
    die "$MAIN_BRANCH differs from origin/$MAIN_BRANCH, pull or push first."
}

set_version() {
  node -e '
    const fs = require("node:fs");
    const [file, version] = process.argv.slice(1);
    const manifest = JSON.parse(fs.readFileSync(file, "utf8"));
    manifest.version = version;
    fs.writeFileSync(file, JSON.stringify(manifest, null, 2) + "\n");
  ' "$MANIFEST" "$1"
}

changelog_section() {
  awk -v want="$1" '
    /^## / { found = ($2 == want); next }
    found { print }
  ' "$CHANGELOG" | awk '
    NF { body = body sep $0; sep = "\n"; next }
    body { sep = sep "\n" }
    END { if (body) print body }
  '
}

prepare() {
  local version=$1 branch="release/v$1"

  validate_version "$version"
  require_tool node
  require_tool git-cliff
  require_tool gh
  require_clean_tree
  require_main_branch
  require_synced
  newer_than_current "$version"

  step "branching $branch"
  git checkout -b "$branch"

  step "setting $MANIFEST to $version"
  set_version "$version"

  step "adding the $version section to $CHANGELOG"
  git-cliff --unreleased --tag "v$version" --prepend "$CHANGELOG"

  if [ -z "$(changelog_section "$version")" ]; then
    echo "warning: nothing to report for $version, every commit since the last release is skipped by cliff.toml" >&2
  fi

  step "committing"
  git add "$MANIFEST" "$CHANGELOG"
  git commit --message "chore(release): $version"

  step "pushing and opening the pull request"
  git push --set-upstream origin "$branch"
  gh pr create --base "$MAIN_BRANCH" --head "$branch" \
    --title "chore(release): $version" \
    --body "$(printf 'Bumps %s to %s and regenerates the changelog.\n\n%s\n' \
      "$PACKAGE" "$version" "$(changelog_section "$version")")"

  echo
  echo "Merge the pull request, then run:"
  echo "  scripts/release.sh publish $version"
}

publish() {
  local version=$1 notes

  validate_version "$version"
  require_tool gh
  require_clean_tree
  require_main_branch
  require_synced

  [ "$(current_version)" = "$version" ] ||
    die "$MAIN_BRANCH has $(current_version), not $version. Merge the release pull request first."

  git fetch --quiet --tags origin
  ! git rev-parse "v$version" > /dev/null 2>&1 || die "tag v$version already exists."

  notes=$(changelog_section "$version")
  [ -n "$notes" ] || die "$CHANGELOG has no section for $version."

  step "creating release v$version"
  gh release create "v$version" \
    --target "$MAIN_BRANCH" \
    --title "$version" \
    --notes "$notes"

  echo
  echo "The release workflow publishes $PACKAGE $version over OIDC. Follow it with:"
  echo "  gh run watch \$(gh run list --workflow=release.yml --limit 1 --json databaseId --jq '.[0].databaseId')"
}

main() {
  cd "$(repo_root)"

  case "${1-}" in
    prepare | publish)
      [ $# -eq 2 ] || die "$1 needs a version, for example 1.0.2."
      "$1" "$2"
      ;;
    -h | --help | "")
      usage
      ;;
    *)
      usage
      exit 1
      ;;
  esac
}

main "$@"
