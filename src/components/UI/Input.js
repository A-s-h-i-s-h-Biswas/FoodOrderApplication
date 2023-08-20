import React from 'react';
import './UI.css';
const Input=React.forwardRef((props,ref)=>{
    return(
        <div>
            <input className='meal-input' ref={ref} {...props.input}/>
        </div>
    );

});
export default Input;