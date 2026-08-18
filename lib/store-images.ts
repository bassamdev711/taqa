const realStoreImages = {
  appliance: '/products/real/appliance-room.jpg',
  cooling: '/products/real/kitchen-stainless.jpg',
  kitchen: '/products/real/kitchen-editorial.jpg',
  dishwasher: '/products/real/dishwasher-real.jpg',
  cleaning: '/products/real/appliance-kitchen.jpg',
  air: '/products/real/appliance-range.jpg',
  water: '/products/real/appliance-showroom.jpg',
  solar: '/products/real/solar-panels-inverter.jpg',
  storage: '/products/real/solar-battery.jpg',
  smart: '/products/real/appliance-kitchen.jpg',
} as const

export function getStoreProductImage(imageUrl?: string | null, brand?: string | null, category?: string | null) {
  if (imageUrl && !imageUrl.endsWith('.svg')) return imageUrl

  const categoryKey = category?.toLowerCase() || ''
  const brandKey = brand?.toLowerCase() || ''

  if (categoryKey.includes('solar-storage') || brandKey.includes('store')) return realStoreImages.storage
  if (categoryKey.includes('solar-energy') || brandKey.includes('solar')) return realStoreImages.solar
  if (categoryKey.includes('cool') || brandKey.includes('cool')) return realStoreImages.cooling
  if (categoryKey.includes('kitchen') || brandKey.includes('kitchen')) return realStoreImages.kitchen
  if (categoryKey.includes('dish') || brandKey.includes('care')) return realStoreImages.dishwasher
  if (categoryKey.includes('clean') || brandKey.includes('clean')) return realStoreImages.cleaning
  if (categoryKey.includes('air') || brandKey.includes('air')) return realStoreImages.air
  if (categoryKey.includes('water') || brandKey.includes('warm')) return realStoreImages.water
  if (categoryKey.includes('light') || brandKey.includes('smart')) return realStoreImages.smart
  return realStoreImages.appliance
}

export function getStoreCollectionImage(imageUrl?: string | null, slug?: string | null) {
  return getStoreProductImage(imageUrl, null, slug)
}

export { realStoreImages }

export default realStoreImages
