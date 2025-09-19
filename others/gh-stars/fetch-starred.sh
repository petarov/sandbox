#!/usr/bin/env bash
# Fetch all starred repositories of a GitHub user and save as CSV
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: $0 <github-username> <github-token>"
  exit 1
fi

USER="$1"
TOKEN="$2"
PAGE=1
PER_PAGE=50
API="https://api.github.com/users/$USER/starred"
OUTPUT="starred_repos.csv"

# Write CSV header
echo "Name,Owner,Language,License,CreatedAt,UpdatedAt,Stars,Description,URL" > "$OUTPUT"

while true; do
  echo "Fetching page $PAGE..."
  RESPONSE=$(curl -s -H "Authorization: token $TOKEN" "$API?page=$PAGE&per_page=$PER_PAGE")

  # Break if empty array
  TRIMMED_RESPONSE=$(echo "$RESPONSE" | tr -d '[:space:]')
  if [[ "$TRIMMED_RESPONSE" == "[]" ]] || [[ -z "$TRIMMED_RESPONSE" ]]; then
    echo "No more pages. Good bye 😘"
    break
  fi

  # Extract fields and append to CSV
  echo "$RESPONSE" | jq -r '
    .[] | [
      .name,
      .owner.login,
      (.language // ""),
      (.license.name // ""),
      .created_at,
      .updated_at,
      .stargazers_count,
      (.description // "" | gsub("\n"; " ") | gsub("\""; "'\''")),
      .html_url
    ] | @csv
  ' >> "$OUTPUT"

  ((PAGE++))
done

echo "✅ Finished. Results saved in $OUTPUT"
