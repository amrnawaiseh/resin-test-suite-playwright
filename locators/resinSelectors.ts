export default {
  loginSelectors: {
    password: '#okta-signin-password',
    userName: '#okta-signin-username',
  },
  testIds: {
    articleCard: 'card-article',
    articleDate: 'last-updated-date',
    cardHeader: 'card-title',
    cardOptionBtn: 'more-options',
    cardTitle: 'card-metadata',
    createContentForm: 'content-composer-form',
    dataSrcBtn: 'select-data-source',
    emptyResult: 'no-items-message',
    gridContentContainer: 'grid',
    gridLayoutBtn: 'grid-view-button',
    listContentContainer: 'list',
    listLayoutBtn: 'list-view-button',
    loadingIcon: 'loading-icon',
    roverSrcBtn: 'use-rover',
    settingsBtn: 'sidebar-nav-button-settings',
    sortByBtn: 'sort-by',
    townCountryTenant: 'befe5746-4ff4-4dfb-8792-814adb6c8a9f',
    townCountryTenantUs: '115eff3b-95a0-4668-832c-9d02ea92500d',
  },
  articleCardById: (articleId) => `article[id="${articleId}"]`,
  articlesContainer: '#listing-content-start',
  calenderDateInput: '#calendar-popover-date-input-input',
  cardDraftIcon: '[data-testid="card-metadata"] span',
  contentCreate: '[aria-label="Create New Content"]',
  dateCalenderBtns: '[aria-label="open-calendar-for"]',
  filterBtn: (type) => `[aria-label="${type}"]`,
  filtersOptions: '[id *= "react-select-"]',
  listingFilters: 'listing-filters',
  mainSearchInput: '#search',
  searchInput: (type) => `#select-${type}`,
  selectedDate: 'span[data-testid] label',
  sortByInput: '#select-sort-by',
  tenantSearch: '#search-tenants',
  tenantSelector: '[aria-label="Select Site"] span',
  welcomeHeader: '#main-content',
};