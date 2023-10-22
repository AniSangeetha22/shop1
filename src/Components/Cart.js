import React, { useState, useEffect } from 'react'

import Navbar from './Navbar'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import CartCard from './CartCard'
import './Cart.css'

const Cart = () => {
  // const [totalvalue, setTotalvalue] = useState(0)

  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          // console.log(userlogged.email)
          const getUsers = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
            // console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        }
        else {
          setUser(null);
        }
      })
    }, [])
    return user
  }
  const loggeduser = GetCurrentUser();


  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {},[])



  if (loggeduser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggeduser[0].uid}`
      // console.log(path)
      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          cartArray.push({ ...doc.data(), id: doc.id })
        });
        setcartdata(cartArray)
         console.log('done')
      }).catch('Error error error')

    }
    getcartdata()
  }
  // console.log('cartdata' );
  // console.log(cartdata );
  // console.log(cartdata.length);
  // console.log(cartdata[0].saleprice);

// let totalvalue = 0;
// for (let i = 0; i <= cartdata.length; i++) {
//   totalvalue = totalvalue + cartdata[i].saleprice;
// }

// console.log(totalvalue);

// const totalAmount = cartdata.map((data)=>{
//  totalvalue = totalvalue + data.saleprice
//  return totalvalue


// })

// }
// totalAmount();

// function totalAmount(){
//   cartdata.map((data)=>{
//       totalvalue = totalvalue + data.saleprice;
//       return totalvalue

// })
// }

// const tv = totalAmount;
// console.log(tv);






  return (
    <div>
      <Navbar />

      {cartdata ?
        <div>
          <div className='cart-head'>Your Cart Items</div>
          <div className='allcartitems'>
            {cartdata.map((item) => (
              <CartCard
                key={item.id}
                itemdata={item}
                userid={loggeduser[0].uid}
              />
            ))}

            <div className='proceed'>
             
              <button>Proceed</button>
            </div>
          </div>
          

        </div>
        : <p>Your Cart is empty</p>}


        
    </div>

  )
}

export default Cart