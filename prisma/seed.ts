import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  await prisma.storeSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      storeName: process.env.STORE_NAME?.trim() || 'طاقة هوم',
      storeNameLatin: process.env.STORE_NAME_LATIN?.trim() || 'TAQA HOME',
      storeTagline: process.env.STORE_TAGLINE?.trim() || 'أجهزة منزلية أذكى، وطاقة شمسية لبيت أكثر كفاءة.',
      storeDescription: process.env.STORE_DESCRIPTION?.trim() || 'اكتشف الغسالات والثلاجات وأجهزة المطبخ وحلول الطاقة الشمسية، مع مواصفات واضحة وخدمة موثوقة.',
      locale: process.env.STORE_LOCALE?.trim() || 'ar',
      currencyCode: process.env.STORE_CURRENCY?.trim().toUpperCase() || 'USD',
      storeUrl: process.env.STORE_URL?.trim() || null,
    },
  })

  const shippingCityCount = await prisma.shippingCity.count()
  if (shippingCityCount === 0) {
    await prisma.shippingCity.create({
      data: { name: 'إب', shippingFee: 0, isActive: true },
    })
    console.log('Created default shipping city: إب')
  }

  if (process.env.SEED_DEMO_DATA !== 'true') {
    console.log('Demo catalog skipped. Set SEED_DEMO_DATA=true to add sample products.')
    return
  }

  const demoProducts = [
    {
      name: 'غسالة ذكية موفرة للطاقة',
      slug: 'smart-energy-washing-machine',
      brand: 'TAQA HOME',
      description: 'غسالة عملية بدورات ذكية وتصميم يناسب الاستخدام اليومي.',
      price: 10,
      stock: 25,
      isActive: true,
      category: 'Washing & Care',
      gender: 'Appliance',
      size: '8 kg',
      featured: true,
      bestseller: false,
    },
    {
      name: 'ثلاجة عائلية موفرة للطاقة',
      slug: 'energy-saving-family-refrigerator',
      brand: 'TAQA HOME',
      description: 'تبريد ثابت ومساحة واسعة مع كفاءة عالية للاستخدام العائلي.',
      price: 25,
      stock: 15,
      isActive: true,
      category: 'Cooling',
      gender: 'Appliance',
      size: '450 L',
      featured: true,
      bestseller: true,
    },
  ]

  for (const product of demoProducts) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
    console.log(`Created demo product: ${createdProduct.id}`)
  }

  console.log('Database seed finished.')
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
