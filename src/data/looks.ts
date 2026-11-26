export interface LookPiece {
  name: string;
  image: string;
}

export interface LookHotspot {
  /** Normalized horizontal coordinate over the front model card (0 to 100%) */
  x: number;
  /** Normalized vertical coordinate over the front model card (0 to 100%) */
  y: number;
  label: string;
  closeupImage: string;
}

export interface LookItem {
  id: string;
  name: string;
  hindiName: string;
  image: string;
  fabricLine: string;
  accentColor: string;
  pieces: LookPiece[];
  hotspots: LookHotspot[];
}

export const looks: LookItem[] = [
  {
    id: 'look-01',
    name: 'Dulha Sherwani',
    hindiName: 'दूल्हा शेरवानी',
    image: '/looks/look-01.png',
    fabricLine: 'Hand-woven Raw Silk · Antique Zardozi',
    accentColor: '#4A0F1C',
    pieces: [
      { name: 'Ivory Zardozi Sherwani', image: '/images/hero-sherwani.jpg' },
      { name: 'Maroon Jamawar Stole', image: '/images/craft-embroidery.jpg' },
      { name: 'Chanderi Silk Kurta', image: '/images/collection-kurta.jpg' },
      { name: 'Tailored Aligarh Churidar', image: '/images/collection-trousers.jpg' },
      { name: 'Hand-stitched Gold Mojari', image: '/images/occasion-baraati.jpg' },
      { name: 'Kalangi Heritage Brooch', image: '/images/craft-fabric.jpg' },
    ],
    hotspots: [
      { x: 50, y: 18, label: 'Zardozi on raw silk', closeupImage: '/images/craft-embroidery.jpg' },
      { x: 38, y: 36, label: 'Maroon Jamawar drape', closeupImage: '/images/occasion-baraati.jpg' },
      { x: 50, y: 42, label: 'Hand-cast brass buttons', closeupImage: '/images/craft-fabric.jpg' },
      { x: 56, y: 63, label: 'Gota patti hem border', closeupImage: '/images/hero-sherwani.jpg' },
    ],
  },
  {
    id: 'look-02',
    name: 'Baraati Bandhgala',
    hindiName: 'बाराती बंदगला',
    image: '/looks/look-02.png',
    fabricLine: 'Super 150s Wool · Midnight Teal Silk Lining',
    accentColor: '#0E3B43',
    pieces: [
      { name: 'Charcoal Jodhpuri Bandhgala', image: '/images/occasion-baraati.jpg' },
      { name: 'Teal Jacquard Pocket Square', image: '/images/craft-fabric.jpg' },
      { name: 'Crisp Egyptian Cotton Shirt', image: '/images/collection-shirts.jpg' },
      { name: 'Pleated Wool Barathea Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Polished Oxford Brogue', image: '/images/craft-fitting.jpg' },
    ],
    hotspots: [
      { x: 50, y: 17, label: 'High-stand Bandhgala collar', closeupImage: '/images/occasion-baraati.jpg' },
      { x: 50, y: 31, label: 'Antique gold crest buttons', closeupImage: '/images/craft-fabric.jpg' },
      { x: 60, y: 26, label: 'Hand-rolled silk pocket square', closeupImage: '/images/craft-cutting.jpg' },
      { x: 46, y: 53, label: 'Double-welt tailored hem', closeupImage: '/images/collection-trousers.jpg' },
    ],
  },
  {
    id: 'look-03',
    name: 'Sangeet Indo-Western',
    hindiName: 'संगीत इंडो-वेस्टर्न',
    image: '/looks/look-03.png',
    fabricLine: 'Midnight Teal Velvet · Asymmetric Drape',
    accentColor: '#0E3B43',
    pieces: [
      { name: 'Asymmetric Teal Achkan', image: '/images/hero-indowestern.jpg' },
      { name: 'Ivory Pleated Drape Kurta', image: '/images/collection-indowestern.jpg' },
      { name: 'Slim Tapered Jodhpur Pant', image: '/images/collection-trousers.jpg' },
      { name: 'Embroidered Velvet Loafer', image: '/images/occasion-sangeet.jpg' },
    ],
    hotspots: [
      { x: 48, y: 18, label: 'Sculpted mandarin neckline', closeupImage: '/images/hero-indowestern.jpg' },
      { x: 56, y: 34, label: 'Tone-on-tone resham stitch', closeupImage: '/images/craft-embroidery.jpg' },
      { x: 50, y: 44, label: 'Concealed placket closures', closeupImage: '/images/collection-indowestern.jpg' },
      { x: 44, y: 63, label: 'Asymmetric layered hem', closeupImage: '/images/occasion-sangeet.jpg' },
    ],
  },
  {
    id: 'look-04',
    name: 'Cocktail Velvet Jacket',
    hindiName: 'कॉकटेल वेलवेट जैकेट',
    image: '/looks/look-04.png',
    fabricLine: 'Deep Wine Silk Velvet · Satin Shawl Lapel',
    accentColor: '#4A0F1C',
    pieces: [
      { name: 'Wine Silk Velvet Dinner Jacket', image: '/images/occasion-sangeet.jpg' },
      { name: 'Black Wing-Collar Dress Shirt', image: '/images/collection-shirts.jpg' },
      { name: 'Satin-Stripe Tuxedo Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Silk Cummerbund & Bow', image: '/images/craft-fabric.jpg' },
    ],
    hotspots: [
      { x: 47, y: 20, label: 'Silk-faced shawl lapel', closeupImage: '/images/occasion-sangeet.jpg' },
      { x: 50, y: 35, label: 'French-knot cuff embroidery', closeupImage: '/images/craft-embroidery.jpg' },
      { x: 50, y: 40, label: 'Silk-covered dome button', closeupImage: '/images/craft-fabric.jpg' },
      { x: 54, y: 52, label: 'Hand-basted vent finish', closeupImage: '/images/craft-fitting.jpg' },
    ],
  },
  {
    id: 'look-05',
    name: 'Safari Suit',
    hindiName: 'सफारी सूट',
    image: '/looks/look-05.png',
    fabricLine: 'Belgian Linen-Cotton · Four-Pocket Utility Cut',
    accentColor: '#2E261B',
    pieces: [
      { name: 'Sand Linen Safari Jacket', image: '/images/collection-safari.jpg' },
      { name: 'Horn-Buttoned Waist Belt', image: '/images/craft-cutting.jpg' },
      { name: 'Relaxed Linen Pleat Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Suede Penny Loafer', image: '/images/craft-fitting.jpg' },
    ],
    hotspots: [
      { x: 49, y: 18, label: 'Open camp collar', closeupImage: '/images/collection-safari.jpg' },
      { x: 40, y: 34, label: 'Bellows chest pocket stitch', closeupImage: '/images/craft-cutting.jpg' },
      { x: 50, y: 38, label: 'Natural buffalo horn buttons', closeupImage: '/images/craft-fabric.jpg' },
      { x: 54, y: 52, label: 'Double-needle felled seam', closeupImage: '/images/craft-measurement.jpg' },
    ],
  },
  {
    id: 'look-06',
    name: 'Festive Kurta Set',
    hindiName: 'उत्सव कुर्ता सेट',
    image: '/looks/look-06.png',
    fabricLine: 'Saffron Mulberry Silk · Mirror & Resham Work',
    accentColor: '#5B3410',
    pieces: [
      { name: 'Saffron Mulberry Silk Kurta', image: '/images/hero-kurta.jpg' },
      { name: 'Ivory Raw Silk Pyjama', image: '/images/collection-kurta.jpg' },
      { name: 'Printed Organza Nehru Stole', image: '/images/craft-embroidery.jpg' },
      { name: 'Tan Leather Kolhapuri', image: '/images/craft-fitting.jpg' },
    ],
    hotspots: [
      { x: 50, y: 18, label: 'Resham collar piping', closeupImage: '/images/hero-kurta.jpg' },
      { x: 50, y: 30, label: 'Hand-loomed mulberry weave', closeupImage: '/images/craft-fabric.jpg' },
      { x: 50, y: 40, label: 'Mother-of-pearl studs', closeupImage: '/images/collection-kurta.jpg' },
      { x: 46, y: 63, label: 'Side-slit tassel finish', closeupImage: '/images/craft-embroidery.jpg' },
    ],
  },
  {
    id: 'look-07',
    name: 'Boardroom Nehru Jacket',
    hindiName: 'बोर्डरूम नेहरू जैकेट',
    image: '/looks/look-07.png',
    fabricLine: 'Slate Worsted Wool · Structured Waistcoat',
    accentColor: '#0E3B43',
    pieces: [
      { name: 'Slate Worsted Nehru Modi Jacket', image: '/images/collection-indowestern.jpg' },
      { name: 'Ivory Giza Cotton Shirt', image: '/images/collection-shirts.jpg' },
      { name: 'Charcoal Cavalry Twill Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Brushed Brass Tie Pin', image: '/images/craft-fabric.jpg' },
    ],
    hotspots: [
      { x: 50, y: 18, label: 'Crisp fused band collar', closeupImage: '/images/craft-cutting.jpg' },
      { x: 58, y: 27, label: 'Slanted welt breast pocket', closeupImage: '/images/craft-measurement.jpg' },
      { x: 50, y: 37, label: 'Matte horn five-button front', closeupImage: '/images/craft-fabric.jpg' },
      { x: 48, y: 52, label: 'Tailored waist suppression', closeupImage: '/images/craft-fitting.jpg' },
    ],
  },
  {
    id: 'look-08',
    name: 'Classic Shirt & Trousers',
    hindiName: 'क्लासिक शर्ट और ट्राउज़र',
    image: '/looks/look-08.png',
    fabricLine: '2-Ply Giza Cotton · Gurkha High-Rise Trouser',
    accentColor: '#24201C',
    pieces: [
      { name: 'Ivory 2-Ply Giza Dress Shirt', image: '/images/collection-shirts.jpg' },
      { name: 'Charcoal Gurkha Pleat Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Monogrammed French Cuff', image: '/images/craft-measurement.jpg' },
      { name: 'Hand-welted Derby Shoe', image: '/images/craft-fitting.jpg' },
    ],
    hotspots: [
      { x: 50, y: 17, label: 'Hand-turned spread collar', closeupImage: '/images/collection-shirts.jpg' },
      { x: 50, y: 34, label: 'Single-needle 22 SPI seam', closeupImage: '/images/craft-measurement.jpg' },
      { x: 45, y: 50, label: 'Extended Gurkha waistband', closeupImage: '/images/collection-trousers.jpg' },
      { x: 54, y: 86, label: 'Turn-up cuff trouser break', closeupImage: '/images/craft-fitting.jpg' },
    ],
  },
];
