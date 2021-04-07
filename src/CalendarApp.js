import React from 'react'
import { AppRouter } from './router/AppRouter'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { store } from './store/store'
import { Provider } from 'react-redux'

export const CalendarApp = () => {

    return (
        
        <Provider store = {store}>
            <AppRouter/>
        </Provider>
    )
}
