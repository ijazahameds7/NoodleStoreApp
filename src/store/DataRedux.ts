import { createSlice } from '@reduxjs/toolkit'

export const restaurentDetails = createSlice({
  name: 'restaurentDetails',
  initialState: [],
  reducers: {
    updateRestaurentsList: (state, action) => {
      return action.payload
    }
  },
})

export const { updateRestaurentsList } = restaurentDetails.actions

export default restaurentDetails.reducer
