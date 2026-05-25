"""OCR for uploaded complaint documents (images/PDF pages as images)."""

from io import BytesIO

from PIL import Image


def extract_text_from_image(image_bytes: bytes) -> str:
    try:
        import pytesseract
    except ImportError as exc:
        raise RuntimeError("pytesseract is required for OCR") from exc

    image = Image.open(BytesIO(image_bytes))
    return pytesseract.image_to_string(image).strip()
