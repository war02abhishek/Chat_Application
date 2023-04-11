

export const chatMReducer = (state = { chatId: "", user: {}},action) => {
  console.log("ChatReduer this is");
  switch (action.type) {
    case "CHANGE_USER":
      // const currentUser = useGlobalContext();
      //  localStorage.setItem('user', JSON.stringify(action.payload.info.userInfo));
      //   localStorage.setItem('chatId', JSON.stringify(action.payload.currentUser?.uid > action.payload.info.userInfo.uid
      //       ? action.payload.currentUser?.uid + action.payload.info.userInfo.uid
      //       : action.payload.info.userInfo.uid +  action.payload.currentUser?.uid,));
      console.log(action.payload);
       console.log("currR:",action.payload.currentUser?.uid);
     console.log("userR:",action.payload.info.userInfo.uid);
      return {
        ...state,
        user: action.payload.info.userInfo,
        chatId:
          action.payload.currentUser?.uid > action.payload.info.userInfo.uid
            ? action.payload.currentUser?.uid + action.payload.info.userInfo.uid
            : action.payload.info.userInfo.uid +  action.payload.currentUser?.uid,
      };
     


    default:
      return state;
  }
};
