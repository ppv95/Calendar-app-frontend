import { types } from "../types/types";
import { add } from 'date-fns'

const startDate = new Date();
const endDate =  add(startDate,{days : 1})

const initialState = {
    events:[
        {
    id: new Date().getTime(),       
    title:'PowerFull',
    start: startDate,
    end: endDate,
    bgcolor: '#fafafa',
    notes: 'Buy cake',
    user:{
        _id: '123',
        name: 'Paul'
    }
        }
    ],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.eventAddNew:
            return{
                ...state,
                events:[ ...state.events,
                    action.payload]
            }
        case types.eventSetActive:
            return{
                ...state,
                activeEvent:action.payload
            }
        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent:null
            }
        case types.eventUpdated:
            return{
                ...state,
                events: state.events.map(e => (e.id === action.payload.id) ? action.payload : e)
            }   
            case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(e => (e.id !== state.activeEvent.id)),
                activeEvent:null
            }      
        default:
           return state;
    }
}