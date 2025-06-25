
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createAdminUser() {
  const adminEmail = 'admin@strategixapp.com'
  const adminPassword = 'StrategixAdmin2024!'
  
  try {
    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (existingUser) {
      console.log('Admin user already exists:', adminEmail)
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 12)

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'System Administrator',
        password: hashedPassword,
        subscriptionTier: 'LIFETIME',
        subscriptionStatus: 'ACTIVE',
        subscriptionStartDate: new Date(),
        onboardingCompleted: true,
        assessmentCompleted: true,
        emailVerified: new Date()
      }
    })

    console.log('Admin user created successfully!')
    console.log('Email:', adminEmail)
    console.log('Password:', adminPassword)
    console.log('User ID:', adminUser.id)
    
    // Create additional admin users
    const additionalAdmins = [
      'support@strategixapp.com',
      'owner@strategixapp.com'
    ]

    for (const email of additionalAdmins) {
      const existing = await prisma.user.findUnique({ where: { email } })
      if (!existing) {
        await prisma.user.create({
          data: {
            email,
            name: 'Administrator',
            password: hashedPassword,
            subscriptionTier: 'LIFETIME',
            subscriptionStatus: 'ACTIVE',
            subscriptionStartDate: new Date(),
            onboardingCompleted: true,
            assessmentCompleted: true,
            emailVerified: new Date()
          }
        })
        console.log('Created admin user:', email)
      }
    }

  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()
