import { http } from '@/utils/http';
import { url } from 'inspector';

export const getTagsList = () => {
    return http<Tag[]>({
        method: 'GET',
        url: '/tag/list'
    });
};

export const getCategoryList = () => {
    return http<CategoryType[]>({
        method: 'GET',
        url: '/category/list',
    });
};

export const contributeResource = (data: ContributeForm) => {
    return http<null>({
        method: 'POST',
        url: '/resource/publish',
        data,
    });
};

