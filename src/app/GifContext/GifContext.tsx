import fs from 'fs';
import path from 'path';
import url from 'url';
import _ from 'lodash';

export type GifInfo =
{
    personishTags: string[]
    otherTags: string[]
    sortBy: string
    url: string
};

const _categoryOrder = [
    'Hi',
    'Bye',
    'Yes',
    'No',
    'ComplimentCongratulations',
    'ThankYou',
    'HappinessSatisfaction',
    'ConfusionSurprise',
    'Frustration',
    'SadnessRegret',
    'Other'
] as const;

export type Category = typeof _categoryOrder[number];

export const CategoryDisplay: Record<Category, string> = {
    'Hi': "Hi",
    'Bye': "Bye",
    'Yes': "Yes",
    'No': "No",
    'ComplimentCongratulations': "Compliment/Congratulations",
    'ThankYou': "Thank You",
    'HappinessSatisfaction': "Happiness/Satisfaction",
    'ConfusionSurprise': "Confusion/Surprise",
    'Frustration': "Frustration",
    'SadnessRegret': "Sadness/Regret",
    'Other': "Other"
};

export const categoryOrder: readonly Category[] = _categoryOrder;

export type CategoryGifs = Record<Category, GifInfo[]>;

export type SourceFolders = Record<string, CategoryGifs>;


const publicRootUrl = url.pathToFileURL(path.join(process.cwd(), 'public')).href;
const tagRegex = /\([^)]+\)/g;
function createGifInfoFromFilePath(filePath: string)
{
    const fileName = path.basename(filePath).replace('¿', '?'); // File names don't allow ? so I used ¿; change it to ?
    const [firstTag, ...otherTags] = fileName.match(tagRegex)?.map(tag => tag.slice(1, -1)) || [];
    const personishTags = firstTag.split('│'); // Not | but │ (Alt + 124) because | can't be used in file names
    
    const gifInfo: GifInfo =
    {
        personishTags,
        otherTags,
        sortBy: [
            ...(otherTags.map(tag => tag.replace('“', '').replace('”', ''))), // Discard quote characters for sorting purposes
            ...personishTags
        ].join(' '),
        url: url.pathToFileURL(filePath).href.replace(publicRootUrl, '')
    };
    
    return gifInfo;
}

export function getAllTheGifs()
{
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

