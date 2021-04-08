import React from 'react';


const ModalWindow=(props)=>{
  return(
   
<div style={props.colorModal}>
  <h1>
    {props.state.modal}
  </h1>
</div>


  )
  
}
export default ModalWindow