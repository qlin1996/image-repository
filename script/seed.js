const db = require('../server/db');
const { Image } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  await Image.create({
    fileLink:
      'https://i2.wp.com/hellofreshus.wpengine.com/wp-content/uploads/2016/10/HF160920_Global_Blog_All_About_Apples_15_low.jpg',
    title: 'apples',
    tags: ['fruits'],
  });

  await Image.create({
    fileLink:
      'https://images-prod.healthline.com/hlcmsresource/images/AN_images/benefits-of-oranges-1296x728-feature.jpg',
    title: 'oranges',
    tags: ['fruits'],
  });

  console.log(`seeded successfully`);
}

if (module === require.main) {
  seed();
}
