import dayjs from 'dayjs';
import { verbose } from 'src/constants/app';

export function system(message: string, data?: any) {
  if (verbose) {
    if (data) {
      console.log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] - SYSTEM - ${message}`, data);

    } else {
      console.log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] - SYSTEM - ${message}`);
    }
  }

}

export function message(file: string, method: string, message: string, isError = false, data?: any) {
  if (!verbose && !isError) {
    return;
  }


  if (!isError) {
    log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] - INFO - ${file} -> ${method}: ${message}`, data);
  } else {
    error(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] - ERROR - ${file} -> ${method}: ${message}`, data);
  }
}

export function log(message: string, data?: any) {
  if (data) {
    console.log(message, data);
  } else {
    console.log(message);
  }
}

export function error(message: string, data?: any) {
  if (data) {
    console.error(message, data);
  } else {
    console.error(message);
  }
  throw new Error(message);
}

export function section(sectionName: string, isEnd = false) {
  if (verbose) {
    if (!isEnd) console.log('========================================> ' + sectionName);
    if (isEnd) console.log('++++++++++++++++++++++++++++++++++++++++> ' + sectionName);
  }
}

export function func(functionName: string, variables?: object) {
  if (verbose) {
    if (variables) {
      console.log(`Function: ${functionName} - Variables:`, variables);
    } else {
      console.log(`Function: ${functionName}`);
    }

    console.log('----------------------------------------');
  }
}


export function useLogging() {
  return { message, log, error, section, func };
}

export default {
  message, log, error, section, func
};
