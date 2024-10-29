import { createSlice } from '@reduxjs/toolkit'


type UserInfo = {
    avatar: string;
    birthday: string;
    bonus: number;
    gender: number;
    nickname: string;
    pkId: number;
    phone: string;
    isDailyCheck: boolean;
    wxOpenId?: string;
};

const userInfo: UserInfo = {
    avatar: '',
    birthday: '',
    bonus: 0,
    gender: 0,
    nickname: '',
    pkId: 0,
    phone: '',
    isDailyCheck: false,
    wxOpenId: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        clearUserInfo: (state, _) => {
            state.userInfo = {
                avatar: '',
                birthday: '',
                bonus: 0,
                gender: 0,
                nickname: '',
                pkId: 0,
                phone: '',
                isDailyCheck: false,
            };
        }
    }
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;


