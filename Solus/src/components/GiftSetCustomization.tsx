import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, ArrowRight, Check, X, ChevronDown, Upload, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface CustomizableItem {
  name: string;
  productId: string;
  basePrice: number;
  image: string;
}

type EmbroideryType = 'text' | 'design' | 'custom' | null;
type FontStyle = 'script' | 'modern' | 'classic' | 'bold';

interface ItemCustomization {
  // Product Config
  size: string;
  color: string;
  
  // Embroidery Config
  embroideryType: EmbroideryType;
  
  // Text Embroidery
  text: string;
  font: FontStyle;
  threadColor: string;
  textPlacement: string;
  
  // Design Embroidery
  designDescription: string;
  designImage: string | null;
  designImageName: string;
  colorType: 'single' | 'multi' | 'custom';
  singleColor: string;
  multiColors: string[];
  designPlacement: string;
  
  // Custom Design
  customRefImage: string | null;
  customRefImageName: string;
  customBrief: string;
  phoneNumber: string;
}

interface GiftSetCustomizationProps {
  setId: string;
  onNavigate: (page: string, id?: string) => void;
  onAddToCart: () => void;
}

// Map embroidery product names to their details
const EMBROIDERY_PRODUCT_MAP: Record<string, CustomizableItem> = {
  'Personalized Hoodie': { name: 'Personalized Hoodie', productId: 'hoodie', basePrice: 450, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' },
  'Custom Hoodie': { name: 'Custom Hoodie', productId: 'hoodie', basePrice: 450, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' },
  'Custom Embroidered Beanie': { name: 'Custom Embroidered Beanie', productId: 'beanie', basePrice: 120, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800' },
  'Embroidered Beanie': { name: 'Embroidered Beanie', productId: 'beanie', basePrice: 120, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800' },
  'Embroidered Cap': { name: 'Embroidered Cap', productId: 'cap', basePrice: 140, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800' },
  'Embroidered Shirt': { name: 'Embroidered Shirt', productId: 'shirt', basePrice: 320, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800' },
  'Personalized Sweater': { name: 'Personalized Sweater', productId: 'sweater', basePrice: 380, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800' },
  'Custom Sweater': { name: 'Custom Sweater', productId: 'sweater', basePrice: 380, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800' },
  'Luxury Trousers': { name: 'Luxury Trousers', productId: 'trousers', basePrice: 420, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800' },
};

const GIFT_SET_ITEMS: Record<string, string[]> = {
  'signature-style': ['Personalized Hoodie', 'Custom Embroidered Beanie'],
  'urban-essentials': ['Embroidered Cap', 'Embroidered Shirt'],
  'heritage': ['Personalized Sweater', 'Luxury Trousers'],
  'weekend-luxury': ['Custom Hoodie', 'Embroidered Beanie'],
  'complete-wardrobe': ['Personalized Hoodie', 'Custom Sweater', 'Embroidered Shirt', 'Luxury Trousers'],
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

export function GiftSetCustomization({ setId, onNavigate, onAddToCart }: GiftSetCustomizationProps) {
  const itemNames = GIFT_SET_ITEMS[setId] || [];
  const customizableItems = itemNames.map(name => EMBROIDERY_PRODUCT_MAP[name]).filter(Boolean);
  
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [customizations, setCustomizations] = useState<Record<string, ItemCustomization>>({});
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  
  const currentItem = customizableItems[currentItemIndex];
  const totalItems = customizableItems.length;
  const isLastItem = currentItemIndex === totalItems - 1;
  const isFirstItem = currentItemIndex === 0;

  // Get current customization or default
  const getDefaultCustomization = (): ItemCustomization => ({
    size: '',
    color: '',
    embroideryType: null,
    text: '',
    font: 'classic',
    threadColor: '#000000',
    textPlacement: '',
    designDescription: '',
    designImage: null,
    designImageName: '',
    colorType: 'single',
    singleColor: '#000000',
    multiColors: ['#000000', '', ''],
    designPlacement: '',
    customRefImage: null,
    customRefImageName: '',
    customBrief: '',
    phoneNumber: '',
  });

  const currentCustomization = customizations[currentItem?.name] || getDefaultCustomization();

  const updateCustomization = (updates: Partial<ItemCustomization>) => {
    setCustomizations({
      ...customizations,
      [currentItem.name]: {
        ...currentCustomization,
        ...updates,
      }
    });
  };

  const getProductSizes = () => {
    return ['beanie', 'cap'].includes(currentItem.productId) ? SIZES.hats : SIZES.clothing;
  };

  const getPlacementOptions = () => {
    if (currentItem.productId === 'beanie' || currentItem.productId === 'cap') return PLACEMENTS.beanie;
    if (currentItem.productId === 'trousers') return PLACEMENTS.trousers;
    return PLACEMENTS.clothing;
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
          updateCustomization({
            designImage: result,
            designImageName: file.name,
          });
        } else {
          updateCustomization({
            customRefImage: result,
            customRefImageName: file.name,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWhatsAppConsult = () => {
    const message = `Hi Solus! I want to create a custom embroidery design for my ${currentItem.name} in my gift set. ${currentCustomization.customBrief ? `Here's my idea: ${currentCustomization.customBrief}.` : ''} Can a designer help me? Contact me at ${currentCustomization.phoneNumber}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/40700000000?text=${encodedMessage}`, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const canProceed = () => {
    if (!currentCustomization.size || !currentCustomization.color) return false;
    if (!currentCustomization.embroideryType) return false;
    
    if (currentCustomization.embroideryType === 'text') {
      return currentCustomization.text && currentCustomization.textPlacement;
    }
    if (currentCustomization.embroideryType === 'design') {
      return (currentCustomization.designDescription || currentCustomization.designImage) && currentCustomization.designPlacement;
    }
    if (currentCustomization.embroideryType === 'custom') {
      return true; // Custom design can proceed without all details
    }
    return false;
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error('Please complete all required customization options');
      return;
    }
    
    if (isLastItem) {
      onAddToCart();
      toast.success('Gift set with custom embroidery added to cart!');
      setTimeout(() => {
        onNavigate('gifts');
      }, 1500);
    } else {
      setCurrentItemIndex(currentItemIndex + 1);
      setSizeGuideOpen(false);
    }
  };

  const handleBack = () => {
    if (isFirstItem) {
      onNavigate('gift-set-detail', setId);
    } else {
      setCurrentItemIndex(currentItemIndex - 1);
      setSizeGuideOpen(false);
    }
  };

  if (!currentItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Back Button */}
      <div className="pt-24 px-6 md:px-12 lg:px-20 pb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-black hover:opacity-60 transition-opacity"
          style={{ fontSize: '12px', letterSpacing: '0.08em' }}
        >
          <ArrowLeft size={16} />
          {isFirstItem ? 'BACK TO GIFT SET' : 'PREVIOUS ITEM'}
        </button>
      </div>

      {/* Progress Header */}
      <div className="px-6 md:px-12 lg:px-20 pb-8">
        <div className="mb-6">
          <h1
            className="font-playfair mb-2"
            style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: '#000000' }}
          >
            Customize Your Gift Set
          </h1>
          <p style={{ fontSize: '14px', color: '#666', letterSpacing: '0.05em' }}>
            Item {currentItemIndex + 1} of {totalItems}: {currentItem.name}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white border border-black/10 mb-6">
          <motion.div
            className="h-full bg-[#c9a66b]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentItemIndex + 1) / totalItems) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Item Pills */}
        <div className="flex flex-wrap gap-2">
          {customizableItems.map((item, index) => (
            <div
              key={item.name}
              className={`px-4 py-2 flex items-center gap-2 ${
                index === currentItemIndex
                  ? 'bg-black text-white'
                  : index < currentItemIndex
                  ? 'bg-[#c9a66b] text-black'
                  : 'bg-white border border-black/10 text-black/40'
              }`}
              style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}
            >
              {index < currentItemIndex && <Check className="w-3 h-3" />}
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-20 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItemIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-12"
          >
            {/* LEFT: STICKY PREVIEW */}
            <div className="lg:sticky lg:top-24 lg:self-start pb-4 lg:pb-0">
              <div className="bg-white border border-black/10 overflow-hidden">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <ImageWithFallback
                    src={currentItem.image}
                    alt={currentItem.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Color Overlay */}
                  {currentCustomization.color && (
                    <div 
                      className="absolute inset-0 mix-blend-multiply opacity-20"
                      style={{ backgroundColor: currentCustomization.color }}
                    />
                  )}

                  {/* Text Embroidery Preview */}
                  {currentCustomization.embroideryType === 'text' && currentCustomization.text && currentCustomization.textPlacement && (
                    <div 
                      className={`absolute flex items-center justify-center pointer-events-none ${
                        currentCustomization.textPlacement === 'Left chest' ? 'top-[25%] left-[20%] w-[25%]' :
                        currentCustomization.textPlacement === 'Right chest' ? 'top-[25%] right-[20%] w-[25%]' :
                        currentCustomization.textPlacement === 'Back' ? 'top-[30%] left-[50%] -translate-x-1/2 w-[50%]' :
                        currentCustomization.textPlacement === 'Sleeve' ? 'top-[35%] left-[10%] w-[15%]' :
                        currentCustomization.textPlacement === 'Front' ? 'top-[40%] left-[50%] -translate-x-1/2 w-[40%]' :
                        currentCustomization.textPlacement === 'Side' ? 'top-[40%] left-[15%] w-[20%]' :
                        currentCustomization.textPlacement === 'Left thigh' ? 'top-[45%] left-[25%] w-[20%]' :
                        currentCustomization.textPlacement === 'Right thigh' ? 'top-[45%] right-[25%] w-[20%]' :
                        'top-[30%] left-[50%] -translate-x-1/2 w-[40%]'
                      }`}
                    >
                      <div className="bg-white/95 backdrop-blur-sm px-2 py-1.5 md:px-4 md:py-3 border md:border-2 border-black/30 shadow-2xl">
                        <div
                          className={`${FONTS[currentCustomization.font].style} text-center whitespace-nowrap`}
                          style={{ 
                            fontSize: 'clamp(8px, 2vw, 18px)', 
                            color: currentCustomization.threadColor,
                            letterSpacing: '0.05em'
                          }}
                        >
                          {currentCustomization.text}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Design Embroidery Preview */}
                  {currentCustomization.embroideryType === 'design' && currentCustomization.designPlacement && (
                    <div 
                      className={`absolute flex items-center justify-center pointer-events-none ${
                        currentCustomization.designPlacement === 'Left chest' ? 'top-[25%] left-[20%] w-[25%] h-[25%]' :
                        currentCustomization.designPlacement === 'Right chest' ? 'top-[25%] right-[20%] w-[25%] h-[25%]' :
                        currentCustomization.designPlacement === 'Back' ? 'top-[30%] left-[50%] -translate-x-1/2 w-[50%] h-[40%]' :
                        currentCustomization.designPlacement === 'Sleeve' ? 'top-[35%] left-[10%] w-[15%] h-[15%]' :
                        currentCustomization.designPlacement === 'Front' ? 'top-[40%] left-[50%] -translate-x-1/2 w-[40%] h-[30%]' :
                        currentCustomization.designPlacement === 'Side' ? 'top-[40%] left-[15%] w-[20%] h-[20%]' :
                        currentCustomization.designPlacement === 'Left thigh' ? 'top-[45%] left-[25%] w-[20%] h-[20%]' :
                        currentCustomization.designPlacement === 'Right thigh' ? 'top-[45%] right-[25%] w-[20%] h-[20%]' :
                        'top-[30%] left-[50%] -translate-x-1/2 w-[40%] h-[30%]'
                      }`}
                    >
                      {currentCustomization.designImage ? (
                        <div className="bg-white/95 backdrop-blur-sm p-1.5 md:p-3 border md:border-2 border-black/30 shadow-2xl w-full h-full flex items-center justify-center">
                          <img src={currentCustomization.designImage} alt="Design preview" className="max-w-full max-h-full object-contain" />
                        </div>
                      ) : (
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-5 md:py-3 border md:border-2 border-dashed border-black/40 shadow-2xl">
                          <p style={{ fontSize: 'clamp(8px, 2vw, 11px)', color: '#666', letterSpacing: '0.08em' }}>DESIGN</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Custom Design Badge */}
                  {currentCustomization.embroideryType === 'custom' && (
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
                <h2 className="font-playfair tracking-luxury mb-3" style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}>
                  {currentItem.name}
                </h2>
                <p style={{ fontSize: '14px', color: '#666', letterSpacing: '0.05em' }}>
                  CUSTOM EMBROIDERY PERSONALIZATION
                </p>
              </div>

              {/* STEP 1: SIZE & COLOR */}
              <div className="bg-white border border-black/10 p-8">
                <h3 className="mb-6 flex items-center gap-3" style={{ fontSize: '16px', letterSpacing: '0.08em' }}>
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">1</span>
                  SELECT SIZE & COLOR
                </h3>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                      SIZE
                    </label>
                    {!['beanie', 'cap'].includes(currentItem.productId) && (
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
                  {sizeGuideOpen && !['beanie', 'cap'].includes(currentItem.productId) && (
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
                              {currentItem.productId === 'trousers' && (
                                <>
                                  <th className="text-left py-2 px-2" style={{ fontWeight: 500 }}>Waist</th>
                                  <th className="text-left py-2 px-2" style={{ fontWeight: 500 }}>Inseam</th>
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody style={{ color: '#666' }}>
                            {currentItem.productId === 'trousers' ? (
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
                        onClick={() => updateCustomization({ size })}
                        className={`px-6 py-3 border-2 transition-all ${
                          currentCustomization.size === size
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
                        onClick={() => updateCustomization({ color: color.value })}
                        className={`relative w-14 h-14 border-2 transition-all ${
                          currentCustomization.color === color.value
                            ? 'border-black scale-110 shadow-lg'
                            : 'border-black/20 hover:border-black'
                        }`}
                        style={{
                          backgroundColor: color.value,
                          boxShadow: color.value === '#FFFFFF' ? '0 0 0 1px rgba(0,0,0,0.1) inset' : undefined,
                        }}
                        title={color.name}
                      >
                        {currentCustomization.color === color.value && (
                          <Check 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                            size={20}
                            style={{ color: color.value === '#FFFFFF' ? '#000' : '#fff' }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  {currentCustomization.color && (
                    <p className="mt-3" style={{ fontSize: '12px', color: '#666' }}>
                      Selected: {COLORS.find(c => c.value === currentCustomization.color)?.name}
                    </p>
                  )}
                </div>
              </div>

              {/* STEP 2: EMBROIDERY TYPE */}
              {currentCustomization.size && currentCustomization.color && (
                <div className="bg-white border border-black/10 p-8 animate-in fade-in duration-500">
                  <h3 className="mb-6 flex items-center gap-3" style={{ fontSize: '16px', letterSpacing: '0.08em' }}>
                    <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">2</span>
                    CHOOSE EMBROIDERY TYPE
                  </h3>

                  <div className="space-y-3">
                    {[
                      { id: 'text' as const, label: 'Text Embroidery', desc: 'Add personalized text with custom fonts', price: '+50 RON' },
                      { id: 'design' as const, label: 'Design Embroidery', desc: 'Upload or describe your design idea', price: '+75 RON' },
                      { id: 'custom' as const, label: 'Custom Design Consultation', desc: 'Work directly with a Solus designer', price: 'Custom Quote' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => updateCustomization({ embroideryType: type.id })}
                        className={`w-full text-left p-5 border-2 transition-all ${
                          currentCustomization.embroideryType === type.id
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

              {/* STEP 3A: TEXT EMBROIDERY OPTIONS */}
              {currentCustomization.embroideryType === 'text' && (
                <div className="bg-white border border-black/10 p-8 animate-in fade-in duration-500">
                  <h3 className="mb-6 flex items-center gap-3" style={{ fontSize: '16px', letterSpacing: '0.08em' }}>
                    <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">3</span>
                    CUSTOMIZE YOUR TEXT
                  </h3>

                  <div className="space-y-6">
                    {/* Text Input */}
                    <div>
                      <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                        YOUR TEXT (MAX 20 CHARACTERS)
                      </label>
                      <input
                        type="text"
                        value={currentCustomization.text}
                        onChange={(e) => updateCustomization({ text: e.target.value.slice(0, 20) })}
                        placeholder="Enter your text..."
                        maxLength={20}
                        className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                        style={{ fontSize: '15px', letterSpacing: '0.05em' }}
                      />
                      <p className="mt-2" style={{ fontSize: '10px', color: '#999' }}>
                        {currentCustomization.text.length} / 20 characters
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
                            onClick={() => updateCustomization({ font: fontKey })}
                            className={`p-4 border-2 transition-all ${
                              currentCustomization.font === fontKey
                                ? 'border-black bg-white'
                                : 'border-black/20 hover:border-black bg-white'
                            }`}
                          >
                            <div className={`${FONTS[fontKey].style}`} style={{ fontSize: '16px' }}>
                              Aa
                            </div>
                            <p className="mt-2" style={{ fontSize: '10px' }}>{FONTS[fontKey].name}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Thread Color */}
                    <div>
                      <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                        THREAD COLOR
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {THREAD_COLORS.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => updateCustomization({ threadColor: color.value })}
                            className={`relative w-12 h-12 border-2 transition-all ${
                              currentCustomization.threadColor === color.value
                                ? 'border-black scale-110'
                                : 'border-black/20 hover:border-black'
                            }`}
                            style={{
                              backgroundColor: color.value,
                              boxShadow: color.value === '#FFFFFF' ? '0 0 0 1px rgba(0,0,0,0.1) inset' : undefined,
                            }}
                            title={color.name}
                          >
                            {currentCustomization.threadColor === color.value && (
                              <Check 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                                size={16}
                                style={{ color: color.value === '#FFFFFF' || color.value === '#a0a0a0' ? '#000' : '#fff' }}
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
                      <div className="grid grid-cols-2 gap-3">
                        {getPlacementOptions().map((placement) => (
                          <button
                            key={placement}
                            onClick={() => updateCustomization({ textPlacement: placement })}
                            className={`px-4 py-3 border-2 transition-all ${
                              currentCustomization.textPlacement === placement
                                ? 'border-black bg-black text-white'
                                : 'border-black/20 hover:border-black bg-white text-black'
                            }`}
                            style={{ fontSize: '12px', letterSpacing: '0.05em' }}
                          >
                            {placement}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3B: DESIGN EMBROIDERY OPTIONS */}
              {currentCustomization.embroideryType === 'design' && (
                <div className="bg-white border border-black/10 p-8 animate-in fade-in duration-500">
                  <h3 className="mb-6 flex items-center gap-3" style={{ fontSize: '16px', letterSpacing: '0.08em' }}>
                    <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">3</span>
                    DESIGN YOUR EMBROIDERY
                  </h3>

                  <div className="space-y-6">
                    {/* Design Description */}
                    <div>
                      <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                        DESIGN DESCRIPTION OR INSPIRATION
                      </label>
                      <textarea
                        value={currentCustomization.designDescription}
                        onChange={(e) => updateCustomization({ designDescription: e.target.value })}
                        placeholder="Describe your design idea (e.g., 'Minimalist mountain outline', 'Geometric pattern', 'Abstract waves')..."
                        rows={4}
                        className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
                        style={{ fontSize: '14px', letterSpacing: '0.02em' }}
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                        UPLOAD DESIGN IMAGE (OPTIONAL)
                      </label>
                      <div className="border-2 border-dashed border-black/20 p-6 text-center hover:border-black transition-colors">
                        {currentCustomization.designImage ? (
                          <div className="space-y-4">
                            <img 
                              src={currentCustomization.designImage} 
                              alt="Design preview" 
                              className="mx-auto max-h-48 object-contain"
                            />
                            <p style={{ fontSize: '12px', color: '#666' }}>{currentCustomization.designImageName}</p>
                            <button
                              onClick={() => updateCustomization({ designImage: null, designImageName: '' })}
                              className="text-red-600 hover:text-red-800 flex items-center gap-2 mx-auto"
                              style={{ fontSize: '12px' }}
                            >
                              <X size={14} />
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'design')}
                              className="hidden"
                            />
                            <Upload className="mx-auto mb-3 text-black/40" size={32} />
                            <p style={{ fontSize: '13px', color: '#666', letterSpacing: '0.05em' }}>
                              Click to upload or drag and drop
                            </p>
                            <p style={{ fontSize: '11px', color: '#999' }}>
                              PNG, JPG up to 5MB
                            </p>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Color Type */}
                    <div>
                      <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                        COLOR OPTIONS
                      </label>
                      <div className="space-y-3">
                        {[
                          { id: 'single' as const, label: 'Single Color', desc: 'One thread color' },
                          { id: 'multi' as const, label: 'Multi-Color', desc: '2-3 thread colors (+25 RON)' },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => updateCustomization({ colorType: option.id })}
                            className={`w-full text-left p-4 border-2 transition-all ${
                              currentCustomization.colorType === option.id
                                ? 'border-black bg-white'
                                : 'border-black/20 hover:border-black bg-white'
                            }`}
                          >
                            <span style={{ fontSize: '13px', letterSpacing: '0.05em' }}>{option.label}</span>
                            <p style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>{option.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Single Color Selection */}
                    {currentCustomization.colorType === 'single' && (
                      <div>
                        <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                          THREAD COLOR
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {THREAD_COLORS.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => updateCustomization({ singleColor: color.value })}
                              className={`relative w-12 h-12 border-2 transition-all ${
                                currentCustomization.singleColor === color.value
                                  ? 'border-black scale-110'
                                  : 'border-black/20 hover:border-black'
                              }`}
                              style={{
                                backgroundColor: color.value,
                                boxShadow: color.value === '#FFFFFF' ? '0 0 0 1px rgba(0,0,0,0.1) inset' : undefined,
                              }}
                              title={color.name}
                            >
                              {currentCustomization.singleColor === color.value && (
                                <Check 
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                                  size={16}
                                  style={{ color: color.value === '#FFFFFF' || color.value === '#a0a0a0' ? '#000' : '#fff' }}
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Multi Color Selection */}
                    {currentCustomization.colorType === 'multi' && (
                      <div>
                        <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                          SELECT 2-3 THREAD COLORS
                        </label>
                        <div className="space-y-3">
                          {[0, 1, 2].map((index) => (
                            <div key={index}>
                              <p className="mb-2" style={{ fontSize: '11px', color: '#999' }}>Color {index + 1}</p>
                              <div className="flex flex-wrap gap-3">
                                {THREAD_COLORS.map((color) => (
                                  <button
                                    key={color.value}
                                    onClick={() => {
                                      const newColors = [...currentCustomization.multiColors];
                                      newColors[index] = color.value;
                                      updateCustomization({ multiColors: newColors });
                                    }}
                                    className={`relative w-12 h-12 border-2 transition-all ${
                                      currentCustomization.multiColors[index] === color.value
                                        ? 'border-black scale-110'
                                        : 'border-black/20 hover:border-black'
                                    }`}
                                    style={{
                                      backgroundColor: color.value,
                                      boxShadow: color.value === '#FFFFFF' ? '0 0 0 1px rgba(0,0,0,0.1) inset' : undefined,
                                    }}
                                    title={color.name}
                                  >
                                    {currentCustomization.multiColors[index] === color.value && (
                                      <Check 
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                                        size={16}
                                        style={{ color: color.value === '#FFFFFF' || color.value === '#a0a0a0' ? '#000' : '#fff' }}
                                      />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Placement */}
                    <div>
                      <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                        PLACEMENT
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {getPlacementOptions().map((placement) => (
                          <button
                            key={placement}
                            onClick={() => updateCustomization({ designPlacement: placement })}
                            className={`px-4 py-3 border-2 transition-all ${
                              currentCustomization.designPlacement === placement
                                ? 'border-black bg-black text-white'
                                : 'border-black/20 hover:border-black bg-white text-black'
                            }`}
                            style={{ fontSize: '12px', letterSpacing: '0.05em' }}
                          >
                            {placement}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3C: CUSTOM DESIGN CONSULTATION */}
              {currentCustomization.embroideryType === 'custom' && (
                <div className="bg-white border border-black/10 p-8 animate-in fade-in duration-500">
                  <h3 className="mb-6 flex items-center gap-3" style={{ fontSize: '16px', letterSpacing: '0.08em' }}>
                    <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">3</span>
                    CUSTOM DESIGN CONSULTATION
                  </h3>

                  <div className="space-y-6">
                    {/* Info Box */}
                    <div className="bg-[#faf8f5] border border-black/10 p-6 flex gap-4">
                      <Info size={20} className="flex-shrink-0 mt-1" />
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>
                          Work with Our Design Team
                        </p>
                        <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.6' }}>
                          Our expert designers will collaborate with you to create a completely unique embroidery design. 
                          Share your vision, upload references, and we'll bring it to life.
                        </p>
                      </div>
                    </div>

                    {/* Design Brief */}
                    <div>
                      <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                        YOUR VISION (OPTIONAL)
                      </label>
                      <textarea
                        value={currentCustomization.customBrief}
                        onChange={(e) => updateCustomization({ customBrief: e.target.value })}
                        placeholder="Tell us about your design idea, style preferences, symbolism, or any specific elements you'd like to include..."
                        rows={5}
                        className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
                        style={{ fontSize: '14px', letterSpacing: '0.02em' }}
                      />
                    </div>

                    {/* Reference Image */}
                    <div>
                      <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                        REFERENCE IMAGES (OPTIONAL)
                      </label>
                      <div className="border-2 border-dashed border-black/20 p-6 text-center hover:border-black transition-colors">
                        {currentCustomization.customRefImage ? (
                          <div className="space-y-4">
                            <img 
                              src={currentCustomization.customRefImage} 
                              alt="Reference preview" 
                              className="mx-auto max-h-48 object-contain"
                            />
                            <p style={{ fontSize: '12px', color: '#666' }}>{currentCustomization.customRefImageName}</p>
                            <button
                              onClick={() => updateCustomization({ customRefImage: null, customRefImageName: '' })}
                              className="text-red-600 hover:text-red-800 flex items-center gap-2 mx-auto"
                              style={{ fontSize: '12px' }}
                            >
                              <X size={14} />
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'custom')}
                              className="hidden"
                            />
                            <Upload className="mx-auto mb-3 text-black/40" size={32} />
                            <p style={{ fontSize: '13px', color: '#666', letterSpacing: '0.05em' }}>
                              Upload inspiration or reference images
                            </p>
                            <p style={{ fontSize: '11px', color: '#999' }}>
                              PNG, JPG up to 5MB
                            </p>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block mb-3" style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#666' }}>
                        PHONE NUMBER FOR CONSULTATION
                      </label>
                      <input
                        type="tel"
                        value={currentCustomization.phoneNumber}
                        onChange={(e) => updateCustomization({ phoneNumber: e.target.value })}
                        placeholder="+40 XXX XXX XXX"
                        className="w-full bg-white border-2 border-black/20 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                        style={{ fontSize: '14px', letterSpacing: '0.02em' }}
                      />
                      <p className="mt-2" style={{ fontSize: '11px', color: '#999' }}>
                        We'll contact you via WhatsApp to discuss your custom design
                      </p>
                    </div>

                    {/* WhatsApp Button */}
                    <button
                      onClick={handleWhatsAppConsult}
                      disabled={!currentCustomization.phoneNumber}
                      className="w-full bg-[#25D366] text-white py-4 hover:bg-[#20BA5A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      START WHATSAPP CONSULTATION
                    </button>
                  </div>
                </div>
              )}

              {/* MOBILE PREVIEW BEFORE NAVIGATION - Only visible on mobile */}
              {canProceed() && (
                <div className="lg:hidden bg-white border border-black/10 overflow-hidden animate-in fade-in duration-500">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <ImageWithFallback
                      src={currentItem.image}
                      alt={currentItem.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Color Overlay */}
                    {currentCustomization.color && (
                      <div 
                        className="absolute inset-0 mix-blend-multiply opacity-20"
                        style={{ backgroundColor: currentCustomization.color }}
                      />
                    )}

                    {/* Text Embroidery Preview */}
                    {currentCustomization.embroideryType === 'text' && currentCustomization.text && currentCustomization.textPlacement && (
                      <div 
                        className={`absolute flex items-center justify-center pointer-events-none ${
                          currentCustomization.textPlacement === 'Left chest' ? 'top-[25%] left-[20%] w-[25%]' :
                          currentCustomization.textPlacement === 'Right chest' ? 'top-[25%] right-[20%] w-[25%]' :
                          currentCustomization.textPlacement === 'Back' ? 'top-[30%] left-[50%] -translate-x-1/2 w-[50%]' :
                          currentCustomization.textPlacement === 'Sleeve' ? 'top-[35%] left-[10%] w-[15%]' :
                          currentCustomization.textPlacement === 'Front' ? 'top-[40%] left-[50%] -translate-x-1/2 w-[40%]' :
                          currentCustomization.textPlacement === 'Side' ? 'top-[40%] left-[15%] w-[20%]' :
                          currentCustomization.textPlacement === 'Left thigh' ? 'top-[45%] left-[25%] w-[20%]' :
                          currentCustomization.textPlacement === 'Right thigh' ? 'top-[45%] right-[25%] w-[20%]' :
                          'top-[30%] left-[50%] -translate-x-1/2 w-[40%]'
                        }`}
                      >
                        <div className="bg-white/95 backdrop-blur-sm px-2 py-1.5 border border-black/30 shadow-2xl">
                          <div
                            className={`${FONTS[currentCustomization.font].style} text-center whitespace-nowrap`}
                            style={{ 
                              fontSize: 'clamp(8px, 2vw, 18px)', 
                              color: currentCustomization.threadColor,
                              letterSpacing: '0.05em'
                            }}
                          >
                            {currentCustomization.text}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Design Embroidery Preview */}
                    {currentCustomization.embroideryType === 'design' && currentCustomization.designPlacement && (
                      <div 
                        className={`absolute flex items-center justify-center pointer-events-none ${
                          currentCustomization.designPlacement === 'Left chest' ? 'top-[25%] left-[20%] w-[25%] h-[25%]' :
                          currentCustomization.designPlacement === 'Right chest' ? 'top-[25%] right-[20%] w-[25%] h-[25%]' :
                          currentCustomization.designPlacement === 'Back' ? 'top-[30%] left-[50%] -translate-x-1/2 w-[50%] h-[40%]' :
                          currentCustomization.designPlacement === 'Sleeve' ? 'top-[35%] left-[10%] w-[15%] h-[15%]' :
                          currentCustomization.designPlacement === 'Front' ? 'top-[40%] left-[50%] -translate-x-1/2 w-[40%] h-[30%]' :
                          currentCustomization.designPlacement === 'Side' ? 'top-[40%] left-[15%] w-[20%] h-[20%]' :
                          currentCustomization.designPlacement === 'Left thigh' ? 'top-[45%] left-[25%] w-[20%] h-[20%]' :
                          currentCustomization.designPlacement === 'Right thigh' ? 'top-[45%] right-[25%] w-[20%] h-[20%]' :
                          'top-[30%] left-[50%] -translate-x-1/2 w-[40%] h-[30%]'
                        }`}
                      >
                        {currentCustomization.designImage ? (
                          <div className="bg-white/95 backdrop-blur-sm p-1.5 border border-black/30 shadow-2xl w-full h-full flex items-center justify-center">
                            <img src={currentCustomization.designImage} alt="Design preview" className="max-w-full max-h-full object-contain" />
                          </div>
                        ) : (
                          <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 border border-dashed border-black/40 shadow-2xl">
                            <p style={{ fontSize: 'clamp(8px, 2vw, 11px)', color: '#666', letterSpacing: '0.08em' }}>DESIGN</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Custom Design Badge */}
                    {currentCustomization.embroideryType === 'custom' && (
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

              {/* Navigation Buttons */}
              {canProceed() && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-[#c9a66b] text-black py-4 hover:bg-[#b89559] transition-colors flex items-center justify-center gap-2"
                    style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}
                  >
                    {isLastItem ? 'COMPLETE & ADD TO CART' : 'NEXT ITEM'}
                    {!isLastItem && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Summary of Completed Items */}
              {currentItemIndex > 0 && (
                <div className="bg-white p-6 border border-black/10">
                  <h4 className="mb-4" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em' }}>
                    CUSTOMIZED ITEMS ({currentItemIndex})
                  </h4>
                  <div className="space-y-3">
                    {customizableItems.slice(0, currentItemIndex).map((item) => {
                      const custom = customizations[item.name];
                      return (
                        <div key={item.name} className="flex items-center justify-between p-3 bg-[#faf8f5]">
                          <div>
                            <p style={{ fontSize: '12px', fontWeight: 500 }}>{item.name}</p>
                            <p style={{ fontSize: '11px', color: '#666' }}>
                              {custom?.embroideryType === 'text' && `"${custom.text}" · ${custom.textPlacement}`}
                              {custom?.embroideryType === 'design' && `Design · ${custom.designPlacement}`}
                              {custom?.embroideryType === 'custom' && 'Custom Design Consultation'}
                            </p>
                          </div>
                          <Check className="w-4 h-4 text-[#c9a66b]" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
