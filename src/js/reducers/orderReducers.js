export default function counter(state = { Person: {}, Company: {}, Users: [], PaymentLinks: []}, {type,payload}) {   
  switch (type) {   
  case "SET_COMPANY":
    return {...state, Company: payload};
    case "SET_PERSON":
    return {...state, Person: payload};  
  // case "ADD_USER_TO_ORDER":
  //   return {...state, Users: [...state.Users.filter(x=> x.Login !== payload.Login), payload]}; 
  case "ADD_USER_TO_ORDER":
    return {...state, Users: [...state.Users, payload]};   
  case "REMOVE_USER_FROM_ORDER":
    return {...state, Users: [...state.Users.filter(x=> x.Login !== payload.Login)]};  
    case "GET_PAYMENT_LINKS":
    return {...state, PaymentLinks: [...payload] };    
  case "UPDATE_USERS_TO_BE_CONFIRMED":
    return {...state, Users: payload};    
  // case 'FETCH_EVENT_REJECTED':
  //   console.log("Loading event failed:");
  //   throw new Error(payload);    
  default:
    return state
  }
}