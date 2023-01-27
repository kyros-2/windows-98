import { actions } from '../../store';
import { useDispatch } from 'react-redux';
import React from 'react';
import ('./style.css');

export default function Shortcut({iconLink, title, id}) {
  const dispatch = useDispatch();

  let id_ = [];
  const idsSource = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const filterId = () => {
    for(let i = 0 ; i < 10 ; i++){
      id_.push(idsSource[Math.floor(Math.random() * idsSource.length)])
    }
    return id_.join('');
  }

  const openApp = (e) => {
    const appId = +(e.target.getAttribute('data-app'));
    const appTitle = e.target.querySelector('.shortcut .title').textContent;
    dispatch(actions.openApp({ id: appId, divId: `app_${filterId()}`, appTitle }))
  }

  const shortcutSelected = (e) => {
    const allShortcuts = document.querySelectorAll('.shortCut_btn');
    allShortcuts.forEach(ele => {
      ele.classList.remove('selected');
    })

    e.target.classList.add('selected');
  }

  window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('shortCut_btn')){
      const allShortcuts = document.querySelectorAll('.shortCut_btn');
      allShortcuts.forEach(ele => {
        ele.classList.remove('selected');
      })
    }
  })

  return (
    <button className='shortCut_btn' data-app={id} onClick={(e) => shortcutSelected(e)} onDoubleClick={openApp} >
      <div className='shortcut'>
        <img src={iconLink} alt={title} />
        <p className='title'>{title}</p>
      </div>
    </button>
  )
}
