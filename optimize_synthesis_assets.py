from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent
SYNTHESIS_DIR = ROOT / 'assets' / 'synthesis'

FULL_DETAIL = {
    'Copilot_20260820_210234',
    'Copilot_20260820_211257',
    'Copilot_20260820_201148',
}

MAX_WIDTH = 1600
MAX_HEIGHT = 1400
WEBP_QUALITY = 68
AVIF_QUALITY = 58


def resize_for_web(path: Path, img: Image.Image) -> Image.Image:
    width, height = img.size
    if path.stem in FULL_DETAIL:
        max_width = 1600
        max_height = 1400
        quality_webp = 72
        quality_avif = 65
    else:
        max_width = 1200
        max_height = 1000
        quality_webp = 58
        quality_avif = 50

    if width <= max_width and height <= max_height:
        return img, quality_webp, quality_avif

    scale = min(max_width / width, max_height / height)
    if scale >= 1:
        return img, quality_webp, quality_avif

    new_size = (max(1, int(width * scale)), max(1, int(height * scale)))
    return img.resize(new_size, Image.Resampling.LANCZOS), quality_webp, quality_avif


for image_path in sorted(SYNTHESIS_DIR.glob('*.png')):
    try:
        with Image.open(image_path) as img:
            converted = img.convert('RGBA')
            resized, webp_quality, avif_quality = resize_for_web(image_path, converted)

            webp_path = image_path.with_suffix('.webp')
            resized.save(webp_path, 'WEBP', quality=webp_quality, method=6)
            print(f'Generated {webp_path.name}')

            try:
                avif_path = image_path.with_suffix('.avif')
                resized.save(avif_path, 'AVIF', quality=avif_quality)
                print(f'Generated {avif_path.name}')
            except Exception as exc:  # pragma: no cover - environment dependent
                print(f'Skipped AVIF for {image_path.name}: {exc}')
    except Exception as exc:  # pragma: no cover - robust script
        print(f'Failed to optimize {image_path.name}: {exc}')

print('Optimization complete.')
