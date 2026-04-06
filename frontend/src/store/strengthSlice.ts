// src/redux/slices/strengthSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../config/urlConfig';

export const strengthAPI = createApi({
    reducerPath: 'strengthApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL + '/api/strength' }),
    endpoints: (builder) => ({
        getStrengthData: builder.query<string, void>({
            query: () => '/workout',
        }),
        // Add more endpoints here
    }),
});

export const { useGetStrengthDataQuery } = strengthAPI;
