#!/usr/bin/env python3
"""
File Organizer CLI Tool

Sorts files in a directory into subdirectories based on file type.
"""

import os
import shutil
import argparse
from pathlib import Path
from datetime import datetime


FILE_CATEGORIES = {
    "images": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"],
    "documents": [".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt", ".xls", ".xlsx", ".csv"],
    "videos": [".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv"],
    "audio": [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"],
    "archives": [".zip", ".tar", ".gz", ".bz2", ".7z", ".rar"],
    "code": [".py", ".js", ".html", ".css", ".java", ".cpp", ".c", ".h", ".go", ".rs"],
    "executables": [".exe", ".msi", ".dmg", ".app", ".deb", ".rpm"],
}


def get_category(filename: str) -> str | None:
    """Determine the category for a file based on its extension."""
    ext = Path(filename).suffix.lower()
    for category, extensions in FILE_CATEGORIES.items():
        if ext in extensions:
            return category
    return None


def organize_files(source_dir: Path, dry_run: bool = False, verbose: bool = False) -> dict:
    """
    Organize files in the source directory into categorized subdirectories.
    
    Returns a summary of actions taken.
    """
    summary = {"moved": [], "skipped": [], "errors": []}
    
    if not source_dir.exists():
        raise FileNotFoundError(f"Directory not found: {source_dir}")
    
    files = [f for f in source_dir.iterdir() if f.is_file()]
    
    for file_path in files:
        category = get_category(file_path.name)
        
        if category is None:
            if verbose:
                print(f"  Skipped (unknown type): {file_path.name}")
            summary["skipped"].append(file_path.name)
            continue
        
        target_dir = source_dir / category
        target_path = target_dir / file_path.name
        
        # Handle duplicate filenames
        if target_path.exists():
            stem = Path(file_path.name).stem
            suffix = Path(file_path.name).suffix
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            new_name = f"{stem}_{timestamp}{suffix}"
            target_path = target_dir / new_name
        
        if dry_run:
            if verbose:
                print(f"  Would move: {file_path.name} -> {category}/")
            summary["moved"].append(f"{file_path.name} -> {category}/")
            continue
        
        try:
            target_dir.mkdir(exist_ok=True)
            shutil.move(str(file_path), str(target_path))
            if verbose:
                print(f"  Moved: {file_path.name} -> {category}/")
            summary["moved"].append(f"{file_path.name} -> {category}/")
        except Exception as e:
            if verbose:
                print(f"  Error moving {file_path.name}: {e}")
            summary["errors"].append(f"{file_path.name}: {e}")
    
    return summary


def main():
    parser = argparse.ArgumentParser(
        description="Organize files by type into categorized subdirectories."
    )
    parser.add_argument(
        "target",
        nargs="?",
        default=".",
        help="Directory to organize (default: current directory)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be done without making changes"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Print detailed progress"
    )
    
    args = parser.parse_args()
    
    source_dir = Path(args.target).resolve()
    
    if args.dry_run:
        print("[DRY RUN] No files will be moved")
    
    print(f"Organizing: {source_dir}")
    
    summary = organize_files(source_dir, dry_run=args.dry_run, verbose=args.verbose)
    
    print(f"\nSummary: {len(summary['moved'])} moved, "
          f"{len(summary['skipped'])} skipped, "
          f"{len(summary['errors'])} errors")


if __name__ == "__main__":
    main()
