import './Modal.css';
import { useContext } from 'react';
import CartContext from '../../store/Cart-Context';
const ModalOverlay=(props)=>{
    const cartInfo=useContext(CartContext);
    let styleClass='empty-content';
    // if(cartInfo.items.length===0){styleClass="empty-content"}
    return(
        <div className='modal-container' onClick={props.onClick}>
            <div className={`modal-content ${cartInfo.items.length===0 ? styleClass:""}`}>
            {props.children}
            </div>
        </div>
    )
}
export default ModalOverlay;