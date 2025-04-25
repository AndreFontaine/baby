export const rHoursConfig = { size: 2, value: 0, max: 5, min: 0, minLength: 1, maxLength: 2, required: true };
export const rMinutesConfig = { size: 1, value: 0, max: 60, min: 0, minLength: 1, maxLength: 2, required: true };
export const rSecondsConfig = { size: 1, value: 0, max: 60, min: 0, minLength: 1, maxLength: 2, required: true };

export const lHoursConfig = { size: 2, value: 0, max: 5, min: 0, minLength: 1, maxLength: 2, required: true };
export const lMinutesConfig = { size: 1, value: 0, max: 60, min: 0, minLength: 1, maxLength: 2, required: true };
export const lSecondsConfig = { size: 1, value: 0, max: 60, min: 0, minLength: 1, maxLength: 2, required: true };

export const volumeConfig = { size: 3, value: 50, max: 999, min: 0, minLength: 1, maxLength: 3, required: true };

export const noteConfig = { placeholder:"Écrire une note", rows:5, cols:33 };

export const dateConfig = { required: true };
export const hourConfig = { required: true };

export const durationConfig = { size: 3, value: 25, max: 120, min: 0, minLength: 1, maxLength: 3, required: true };
