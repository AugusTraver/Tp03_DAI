class DateTimeHelper {

    isDate = (fecha) => {
        return fecha instanceof Date && !isNaN(fecha.getTime());
    };

    getOnlyDate = (fecha = new Date()) => {
        const copia = new Date(fecha);
        copia.setHours(0, 0, 0, 0);
        return copia;
    };

    getEdadActual = (fechaNacimiento) => {
        if (!this.isDate(fechaNacimiento)) return -1;

        const hoy = new Date();

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

        const mesActual = hoy.getMonth();
        const diaActual = hoy.getDate();

        const mesNac = fechaNacimiento.getMonth();
        const diaNac = fechaNacimiento.getDate();

        if (mesActual < mesNac || (mesActual === mesNac && diaActual < diaNac)) {
            edad--;
        }

        return edad;
    };

    getDiasHastaMiCumple = (fechaNacimiento) => {
        if (!this.isDate(fechaNacimiento)) return -1;

        const hoy = this.getOnlyDate(new Date());

        let proximoCumple = new Date(
            hoy.getFullYear(),
            fechaNacimiento.getMonth(),
            fechaNacimiento.getDate()
        );

        if (proximoCumple < hoy) {
            proximoCumple.setFullYear(proximoCumple.getFullYear() + 1);
        }

        const diff = proximoCumple - hoy;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    getDiaTexto = (fecha, retornarAbreviacion = false) => {
        if (!this.isDate(fecha)) return null;

        const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const nombre = dias[fecha.getDay()];

        return retornarAbreviacion ? nombre.substring(0, 3) : nombre;
    };

    getMesTexto = (fecha, retornarAbreviacion = false) => {
        if (!this.isDate(fecha)) return null;

        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                       "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const nombre = meses[fecha.getMonth()];

        return retornarAbreviacion ? nombre.substring(0, 3) : nombre;
    };
}

export default new DateTimeHelper();