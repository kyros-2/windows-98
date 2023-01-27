import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store';
import close from '../../windows icons/close.svg';
import maximize from '../../windows icons/maximize.svg';
import minimize from '../../windows icons/minimize.svg';
import restore from '../../windows icons/restore.svg';
import InternetExplorer from './appContent/internetExplorer/InternetExplorer';
import MyComputer from './appContent/myComputer/MyComputer';
import './style.css';


export default function Application({id, divId, appTitle}) {
  let transition;
  const dispatch = useDispatch();
  const apps = useSelector(state => state.openedApps);
  const applicationContent = () => {
    const allApps = [
      <MyComputer />,
      <InternetExplorer />
    ]

    return allApps[id];
  }

  useEffect(() => {
    let i = apps.length - 1;
    const window = document.getElementById(apps[i].divId);
    addFocus(window);
  }, [apps]);

  const addFocus = (ele) => {
    const allWindows = document.querySelectorAll('div.desktop_application');
    allWindows.forEach(element => {
      element.classList.remove('focus');
    });
    ele.classList.add('focus');
  }

  let focusedWindow;
  let isResizing = false;
  let resizeType = '';
  let isDraging = false;
  let dragPosition = {x: 0, y: 0};
  let oldDimensions = {w: 800, h: 450, t: 100, l: 100};
  let max = false;
  let transitionTimeOut;
  
  const resizeAction = (e, id_) => {
    if (!max) {
      resizeType = e.target.getAttribute('data-type');
      isResizing = true;
      document.documentElement.style.setProperty('--cursor', e.target.getAttribute('data-cursor'));
      document.documentElement.className = 'resizing';
      focusedWindow = document.getElementById(id_);
      const { top, left } = focusedWindow.getBoundingClientRect();
      focusedWindow.style.top = top + 'px';
      focusedWindow.style.left = left + 'px';
      focusedWindow.classList.remove('center');
      addFocus(focusedWindow);
    }
  }
  
  window.addEventListener('mousemove', (e) => {
    windowMove(e, 'mouse');
  })
  window.addEventListener('touchmove', (e) => {
    windowMove(e, 'touch');
  })

  const windowMove = (e, deviceType) => {
    if (isResizing) {
      const focusedWindow_info = focusedWindow.getBoundingClientRect();
      const { width, height, top, left } = focusedWindow_info;

      const clientX = deviceType === 'touch' ? e.changedTouches[0].clientX : e.clientX;
      const clientY = deviceType === 'touch' ? e.changedTouches[0].clientY : e.clientY;

      if (resizeType === 'top'){
        resize_top(top, height, clientY);
      }
      if (resizeType === 'right'){
        resize_right(left, clientX);
      }
      if (resizeType === 'bottom'){
        resize_bottom(top, clientY);
      }
      if (resizeType === 'left'){
        resize_left(left, width, clientX);
      }
      if (resizeType === 'top_left'){
        resize_left(left, width, clientX);
        resize_top(top, height, clientY);
      }
      if (resizeType === 'top_right'){
        resize_right(left, clientX);
        resize_top(top, height, clientY);
      }
      if (resizeType === 'bottom_right'){
        resize_right(left, clientX);
        resize_bottom(top, clientY);
      }
      if (resizeType === 'bottom_left'){
        resize_bottom(top, clientY);
        resize_left(left, width, clientX);
      }

      let selection = window.getSelection();
      selection.removeAllRanges();
    }

    if (isDraging) {
      const clientX = deviceType === 'touch' ? e.changedTouches[0].clientX : e.clientX;
      const clientY = deviceType === 'touch' ? e.changedTouches[0].clientY : e.clientY;
      let x = (clientX - dragPosition.x);
      let y = (clientY - dragPosition.y);

      focusedWindow.style.left = `${x}px`;
      focusedWindow.style.top = `${y}px`;
    }
  }

  const resize_top = (top, height, y) => {
    let new_height = (top + height) - y;
    let stop;
    if (new_height === 400) stop = new_height ;
    focusedWindow.style.height = `${new_height < 250 ? stop : new_height}px`;
    focusedWindow.style.top = `${new_height < 250 ? top : y}px`;
  }
  const resize_bottom = (top, y) => {
    let new_height = y - top;
    focusedWindow.style.height = `${new_height < 250 ? 250 : new_height}px`;
  }
  const resize_left = (left, width, x) => {
    let new_width = (left + width) - x;
    let stop;
    if (new_width === 400) stop = new_width ;
    focusedWindow.style.width = `${new_width < 400 ? stop : new_width}px`;
    focusedWindow.style.left = `${new_width < 400 ? left : x}px`;
  }
  const resize_right = (left, x) => {
    let new_width = x - left;
    focusedWindow.style.width = `${new_width < 400 ? 400 : new_width}px`;
  }

  window.addEventListener('mouseup', () => {
    windowUp();
  })
  window.addEventListener('touchend', () => {
    windowUp();
  })

  const windowUp = () => {
    document.documentElement.classList.remove('resizing');
    isResizing = false;
    isDraging = false;
  }

  const drag_down = (e, id_, deviceType) => {
    if ([...e.target.classList].includes('app_top')){
      if (!max){
        focusedWindow = document.getElementById(id_);
        const { left, top, width, height} = focusedWindow.getBoundingClientRect();
        focusedWindow.style.top = top + 'px';
        focusedWindow.style.left = left + 'px';
        focusedWindow.classList.remove('center');
        addFocus(focusedWindow);
        const clientX = deviceType === 'touch' ? e.changedTouches[0].clientX : e.clientX;
        const clientY = deviceType === 'touch' ? e.changedTouches[0].clientY : e.clientY;

        // const e_width = (width + 1) / 2;
        const innerWidth = clientX - left;
        
        // const e_height = (height + 1) / 2;
        const innerHeight = clientY - top;
        
        dragPosition.x = innerWidth;
        dragPosition.y = innerHeight;

        isDraging = true;
      }
    }
  }

  const maximize_action = (e, id_) => {
    focusedWindow = document.getElementById(id_);
    const { width, height, top, left } = focusedWindow.getBoundingClientRect();
    focusedWindow.classList.remove('center');
    const img = e.target.querySelector('img');
    
    if (transitionTimeOut) {
      clearTimeout(transitionTimeOut);
    }
    
    if (max) {
      max = false;
      document.documentElement.removeAttribute('data-max');
      focusedWindow.style.width = `${oldDimensions.w}px`;
      focusedWindow.style.height = `${oldDimensions.h}px`;
      focusedWindow.style.top = `${oldDimensions.t}px`;
      focusedWindow.style.left = `${oldDimensions.l}px`;
      transitionTimeOut = setTimeout(() => {
        focusedWindow.style.transition = null;
      }, 200)
      img.src = maximize;
    } else {
      max = true;
      document.documentElement.setAttribute('data-max', '');
      oldDimensions = {w: width, h: height, t: top, l: left};
      focusedWindow.style.transition = '.2s';
      focusedWindow.style.width = `100vw`;
      focusedWindow.style.height = `${window.innerHeight - 30}px`;
      focusedWindow.style.top = '0';
      focusedWindow.style.left = '0';
      img.src = restore;
    }
  }

  const close_action =(id_) => {
    const element = document.getElementById(id_);
    const newState = apps.filter( ele => ele.divId !== element.id );
    dispatch(actions.closeApp({newState}));
  }

  const focusWindowClick = (id_) => {
    const window = document.getElementById(id_);
    addFocus(window);
  }

  const minimize_action = (id_) => {
    if (transition) {
      clearTimeout(transition);
    }
    const element = document.getElementById(id_);

    element.style.transition = '.3s';
    element.classList.toggle('minimize');
    transition = setTimeout(() => {
      element.style.transition = '';
    }, 300)
  }

  return (
    <div className='desktop_application windows_border_outset center' id={divId} onMouseDown={() => focusWindowClick(divId)}>
      <div className='app_top' onMouseDown={(e) => drag_down(e, divId, 'mouse')} onTouchStart={(e) => drag_down(e, divId, 'touch')}>
        <div className='left_part'>
          <p className='app_title'>{appTitle}</p>
        </div>
        <div className='right_part'>
          <button className='minimize_btn windows_border_outset withActive window_btn' onClick={() => minimize_action(divId)}><img src={minimize} alt="minimize" /></button>
          <button className='maximize_btn windows_border_outset withActive window_btn' onClick={(e) => maximize_action(e, divId)}><img src={maximize} alt="maximize" /></button>
          <button className='close_btn windows_border_outset withActive window_btn' onClick={() => close_action(divId)}><img src={close} alt="close"/></button>
        </div>
      </div>
      <div className='app_tools'></div>
      <div className='app_content windows_border_inset'>
        {applicationContent()}
      </div>
      <div className='app_footer'>
        <div className='footer_part windows_border_inset'></div>
        <div className='footer_part windows_border_inset'></div>
        <div className='footer_part windows_border_inset'></div>
      </div>

      <div className='right vertical resiser' data-type='right' data-cursor="w-resize" onMouseDown={(e) => resizeAction(e, divId)} onTouchStart={(e) => resizeAction(e, divId)}></div>
      <div className='left vertical resiser' data-type='left' data-cursor="w-resize" onMouseDown={(e) => resizeAction(e, divId)} onTouchStart={(e) => resizeAction(e, divId)}></div>
      <div className='top horizontal resiser' data-type='top' data-cursor="s-resize" onMouseDown={(e) => resizeAction(e, divId)} onTouchStart={(e) => resizeAction(e, divId)}></div>
      <div className='bottom horizontal resiser' data-type='bottom' data-cursor="s-resize" onMouseDown={(e) => resizeAction(e, divId)} onTouchStart={(e) => resizeAction(e, divId)}></div>
      <div className='bottom left both resiser' data-type='bottom_left' data-cursor="nesw-resize" onMouseDown={(e) => resizeAction(e, divId)} onTouchStart={(e) => resizeAction(e, divId)}></div>
      <div className='bottom right both resiser' data-type='bottom_right' data-cursor="nwse-resize" onMouseDown={(e) => resizeAction(e, divId)} onTouchStart={(e) => resizeAction(e, divId)}></div>
      <div className='top right both resiser' data-type='top_right' data-cursor="nesw-resize" onMouseDown={(e) => resizeAction(e, divId)} onTouchStart={(e) => resizeAction(e, divId)}></div>
      <div className='top left both resiser' data-type='top_left' data-cursor="nwse-resize" onMouseDown={(e) => resizeAction(e, divId)} onTouchStart={(e) => resizeAction(e, divId)}></div>
    </div>
  )
}