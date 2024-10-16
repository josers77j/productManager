import moment from 'moment';



export const dateTimeNow = () => {
    const fechaLocal = moment().utc().subtract(6, 'hours').format('YYYY-MM-DD'); // Ajusta la fecha
    const horaLocal = moment().utc().subtract(6, 'hours').format('HH:mm:ss.SSS'); // Ajusta la hora
    

    return `${fechaLocal}T${horaLocal}Z`;

};
