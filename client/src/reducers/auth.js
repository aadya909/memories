import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      const profile = action?.data?.result;
      const token = action?.data?.token;

      // ✅ Normalize userId: use googleId if available, otherwise use _id
      const userId = profile?.googleId || profile?._id;

      // ✅ Store normalized userId in result
      const updatedProfile = { ...profile, userId };

      // ✅ Store normalized profile and token in localStorage
      localStorage.setItem('profile', JSON.stringify({ result: updatedProfile, token }));

      // ✅ Save to Redux state
      return { ...state, authData: { result: updatedProfile, token } };

    case LOGOUT:
      // Clear storage and reset state
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
