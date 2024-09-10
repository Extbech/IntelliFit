// src/redux/slices/cardioSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../config/urlConfig';

export const dietApi = createApi({
    reducerPath: 'dietApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL + '/api/diet' }),
    endpoints: (builder) => ({
        getDietData: builder.query<string, void>({
            query: () => '/meal',
        }),
        // Add more endpoints here
    }),
});

export const { useGetDietDataQuery } = dietApi;
