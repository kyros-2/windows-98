import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Application from "../application/Application";
import ContexMenu from "../contextMenu/ContexMenu";
import Shortcut from "../shortcut/Shortcut";
import "./style.css";

export default function Desktop() {
  const apps = useSelector(state => state.openedApps);
  let isDraging = false;
  let clickX;
  let clickY;
  let mouseX;
  let mouseY;

  const mouseMove = (e, type) => {
    if (isDraging) {
      const marker = document.querySelector("div.marker");

      if (type === 'touch'){
        mouseX = e.changedTouches[0].clientX;
        mouseY = e.changedTouches[0].clientY;
      }
      if (type === 'mouse') {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }


      let width =mouseX - clickX < 0 ? (mouseX - clickX) * -1 : mouseX - clickX;
      let height =mouseY - clickY < 0 ? (mouseY - clickY) * -1 : mouseY - clickY;

      const newLeft = mouseX - clickX < 0 ? mouseX : clickX;
      const newTop = mouseY - clickY < 0 ? mouseY : clickY;

      marker.style.width = `${width}px`;
      marker.style.height = `${height}px`;

      marker.style.left = `${newLeft}px`;
      marker.style.top = `${newTop}px`;
    }
    
    let selection = window.getSelection();
    selection.removeAllRanges();
  };

  const mouseDown = (e, type) => {
    const marker = document.querySelector("div.marker");
    const desktop = document.querySelector("div.desktop");

    if (e.target === desktop){
      if (type === 'touch'){
        clickX = e.changedTouches[0].clientX;
        clickY = e.changedTouches[0].clientY;
      }
      if (type === 'mouse') {
        clickX = e.clientX;
        clickY = e.clientY;
      }
  
      marker.style.display = `block`;
      marker.style.left = `${clickX}px`;
      marker.style.top = `${clickY}px`;
  
      isDraging = true;
    }
  };

  const mouseUp = () => {
    const marker = document.querySelector("div.marker");
    marker.style.display = `none`;
    marker.style.width = 0;
    marker.style.height = 0;

    isDraging = false;
  };

  window.onmousemove = (e) => {
    mouseMove(e, 'mouse');
  };
  window.ontouchmove = (e) => {
    mouseMove(e, 'touch');
  };
  window.onmouseup = () => {
    mouseUp();
  };
  window.ontouchend = () => {
    mouseUp();
  };

  document.addEventListener("click", (e) => {
    const menu_inner = document.querySelectorAll(
      "#contex_menu, #contex_menu *"
    );
    const menu_ = [...menu_inner];
    
    if (!menu_.includes(e.target)) {
      menu_[0].style.display = 'none';
      menu_[0].style.opacity = 0;
    }
  });
  
  const onRightClick = (e) => {
    e.preventDefault();
    const menu_inner = document.querySelectorAll(
      "#contex_menu, #contex_menu *"
    );
    const menu = document.querySelector(
      "#contex_menu"
    );
    const { width, height } = menu.getBoundingClientRect();
    const menu_ = [...menu_inner];
    let x = e.clientX + width > window.innerWidth ? e.clientX - width : e.clientX;
    let y = e.clientY + height > window.innerHeight ? e.clientY - height : e.clientY;
    
    if (!menu_.includes(e.target)) {
      menu_[0].style.transition = null;
      menu_[0].style.opacity = 0;
      menu_[0].style.display = 'block';
      menu_[0].style.top = `${y}px`;
      menu_[0].style.left = `${x}px`;
      setTimeout(() => {
        menu_[0].style.transition = 'opacity .2s';
        menu_[0].style.opacity = 1;
      })
    }
  };

  return (
    <div
      className="desktop"
      onMouseDown={(e) => mouseDown(e, 'mouse')}
      onContextMenu={(e) => onRightClick(e)}
      onTouchStart={(e) => mouseDown(e, 'touch')}
    >
      <div className="marker" style={{ display: "none" }}></div>

      <div className="shortcut_icons_container">
        <Shortcut
          iconLink="https://win98icons.alexmeub.com/icons/png/computer_explorer-5.png"
          title="My Computer"
          id={0}
        />
        <Shortcut
          iconLink="https://win98icons.alexmeub.com/icons/png/msie2-2.png"
          title="Internet Explorer"
          id={1}
        />
      </div>
      <ContexMenu />

      {
        apps.map(app => <Application key={app.divId} id={app.id} divId={app.divId} appTitle={app.appTitle} />)
      }

    </div>
  );
}
