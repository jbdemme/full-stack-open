import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotif(state, action) {
      return action.payload
    },
    removeNotif() {
      return ''
    }
  },
})

const { setNotif, removeNotif } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotif(message))
    setTimeout(() => dispatch(removeNotif()), time * 1000)
  }
}

export default notificationSlice.reducer