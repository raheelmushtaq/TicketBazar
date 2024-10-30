import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import mmkvStorage from './mmkvStorage';

export type UserLoginTpe = "user" | 'guest'
type UserStore = {
    isUserLoggedIn: boolean;
    userLoggedInAs?: UserLoginTpe;
    updateUserLoginStatus: (
        isUserLoggedIn: boolean,
        userLoginType?: UserLoginTpe
    ) => void

};

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            isUserLoggedIn: false,
            updateUserLoginStatus: (isUserLoggedIn, loginType) =>
                set({
                   isUserLoggedIn: isUserLoggedIn,
                   userLoggedInAs: loginType
                }),
        }),
        {
            name: 'user-store',
            storage: createJSONStorage(() => mmkvStorage),
        },
    ),
);

export default useUserStore;
