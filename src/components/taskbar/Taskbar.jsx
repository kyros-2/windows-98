import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";

export default function Taskbar() {
  let transition;
  const { openedApps } = useSelector(state => state);

  const formatTitle = (title) => {
    const text = title.split('');
    const newTitle = [];
    if (text.length >= 20){
      for(let i in text) {
        if (i < 20) {
          newTitle.push(text[i]);
        }
      }
      return `${newTitle.join('')}...`
    } else {
      return title
    }
  }
  
  const [timeNow, setTimeNow] = useState('');
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const time_ = (day) =>{
    return day - 1 < 0 ? 6 : day - 1 ;
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

  const getTime = () => {
    let date = new Date();
    
    let [h, min, day, day_, month, year] = [
      date.getHours(),
      date.getMinutes(),
      date.getDay(),
      date.getDate(),
      date.getMonth(),
      date.getFullYear()
    ];

    return {day_date: `${days[time_(day)]} ${day_} ${months[month]} ${year}`, hour_date: timeConvert(h, min)};
  };

  const timeConvert = (ho, mi) => {
    return `${ho < 10 ? `0${ho}` : ho}:${mi < 10 ? `0${mi}` : mi}`
  }

  setTimeout(() => {
    setTimeNow(getTime());
  }, 1000)
  
  useEffect(() => {
    setTimeNow(getTime());
  }, [])

  getTime();
  return (
    <div className="taskbar">
      <div className="left_part">
        <button type="button" className="start_btn windows_border_outset withActive">
          <img
            src="https://win98icons.alexmeub.com/icons/png/windows-0.png"
            alt="windows"
          />
          Start
        </button>
        <div className="h_diviser task_diviser"></div>
        <div className="task_app">
          {
            openedApps.map(openApp => <button className="task_app_item windows_border_outset withActive" onClick={() => minimize_action(openApp.divId)}>{formatTitle(openApp.appTitle)}</button>)
          }
        </div>
      </div>
      <div className="right_part">
        <div className="h_diviser task_diviser"></div>
        <div className="info_container windows_border_inset" title={timeNow.day_date}>
            <img
              title="Volume"
              src="https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-0.png"
              alt="volume"
            />
            <p>{timeNow.hour_date}</p>
        </div>
      </div>
    </div>
  );
}
