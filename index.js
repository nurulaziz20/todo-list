const { PrismaClient } = require('@prisma/client')
const bcrypt = require ('bcrypt')

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const addUser = await prisma.user.create({
    data: {
        name: 'daru',
        email: 'daru@contoh.com',
        password: bcrypt.hashSync('12345', 10)
    }
  })

  console.log('addUser', addUser)


  const listUser = await prisma.user.findMany()
  console.log('listUser',listUser)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })