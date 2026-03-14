#!/usr/bin/env python3
"""
Download all episodes of "Ole schaut hin".

Usage:
    python3 ole_download.py preview
    python3 ole_download.py download
"""

import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET

ITUNES_ID = "1504249446"
OUTPUT_DIR = "ole_podcast"


def sanitize(name: str) -> str:
    return re.sub(r'[\\/*?:"<>|]', "_", name).strip()


def discover_feed_url() -> str:
    """Use the public iTunes lookup API to find the current RSS feed URL."""
    url = f"https://itunes.apple.com/lookup?id={ITUNES_ID}&entity=podcast"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        data = json.load(resp)
    results = data.get("results", [])
    if not results:
        raise RuntimeError("iTunes lookup returned no results")
    feed_url = results[0].get("feedUrl")
    if not feed_url:
        raise RuntimeError("No feedUrl in iTunes lookup response")
    return feed_url


def parse_feed(feed_url: str) -> list[dict]:
    print(f"Fetching feed: {feed_url}\n")
    req = urllib.request.Request(feed_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        tree = ET.parse(resp)

    items = tree.findall(".//item")
    episodes = []
    for i, item in enumerate(items, 1):
        title_el = item.find("title")
        title = sanitize(title_el.text) if title_el is not None else f"episode_{i:04d}"
        enclosure = item.find("enclosure")
        if enclosure is None:
            continue
        audio_url = enclosure.attrib.get("url", "")
        ext = audio_url.split("?")[0].rsplit(".", 1)[-1] or "mp3"
        filename = f"{i:04d}_{title}.{ext}"
        episodes.append({"index": i, "title": title, "url": audio_url, "filename": filename})

    return episodes


def cmd_preview(episodes: list[dict]) -> None:
    print(f"{'#':<6} {'Filename'}")
    print("-" * 80)
    for ep in episodes:
        print(f"{ep['index']:<6} {ep['filename']}")
    print(f"\n{len(episodes)} episodes total.")


def cmd_download(episodes: list[dict]) -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for ep in episodes:
        dest = os.path.join(OUTPUT_DIR, ep["filename"])
        if os.path.exists(dest):
            size = os.path.getsize(dest)
            if size >= 1024:
                print(f"[{ep['index']:04d}] Already exists, skipping: {ep['filename']}")
                continue
            else:
                print(f"[{ep['index']:04d}] File too small ({size}B), redownloading: {ep['filename']}")
        else:
            print(f"[{ep['index']:04d}] Downloading: {ep['filename']}")
        req = urllib.request.Request(ep["url"], headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as f:
            f.write(resp.read())
    print("\nDone.")

def main() -> None:
    if len(sys.argv) != 2 or sys.argv[1] not in ("preview", "download"):
        print("Usage: python3 ole_download.py <preview|download>")
        sys.exit(1)

    print("Discovering feed URL via iTunes API...")
    feed_url = discover_feed_url()
    episodes = parse_feed(feed_url)

    if sys.argv[1] == "preview":
        cmd_preview(episodes)
    else:
        cmd_download(episodes)


if __name__ == "__main__":
    main()
