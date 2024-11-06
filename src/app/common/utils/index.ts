export { wait } from './rx.helpers';

import { RestService } from '../../services/rest.service';

import { DownloadBase64Opts } from '../types/utils';

import b64toBlob from 'b64-to-blob';

export const toMilitaryTime = (_hours: string, minutes: string, modifier: string): string => {
  let hours = _hours;

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return `${hours}:${minutes}`;
};

export const getBase64FromFile = (file): Promise<string | ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const copyObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const copyToClipboard = (text): boolean => {
  const textArea: HTMLTextAreaElement = document.createElement('textarea');
  let success: boolean = false;

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';

  // Ensure it has a small width and height. Setting to 1px / 1em...
  // ...doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = '0';

  // Clean up any borders
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  // Set the actual value
  textArea.value = text;

  // Now, render the element
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard with text value', text);
  }

  // Remove the element
  document.body.removeChild(textArea);

  return success;
};

export const uploadImage = async (
  params: {
    cb?: Function;
    element: HTMLInputElement;
    payload?: any;
    restServiceInstance: RestService;
    url: string;
  } = null
) => {
  const fileCount: number = params.element.files.length;
  const file: File = params.element.files.item(0);

  if (fileCount === 1) {
    const encodedData = await getBase64FromFile(file);

    if (params.url) {
      params.restServiceInstance
        .post(params.url, {
          ...params.payload,
          media: encodedData,
          extension: file.type,
        })
        .then(() => {
          if (params.cb) {
            params.cb();
          }
        });
    }
  }
};

export const transposeChord = (chord: string, amount: 1 | -1): string => {
  const scale: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return chord.replace(/[CDEFGAB]#?/g, (match) => {
    const i: number = (scale.indexOf(match) + amount) % scale.length;
    return scale[i < 0 ? i + scale.length : i];
  });
};

export const autocompleteFilter = (options: any[], value: string, keyName?: string) => {
  const filterValue: string = value && typeof value === 'string' ? value.toLowerCase() : '';

  if (keyName) {
    return options.filter((option) => option[keyName] && option[keyName].toLowerCase().indexOf(filterValue) === 0);
  } else {
    return options.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
  }
};

export const downloadUrl = (url: string, fileName: string): void => {
  fetch(url, {
    mode: 'no-cors',
  })
    .then((res) => res.blob())
    .then((blob) => {
      const a: HTMLAnchorElement = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
};

export const downloadBase64 = (base64: string, opts: DownloadBase64Opts = {}): void => {
  const blob: Blob = b64toBlob(base64, opts.contentType || 'application/pdf');

  const a: HTMLAnchorElement = window.document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = opts.fileName || 'My Chord Chart.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/**
 * Replaces A# with Bb and D# with Bb
 */
export const convertFlats = (value: string): string => {
  if (value) {
    return value.replace('A#', 'Bb').replace('D#', 'Eb');
  } else {
    return value;
  }
};

/**
 * Replaces Bb with A# and Eb with D#
 */
export const revertFlats = (value: string): string => {
  if (value) {
    return value.replace('Bb', 'A#').replace('Eb', 'D#');
  } else {
    return value;
  }
};

export const WHITESPACE_REGEX = /\s+|\\n/gim;

export const convertDollarsToCents = (amount: any): number => {
  return Math.round(100 * parseFloat(typeof amount === 'string' ? amount.replace(/[$,]/g, '') : amount));
};

export const parseAndDownloadCsv = (
  data: any[],
  fields: string[],
  _opts: {
    excludedRows?: string[];
    filename?: string;
  } = {}
): string => {
  const opts = {
    excludedRows: _opts.excludedRows || [],
    filename: _opts.filename || 'export',
  };

  const rows = [];

  const fieldRow = [];
  fields.map((field) => {
    if (!opts.excludedRows.includes(field)) {
      fieldRow.push(field);
    }
  });

  rows.push(fieldRow);

  data.map((el) => {
    const row = [];

    fields.map((field) => {
      if (!opts.excludedRows.includes(field)) {
        row.push(el[field]);
      }
    });

    rows.push(row);
  });

  let csvString: string = '';

  rows.forEach((el) => {
    const row = el.join(',');
    csvString += row + '\r\n';
  });

  // Creates a pseudo anchor elements and downloads the string to a file
  const blob: Blob = new Blob([csvString]);
  let a: HTMLAnchorElement = window.document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `${opts.filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  return csvString;
};

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getWindowScrollAmount = () => {
  const doc = document.documentElement;
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
};

export const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
