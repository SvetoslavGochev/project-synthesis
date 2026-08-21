from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent
SYNTHESIS_DIR = ROOT / 'assets' / 'synthesis'
MAX_WIDTH = 1920
MAX_HEIGHT = 1600
WEBP_QUALITY = 75
AVIF_QUALITY = 65


def resize_for_web(path: Path, img: Image.Image) -> Image.Image:
    width, height = img.size
    if width <= MAX_WIDTH and height <= MAX_HEIGHT:
        return img

    scale = min(MAX_WIDTH / width, MAX_HEIGHT / height)
    if scale >= 1:
        return img

    new_size = (max(1, int(width * scale)), max(1, int(height * scale)))
    return img.resize(new_size, Image.Resampling.LANCZOS)


for image_path in sorted(SYNTHESIS_DIR.glob('*.png')):
    try:
        with Image.open(image_path) as img:
            converted = img.convert('RGBA')
            resized = resize_for_web(image_path, converted)

            webp_path = image_path.with_suffix('.webp')
            resized.save(webp_path, 'WEBP', quality=WEBP_QUALITY, method=6)
            print(f'Generated {webp_path.name}')

            try:
                avif_path = image_path.with_suffix('.avif')
                resized.save(avif_path, 'AVIF', quality=AVIF_QUALITY)
                print(f'Generated {avif_path.name}')
            except Exception as exc:  # pragma: no cover - environment dependent
                print(f'Skipped AVIF for {image_path.name}: {exc}')
    except Exception as exc:  # pragma: no cover - robust script
        print(f'Failed to optimize {image_path.name}: {exc}')

print('Optimization complete.')
