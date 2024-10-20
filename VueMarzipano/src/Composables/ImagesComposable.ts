import { computed } from 'vue';
import { filename } from 'pathe/utils';

interface ImagesComposable {
    getImageSrc: (fileName: string) => string | undefined;
}

function useImages(): ImagesComposable {
    const images = computed(() => {
        const glob = import.meta.glob('../assets/**/*.(png|jpeg|svg)', { eager: true });
        return Object.fromEntries(
            Object.entries(glob).map(([key, value]) => [filename(key), value.default])
        );
    });

    const getImageSrc = (fileName: string): string | undefined => {
        return images.value[filename(fileName)];
    };

    return { getImageSrc };
}

export { useImages };