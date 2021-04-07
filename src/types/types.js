
const _eventName = '[event]';

export const types = {

    //ui 
    uiOpenModal: '  [ui] Open Modal',
    uiCloseModal: ' [ui] Close Modal',

    //calendar(event)
    eventAddNew: `${_eventName} Add new`,
    eventSetActive:`${_eventName} Set Active`,
    eventClearActiveEvent: `${_eventName} Clear active event`,
    eventUpdated: `${_eventName} Event updated`,
    eventDeleted: `${_eventName} Event deleted`
}