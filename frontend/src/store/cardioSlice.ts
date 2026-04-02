// src/redux/slices/cardioSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../config/urlConfig';
import { CardioWorkout } from '../types/api/cardio';

export const cardioApi = createApi({
    reducerPath: 'cardioApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL + '/api/cardio' }),
    endpoints: (builder) => ({
        getCardioWorkouts: builder.query<CardioWorkout[], void>({
            query: () => '/workouts',
        }),
        addCardioWorkout: builder.mutation<CardioWorkout, Partial<CardioWorkout>>({
            query: (newWorkout) => ({
                url: '/workouts',
                method: 'POST',
                body: newWorkout,
            }),
        }),
        // Add more endpoints here
    }),
});

export const { useGetCardioWorkoutsQuery, useAddCardioWorkoutMutation } = cardioApi;
