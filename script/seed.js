const db = require('../server/db');
const { Image } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  await Image.create({
    fileLink:
      'https://image-repository-coding-challenge.s3.us-east-2.amazonaws.com/42646d46-3d3f-454b-af2b-cef8926bc068.jpg',
    title: 'apple',
    key: '42646d46-3d3f-454b-af2b-cef8926bc068.jpg',
    tags: ['fruit', 'apple'],
  });

  await Image.create({
    fileLink:
      'https://image-repository-coding-challenge.s3.us-east-2.amazonaws.com/58af119d-c0a8-4026-831f-fa9bfbd559c8.jpg',
    title: 'orange',
    key: '58af119d-c0a8-4026-831f-fa9bfbd559c8.jpg',
    tags: ['fruit', 'orange'],
  });

  await Image.create({
    fileLink:
      'https://image-repository-coding-challenge.s3.us-east-2.amazonaws.com/52ffcd52-0f94-4a16-b3a1-88760ce4208f.jpg',
    title: 'beet',
    tags: ['vegetable', 'beet'],
    key: '52ffcd52-0f94-4a16-b3a1-88760ce4208f.jpg',
    liked: true,
  });

  console.log(`seeded successfully`);
}

if (module === require.main) {
  seed();
}
