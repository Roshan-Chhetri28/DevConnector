import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// Initial state is an empty array of alerts
const initialState = [];

/**
 * Alert reducer to manage toast-style alerts.
 * Each alert is an object: { id, msg, alertType, timeout }
 */
export default function alertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload]; // Add new alert to state

    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload); // Remove alert by ID

    default:
      return state;
  }
}
