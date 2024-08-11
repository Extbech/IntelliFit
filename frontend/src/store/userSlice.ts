// src/redux/slices/userSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../config/urlConfig';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL + '/api/user' }),
    endpoints: (builder) => ({
        getUserInfo: builder.query<string, void>({
            query: () => '/user_info',
        }),
    }),
});

export const { useGetUserInfoQuery } = userApi;
