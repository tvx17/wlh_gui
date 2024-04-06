import { Dialog } from 'quasar';

const defaultStrings = {
  add: {
    title: 'not.Add',
    message: 'not.Add new dataset'
  },
  delete: {
    title: 'not.Delete',
    message: 'not.Are you sure you want to delete this dataset?'
  }
};

export async function del(title: string, message: string, cancel = true, persistent = true) {
  const promise = new Promise((resolve, reject) => {
    Dialog.create(
      {
        title: title,
        message: message,
        cancel: cancel,
        persistent: persistent
      }).onOk(() => {
      resolve(true);
    }).onCancel(() => {
      resolve(false);
    });
  });
  return await promise;
}

export async function getString(title: string, message: string, cancel = true, persistent = true) {
  const promise = new Promise((resolve, reject) => {
    Dialog.create(
      {
        title: title,
        message: message,
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: cancel,
        persistent: persistent
      }).onOk((newSummary: any) => {
      resolve(newSummary);
    }).onCancel(() => {
      resolve('');
    });
  });
  return await promise;
}

export async function display(title: string, message: string, cancel = true, persistent = true) {
//----
}

export default {
  display, delete: del, getString
};
