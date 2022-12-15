import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    // {userPhoto: null,
    // userid: null,
    // username: null}
]

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userStateUpdate(state, action) {
            state.push(action.payload)
        },
        userLogout(state, action) {
            state.splice(0, state.length, ...action.payload);

        }
    }
    
})
export const {userStateUpdate, userLogout} = userSlice.actions
export default userSlice.reducer