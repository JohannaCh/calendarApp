import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import DatePicker, { registerLocale } from "react-datepicker";
import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import './CalendarModal.css';
import Modal from 'react-modal/lib/components/Modal';
import { useCalendarStore, useUiStore} from '../../../hooks';

registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


Modal.setAppElement('#root');

export const CalendarModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent } = useCalendarStore();

    const [formSubmit, setFormSubmit] = useState(false);

    const [formValues, setFormValues] = useState({
        title:'',
        notes:'',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const titleClass = useMemo(() => {
        if (!formSubmit) return '';

        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid';

    }, [formValues.title, formSubmit])

    useEffect(() => {
      if (activeEvent !== null ) {
        //creo un nuevo objeto 
        setFormValues({...activeEvent})
      }
    
    }, [activeEvent])
    

    const onInputChanged = ({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) =>{
        setFormValues({
            ...formValues,
            [changing]: event
        })
    };

    const onCloseModal = () => {
        closeDateModal();
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmit(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if ( isNaN(difference) || difference <= 0 ) {
            Swal.fire('Fechas Incorrectas', 'Revisa las fechas ingresadas', 'error')   
            return; 
        }

        if ( formValues.title.length <= 0 ) {
            return; 
        }
    }

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className='modal'
            overlayClassName='modal-bg'
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        className="form-control"
                        onChange={(event)=> onDateChange(event, 'start') }
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control"
                        onChange={(event)=> onDateChange(event, 'end') }
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
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
};