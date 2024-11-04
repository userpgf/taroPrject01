import {http} from '@/utils/http'

export const getTagesList = () =>{
    return http<Tag[]>({
        method:'GET',
        url:'/tag/list',
    })
}