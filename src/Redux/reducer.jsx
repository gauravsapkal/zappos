import {
  ADDTOCART,
  DELFROMCART,
  ERROR,
  LOGOUT,
  SETUSER,
  INCREASECART,
  SETSHIPADDRESS,
  CHECKOUTDONE,
  GENDERFILTER,
  BRANDFILTER,
  PRICEFILTER,
  CLEARFILTER,
} from "./actionTypes";

const initState = {
  error: false,
  userprofile: {},
  isauth: false,
  cart: [],
  shipaddress: "",
  genderarr: [],
  brandarr: [],
  pricearr: [],
};

function reducer(state = initState, { type, payload }) {
  switch (type) {
    case ERROR: {
      return {
        error: true,
        userprofile: {},
        isauth: false,
        cart: [],
        genderarr: [],
        brandarr: [],
        pricearr: [],
      };
    }

    case SETUSER: {
      let newcart = [];

      if (payload.cart) newcart = payload.cart;

      return {
        error: false,
        userprofile: payload,
        isauth: true,
        cart: newcart, //update for json integration
        genderarr: [],
        brandarr: [],
        pricearr: [],
      };
    }

    case LOGOUT: {
      return {
        error: false,
        userprofile: {},
        isauth: false,
        cart: [],
        genderarr: [],
        brandarr: [],
        pricearr: [],
      };
    }

    case ADDTOCART: {
      let ispresent = false;
      let newcart = [];
      if (state.cart.length > 0) {
        newcart = state.cart.map((elem) => {
          if (elem.desc === payload.desc) {
            ispresent = true;
            return { ...elem, count: +elem.count + 1 };
          } else {
            return elem;
          }
        });
      }

      if (!ispresent) {
        newcart = [...state.cart, { ...payload, count: 1 }];
      }
      // console.log(state.userprofile)
      fetch(
        `https://my-json-server-uk9r.onrender.com/users/${state.userprofile.id}`,
        {
          //update for json integration
          method: "PATCH",
          body: JSON.stringify({
            cart: newcart,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      return {
        ...state,
        cart: [...newcart],
      };
    }

    case DELFROMCART: {
      let newcart = state.cart.filter((elem) => {
        return elem.desc !== payload.desc;
      });

      fetch(
        `https://my-json-server-uk9r.onrender.com/users/${state.userprofile.id}`,
        {
          //update for json integration
          method: "PATCH",
          body: JSON.stringify({
            cart: newcart,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      return {
        ...state,
        cart: [...newcart],
      };
    }

    case INCREASECART: {
      let newcart = state.cart.map((elem) => {
        if (elem.desc === payload.item.desc) {
          return {
            ...elem,
            count: +payload.qty,
          };
        } else {
          return elem;
        }
      });

      fetch(
        `https://my-json-server-uk9r.onrender.com/users/${state.userprofile.id}`,
        {
          //update for json integration
          method: "PATCH",
          body: JSON.stringify({
            cart: newcart,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      return {
        ...state,
        cart: [...newcart],
      };
    }

    // case DECREASECART:{
    //   let newcart = state.cart.map((elem)=>{

    //       if(elem.desc===payload.item.desc){
    //         return{
    //           ...elem, count: +elem.count - payload.qty
    //         }
    //       }else{
    //         return elem;
    //       }
    //   })

    //   let update = newcart.filter((elem)=>{
    //     return elem.count > 0;
    //   })

    //   fetch(`https://my-json-server-uk9r.onrender.com/users/${state.userprofile.id}`,{     //update for json integration
    //       method: 'PATCH',
    //       body: JSON.stringify({
    //         cart: newcart,
    //       }),
    //       headers: {
    //         'Content-type': 'application/json'
    //       }
    //   })

    //   return{
    //     ...state, cart:[...update]
    //   }
    // }

    case SETSHIPADDRESS: {
      return {
        ...state,
        shipaddress: payload,
      };
    }

    case CHECKOUTDONE: {
      let orders = [...state.cart];

      fetch(
        `https://my-json-server-uk9r.onrender.com/users/${state.userprofile.id}`,
        {
          //update for json integration
          method: "PATCH",
          body: JSON.stringify({
            cart: [],
            orders: [...orders],
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      return {
        ...state,
        cart: [],
        userprofile: { ...state.userprofile, cart: [], orders: [...orders] },
      };
    }

    case GENDERFILTER: {
      let arr = [];

      if (payload.checked) {
        arr = [...state.genderarr, payload.value];
      } else {
        arr = state.genderarr.filter((elem) => elem != payload.value);
      }

      return {
        ...state,
        genderarr: [...arr],
      };
    }

    case BRANDFILTER: {
      let arr = [];

      if (payload.checked) {
        arr = [...state.brandarr, payload.value];
      } else {
        arr = state.brandarr.filter((elem) => elem != payload.value);
      }

      return {
        ...state,
        brandarr: [...arr],
      };
    }

    case PRICEFILTER: {
      let arr = [];

      if (payload.checked) {
        arr = [...state.pricearr, payload.value];
      } else {
        arr = state.pricearr.filter((elem) => elem != payload.value);
      }

      return {
        ...state,
        pricearr: [...arr],
      };
    }

    case CLEARFILTER: {
      return {
        ...state, genderarr: [],
        brandarr: [],
        pricearr: [],
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;
