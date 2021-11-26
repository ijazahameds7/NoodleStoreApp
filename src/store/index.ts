import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './DataRedux'

export default configureStore({
  reducer: {
    restaurentDetails: dataReducer,
  },
});
