export const HERO_IMAGE = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/de1d9cb9c_generated_d9b69f0f.png";
export const MARBLE_IMAGE = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/72de10115_generated_72b08617.png";
export const ONYX_IMAGE = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/feac4b4d7_generated_dff9074e.png";
export const GRANITE_IMAGE = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/accef0836_generated_dfde1edd.png";
export const TRAVERTINE_IMAGE = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/4328ac8ba_generated_5ea7731a.png";
export const SLABS_IMAGE = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/76544c119_generated_c2b149e8.png";
export const PROJECT_VILLA = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/e31c65134_generated_4a17392d.png";
export const PROJECT_HOTEL = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/7db48c184_generated_082b5580.png";
export const PROJECT_PENTHOUSE = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/5fb80113d_generated_125cc7cc.png";
export const ABOUT_FACTORY = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/bcac05fdb_generated_aebe9a80.png";
export const MAGAZINE_COVER = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/282a30eb5_generated_8e769b85.png";
export const PRODUCT_KITCHEN = "https://media.base44.com/images/public/6a3d6846fb445abffeb1687f/c5cbb7b39_generated_662ce3da.png";

export const COLLECTIONS = [
  { id: 'marble', name: 'مرمر', nameEn: 'Marble', image: MARBLE_IMAGE, path: '/collection/marble', desc: 'زیبایی بی‌نظیر و ظرافت ابدی' },
  { id: 'onyx', name: 'اونیکس', nameEn: 'Onyx', image: ONYX_IMAGE, path: '/collection/onyx', desc: 'شفافیت خیره‌کننده و نورپردازی منحصربه‌فرد' },
  { id: 'granite', name: 'گرانیت', nameEn: 'Granite', image: GRANITE_IMAGE, path: '/collection/granite', desc: 'استحکام و شکوه بی‌پایان' },
  { id: 'travertine', name: 'تراورتن', nameEn: 'Travertine', image: TRAVERTINE_IMAGE, path: '/collection/travertine', desc: 'گرمای طبیعی و حس آرامش' },
  { id: 'luxury_slab', name: 'اسلب‌های لوکس', nameEn: 'Luxury Slabs', image: SLABS_IMAGE, path: '/collection/luxury_slab', desc: 'شاهکارهای یکپارچه طبیعت' },
];

export const NAV_ITEMS = [
  { label: 'خانه', path: '/' },
  { label: 'کالکشن', path: '/collections', children: [
    { label: 'مرمر', path: '/collection/marble' },
    { label: 'تراورتن', path: '/collection/travertine' },
    { label: 'گرانیت', path: '/collection/granite' },
    { label: 'اونیکس', path: '/collection/onyx' },
    { label: 'اسلب‌های لوکس', path: '/collection/luxury_slab' },
  ]},
  { label: 'پروژه‌ها', path: '/projects' },
  { label: 'مجله', path: '/magazine' },
  { label: 'درباره ما', path: '/about' },
  { label: 'تماس با ما', path: '/contact' },
];

export const CATEGORY_NAMES = {
  marble: 'مرمر',
  onyx: 'اونیکس',
  granite: 'گرانیت',
  travertine: 'تراورتن',
  luxury_slab: 'اسلب‌های لوکس',
};

export const CATEGORY_IMAGES = {
  marble: MARBLE_IMAGE,
  onyx: ONYX_IMAGE,
  granite: GRANITE_IMAGE,
  travertine: TRAVERTINE_IMAGE,
  luxury_slab: SLABS_IMAGE,
};