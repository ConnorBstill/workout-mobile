import { environment } from '../../environments/environment';

export const APP_BASE_URL = '/app';

export const SQL_DATE_FORMAT = 'YYYY/MM/DD';
export const SQL_DATETIME_FORMAT = 'YYYY/MM/DD HH:mm:ss';

export const MOMENT_DATE_FORMAT = 'MMM d, YYYY';
export const MOMENT_DATETIME_FORMAT = 'MMM d, YYYY h:mm a';

export const NG_DATE_FORMAT = 'M.d.yy';
export const NG_DATETIME_FORMAT = 'M.d.yy HH:mm';
export const NG_NO_DATA = '-';

export const NO_NAME_PLACEHOLDER_TEXT = 'N/A';
export const TEXTAREA_ROWS = 4;

export type HTML_INPUT_TYPES =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'textarea'
  | 'time'
  | 'url'
  | 'week';

export const ROLES = {
  USER: 1,
  BUSINESS: 2,
  ADMIN: 3,
};

export const JOB_TITLES = ['doctor', 'nurse', 'practitioner', 'tech', 'admin', 'vendor'];
export const SPECIALTIES = [
  'Vascular',
  'Cardiothoracic',
  'Colon and Rectal',
  'General',
  'OG/GYN',
  'Gynecology Oncology',
  'Neurosurgery',
  'Opthamology',
  'Oral and Maxillofacial',
  'Orthopedic',
  'Ear Nose and Throat (ENT)',
  'Pediatric',
  'Plastic and Maxillofacial',
  'Urology',
];

let _PRICING_PLANS = [];
if (environment.production) {
  _PRICING_PLANS = [
    [
      {
        text: '$199 / month',
        period: 'monthly',
        planId: 'plan_EaSBMyebYx5fiv',
      },
      {
        text: '$1990 / year',
        period: 'yearly',
        planId: 'plan_FCaz8eZA1AgHIY',
      },
    ],
    [
      {
        text: '$299 / month',
        period: 'monthly',
        planId: 'plan_FCb1SCtdwhWNfs',
      },
      {
        text: '$2990 / year',
        period: 'yearly',
        planId: 'plan_FCb2DmW1AsWvEY',
      },
    ],
    [
      {
        text: '$399 / month',
        period: 'monthly',
        planId: 'plan_FCb3eq06MTLm23',
      },
      {
        text: '$3990 / year',
        period: 'yearly',
        planId: 'plan_FCb4fvS6iZLici',
      },
    ],
    [
      {
        text: '$499 / month',
        period: 'monthly',
        planId: 'plan_FCb4qcNAxzVt0a',
      },
      {
        text: '$4990 / year',
        period: 'yearly',
        planId: 'plan_FCb5svc4R3YYkP',
      },
    ],
    [{ text: '' }, { text: '' }],
  ];
} else {
  _PRICING_PLANS = [
    [
      {
        text: '$199 / month',
        period: 'monthly',
        planId: 'plan_EeX4AYs2HC9V6t',
      },
      {
        text: '$1990 / year',
        period: 'yearly',
        planId: 'plan_FCb6NpNyabx03c',
      },
    ],
    [
      {
        text: '$299 / month',
        period: 'monthly',
        planId: 'plan_FCb7o7eGSW4NGj',
      },
      {
        text: '$2990 / year',
        period: 'yearly',
        planId: 'plan_FCb7XSOMfKjmSf',
      },
    ],
    [
      {
        text: '$399 / month',
        period: 'monthly',
        planId: 'plan_FCb8F7Dmu7c44T',
      },
      {
        text: '$3990 / year',
        period: 'yearly',
        planId: 'plan_FCb8aeh1p8YMZA',
      },
    ],
    [
      {
        text: '$499 / month',
        period: 'monthly',
        planId: 'plan_FCb8Q7BcloQIzM',
      },
      {
        text: '$4990 / year',
        period: 'yearly',
        planId: 'plan_FCb9gQgbFFwZts',
      },
    ],
    [{ text: '' }, { text: '' }],
  ];
}

export const PRICING_PLANS = _PRICING_PLANS;
