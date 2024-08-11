// src/redux/slices/cardioSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../config/urlConfig';

export const cardioApi = createApi({
    reducerPath: 'cardioApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL + '/api/cardio' }),
    endpoints: (builder) => ({
        getCardioData: builder.query<string, void>({
            query: () => '/workout',
        }),
        // Add more endpoints here
    }),
});

export const { useGetCardioDataQuery } = cardioApi;
