// Table
export const TABLE_HEAD_CLIENTS = [
  {
    name: 'Company name',
    dataKey: 'company',
    sortBy: 'company'
  },
  {
    name: 'Contact person',
    dataKey: 'contactPerson',
    sortBy: 'contactPerson.firstName'
  },
  {
    name: 'Contact email',
    dataKey: 'contactEmail',
    sortBy: 'contactPerson.email'
  },
  {
    name: 'Date joined',
    dataKey: 'created',
    sortBy: 'created'
  },
  {
    name: 'Status',
    dataKey: 'status',
    sortBy: 'status'
  }
];
export const TABLE_HEAD_QUERIES = [
  {
    name: 'Name',
    dataKey: 'feed.name',
    sortBy: 'feed.name'
  },
  {
    name: 'Description',
    dataKey: 'feed.description',
    sortBy: 'feed.description'
  },
  {
    name: 'Created on',
    dataKey: 'feed.created_at',
    sortBy: 'feed.created_at'
  },
  {
    name: 'Last edited',
    dataKey: 'feed.modified_at',
    sortBy: 'feed.modified_at'
  }
];
export const TABLE_KEYS_DATE_FORMAT = ['created', 'feed.created_at', 'feed.modified_at'];

// Header and Footer
export const LEGAL_PRIVACY_LINKS = [
  {
    link: 'http://help.ft.com/help/legal-privacy/cookies/',
    text: 'Cookies'
  },
  {
    link: 'http://help.ft.com/help/legal-privacy/copyright/copyright-policy/',
    text: 'Copyright'
  },
  {
    link: 'http://help.ft.com/help/legal-privacy/privacy/',
    text: 'Privacy'
  },
  {
    link: 'http://help.ft.com/help/legal-privacy/terms-conditions',
    text: 'Terms & Conditions'
  }
];
export const PRIMARY_NAVIGATION_DATA = {
  'primaryMenu': {
    'label': 'Primary Menu',
    'items': [
      {
        'label': 'Client feed',
        'url': '/clients',
        'submenu': {
          'clientMenu': {
            'label': 'client Menu',
            'items': [
              {
                'label': 'Clients',
                'url': '/clients',
                'submenu': null
              }
            ]
          }
        }
      }
    ]
  }
};
export const CLIENT_NAVIGATION_DATA = [
  {
    label: 'Account',
    url: '/account',
    submenu: null
  },
  {
    label: 'Query Builder',
    url: '/query-builder',
    submenu: null
  }
];

// Routes
export const APP_ROUTES = {
  home: '/',
  clients: '/clients',
  account: '/account',
  queryBuilder: '/query-builder',
  queryBuilderPreview: 'preview',
  currentFeed: '/current-feed',
  settings: '/settings',
  addSyndicationPartner: '/add-syndication-partner'
};

// API urls
export const PRODUCTION_URL = '/api/';
export const DEV_URL = 'http://localhost:9090/ccf/api/';
// eslint-disable-next-line no-undef
export const BASE_URL = process.env.NODE_ENV === 'production'
  ? PRODUCTION_URL
  : DEV_URL;

export const API_ENDPOINTS = {
  concepts: {
    main: 'concepts',
    types: {
      'has-genre': '?type=http://www.ft.com/ontology/Genre',
      'has-brand': '?type=http://www.ft.com/ontology/product/Brand&mode=search&q=',
      'has-author': '?type=http://www.ft.com/ontology/person/Person&mode=search&boost=authors&q=',
      rest: '?type=http://www.ft.com/ontology/Topic&type=http://www.ft.com/ontology/person/Person&type=http://www.ft.com/ontology/organisation/Organisation&type=http://www.ft.com/ontology/Location&mode=search&q='
    },
    narrower: 'showRelationship=narrower',
    related: 'showRelationship=related'
  },
  licences: 'licences',
  licencesPreview: 'preview',
  search: 'search',
  feeds: 'feeds',
  internalConcordances: 'internalconcordances?'
};

// Concept types
export const FILTERS_ONCHANGE_REQUEST = ['has-author', 'about', 'mentions', 'about', 'has-brand'];
export const FILTER_EXPRESSION_TYPES = {
  expression: 'expression',
  relatedEntity: 'related-entity-filter',
  keyword: 'keyword-filter',
  content: 'content-type-filter',
  author: 'has-author',
  timeDelta: 'time-delta-filter',
  syndication: 'syndication-filter'
};

// Query
export const QUERY_VERSION = {
  version: 'v1.0.0'
};
export const QUERY_SYNDICATION_FILTER = {
  type: 'syndication-filter',
  value: true
};

export const KEYS_FOR_SANITIZING = ['id', 'editMode', 'prefLabel', 'options', 'narrowerConcepts', 'relatedConcepts'];
export const TYPES_FOR_SIMILAR_CONCEPTS = ['Topic', 'Location'];

// Radio and Select options
export const RADIO_OPTIONS = [
  {
    name: 'And',
    value: 'and'
  }, {
    name: 'Or',
    value: 'or'
  }
];

export const SELECT_OPTIONS_RELATED_ENTITY = [
  {
    id: 1,
    name: 'Author',
    value: 'has-author',
    type: 'related-entity'
  },
  {
    id: 2,
    name: 'Genre',
    value: 'has-genre',
    type: 'related-entity'
  },
  {
    id: 3,
    name: 'Brand',
    value: 'has-brand',
    type: 'related-entity'
  },
  {
    id: 4,
    name: 'About',
    value: 'about',
    type: 'related-entity'
  },
  {
    id: 5,
    name: 'Mentions',
    value: 'mentions',
    type: 'related-entity'
  }
];
export const SELECT_OPTIONS_KEYWORD = {
  id: 6,
  name: 'Keyword',
  value: 'keyword-filter',
  type: 'keyword-filter'
};
export const SELECT_OPTIONS_ALL = [
  {
    id: 1,
    name: 'Author',
    value: 'has-author',
    type: 'related-entity'
  },
  {
    id: 2,
    name: 'Genre',
    value: 'has-genre',
    type: 'related-entity'
  },
  {
    id: 3,
    name: 'Brand',
    value: 'has-brand',
    type: 'related-entity'
  },
  {
    id: 4,
    name: 'About',
    value: 'about',
    type: 'related-entity'
  },
  {
    id: 5,
    name: 'Mentions',
    value: 'mentions',
    type: 'related-entity'
  },
  {
    id: 6,
    name: 'Keyword',
    value: 'keyword-filter',
    type: 'related-entity'
  }
];

export const DEFAULT_SELECTED_PERIOD = '168';
export const SELECT_OPTIONS_PERIOD = [
  {
    id: 1,
    name: '1 day',
    value: '24'
  },
  {
    id: 2,
    name: '3 days',
    value: '72'
  },
  {
    id: 3,
    name: '1 week',
    value: '168'
  },
  {
    id: 4,
    name: '2 weeks',
    value: '336'
  },
  {
    id: 5,
    name: '1 month',
    value: '744'
  },
  {
    id: 6,
    name: '3 months',
    value: '2232'
  }
];

// Other
export const EMPTY_VALUE = '-';
export const KEY_CODE_SPACE = 32;
export const TOO_MANY_ARTICLES_NUMBER = 200;
export const DEFAULT_OFFSET_TIME_FILTER = '720';
