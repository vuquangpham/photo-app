const { createSlice } = require("@reduxjs/toolkit");

const photo = createSlice({
    name: 'photos',
    initialState: [], // list of photos
    reducers: {
        addPhoto: (state, action) => {
            state.push(action.payload)
        }
    }
})

const { reducer, actions } = photo;
export const { addPhoto } = actions;
export default reducer;