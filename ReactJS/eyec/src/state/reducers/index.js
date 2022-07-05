import {combineReducers} from 'redux'
import IsLoggedInReducer from './isLoggedin'
import TokenReducer from './tokenReducer'
import TransactionReducer from './transactions'
import UserReducer from './user'
import UserIDReducer from './userID'

const AllReducers = combineReducers({
  isLoggedIn: IsLoggedInReducer,
  user: UserReducer,
  userID: UserIDReducer,
  transactions:TransactionReducer,
  token:TokenReducer,
})
export default AllReducers