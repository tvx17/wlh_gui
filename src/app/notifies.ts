import { Notify } from 'quasar';

function getTypeColor(type: string) {
  switch (type) {
    case 'positive':
      return 'positive';
    case 'negative':
      return 'negative';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'info';
  }

}

export function warning(message: string) {
  display('warning', message);
}

export function negative(message: string) {
  display('negative', message);
}

export function positive(message: string) {
  display('positive', message);

}

export function display(type: string, message: string) {
  Notify.create(
    {
      color: getTypeColor(type),
      message: message
    });
}

export default {
  positive, negative, warning, display
};
