const db = require('../server/db');
const { Image } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  await Image.create({
    fileLink:
      'https://image-repository-coding-challenge.s3.us-east-2.amazonaws.com/HF160920_Global_Blog_All_About_Apples_15_low.jpg',
    title: 'apples',
    tags: ['fruit', 'apple'],
  });

  await Image.create({
    fileLink:
      'https://image-repository-coding-challenge.s3.us-east-2.amazonaws.com/benefits-of-oranges-1296x728-feature.jpg',
    title: 'oranges',
    tags: ['fruit', 'orange'],
  });

  await Image.create({
    fileLink:
      'https://image-repository-coding-challenge.s3.us-east-2.amazonaws.com/images.jpg',
    title: 'corn',
    tags: ['vegetable', 'corn'],
    liked: true,
  });

  console.log(`seeded successfully`);
}

if (module === require.main) {
  seed();
}
