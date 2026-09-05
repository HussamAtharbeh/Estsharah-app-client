import React from 'react'

export default function SignUpLawyer() {
  return (
    <div>SignUpLawyer</div>
  )
}

// i want to connect front end to backend
//CRUD operations c--> post r--> get u--> put d--> delete
//when run the fetch code the code run twice in console because dev environment react strict mode is on 
// and it will run twice in dev environment but not in production , and the react take snapshot of 
// the component and compare it with the previous snapshot and if there is any change it will re-render the component and run the code again
