import { formatISO9075, format } from 'date-fns'

export const parseDate = (dateString: string): Date => {
  const b = dateString.split(/\D+/);
  const offsetMult = dateString.indexOf('+') !== -1 ? -1 : 1;
  const hrOffset = offsetMult * (+b[7] || 0);
  const minOffset = offsetMult * (+b[8] || 0);  
  return new Date(Date.UTC(+b[0], +b[1] - 1, +b[2], +b[3] + hrOffset, +b[4] + minOffset, +b[5], +b[6] || 0));
};

export const ISOToISO9075 = (ISOString: string): string => {
  const date = parseDate(ISOString)
  return formatISO9075(date)
}

export const ISOToFull = (ISOString: string): string => {
  const date = parseDate(ISOString)
  return format(date, "PPpp")
}