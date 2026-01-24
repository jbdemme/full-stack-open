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

export const { setNotif, removeNotif } = notificationSlice.actions
export default notificationSlice.reducer