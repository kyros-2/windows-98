import React from 'react';
import './style.css';

export default function ContexMenu() {
  const reloadPage = () => {
    window.location.reload();
  }
  
  return (
    <div className='contex_menu windows_border_outset' id='contex_menu' style={{display: 'none'}}>
      <ul className='contex_group group_1'>
        <li><button type='button' className='reload_btn' onClick={reloadPage}><span className='underline'>R</span>eload</button></li>
        <li><span className='underline'>E</span>xplore</li>
        <li><span className='underline'>F</span>ind</li>
      </ul>
      <div className='x_diviser'></div>
      <ul className='contex_group group_2'>
        <li><span className='underline'>C</span>reate Shortcut</li>
        <li><span className='underline'>R</span>ename</li>
      </ul>
      <div className='x_diviser'></div>
      <ul className='contex_group group_3'>
        <li><span className='underline'>P</span>roperties</li>
      </ul>
    </div>
  )
}