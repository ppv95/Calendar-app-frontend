import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import {isAfter } from 'date-fns'
import { addHours } from 'date-fns'
import Swal from 'sweetalert2'
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from "../../actions/events";
import { useEffect } from 'react';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement('#root')
const now = new Date();
const nowPlus = addHours(now,1);

const initEvent = { 
  title: '',
  notes: '',
  start: now,
  end: nowPlus
}

export const CalendarModal = () => {

  const {modalOpen} = useSelector(state => state.ui)
  const {activeEvent} = useSelector(state => state.calendar)
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now)
  const [dateEnd, setdateEnd] = useState(nowPlus);
  const [titleValid, settitleValid] = useState(true);
  const [formValues, setFormValues] = useState(initEvent);

  const {notes,title,start,end} = formValues

  useEffect(() => {
   if(activeEvent)
      {
      setFormValues(activeEvent)
    }
    else{
      setFormValues(initEvent);
    }
  }, [activeEvent,setFormValues])

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }
  
    const closeModal = () => {
      dispatch(uiCloseModal());
      setFormValues(initEvent);
      dispatch(eventClearActiveEvent());
    }

    const handleStartChange =(e)=>{
     setFormValues({
       ...formValues,
       start: e
     })
      setDateStart(e)
    }

    const handleEndChange = (e) => {
      setdateEnd(e);
      setFormValues({
        ...formValues,
        end: e
      })
    }

    const handleSubmitForm = (e) =>
    {
      e.preventDefault();
      console.log(formValues);

      const momentStart = start;
      const momentEnd = end;
      const boolIsAfter = isAfter(momentStart,momentEnd);

      if (boolIsAfter) {
         Swal.fire('Error','La fecha fin no puede ser menor o igual a fecha inicial',
        'error');
        return;
      }

      if(title.trim().length < 2){
        return settitleValid(false);
      }
      
      if(activeEvent){
        dispatch(eventUpdated(formValues))
      }
      
    else{
      dispatch(eventAddNew({
        ...formValues,
        id: new Date().getTime(),
        user:{
          _id:'123',
          name: 'Paul'
        }
      }));
    }

      settitleValid(true);
      closeModal();
    } 
      
    return (
        <Modal
        isOpen={modalOpen}
         onRequestClose={closeModal}
         style={customStyles}
         closeTimeoutMS = {200}
         className = "modal"
         overlayClassName = "modal-fondo"
      >
        <h1> {(activeEvent)? 'Editar Evento': 'Nuevo Evento'} </h1>
    <hr />
<form 
  onSubmit = {handleSubmitForm}
  className="container">

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker
        onChange={handleStartChange}
        value={dateStart}
        className = "form-control"
      />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
         <DateTimePicker
        onChange={handleEndChange}
        value={dateEnd}
        minDate = {dateStart}
        className = "form-control"
      />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value = {title}
            onChange = {handleInputChange}
           
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value = {notes}
            onChange = {handleInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
      </Modal>
    )
}
