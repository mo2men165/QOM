export type Lang = 'ar' | 'en';
export type Filter = 'all' | 'tops' | 'trousers' | 'dresses' | 'outerwear';

export interface ProductPreorder {
  moq: number;
  currentCount: number;
  deadline: Date;
  status: 'open' | 'funded' | 'expired';
}

export interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  catAr: string;
  catEn: string;
  fabric: string;
  filter: Filter;
  isNew?: boolean;
  img: string;
  /** Present when the product supports community pre-order */
  preorder?: ProductPreorder;
}

export const products: Product[] = [
  { id:1,  nameAr:'القميص الكتاني الواسع',  nameEn:'Oversized Linen Shirt',    catAr:'قمصان',   catEn:'Shirts',   fabric:'100% Egyptian Linen',  filter:'tops',      isNew:true, img:'/qom/46.jpg' },
  { id:2,  nameAr:'بنطلون الكتان الواسع',   nameEn:'Wide-Leg Linen Trousers',  catAr:'بناطلون', catEn:'Trousers', fabric:'100% Egyptian Linen',  filter:'trousers',            img:'/qom/33.jpg' },
  { id:3,  nameAr:'الفستان الكتاني المكسي', nameEn:'Linen Maxi Dress',         catAr:'فساتين',  catEn:'Dresses',  fabric:'100% Egyptian Linen',  filter:'dresses',   isNew:true, img:'/qom/6.jpg'  },
  { id:4,  nameAr:'البليزر الهيكلي',        nameEn:'Structured Blazer',        catAr:'جاكيت',   catEn:'Blazers',  fabric:'100% Egyptian Cotton', filter:'outerwear',           img:'/qom/22.jpg' },
  { id:5,  nameAr:'التيشرت القطني الأساسي', nameEn:'Cotton Crew Tee',          catAr:'تيشرتات', catEn:'T-Shirts', fabric:'100% Egyptian Cotton', filter:'tops',                img:'/qom/47.jpg' },
  { id:6,  nameAr:'فستان الكتان القميص',    nameEn:'Linen Shirt Dress',        catAr:'فساتين',  catEn:'Dresses',  fabric:'100% Egyptian Linen',  filter:'dresses',             img:'/qom/27.jpg' },
  { id:7,  nameAr:'البنطلون الكارغو',       nameEn:'Cotton Cargo Trousers',    catAr:'بناطلون', catEn:'Trousers', fabric:'100% Egyptian Cotton', filter:'trousers',            img:'/qom/34.jpg' },
  { id:8,  nameAr:'التيشرت المخطط',         nameEn:'Striped Cotton Tee',       catAr:'بلوزات',  catEn:'Tops',     fabric:'100% Egyptian Cotton', filter:'tops',                img:'/qom/32.jpg' },
  { id:9,  nameAr:'القميص العلوي',          nameEn:'Cotton Overshirt',         catAr:'جاكيت',   catEn:'Jackets',  fabric:'100% Egyptian Cotton', filter:'outerwear', isNew:true, img:'/qom/1.jpg'  },
  { id:10, nameAr:'التنورة الميدي',         nameEn:'Cotton Midi Skirt',        catAr:'تنانير',  catEn:'Skirts',   fabric:'100% Egyptian Cotton', filter:'dresses',             img:'/qom/0.jpg'  },
  { id:11, nameAr:'البولو الكحلي',          nameEn:'Navy Cotton Polo',         catAr:'قمصان',   catEn:'Shirts',   fabric:'100% Egyptian Cotton', filter:'tops',                img:'/qom/56.jpg' },
  { id:12, nameAr:'القميص الكتان الطويل',   nameEn:'Linen Long-Sleeve Shirt',  catAr:'تيشرتات', catEn:'T-Shirts', fabric:'100% Egyptian Linen',  filter:'tops',                img:'/qom/39.jpg' },
];
