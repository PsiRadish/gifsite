import fs from 'fs';
import path from 'path';
import url from 'url';
import _ from 'lodash';
import { CategoryGifs, categoryOrder, GifInfo, SourceFolders } from '@/components/GifContext/GifContext.util';

const publicRootUrl = url.pathToFileURL(path.join(process.cwd(), 'public')).href;
const tagRegex = /\([^)]+\)/g;
function createGifInfoFromFilePath(filePath: string) {
    const fileName = path.basename(filePath).replaceAll('¿', '?'); // File names don't allow ? so I used ¿; change it to ?
    const [firstTag, ...otherTags] = fileName.match(tagRegex)?.map(tag => tag.slice(1, -1)) || [];
    const personishTags = firstTag.split('│'); // Not | but │ (Alt + 124) because | can't be used in file names

    const gifInfo: GifInfo =
    {
        personishTags,
        otherTags,
        sortBy: [
            ...(otherTags.map(tag => tag.replaceAll('“', '').replaceAll('”', ''))), // Discard quote characters for sorting purposes
            ...personishTags
        ].join(' '),
        url: url.pathToFileURL(filePath).href.replace(publicRootUrl, '')
    };

    return gifInfo;
}

export function getAllTheGifs() {
    // Get all the folders in public/gifs
    const sourcesRootPath = path.join(process.cwd(), 'public/gifs');
    const sourceFolders = fs.readdirSync(sourcesRootPath);

    const allTheThings: SourceFolders = {};

    sourceFolders.forEach(sourceFolder => {
        const sourceFolderPath = path.join(sourcesRootPath, sourceFolder);

        const categoryGifs: CategoryGifs = {} as any;
        categoryOrder.forEach(category => {
            const sourceAndCategoryPath = path.join(sourceFolderPath, category);

            const unsortedGifs = fs.readdirSync(sourceAndCategoryPath).map(fileName => {
                const filePath = path.join(sourceAndCategoryPath, fileName);
                return createGifInfoFromFilePath(filePath);
            });

            categoryGifs[category] = _.sortBy(unsortedGifs, gi => gi.sortBy);
        });

        allTheThings[sourceFolder] = categoryGifs;
    });

    return allTheThings;
}
