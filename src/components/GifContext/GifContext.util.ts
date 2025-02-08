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

export const categoryDisplay: Record<Category, string> = {
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
