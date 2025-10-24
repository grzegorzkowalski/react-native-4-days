import { createSlice } from '@reduxjs/toolkit';

interface WatchInterface {
    isCounting: boolean;
    value: number;
    result: [];
}

const initialState  : WatchInterface = {
    "isCounting": false,
    "value": 0,
    "result": []
};

const watchSlice = createSlice({
    name: 'watch',
    initialState,
    reducers: {
        startCounting: (state) => {
            state.isCounting = true;
        },
        stopCounting: (state) => {
            state.isCounting = false;
        },
        resetCounting: (state) => {
            state.isCounting = false;
            state.result = [];
            state.value = 0;
        },
        saveResult: (state) => {
            // @ts-ignore
            state.result.push(state.value);
        },
        incrementValue: (state) => {
            if (state.isCounting) {
                state.value += 1;
            }
        }
    }
});

export const { startCounting, stopCounting, resetCounting, saveResult, incrementValue } = watchSlice.actions;
export default watchSlice.reducer;