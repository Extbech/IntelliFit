// src/redux/slices/cardioSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../config/urlConfig';
import { CardioWorkoutRequest, CardioWorkoutResponse } from '../types/api/cardio';

export const cardioAPI = createApi({
    reducerPath: 'cardioApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL + '/api/cardio' }),
    tagTypes: ['CardioWorkout'],
    endpoints: (builder) => ({
        getCardioWorkouts: builder.query<CardioWorkoutResponse[], void>({
            query: () => '/workouts',
            providesTags: ['CardioWorkout'],
        }),
        addCardioWorkout: builder.mutation<CardioWorkoutResponse, CardioWorkoutRequest>({
            query: (newWorkout) => ({
                url: '/workouts',
                method: 'POST',
                body: newWorkout,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data: newCardioWorkout } = await queryFulfilled;
                    dispatch(
                        cardioAPI.util.updateQueryData(
                            'getCardioWorkouts',
                            undefined,
                            (draft) => {
                                draft.push(newCardioWorkout);
                            }
                        )
                    );
                } catch (error) {
                    // Handle error if needed
                    console.error('Failed to add cardio workout:', error);
                }
            },
        }),
        deleteCardioWorkout: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/workouts/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        cardioAPI.util.updateQueryData(
                            'getCardioWorkouts',
                            undefined,
                            (draft) => {
                                return draft.filter(workout => workout.id !== id);
                            }
                        )
                    );
                } catch (error) {
                    // Handle error if needed
                    console.error('Failed to delete cardio workout:', error);
                }
            },
        }),
        // Add more endpoints here
    }),
});

export const { useGetCardioWorkoutsQuery, useAddCardioWorkoutMutation, useDeleteCardioWorkoutMutation } = cardioAPI;
