import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from 'react-big-calendar'
import { Navbar } from '../ui/Navbar'
import { localizer } from '../calendarsetting/CalendarSettings'
import { messages } from '../../helpers/calendar-message-es'
import { CalendarEvent } from './CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from "../ui/AddNewFab";
import { DelenteEventFab } from "../ui/DelenteEventFab";


export const CalendarScreen = () => {

    const dispatch = useDispatch(); 
    
    const {events,activeEvent} = useSelector(state => state.calendar)
    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e)=> {
        dispatch(uiOpenModal());
    } 
    const onSelectevent = (e) => {  
        dispatch(eventSetActive(e)) 
    }

    const onViewChange = (e) => {   
         setlastView(e);
         localStorage.setItem('lastView',e);
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent())
    }

    const eventStyleGetter = (event,start,end,isSelected) =>{
        const style = {
            backgroundColir: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return{
            style
        }
    }

    return (
    <div className = "calendar-screen" >
        <Navbar/>
        <Calendar className = "rbc-calendar"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages = {messages}
        eventPropGetter = {eventStyleGetter}
        onDoubleClickEvent = {onDoubleClick}
        onSelectEvent = {onSelectevent}
        onView = {onViewChange}
        selectable = {true}
        onSelectSlot = {onSelectSlot}
        view = {lastView}
        components = {{
            event: CalendarEvent
        }}       
        />
        <AddNewFab/>
        <CalendarModal/>

        { activeEvent && <DelenteEventFab/> }
    </div>
    )
}
