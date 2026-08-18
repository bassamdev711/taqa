import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type CategoryDefinition = {
  name: string
  slug: string
  description: string
  imageUrl: string
  brand: string
  basePrice: number
  priceStep: number
  sizes: string[]
  products: string[]
}

const categoryDefinitions: CategoryDefinition[] = [
  {
    name: 'الغسيل والعناية',
    slug: 'washing-care',
    description: 'غسالات ومجففات وتقنيات عناية بالملابس تجعل روتين البيت أخف.',
    imageUrl: '/products/washing-care.svg',
    brand: 'TAQA HOME',
    basePrice: 189,
    priceStep: 24,
    sizes: ['7 كجم', '8 كجم', '9 كجم', '10 كجم', '12 كجم'],
    products: ['غسالة أمامية ستيم', 'غسالة أمامية هادئة', 'غسالة علوية اقتصادية', 'غسالة ذكية بالتحكم عن بعد', 'غسالة عائلية سعة كبيرة', 'مجفف حراري موفر للطاقة', 'مجفف بمضخة حرارية', 'غسالة ومجفف مدمجان', 'غسالة رقيقة للعناية بالأقمشة', 'غسالة سريعة للغسيل اليومي'],
  },
  {
    name: 'التبريد والثلاجات',
    slug: 'cooling',
    description: 'ثلاجات وفريزرات تحفظ الطعام طازجاً بتبريد ثابت واستهلاك محسوب.',
    imageUrl: '/products/cooling.svg',
    brand: 'TAQA COOL',
    basePrice: 329,
    priceStep: 42,
    sizes: ['280 لتر', '340 لتر', '420 لتر', '480 لتر', '560 لتر'],
    products: ['ثلاجة بابين نوفا', 'ثلاجة فريزر سفلي', 'ثلاجة عائلية إنفرتر', 'ثلاجة سايد باي سايد', 'ثلاجة فرنسية بأربعة أبواب', 'فريزر رأسي موفر', 'فريزر أفقي عائلي', 'ثلاجة صغيرة للمكتب', 'ثلاجة عرض للمشروبات', 'ثلاجة ذكية بفلتر ماء'],
  },
  {
    name: 'أجهزة المطبخ',
    slug: 'kitchen-appliances',
    description: 'أفران وأجهزة مطبخ عملية بتصميم هادئ وأداء يناسب تفاصيل يومك.',
    imageUrl: '/products/cooking.svg',
    brand: 'TAQA KITCHEN',
    basePrice: 69,
    priceStep: 19,
    sizes: ['20 لتر', '25 لتر', '30 لتر', '45 لتر', '60 لتر'],
    products: ['فرن كهربائي كونتور', 'فرن بلت إن ستيم', 'ميكروويف شيف', 'قلاية هوائية ذكية', 'خلاط زجاجي عالي القوة', 'محضرة طعام متعددة الوظائف', 'ماكينة قهوة منزلية', 'غلاية ماء بدرجة حرارة', 'شفاط مطبخ جداري', 'موقد كهربائي سيراميك'],
  },
  {
    name: 'غسالات الصحون',
    slug: 'dishwashers',
    description: 'حلول تنظيف الأواني بدورات هادئة ومساحات مرنة للمطابخ الحديثة.',
    imageUrl: '/products/dishwashers.svg',
    brand: 'TAQA CARE',
    basePrice: 239,
    priceStep: 28,
    sizes: ['8 أطقم', '10 أطقم', '12 طقماً', '14 طقماً', '16 طقماً'],
    products: ['غسالة صحون مدمجة', 'غسالة صحون صامتة', 'غسالة صحون بثلاثة رفوف', 'غسالة صحون موفرة للماء', 'غسالة صحون ستيم', 'غسالة صحون صغيرة', 'غسالة صحون عائلية', 'غسالة صحون ببرنامج سريع', 'غسالة صحون بواجهة سوداء', 'غسالة صحون ذكية'],
  },
  {
    name: 'التنظيف المنزلي',
    slug: 'cleaning',
    description: 'مكانس وأجهزة تنظيف ذكية تمنح البيت عناية أسرع ونتيجة أهدأ.',
    imageUrl: '/products/cleaning.svg',
    brand: 'TAQA CLEAN',
    basePrice: 59,
    priceStep: 15,
    sizes: ['0.5 لتر', '0.7 لتر', '1 لتر', '1.5 لتر', '2 لتر'],
    products: ['مكنسة لاسلكية خفيفة', 'مكنسة عمودية بمحطة شحن', 'مكنسة روبوتية ذكية', 'مكنسة روبوتية مع ممسحة', 'مكنسة برميلية قوية', 'مكنسة يدوية للسيارة', 'جهاز تنظيف بالبخار', 'جهاز غسيل السجاد', 'منظف زجاج لاسلكي', 'مكنسة عصا للحيوانات الأليفة'],
  },
  {
    name: 'التكييف والتهوية',
    slug: 'air-conditioning',
    description: 'مكيفات وحلول تهوية تمنح الغرف راحة مستقرة مع كفاءة أعلى.',
    imageUrl: '/products/air-conditioning.svg',
    brand: 'TAQA AIR',
    basePrice: 299,
    priceStep: 45,
    sizes: ['12 ألف وحدة', '18 ألف وحدة', '24 ألف وحدة', '30 ألف وحدة', '36 ألف وحدة'],
    products: ['مكيف سبليت إنفرتر', 'مكيف سبليت بارد فقط', 'مكيف سبليت حار وبارد', 'مكيف جداري هادئ', 'مكيف بتنقية هواء', 'مكيف اقتصادي للمجلس', 'مكيف ذكي بالواي فاي', 'مكيف كاسيت للمساحات الكبيرة', 'مروحة برجية ذكية', 'منقي هواء بفلتر HEPA'],
  },
  {
    name: 'السخانات والمياه',
    slug: 'water-heating',
    description: 'سخانات مياه آمنة وفعالة للاستخدام اليومي مع تحكم أوضح.',
    imageUrl: '/products/water-heating.svg',
    brand: 'TAQA WARM',
    basePrice: 119,
    priceStep: 23,
    sizes: ['30 لتر', '50 لتر', '60 لتر', '80 لتر', '100 لتر'],
    products: ['سخان كهربائي رأسي', 'سخان أفقي للمساحات الضيقة', 'سخان ديجيتال ذكي', 'سخان سريع للمطبخ', 'سخان إنفرتر موفر', 'سخان أمان مزدوج', 'سخان عائلي كبير', 'سخان بخزان ستانلس', 'سخان شمسي منزلي', 'مضخة مياه هادئة'],
  },
  {
    name: 'الطاقة الشمسية',
    slug: 'solar-energy',
    description: 'ألواح وإنفرترات وحزم شمسية لبناء منظومة طاقة منزلية موثوقة.',
    imageUrl: '/products/solar-energy.svg',
    brand: 'TAQA SOLAR',
    basePrice: 249,
    priceStep: 65,
    sizes: ['450 واط', '550 واط', '1 كيلوواط', '3 كيلوواط', '5 كيلوواط'],
    products: ['لوح شمسي مونو 450 واط', 'لوح شمسي مونو 550 واط', 'إنفرتر منزلي هجين', 'إنفرتر شمسي ثلاثي الطور', 'منظم شحن MPPT', 'حزمة طاقة شمسية للمبتدئين', 'حزمة شمسية للفيلا', 'كابل شمسي مزدوج العزل', 'هيكل تثبيت للألواح', 'عداد مراقبة إنتاج الطاقة'],
  },
  {
    name: 'تخزين الطاقة',
    slug: 'solar-storage',
    description: 'بطاريات وحلول تخزين تساعد المنزل على استخدام الطاقة في الوقت المناسب.',
    imageUrl: '/products/solar-storage.svg',
    brand: 'TAQA STORE',
    basePrice: 399,
    priceStep: 92,
    sizes: ['1.2 كيلوواط ساعة', '2.4 كيلوواط ساعة', '5 كيلوواط ساعة', '7.5 كيلوواط ساعة', '10 كيلوواط ساعة'],
    products: ['بطارية ليثيوم منزلية', 'بطارية جدارية ذكية', 'بطارية احتياطية للإنفرتر', 'وحدة تخزين قابلة للتوسع', 'بطارية فوسفات حديد', 'محطة طاقة محمولة', 'محطة طاقة للتخييم', 'نظام تخزين للطوارئ', 'بطارية مراقبة بالتطبيق', 'حزمة تخزين شمسية كاملة'],
  },
  {
    name: 'الإضاءة والأدوات الذكية',
    slug: 'lighting-tools',
    description: 'إضاءة وأدوات منزلية ذكية تضيف راحة عملية إلى كل مساحة.',
    imageUrl: '/products/lighting-tools.svg',
    brand: 'TAQA SMART',
    basePrice: 29,
    priceStep: 9,
    sizes: ['9 واط', '12 واط', '18 واط', '24 واط', '36 واط'],
    products: ['لمبة LED ذكية', 'شريط إضاءة للمطبخ', 'مصباح سقفي أنيق', 'مصباح قراءة قابل للشحن', 'كشاف خارجي شمسي', 'حساس حركة للمدخل', 'مقبس ذكي موفر', 'مفتاح إضاءة ذكي', 'منظم أسلاك مكتبي', 'عدة أدوات منزلية أساسية'],
  },
]

