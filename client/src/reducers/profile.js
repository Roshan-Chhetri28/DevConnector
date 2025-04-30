import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from "../actions/types"

const initialState = {
    profile: null, // * is going to hold all the profile data and put that in i.e. current user data and visited user data 
    profiles: [], // * profile listing page
    repos: [],
    loading: true,
    error: {}
}

export default function profile(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload, // * we are sending the res back which includes profile so we are adding that to state
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state
    }
}
