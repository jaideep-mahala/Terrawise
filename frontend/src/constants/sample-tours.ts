import Post from '@/types/post-type';

/**
 * Static tour examples used as a fallback for the home page.
 *
 * When the API returns no posts (or is unreachable) these keep the page from
 * rendering empty skeleton blocks forever, so the landing page always looks
 * populated. Every category in `utils/category-colors` is covered at least
 * once, so selecting a category still surfaces category-relevant content.
 *
 * Images are the curated travel shots shared with `constants/images`.
 */
export const sampleTours: Post[] = [
  {
    _id: 'sample-tour-1',
    authorName: 'TerraWise Team',
    title: 'Alpine Lakes and Mountain Trails',
    imageLink: 'https://i.ibb.co/3z72vmc/clean-lake-mountains-range-trees-nature-4k.webp',
    timeOfPost: '2024-05-18T09:00:00.000Z',
    description:
      'Trace the shoreline of a glassy alpine lake framed by pine forest and snow-capped peaks. A gentle full-day trail that rewards you with mirror-flat reflections at sunrise.',
    categories: ['Nature', 'Adventure'],
  },
  {
    _id: 'sample-tour-2',
    authorName: 'TerraWise Team',
    title: 'City Lights: A Night Walk Downtown',
    imageLink: 'https://i.ibb.co/y8vQnDc/c4fedab1-4041-4db5-9245-97439472cf2c.webp',
    timeOfPost: '2024-05-12T18:30:00.000Z',
    description:
      'Watch the skyline ignite after dark on a guided evening stroll through neon-lit streets, rooftop bars and hidden alleyway cafes.',
    categories: ['City', 'Travel'],
  },
  {
    _id: 'sample-tour-3',
    authorName: 'TerraWise Team',
    title: 'London Skyline: Icons of the Thames',
    imageLink: 'https://i.ibb.co/BNjv5Nn/London-Skyline-125508655.webp',
    timeOfPost: '2024-05-05T11:00:00.000Z',
    description:
      'Hop between Big Ben, the London Eye and the Shard on a riverside route that pairs centuries of history with striking modern architecture.',
    categories: ['Landmarks', 'City'],
  },
  {
    _id: 'sample-tour-4',
    authorName: 'TerraWise Team',
    title: 'Into the Wild: A Forest Retreat',
    imageLink: 'https://i.ibb.co/d0g42nr/FPO-BOR-100-800x600.webp',
    timeOfPost: '2024-04-27T07:45:00.000Z',
    description:
      'Trade the noise of the city for mossy paths, birdsong and a slow campfire evening deep inside an old-growth forest reserve.',
    categories: ['Adventure', 'Nature'],
  },
  {
    _id: 'sample-tour-5',
    authorName: 'TerraWise Team',
    title: 'Golden Hour at the Pier',
    imageLink: 'https://i.ibb.co/52mk2Yq/sunset-pier.webp',
    timeOfPost: '2024-04-19T17:15:00.000Z',
    description:
      'End the day with bare feet on weathered boards as the sun melts into the water. Fresh seafood stalls and live music line the boardwalk.',
    categories: ['Beaches', 'Travel'],
  },
  {
    _id: 'sample-tour-6',
    authorName: 'TerraWise Team',
    title: 'Maldives: A Turquoise Paradise',
    imageLink: 'https://i.ibb.co/KLwfZzG/Maldives-1024x767.webp',
    timeOfPost: '2024-04-11T10:00:00.000Z',
    description:
      'Snorkel vivid coral gardens, drift over sandbanks and fall asleep to the sound of the ocean in an overwater villa above a crystalline lagoon.',
    categories: ['Beaches', 'Travel'],
  },
  {
    _id: 'sample-tour-7',
    authorName: 'TerraWise Team',
    title: 'Sunset Horizons Coastal Drive',
    imageLink: 'https://i.ibb.co/qxFMj1H/sunset-horizon-clean-sky-nature.webp',
    timeOfPost: '2024-04-03T16:40:00.000Z',
    description:
      'Follow an open coastal road as the sky shifts through amber and violet, stopping at clifftop viewpoints and quiet headland lookouts.',
    categories: ['Nature', 'Landmarks'],
  },
];

/**
 * Returns sample tours for a section.
 * `'featured'` returns everything; otherwise the list is filtered to the
 * selected category so category views still show matching content.
 */
export function getSampleTours(category: string): Post[] {
  if (category === 'featured') return sampleTours;
  return sampleTours.filter((tour) => tour.categories.includes(category));
}
