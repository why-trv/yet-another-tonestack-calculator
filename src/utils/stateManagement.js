import { encodeURISafeBase64, decodeURISafeBase64 } from './base64';
import { CborEncoder } from '@jsonjoy.com/json-pack/lib/cbor/CborEncoder';
import { CborDecoder } from '@jsonjoy.com/json-pack/lib/cbor/CborDecoder';
import pako from 'pako';

const autosaveLocalStorageKey = 'autosavedState';
const maxAllowedUrlParameterLength = 2048;

// State encoding and decoding for URL sharing.
// JSON -> CBOR -> zlib (pako) -> URL-safe base64
export function encodeForUrlParameter(object) {
  const encoder = new CborEncoder();
  const cbor = encoder.encode(object);
  const compressed = pako.deflate(cbor, { level: 9 });
  return encodeURISafeBase64(compressed);
}

// URL-safe base64 -> zlib (pako) -> CBOR -> JSON
export function decodeFromUrlParameter(encodedObject) {
  try {
    const compressed = decodeURISafeBase64(encodedObject);
    const cbor = pako.inflate(compressed);
    const decoder = new CborDecoder();
    return decoder.decode(cbor);
  } catch (error) {
    console.error('Error decoding state from URL:', error);
    throw error;
  }
}

// Local storage functions (using regular JSON)
export function saveToLocalStorage(object) {
  localStorage.setItem(autosaveLocalStorageKey, JSON.stringify(object));
}

// Load state from local storage
export function loadFromLocalStorage() {
  const savedState = localStorage.getItem(autosaveLocalStorageKey);
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (error) {
      console.error('Error parsing state from local storage:', error);
      throw error;
    }
  }
  return null;
}

// File functions (using regular JSON)
export function saveToFile(object, filename) {
  const jsonString = JSON.stringify(object, null, 2);  // Pretty-print with 2-space indentation
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function loadFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        resolve(JSON.parse(event.target.result));
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

// URL functions (using compact JSON-like representation, compression and base64)
export function generateUrl(stateData) {
  const encodedState = encodeForUrlParameter(stateData);
  const url = new URL(window.location.href);
  url.searchParams.set('s', encodedState);
  return url.toString();
}

export function loadFromUrl() {
  const url = new URL(window.location.href);
  const encodedState = url.searchParams.get('s');
  if (encodedState && encodedState.length <= maxAllowedUrlParameterLength) {
    return decodeFromUrlParameter(encodedState);
  }
  return null;
}