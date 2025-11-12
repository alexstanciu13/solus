import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@solus.ro' },
    update: {},
    create: {
      email: 'admin@solus.ro',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'Solus',
      role: 'ADMIN',
      phone: '+40712345678',
    },
  })
  console.log('✅ Admin user created')

  // Create Test Customer
  const customerPassword = await bcrypt.hash('customer123', 10)
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      passwordHash: customerPassword,
      firstName: 'Ion',
      lastName: 'Popescu',
      role: 'CUSTOMER',
      phone: '+40723456789',
    },
  })
  console.log('✅ Test customer created')

  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'inele' },
      update: {},
      create: {
        name: 'Rings',
        nameRo: 'Inele',
        slug: 'inele',
        description: 'Handcrafted rings for all occasions',
        descriptionRo: 'Inele artizanale pentru toate ocaziile',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'bratari' },
      update: {},
      create: {
        name: 'Bracelets',
        nameRo: 'Brățări',
        slug: 'bratari',
        description: 'Elegant bracelets',
        descriptionRo: 'Brățări elegante',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'coliere' },
      update: {},
      create: {
        name: 'Necklaces',
        nameRo: 'Coliere',
        slug: 'coliere',
        description: 'Beautiful necklaces',
        descriptionRo: 'Coliere frumoase',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cercei' },
      update: {},
      create: {
        name: 'Earrings',
        nameRo: 'Cercei',
        slug: 'cercei',
        description: 'Stylish earrings',
        descriptionRo: 'Cercei stilați',
        sortOrder: 4,
      },
    }),
  ])
  console.log('✅ Categories created')

  // Create Products
  const products = [
    {
      name: 'Heritage Signet Ring',
      nameRo: 'Inel Heritage Signet',
      slug: 'inel-heritage-signet',
      description: 'Classic signet ring with traditional Romanian motifs',
      descriptionRo: 'Inel sigiliu clasic cu motive tradiționale românești',
      basePrice: 1250,
      categoryId: categories[0].id,
      featured: true,
      inStock: true,
      metaTitle: 'Heritage Signet Ring - Solus',
      metaTitleRo: 'Inel Heritage Signet - Solus',
      metaDescription: 'Handcrafted signet ring with Romanian heritage design',
      metaDescriptionRo: 'Inel sigiliu artizanal cu design românesc',
    },
    {
      name: 'Classic Chain Bracelet',
      nameRo: 'Brățară Clasică Lanț',
      slug: 'bratara-clasica-lant',
      description: 'Elegant chain bracelet in sterling silver',
      descriptionRo: 'Brățară elegantă din argint 925',
      basePrice: 1850,
      categoryId: categories[1].id,
      featured: true,
      inStock: true,
      metaTitle: 'Classic Chain Bracelet - Solus',
      metaTitleRo: 'Brățară Clasică Lanț - Solus',
    },
    {
      name: 'Traditional Necklace',
      nameRo: 'Colier Tradițional',
      slug: 'colier-traditional',
      description: 'Beautiful traditional necklace with Romanian patterns',
      descriptionRo: 'Colier tradițional frumos cu modele românești',
      basePrice: 2100,
      categoryId: categories[2].id,
      limitedDrop: true,
      inStock: true,
      metaTitle: 'Traditional Necklace - Solus',
      metaTitleRo: 'Colier Tradițional - Solus',
    },
    {
      name: 'Elegant Earrings',
      nameRo: 'Cercei Eleganți',
      slug: 'cercei-eleganti',
      description: 'Elegant drop earrings',
      descriptionRo: 'Cercei eleganți',
      basePrice: 890,
      categoryId: categories[3].id,
      featured: true,
      inStock: true,
      metaTitle: 'Elegant Earrings - Solus',
      metaTitleRo: 'Cercei Eleganți - Solus',
    },
    {
      name: 'Vintage Ring',
      nameRo: 'Inel Vintage',
      slug: 'inel-vintage',
      description: 'Vintage style ring with ornate details',
      descriptionRo: 'Inel în stil vintage cu detalii ornamentale',
      basePrice: 1450,
      categoryId: categories[0].id,
      inStock: true,
    },
    {
      name: 'Minimal Bracelet',
      nameRo: 'Brățară Minimalistă',
      slug: 'bratara-minimalista',
      description: 'Simple and elegant minimal bracelet',
      descriptionRo: 'Brățară simplă și elegantă',
      basePrice: 950,
      categoryId: categories[1].id,
      inStock: true,
    },
    {
      name: 'Statement Necklace',
      nameRo: 'Colier Statement',
      slug: 'colier-statement',
      description: 'Bold statement necklace',
      descriptionRo: 'Colier îndrăzneț statement',
      basePrice: 2450,
      categoryId: categories[2].id,
      limitedDrop: true,
      inStock: true,
    },
    {
      name: 'Pearl Earrings',
      nameRo: 'Cercei cu Perle',
      slug: 'cercei-perle',
      description: 'Classic pearl earrings',
      descriptionRo: 'Cercei clasici cu perle',
      basePrice: 1200,
      categoryId: categories[3].id,
      inStock: true,
    },
  ]

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    })

    // Add product image
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: `/products/${productData.slug}.jpg`,
        altText: productData.name,
        altTextRo: productData.nameRo,
        sortOrder: 0,
      },
    })

    // Add variants for some products
    if (productData.categoryId === categories[0].id || productData.categoryId === categories[1].id) {
      await prisma.productVariant.createMany({
        data: [
          {
            productId: product.id,
            name: 'Small',
            nameRo: 'Mic',
            sku: `${productData.slug}-sm`,
            stock: 10,
          },
          {
            productId: product.id,
            name: 'Medium',
            nameRo: 'Mediu',
            sku: `${productData.slug}-md`,
            stock: 15,
          },
          {
            productId: product.id,
            name: 'Large',
            nameRo: 'Mare',
            sku: `${productData.slug}-lg`,
            stock: 8,
          },
        ],
      })
    }
  }
  console.log('✅ Products created')

  // Create Stories
  await prisma.story.upsert({
    where: { slug: 'povestea-solus' },
    update: {},
    create: {
      title: 'The Solus Story',
      titleRo: 'Povestea Solus',
      slug: 'povestea-solus',
      excerpt: 'How Solus began as a passion project',
      excerptRo: 'Cum a început Solus ca un proiect pasional',
      content: 'Our journey started in the heart of Romania...',
      contentRo: 'Călătoria noastră a început în inima României...',
      coverImage: '/stories/solus-story.jpg',
      author: 'Echipa Solus',
      published: true,
      publishedAt: new Date(),
    },
  })
  console.log('✅ Stories created')

  // Create Discount Codes
  await prisma.discountCode.upsert({
    where: { code: 'BINE2025' },
    update: {},
    create: {
      code: 'BINE2025',
      description: 'Welcome discount',
      descriptionRo: 'Reducere de bun venit',
      type: 'PERCENTAGE',
      amount: 10,
      minPurchase: 500,
      maxUses: 100,
      active: true,
      expiresAt: new Date('2025-12-31'),
    },
  })
  console.log('✅ Discount codes created')

  // Create Sample Order
  // First, fetch the created products by their slugs
  const firstProduct = await prisma.product.findUnique({
    where: { slug: 'inel-heritage-signet' }
  })

  const secondProduct = await prisma.product.findUnique({
    where: { slug: 'cercei-eleganti' }
  })

  if (firstProduct && secondProduct) {
    const order = await prisma.order.create({
      data: {
        orderNumber: 'ORD-2025-001',
        userId: customer.id,
        email: customer.email,
        firstName: customer.firstName!,
        lastName: customer.lastName!,
        phone: customer.phone!,
        shippingAddress: 'Str. Exemplu nr. 123',
        city: 'București',
        county: 'București',
        postalCode: '010101',
        paymentMethod: 'COD',
        paymentStatus: 'PENDING',
        status: 'PENDING',
        subtotal: firstProduct.basePrice + secondProduct.basePrice,
        shippingCost: 0,
        tax: 0,
        discount: 0,
        total: firstProduct.basePrice + secondProduct.basePrice,
      },
    })

    await prisma.orderItem.createMany({
      data: [
        {
          orderId: order.id,
          productId: firstProduct.id,
          productName: firstProduct.name,
          productNameRo: firstProduct.nameRo,
          price: firstProduct.basePrice,
          quantity: 1,
        },
        {
          orderId: order.id,
          productId: secondProduct.id,
          productName: secondProduct.name,
          productNameRo: secondProduct.nameRo,
          price: secondProduct.basePrice,
          quantity: 1,
        },
      ],
    })
    console.log('✅ Sample order created')
  } else {
    console.log('⚠️  Sample order skipped (products not found)')
  }

  console.log('🎉 Database seeding complete!')
  console.log('\n📧 Login credentials:')
  console.log('Admin: admin@solus.ro / admin123')
  console.log('Customer: customer@example.com / customer123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
