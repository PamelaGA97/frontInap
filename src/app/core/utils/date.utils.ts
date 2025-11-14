/**
 * Resive siempre una fecha menor a la fecha actual y crea
 * una lista de fechas.
 * 
 * @param initialYear number initial year for generate year list.
 * @returns list of years.
 */

export function generateYearList(startYear: number): any[] {
	const currentYear = new Date().getFullYear();
	const initialYear = startYear ? startYear : 2000;
	const years = Array.from(
		{ length: currentYear - initialYear + 1 },
		(_, i) => new Date(`${currentYear - i}-01-01T03:00:00.000Z`).getFullYear()
	);
	return years;
}

/**
 * 
 * @param date Objeto de javascritp.
 * @returns fecha cambiada a number.
 */

export function parseDateYearToNumber(date: Date | string | undefined): number | null {
    return date ? new Date(date).getFullYear() : null;
}
