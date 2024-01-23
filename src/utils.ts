export function getImageUrl(src)
{
    return new URL(`./${src}`, import.meta.url).href;
}