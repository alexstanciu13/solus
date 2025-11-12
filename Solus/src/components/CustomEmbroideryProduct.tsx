import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, ChevronDown, ArrowLeft, Upload, Info } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CustomEmbroideryProductProps {
  productId: string;
  onNavigate: (page: string) => void;
  onAddToCart?: () => void;
}

type EmbroideryType = 'text' | 'design' | 'custom' | null;
type FontStyle = 'script' | 'modern' | 'classic' | 'bold';

const PRODUCTS: Record<string, { id: string; name: string; image: string; price: number }> = {
  hoodie: { id: 'hoodie', name: 'Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', price: 450 },
  sweater: { id: 'sweater', name: 'Sweater', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800', price: 380 },
  beanie: { id: 'beanie', name: 'Beanie', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800', price: 120 },
  cap: { id: 'cap', name: 'Cap', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', price: 140 },
  shirt: { id: 'shirt', name: 'Shirt', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800', price: 320 },
  trousers: { id: 'trousers', name: 'Trousers', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', price: 420 },
};

const SIZES = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  hats: ['One Size', 'Fitted'],
};

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Gray', value: '#808080' },
  { name: 'Navy', value: '#1a365d' },
  { name: 'Beige', value: '#d4c5b9' },
  { name: 'Dark Green', value: '#1b3a2d' },
];

const THREAD_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Dark Gray', value: '#4a4a4a' },
  { name: 'Light Gray', value: '#a0a0a0' },
  { name: 'Navy Blue', value: '#1a365d' },
  { name: 'Wine', value: '#7c2d3e' },
  { name: 'Forest Green', value: '#1b3a2d' },
  { name: 'Gold', value: '#c9a66b' },
];

const FONTS: Record<FontStyle, { name: string; style: string }> = {
  script: { name: 'Script', style: 'font-serif italic' },
  modern: { name: 'Modern', style: 'font-sans' },
  classic: { name: 'Classic', style: 'font-playfair' },
  bold: { name: 'Bold', style: 'font-sans font-bold' },
};

const PLACEMENTS = {
  clothing: ['Left chest', 'Right chest', 'Back', 'Sleeve'],
  beanie: ['Front', 'Back', 'Side'],
  cap: ['Front', 'Back', 'Side'],
  trousers: ['Left thigh', 'Right thigh', 'Back'],
};

export function CustomEmbroideryProduct({ productId, onNavigate, onAddToCart }: CustomEmbroideryProductProps) {
  const product = PRODUCTS[productId];

  // Product Configuration
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Embroidery Configuration
  const [embroideryType, setEmbroideryType] = useState<EmbroideryType>(null);

  // Text Embroidery
  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState<FontStyle>('classic');
  const [threadColor, setThreadColor] = useState('#000000');
  const [textPlacement, setTextPlacement] = useState('');

  // Design Embroidery
  const [designDescription, setDesignDescription] = useState('');
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [designImageName, setDesignImageName] = useState('');
  const [colorType, setColorType] = useState<'single' | 'multi' | 'custom'>('single');
  const [singleColor, setSingleColor] = useState('#000000');
  const [multiColors, setMultiColors] = useState<string[]>(['#000000', '', '']);
  const [designPlacement, setDesignPlacement] = useState('');

  // Custom Design
  const [customRefImage, setCustomRefImage] = useState<string | null>(null);
  const [customRefImageName, setCustomRefImageName] = useState('');
  const [customBrief, setCustomBrief] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Size Guide
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const getProductSizes = () => {
    return ['beanie', 'cap'].includes(productId) ? SIZES.hats : SIZES.clothing;
  };

  const getPlacementOptions = () => {
    if (productId === 'beanie' || productId === 'cap') return PLACEMENTS.beanie;
    if (productId === 'trousers') return PLACEMENTS.trousers;
    return PLACEMENTS.clothing;
  };

  const calculatePrice = () => {
    const basePrice = product.price;
    let embroideryPrice = 0;

    if (embroideryType === 'text' && customText) {
      embroideryPrice = 50;
    } else if (embroideryType === 'design') {
      embroideryPrice = 75;
      if (colorType === 'multi' && multiColors.filter(c => c).length >= 3) {
        embroideryPrice += 25;
      }
    }

    return {
      base: basePrice,
      embroidery: embroideryPrice,
      total: basePrice + embroideryPrice,
    };
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'design' | 'custom') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (type === 'design') {
          setDesignImage(result);
          setDesignImageName(file.name);
        } else {
          setCustomRefImage(result);
          setCustomRefImageName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWhatsAppConsult = () => {
    const message = `Hi Solus! I want to create a custom embroidery design for my ${product.name}. ${customBrief ? `Here's my idea: ${customBrief}.` : ''} Can a designer help me? Contact me at ${phoneNumber}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/40700000000?text=${encodedMessage}`, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const canAddToCart = () => {
    if (!selectedSize || !selectedColor) return false;
    if (!embroideryType) return false;
    
    if (embroideryType === 'text') {
      return customText && textPlacement;
    }
    if (embroideryType === 'design') {
      return (designDescription || designImage) && designPlacement;
    }
    return false;
  };

  const handleAddToCart = () => {
    toast.success('Added to cart!');
    if (onAddToCart) {
      onAddToCart();
    }
    setTimeout(() => {
      onNavigate('home');
    }, 1500);
  };

  const prices = calculatePrice();

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Back Button */}
      <div className="pt-24 px-6 md:px-12 lg:px-20 pb-6">
        <button
          onClick={() => onNavigate('custom-embroidery-catalog')}
          className="flex items-center gap-2 text-black hover:opacity-60 transition-opacity"
          style={{ fontSize: '12px', letterSpacing: '0.08em' }}
        >
          <ArrowLeft size={16} />
          BACK TO CATALOG
        </button>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-12">
          {/* LEFT: STICKY PREVIEW - Image Only */}
          <div className="lg:sticky lg:top-24 lg:self-start pb-4 lg:pb-0">
            <div className="bg-white border border-black/10 overflow-hidden">
              {/* Live Preview */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Color Overlay */}
                {selectedColor && (
                  <div 
                    className="absolute inset-0 mix-blend-multiply opacity-20"
                    style={{ backgroundColor: selectedColor }}
                  />
                )}

                {/* Text Embroidery Preview */}
                {embroideryType === 'text' && customText && textPlacement && (
                  <div 
                    className={`absolute flex items-center justify-center pointer-events-none ${
                      textPlacement === 'Left chest' ? 'top-[25%] left-[20%] w-[25%]' :
                      textPlacement === 'Right chest' ? 'top-[25%] right-[20%] w-[25%]' :
                      textPlacement === 'Back' ? 'top-[30%] left-[50%] -translate-x-1/2 w-[50%]' :
                      textPlacement === 'Sleeve' ? 'top-[35%] left-[10%] w-[15%]' :
                      textPlacement === 'Front' ? 'top-[40%] left-[50%] -translate-x-1/2 w-[40%]' :
                      textPlacement === 'Side' ? 'top-[40%] left-[15%] w-[20%]' :
                      textPlacement === 'Left thigh' ? 'top-[45%] left-[25%] w-[20%]' :
                      textPlacement === 'Right thigh' ? 'top-[45%] right-[25%] w-[20%]' :
                      'top-[30%] left-[50%] -translate-x-1/2 w-[40%]'
                    }`}
                  >
                    <div className="bg-white/95 backdrop-blur-sm px-2 py-1.5 md:px-4 md:py-3 border md:border-2 border-black/30 shadow-2xl">
                      <div
                        className={`${FONTS[selectedFont].style} text-center whitespace-nowrap`}
                        style={{ 
                          fontSize: 'clamp(8px, 2vw, 18px)', 
                          color: threadColor,
                          letterSpacing: '0.05em'
                        }}
                      >
                        {customText}
                      </div>
                    </div>
                  </div>
                )}

                {/* Design Embroidery Preview */}
                {embroideryType === 'design' && designPlacement && (
                  <div 
                    className={`absolute flex items-center justify-center pointer-events-none ${
                      designPlacement === 'Left chest' ? 'top-[25%] left-[20%] w-[25%] h-[25%]' :
                      designPlacement === 'Right chest' ? 'top-[25%] right-[20%] w-[25%] h-[25%]' :
                      designPlacement === 'Back' ? 'top-[30%] left-[50%] -translate-x-1/2 w-[50%] h-[40%]' :
                      designPlacement === 'Sleeve' ? 'top-[35%] left-[10%] w-[15%] h-[15%]' :
                      designPlacement === 'Front' ? 'top-[40%] left-[50%] -translate-x-1/2 w-[40%] h-[30%]' :
                      designPlacement === 'Side' ? 'top-[40%] left-[15%] w-[20%] h-[20%]' :
                      designPlacement === 'Left thigh' ? 'top-[45%] left-[25%] w-[20%] h-[20%]' :
                      designPlacement === 'Right thigh' ? 'top-[45%] right-[25%] w-[20%] h-[20%]' :
                      'top-[30%] left-[50%] -translate-x-1/2 w-[40%] h-[30%]'
                    }`}
                  >
                    {designImage ? (
                      <div className="bg-white/95 backdrop-blur-sm p-1.5 md:p-3 border md:border-2 border-black/30 shadow-2xl w-full h-full flex items-center justify-center">
                        <img src={designImage} alt="Design preview" className="max-w-full max-h-full object-contain" />
                      </div>
                    ) : (
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-5 md:py-3 border md:border-2 border-dashed border-black/40 shadow-2xl">
                        <p style={{ fontSize: 'clamp(8px, 2vw, 11px)', color: '#666', letterSpacing: '0.08em' }}>DESIGN</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Custom Design Badge */}
                {embroideryType === 'custom' && (
                  <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[70%] md:w-[70%] pointer-events-none">
                    <div className="bg-black/90 backdrop-blur-sm px-3 py-2 md:px-6 md:py-4 border md:border-2 border-[#c9a66b] text-center shadow-2xl">
                      <p style={{ fontSize: 'clamp(9px, 2vw, 12px)', color: '#c9a66b', letterSpacing: '0.1em' }}>
                        CUSTOM DESIGN
                      </p>
                      <p className="mt-1 md:mt-2" style={{ fontSize: 'clamp(7px, 1.5vw, 10px)', color: 'white', opacity: 0.9 }}>
                        Placement & details determined with designer
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: CUSTOMIZATION OPTIONS */}
          <div className="space-y-8">
            {/* Product Title */}
            <div>
              <h1 className="font-playfair tracking-luxury mb-3" style={{ fontSize: 'clamp(32px, 6vw, 56px)' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '14px', color: '#666', letterSpacing: '0.05em' }}>
                CUSTOM EMBROIDERY PERSONALIZATION
              </p>
            </div>

            {/* STEP 1: SIZE & COLOR */}
            <div className="bg-white border border-black/10 p-8">
              <h2 className="mb-6 flex items-center gap-3" style={{ fontSize: '16px', letterSpacing: '0.08em' }}>
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">1</span>
                SELECT SIZE & COLOR
              </h2>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                    SIZE
                  </label>
                  {!['beanie', 'cap'].includes(productId) && (
                    <button
                      type="button"
                      onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                      className="flex items-center gap-1 text-black/60 hover:text-black transition-colors"
                      style={{ fontSize: '11px', letterSpacing: '0.05em' }}
                    >
                      SIZE GUIDE
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform ${sizeGuideOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>
                
                {/* Size Guide Dropdown */}
                {sizeGuideOpen && !['beanie', 'cap'].includes(productId) && (
                  <div className="mb-4 p-5 bg-[#faf8f5] border border-black/10 animate-in fade-in duration-300">
                    <h4 className="mb-4" style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#000' }}>
                      MEASUREMENTS (CM)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full" style={{ fontSize: '11px' }}>
                        <thead>
                          <tr className="border-b border-black/20">
                            <th className="text-left py-2 pr-4" style={{ fontWeight: 500 }}>Size</th>
                            <th className="text-left py-2 px-2" style={{ fontWeight: 500 }}>Chest</th>
                            <th className="text-left py-2 px-2" style={{ fontWeight: 500 }}>Length</th>
                            {productId === 'trousers' && (
                              <>
                                <th className="text-left py-2 px-2" style={{ fontWeight: 500 }}>Waist</th>
                                <th className="text-left py-2 px-2" style={{ fontWeight: 500 }}>Inseam</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody style={{ color: '#666' }}>
                          {productId === 'trousers' ? (
                            <>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">XS</td>
                                <td className="py-2 px-2">-</td>
                                <td className="py-2 px-2">98</td>
                                <td className="py-2 px-2">74</td>
                                <td className="py-2 px-2">76</td>
                              </tr>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">S</td>
                                <td className="py-2 px-2">-</td>
                                <td className="py-2 px-2">100</td>
                                <td className="py-2 px-2">78</td>
                                <td className="py-2 px-2">78</td>
                              </tr>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">M</td>
                                <td className="py-2 px-2">-</td>
                                <td className="py-2 px-2">102</td>
                                <td className="py-2 px-2">82</td>
                                <td className="py-2 px-2">80</td>
                              </tr>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">L</td>
                                <td className="py-2 px-2">-</td>
                                <td className="py-2 px-2">104</td>
                                <td className="py-2 px-2">86</td>
                                <td className="py-2 px-2">82</td>
                              </tr>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">XL</td>
                                <td className="py-2 px-2">-</td>
                                <td className="py-2 px-2">106</td>
                                <td className="py-2 px-2">90</td>
                                <td className="py-2 px-2">84</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4">XXL</td>
                                <td className="py-2 px-2">-</td>
                                <td className="py-2 px-2">108</td>
                                <td className="py-2 px-2">94</td>
                                <td className="py-2 px-2">86</td>
                              </tr>
                            </>
                          ) : (
                            <>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">XS</td>
                                <td className="py-2 px-2">86-91</td>
                                <td className="py-2 px-2">68</td>
                              </tr>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">S</td>
                                <td className="py-2 px-2">92-97</td>
                                <td className="py-2 px-2">70</td>
                              </tr>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">M</td>
                                <td className="py-2 px-2">98-103</td>
                                <td className="py-2 px-2">72</td>
                              </tr>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">L</td>
                                <td className="py-2 px-2">104-109</td>
                                <td className="py-2 px-2">74</td>
                              </tr>
                              <tr className="border-b border-black/10">
                                <td className="py-2 pr-4">XL</td>
                                <td className="py-2 px-2">110-115</td>
                                <td className="py-2 px-2">76</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4">XXL</td>
                                <td className="py-2 px-2">116-121</td>
                                <td className="py-2 px-2">78</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-4" style={{ fontSize: '10px', color: '#999', lineHeight: '1.6' }}>
                      All measurements are approximate. For the perfect fit, we recommend measuring a similar garment you own.
                    </p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {getProductSizes().map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 transition-all ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black/20 hover:border-black'
                      }`}
                      style={{ fontSize: '13px' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                  COLOR
                </label>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`relative w-14 h-14 border-2 transition-all ${
                        selectedColor === color.value
                          ? 'border-black scale-110 shadow-lg'
                          : 'border-black/20 hover:border-black'
                      }`}
                      style={{
                        backgroundColor: color.value,
                        boxShadow: color.value === '#FFFFFF' ? '0 0 0 1px rgba(0,0,0,0.1) inset' : undefined,
                      }}
                      title={color.name}
                    >
                      {selectedColor === color.value && (
                        <Check 
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                          size={20}
                          style={{ color: color.value === '#FFFFFF' ? '#000' : '#fff' }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                {selectedColor && (
                  <p className="mt-3" style={{ fontSize: '12px', color: '#666' }}>
                    Selected: {COLORS.find(c => c.value === selectedColor)?.name}
                  </p>
                )}
              </div>
            </div>

            {/* STEP 2: EMBROIDERY TYPE */}
            {selectedSize && selectedColor && (
              <div className="bg-white border border-black/10 p-8 animate-in fade-in duration-500">
                <h2 className="mb-6 flex items-center gap-3" style={{ fontSize: '16px', letterSpacing: '0.08em' }}>
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">2</span>
                  CHOOSE EMBROIDERY TYPE
                </h2>

                <div className="space-y-3">
                  {[
                    { id: 'text' as const, label: 'Text Embroidery', desc: 'Add personalized text with custom fonts', price: '+50 RON' },
                    { id: 'design' as const, label: 'Design Embroidery', desc: 'Upload or describe your design idea', price: '+75 RON' },
                    { id: 'custom' as const, label: 'Custom Design Consultation', desc: 'Work directly with a Solus designer', price: 'Custom Quote' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setEmbroideryType(type.id)}
                      className={`w-full text-left p-5 border-2 transition-all ${
                        embroideryType === type.id
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black/20 hover:border-black'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span style={{ fontSize: '14px', letterSpacing: '0.05em' }}>{type.label}</span>
                        <span style={{ fontSize: '12px', opacity: 0.8 }}>{type.price}</span>
                      </div>
                      <p style={{ fontSize: '12px', opacity: 0.7 }}>{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: TEXT EMBROIDERY OPTIONS */}
            {embroideryType === 'text' && (
              <div className="bg-white border border-black/10 p-8 animate-in fade-in duration-500">
                <h2 className="mb-6 flex items-center gap-3" style={{ fontSize: '16px', letterSpacing: '0.08em' }}>
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">3</span>
                  CUSTOMIZE YOUR TEXT
                </h2>

                <div className="space-y-6">
                  {/* Text Input */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      YOUR TEXT (MAX 20 CHARACTERS)
                    </label>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value.slice(0, 20))}
                      placeholder="Enter your text..."
                      maxLength={20}
                      className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                      style={{ fontSize: '15px', letterSpacing: '0.05em' }}
                    />
                    <p className="mt-2" style={{ fontSize: '10px', color: '#999' }}>
                      {customText.length} / 20 characters
                    </p>
                  </div>

                  {/* Font Selection */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      FONT STYLE
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(Object.keys(FONTS) as FontStyle[]).map((fontKey) => (
                        <button
                          key={fontKey}
                          onClick={() => setSelectedFont(fontKey)}
                          className={`p-4 border-2 transition-all ${
                            selectedFont === fontKey
                              ? 'border-black bg-white'
                              : 'border-black/20 hover:border-black bg-white'
                          }`}
                        >
                          <div className={`${FONTS[fontKey].style} mb-2`} style={{ fontSize: '24px' }}>
                            Aa
                          </div>
                          <div style={{ fontSize: '10px' }}>{FONTS[fontKey].name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Thread Color */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      THREAD COLOR
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {THREAD_COLORS.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setThreadColor(color.value)}
                          className={`relative w-12 h-12 border-2 transition-all ${
                            threadColor === color.value
                              ? 'border-black scale-110 shadow-lg'
                              : 'border-black/20 hover:border-black'
                          }`}
                          style={{
                            backgroundColor: color.value,
                            boxShadow: color.value === '#FFFFFF' ? '0 0 0 1px rgba(0,0,0,0.1) inset' : undefined,
                          }}
                          title={color.name}
                        >
                          {threadColor === color.value && (
                            <Check 
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                              size={16}
                              style={{ color: color.value === '#FFFFFF' ? '#000' : '#fff' }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Placement */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      PLACEMENT
                    </label>
                    <select
                      value={textPlacement}
                      onChange={(e) => setTextPlacement(e.target.value)}
                      className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                      style={{ fontSize: '13px' }}
                    >
                      <option value="">Select placement...</option>
                      {getPlacementOptions().map((place) => (
                        <option key={place} value={place}>
                          {place}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: DESIGN EMBROIDERY OPTIONS */}
            {embroideryType === 'design' && (
              <div className="bg-white border border-black/10 p-8 animate-in fade-in duration-500">
                <h2 className="mb-6 flex items-center gap-3" style={{ fontSize: '16px', letterSpacing: '0.08em' }}>
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">3</span>
                  DESIGN YOUR EMBROIDERY
                </h2>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      DESCRIBE YOUR DESIGN IDEA
                    </label>
                    <textarea
                      value={designDescription}
                      onChange={(e) => setDesignDescription(e.target.value)}
                      placeholder="Describe shape, style, details, mood, or any reference..."
                      rows={4}
                      className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-y"
                      style={{ fontSize: '13px' }}
                    />
                  </div>

                  {/* Upload */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      OR UPLOAD A REFERENCE IMAGE
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleImageUpload(e, 'design')}
                        className="hidden"
                        id="design-upload"
                      />
                      <label
                        htmlFor="design-upload"
                        className="flex items-center justify-center gap-3 w-full bg-white border-2 border-dashed border-black/20 px-4 py-8 cursor-pointer hover:border-black transition-colors"
                      >
                        <Upload size={20} />
                        <span style={{ fontSize: '13px' }}>
                          {designImageName || 'Choose file or drag here (Max 5MB)'}
                        </span>
                      </label>
                      {designImage && (
                        <div className="mt-4 flex justify-center">
                          <div className="relative inline-block">
                            <img src={designImage} alt="Preview" className="w-32 h-32 object-cover border-2 border-black/20" />
                            <button
                              onClick={() => {
                                setDesignImage(null);
                                setDesignImageName('');
                              }}
                              className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1.5"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Color Type */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      EMBROIDERY COLORS
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'single' as const, label: 'Unicolour (1 color)' },
                        { id: 'multi' as const, label: 'Multi-colour (up to 3 colors, +25 RON)' },
                        { id: 'custom' as const, label: 'Custom colors (discuss with team)' },
                      ].map((option) => (
                        <label key={option.id} className="flex items-center gap-3 cursor-pointer p-3 border border-black/10 hover:border-black transition-colors">
                          <input
                            type="radio"
                            checked={colorType === option.id}
                            onChange={() => setColorType(option.id)}
                            className="w-4 h-4 accent-black"
                          />
                          <span style={{ fontSize: '13px' }}>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Single Color Selector */}
                  {colorType === 'single' && (
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {THREAD_COLORS.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setSingleColor(color.value)}
                            className={`relative w-12 h-12 border-2 transition-all ${
                              singleColor === color.value
                                ? 'border-black scale-110 shadow-lg'
                                : 'border-black/20 hover:border-black'
                            }`}
                            style={{
                              backgroundColor: color.value,
                              boxShadow: color.value === '#FFFFFF' ? '0 0 0 1px rgba(0,0,0,0.1) inset' : undefined,
                            }}
                            title={color.name}
                          >
                            {singleColor === color.value && (
                              <Check 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                                size={16}
                                style={{ color: color.value === '#FFFFFF' ? '#000' : '#fff' }}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Multi Color Selector */}
                  {colorType === 'multi' && (
                    <div className="space-y-4">
                      {[0, 1, 2].map((index) => (
                        <div key={index}>
                          <p className="mb-2" style={{ fontSize: '11px', color: '#666' }}>
                            Color {index + 1}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {THREAD_COLORS.map((color) => (
                              <button
                                key={color.value}
                                onClick={() => {
                                  const newColors = [...multiColors];
                                  newColors[index] = color.value;
                                  setMultiColors(newColors);
                                }}
                                className={`relative w-10 h-10 border-2 transition-all ${
                                  multiColors[index] === color.value
                                    ? 'border-black scale-110'
                                    : 'border-black/20 hover:border-black'
                                }`}
                                style={{
                                  backgroundColor: color.value,
                                  boxShadow: color.value === '#FFFFFF' ? '0 0 0 1px rgba(0,0,0,0.1) inset' : undefined,
                                }}
                                title={color.name}
                              >
                                {multiColors[index] === color.value && (
                                  <Check 
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                                    size={14}
                                    style={{ color: color.value === '#FFFFFF' ? '#000' : '#fff' }}
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Placement */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      PLACEMENT
                    </label>
                    <select
                      value={designPlacement}
                      onChange={(e) => setDesignPlacement(e.target.value)}
                      className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                      style={{ fontSize: '13px' }}
                    >
                      <option value="">Select placement...</option>
                      {getPlacementOptions().map((place) => (
                        <option key={place} value={place}>
                          {place}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Info */}
                  <div className="bg-[#f8f8f8] border border-black/10 p-4 flex gap-3">
                    <Info size={16} className="flex-shrink-0 mt-0.5" />
                    <p style={{ fontSize: '11px', color: '#4a4a4a', lineHeight: '1.7' }}>
                      Complex designs may require review by our design team. We'll confirm feasibility and send mockups within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CUSTOM DESIGN OPTIONS */}
            {embroideryType === 'custom' && (
              <div className="bg-white border border-black/10 p-8 animate-in fade-in duration-500">
                <h2 className="mb-4 flex items-center gap-3 font-playfair" style={{ fontSize: '24px' }}>
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-sans">3</span>
                  Work with a Solus Designer
                </h2>
                <p className="mb-8" style={{ fontSize: '13px', lineHeight: '1.8', color: '#666' }}>
                  Our design team will bring your vision to life. Share your idea, and we'll create mockups together
                  until it's perfect.
                </p>

                <div className="space-y-6">
                  {/* Reference Upload */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      UPLOAD REFERENCE OR INSPIRATION (OPTIONAL)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleImageUpload(e, 'custom')}
                        className="hidden"
                        id="custom-upload"
                      />
                      <label
                        htmlFor="custom-upload"
                        className="flex items-center justify-center gap-3 w-full bg-white border-2 border-dashed border-black/20 px-4 py-8 cursor-pointer hover:border-black transition-colors"
                      >
                        <Upload size={20} />
                        <span style={{ fontSize: '13px' }}>
                          {customRefImageName || 'Choose file or drag here (Max 5MB)'}
                        </span>
                      </label>
                      {customRefImage && (
                        <div className="mt-4 flex justify-center">
                          <div className="relative inline-block">
                            <img src={customRefImage} alt="Preview" className="w-32 h-32 object-cover border-2 border-black/20" />
                            <button
                              onClick={() => {
                                setCustomRefImage(null);
                                setCustomRefImageName('');
                              }}
                              className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1.5"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Design Brief */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      DESCRIBE YOUR IDEA (OPTIONAL)
                    </label>
                    <textarea
                      value={customBrief}
                      onChange={(e) => setCustomBrief(e.target.value)}
                      placeholder="Tell us about your vision, style preferences, or any specific requests..."
                      rows={4}
                      className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-y"
                      style={{ fontSize: '13px' }}
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      YOUR PHONE NUMBER (WHATSAPP) *
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+40 7XX XXX XXX"
                      className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                      style={{ fontSize: '13px' }}
                    />
                  </div>

                  {/* Info */}
                  <div className="bg-black text-white p-6">
                    <p style={{ fontSize: '12px', lineHeight: '1.7' }}>
                      A Solus designer will contact you within 24 hours. We'll discuss your vision, create mockups, and
                      finalize design details via WhatsApp. No hidden fees – pricing discussed upfront.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MOBILE PREVIEW BEFORE CHECKOUT - Only visible on mobile */}
            {selectedSize && selectedColor && embroideryType && (
              <div className="lg:hidden bg-white border border-black/10 overflow-hidden animate-in fade-in duration-500">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Color Overlay */}
                  {selectedColor && (
                    <div 
                      className="absolute inset-0 mix-blend-multiply opacity-20"
                      style={{ backgroundColor: selectedColor }}
                    />
                  )}

                  {/* Text Embroidery Preview */}
                  {embroideryType === 'text' && customText && textPlacement && (
                    <div 
                      className={`absolute flex items-center justify-center pointer-events-none ${
                        textPlacement === 'Left chest' ? 'top-[25%] left-[20%] w-[25%]' :
                        textPlacement === 'Right chest' ? 'top-[25%] right-[20%] w-[25%]' :
                        textPlacement === 'Back' ? 'top-[30%] left-[50%] -translate-x-1/2 w-[50%]' :
                        textPlacement === 'Sleeve' ? 'top-[35%] left-[10%] w-[15%]' :
                        textPlacement === 'Front' ? 'top-[40%] left-[50%] -translate-x-1/2 w-[40%]' :
                        textPlacement === 'Side' ? 'top-[40%] left-[15%] w-[20%]' :
                        textPlacement === 'Left thigh' ? 'top-[45%] left-[25%] w-[20%]' :
                        textPlacement === 'Right thigh' ? 'top-[45%] right-[25%] w-[20%]' :
                        'top-[30%] left-[50%] -translate-x-1/2 w-[40%]'
                      }`}
                    >
                      <div className="bg-white/95 backdrop-blur-sm px-2 py-1.5 border border-black/30 shadow-2xl">
                        <div
                          className={`${FONTS[selectedFont].style} text-center whitespace-nowrap`}
                          style={{ 
                            fontSize: 'clamp(8px, 2vw, 18px)', 
                            color: threadColor,
                            letterSpacing: '0.05em'
                          }}
                        >
                          {customText}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Design Embroidery Preview */}
                  {embroideryType === 'design' && designPlacement && (
                    <div 
                      className={`absolute flex items-center justify-center pointer-events-none ${
                        designPlacement === 'Left chest' ? 'top-[25%] left-[20%] w-[25%] h-[25%]' :
                        designPlacement === 'Right chest' ? 'top-[25%] right-[20%] w-[25%] h-[25%]' :
                        designPlacement === 'Back' ? 'top-[30%] left-[50%] -translate-x-1/2 w-[50%] h-[40%]' :
                        designPlacement === 'Sleeve' ? 'top-[35%] left-[10%] w-[15%] h-[15%]' :
                        designPlacement === 'Front' ? 'top-[40%] left-[50%] -translate-x-1/2 w-[40%] h-[30%]' :
                        designPlacement === 'Side' ? 'top-[40%] left-[15%] w-[20%] h-[20%]' :
                        designPlacement === 'Left thigh' ? 'top-[45%] left-[25%] w-[20%] h-[20%]' :
                        designPlacement === 'Right thigh' ? 'top-[45%] right-[25%] w-[20%] h-[20%]' :
                        'top-[30%] left-[50%] -translate-x-1/2 w-[40%] h-[30%]'
                      }`}
                    >
                      {designImage ? (
                        <div className="bg-white/95 backdrop-blur-sm p-1.5 border border-black/30 shadow-2xl w-full h-full flex items-center justify-center">
                          <img src={designImage} alt="Design preview" className="max-w-full max-h-full object-contain" />
                        </div>
                      ) : (
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 border border-dashed border-black/40 shadow-2xl">
                          <p style={{ fontSize: 'clamp(8px, 2vw, 11px)', color: '#666', letterSpacing: '0.08em' }}>DESIGN</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Custom Design Badge */}
                  {embroideryType === 'custom' && (
                    <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[70%] pointer-events-none">
                      <div className="bg-black/90 backdrop-blur-sm px-3 py-2 border border-[#c9a66b] text-center shadow-2xl">
                        <p style={{ fontSize: 'clamp(9px, 2vw, 12px)', color: '#c9a66b', letterSpacing: '0.1em' }}>
                          CUSTOM DESIGN
                        </p>
                        <p className="mt-1" style={{ fontSize: 'clamp(7px, 1.5vw, 10px)', color: 'white', opacity: 0.9 }}>
                          Placement & details determined with designer
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FINAL SECTION: Summary & Checkout */}
            {selectedSize && selectedColor && embroideryType && (
              <div className="bg-white border-2 border-black p-8 animate-in fade-in duration-500">
                <h2 className="font-playfair mb-6" style={{ fontSize: '24px' }}>
                  Your Configuration
                </h2>

                {/* Configuration Summary */}
                <div className="space-y-3 mb-8" style={{ fontSize: '14px' }}>
                  <div className="flex justify-between items-center pb-3 border-b border-black/10">
                    <span style={{ color: '#666' }}>Product:</span>
                    <span className="font-playfair">{product.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-black/10">
                    <span style={{ color: '#666' }}>Size:</span>
                    <span>{selectedSize}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-black/10">
                    <span style={{ color: '#666' }}>Color:</span>
                    <div className="flex items-center gap-2">
                      <span>{COLORS.find(c => c.value === selectedColor)?.name}</span>
                      <div 
                        className="w-5 h-5 border-2 border-black/20" 
                        style={{ backgroundColor: selectedColor }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-black/10">
                    <span style={{ color: '#666' }}>Embroidery Type:</span>
                    <span>
                      {embroideryType === 'text' && 'Text Embroidery'}
                      {embroideryType === 'design' && 'Design Embroidery'}
                      {embroideryType === 'custom' && 'Custom Consultation'}
                    </span>
                  </div>
                  {embroideryType === 'text' && customText && (
                    <div className="flex justify-between items-center pb-3 border-b border-black/10">
                      <span style={{ color: '#666' }}>Text:</span>
                      <span className={FONTS[selectedFont].style} style={{ color: threadColor }}>
                        {customText}
                      </span>
                    </div>
                  )}
                  {(textPlacement || designPlacement) && (
                    <div className="flex justify-between items-center pb-3 border-b border-black/10">
                      <span style={{ color: '#666' }}>Placement:</span>
                      <span>{textPlacement || designPlacement}</span>
                    </div>
                  )}
                </div>

                {/* Price Summary */}
                <div className="bg-[#faf8f5] p-6 mb-6">
                  <div className="flex justify-between items-center mb-3" style={{ fontSize: '14px' }}>
                    <span style={{ color: '#666' }}>Base price:</span>
                    <span>{prices.base} RON</span>
                  </div>
                  {prices.embroidery > 0 && (
                    <div className="flex justify-between items-center mb-4" style={{ fontSize: '14px' }}>
                      <span style={{ color: '#666' }}>Embroidery:</span>
                      <span>+{prices.embroidery} RON</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t-2 border-black">
                    <span className="font-playfair" style={{ fontSize: '20px' }}>Total:</span>
                    <span className="font-playfair" style={{ fontSize: '28px' }}>
                      {embroideryType === 'custom' ? 'TBD' : `${prices.total} RON`}
                    </span>
                  </div>
                </div>

                {/* Add to Cart / Contact Button */}
                {embroideryType === 'custom' ? (
                  <button
                    onClick={handleWhatsAppConsult}
                    disabled={!phoneNumber}
                    className="w-full bg-black text-white py-5 hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ fontSize: '14px', letterSpacing: '0.1em' }}
                  >
                    CONTACT DESIGNER VIA WHATSAPP
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={!canAddToCart()}
                    className="w-full bg-black text-white py-5 hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ fontSize: '14px', letterSpacing: '0.1em' }}
                  >
                    ADD TO CART
                  </button>
                )}

                {/* Info */}
                <p className="mt-4 text-center" style={{ fontSize: '11px', color: '#999', lineHeight: '1.6' }}>
                  Each piece is meticulously embroidered by master artisans. Allow 5-7 business days for craftsmanship. Personalized items are final sale.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}