function makeSlug(categorySlug: string, index: number) {
  return `demo-${categorySlug}-${String(index + 1).padStart(2, '0')}`
}

async function main() {
  console.log('Starting TAQA HOME demo catalog seed...')

  const storeSettingsData = {
    storeName: process.env.STORE_NAME?.trim() || 'طاقة هوم',
    storeNameLatin: process.env.STORE_NAME_LATIN?.trim() || 'TAQA HOME',
    storeTagline: process.env.STORE_TAGLINE?.trim() || 'أجهزة منزلية أذكى، وطاقة شمسية لبيت أكثر كفاءة.',
    storeDescription: process.env.STORE_DESCRIPTION?.trim() || 'اكتشف الغسالات والثلاجات وأجهزة المطبخ وحلول الطاقة الشمسية، مع مواصفات واضحة وخدمة موثوقة.',
    locale: process.env.STORE_LOCALE?.trim() || 'ar',
    currencyCode: process.env.STORE_CURRENCY?.trim().toUpperCase() || 'USD',
    storeUrl: process.env.STORE_URL?.trim() || null,
  }

  await prisma.storeSettings.upsert({
    where: { id: 'singleton' },
    update: storeSettingsData,
    create: { id: 'singleton', ...storeSettingsData },
  })

  await prisma.homepageSettings.upsert({
    where: { id: 'singleton' },
    update: {
      heroTitle: 'طاقة هوم',
      heroSubtitle: 'تقنيةٌ تُحسن تفاصيل البيت.',
      heroDescription: 'أجهزة منزلية كهربائية وحلول طاقة شمسية مختارة بعناية لبيت أكثر راحة وكفاءة.',
      heroPrimaryButton: 'اكتشف المنتجات',
      heroSecondaryButton: 'اعرف المزيد',
      aboutTopTitle: 'فلسفة طاقة هوم',
      aboutMainTitle: 'اختيارات أذكى لبيتٍ أكثر كفاءة.',
      aboutQuote: 'نختار التقنية التي تخدم يومك، لا التي تزدحم به.',
      aboutDescription: 'نقرّب لك الغسالات والثلاجات وأجهزة المطبخ وحلول الطاقة الشمسية بمواصفات واضحة وتصميم يليق بالبيت العصري.',
      expTopTitle: 'تجربة طاقة هوم',
      expMainTitle: 'وضوحٌ قبل الشراء، وثقةٌ بعده.',
      expBox1Title: 'مواصفات واضحة',
      expBox1Desc: 'نرتب التفاصيل الأساسية والسعات والخيارات لتقارن بثقة وهدوء.',
      expBox2Title: 'حلول متكاملة',
      expBox2Desc: 'من الجهاز المنزلي إلى منظومة الطاقة الشمسية، نساعدك على اختيار ما يناسب مساحتك.',
      statsJson: JSON.stringify([
        { value: '10', label: 'تصنيفات منزلية' },
        { value: '100', label: 'منتجاً مختاراً' },
        { value: '01', label: 'هوية واضحة' },
        { value: '24/7', label: 'راحة يومية' },
      ]),
    },
    create: {
      id: 'singleton',
      heroTitle: 'طاقة هوم',
      heroSubtitle: 'تقنيةٌ تُحسن تفاصيل البيت.',
      heroDescription: 'أجهزة منزلية كهربائية وحلول طاقة شمسية مختارة بعناية لبيت أكثر راحة وكفاءة.',
      heroPrimaryButton: 'اكتشف المنتجات',
      heroSecondaryButton: 'اعرف المزيد',
      aboutTopTitle: 'فلسفة طاقة هوم',
      aboutMainTitle: 'اختيارات أذكى لبيتٍ أكثر كفاءة.',
      aboutQuote: 'نختار التقنية التي تخدم يومك، لا التي تزدحم به.',
      aboutDescription: 'نقرّب لك الغسالات والثلاجات وأجهزة المطبخ وحلول الطاقة الشمسية بمواصفات واضحة وتصميم يليق بالبيت العصري.',
      expTopTitle: 'تجربة طاقة هوم',
      expMainTitle: 'وضوحٌ قبل الشراء، وثقةٌ بعده.',
      expBox1Title: 'مواصفات واضحة',
      expBox1Desc: 'نرتب التفاصيل الأساسية والسعات والخيارات لتقارن بثقة وهدوء.',
      expBox2Title: 'حلول متكاملة',
      expBox2Desc: 'من الجهاز المنزلي إلى منظومة الطاقة الشمسية، نساعدك على اختيار ما يناسب مساحتك.',
      statsJson: JSON.stringify([
        { value: '10', label: 'تصنيفات منزلية' },
        { value: '100', label: 'منتجاً مختاراً' },
        { value: '01', label: 'هوية واضحة' },
        { value: '24/7', label: 'راحة يومية' },
      ]),
    },
  })

  const shippingCityCount = await prisma.shippingCity.count()
  if (shippingCityCount === 0) {
    await prisma.shippingCity.create({ data: { name: 'إب', shippingFee: 0, isActive: true } })
    console.log('Created default shipping city: إب')
  }

  if (process.env.SEED_DEMO_DATA !== 'true') {
    console.log('Demo catalog skipped. Set SEED_DEMO_DATA=true to add 10 categories and 100 products.')
    return
  }

  const legacySlugs = ['smart-energy-washing-machine', 'energy-saving-family-refrigerator']
  await prisma.product.deleteMany({
    where: { OR: [{ sku: { startsWith: 'DEMO-' } }, { slug: { in: legacySlugs } }] },
  })

  let productCount = 0
  for (const category of categoryDefinitions) {
    const collection = await prisma.collection.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        imageUrl: category.imageUrl,
        isActive: true,
        seoSearchPhrases: [category.name, category.slug, 'طاقة هوم', 'أجهزة منزلية'],
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        imageUrl: category.imageUrl,
        isActive: true,
        seoSearchPhrases: [category.name, category.slug, 'طاقة هوم', 'أجهزة منزلية'],
      },
    })

    for (let index = 0; index < category.products.length; index += 1) {
      const name = category.products[index]
      const price = category.basePrice + index * category.priceStep
      const compareAtPrice = index % 3 === 0 ? Math.round(price * 1.14) : null
      const size = category.sizes[index % category.sizes.length]
      const slug = makeSlug(category.slug, index)
      const product = {
        name,
        slug,
        brand: category.brand,
        description: `${name} من ${category.name}، اختيار عملي بتصميم هادئ وأداء مناسب للبيت العصري.`,
        price,
        compareAtPrice,
        sku: `DEMO-${category.slug.toUpperCase()}-${String(index + 1).padStart(2, '0')}`,
        size,
        gender: 'Appliance',
        category: category.slug,
        collectionId: collection.id,
        stock: 12 + ((index * 7) % 34),
        featured: index < 2,
        bestseller: index % 4 === 0,
        isActive: true,
        imageUrl: category.imageUrl,
        images: [category.imageUrl],
        seoSearchPhrases: [name, category.name, category.brand, 'طاقة هوم', 'أجهزة منزلية'],
        seoScore: 88 + (index % 10),
      }

      await prisma.product.upsert({
        where: { slug },
        update: product,
        create: product,
      })
      productCount += 1
    }

    console.log(`Seeded ${category.name}: 10 products`)
  }

  console.log(`Database seed finished: ${categoryDefinitions.length} categories and ${productCount} products.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
