import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../config/urlConfig";
import { WeightEntry } from "../types/api/weight";

export const weightAPI = createApi({
    reducerPath: 'weightApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL + '/api/weight' }),
    tagTypes: ['WeightEntry'],
    endpoints: (builder) => ({
        getWeightData: builder.query<WeightEntry[], void>({
            query: () => '/entries',
            providesTags: ['WeightEntry'],
        }),
        addWeightEntry: builder.mutation<void, WeightEntry>({
            query: (entry) => ({
                url: '/entries',
                method: 'POST',
                body: entry,
            }),
            invalidatesTags: ['WeightEntry'],
        }),
    }),
});

export const { useGetWeightDataQuery, useAddWeightEntryMutation } = weightAPI;