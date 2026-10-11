import HomePage from '@/pages/home-page';
import BlogFeed from '@/components/blog-feed';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { sampleTours } from '@/constants/sample-tours';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

/**
 * Verifies the empty-state fallback: when the API returns no posts (or fails),
 * the home page must render the static tour examples instead of leaving the
 * skeleton placeholder blocks on screen forever.
 */
describe('Home Route: Empty-state fallback (static tour examples)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: [] });
  });

  test('All Posts section shows sample tours when the API returns no posts', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Skeletons show while loading, then are replaced by the sample tours.
    const cards = await screen.findAllByTestId('postcard');
    expect(cards.length).toBe(sampleTours.length);
    expect(screen.queryAllByTestId('postcardskeleton')).toHaveLength(0);
    // The same tour also appears in the Featured/Latest sections, so use AllBy.
    expect(screen.getAllByText(sampleTours[0].title).length).toBeGreaterThan(0);
  });

  test('Featured section shows sample tours when the API returns no posts', async () => {
    render(
      <BrowserRouter>
        <BlogFeed />
      </BrowserRouter>
    );

    const featured = await screen.findAllByTestId('featuredPostCard');
    expect(featured.length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId('featurepostcardskeleton')).toHaveLength(0);
  });

  test('Latest section shows sample tours when the API returns no posts', async () => {
    render(
      <BrowserRouter>
        <BlogFeed />
      </BrowserRouter>
    );

    const latest = await screen.findAllByTestId('latestpostcards');
    expect(latest.length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId('latestpostcardskeleton')).toHaveLength(0);
  });

  test('Selecting a category filters the sample tours to that category', async () => {
    render(
      <BrowserRouter>
        <BlogFeed />
      </BrowserRouter>
    );

    await screen.findAllByTestId('featuredPostCard');
    await userEvent.click(screen.getByRole('button', { name: 'Beaches' }));

    expect(await screen.findByText('Posts related to "Beaches"')).toBeInTheDocument();
    const filtered = await screen.findAllByTestId('featuredPostCard');
    const expected = sampleTours.filter((tour) => tour.categories.includes('Beaches'));
    expect(filtered).toHaveLength(expected.length);
    expect(screen.getAllByText(sampleTours[4].title).length).toBeGreaterThan(0);
  });

  test('API failure still renders sample tours instead of empty blocks', async () => {
    mockedAxios.get.mockRejectedValue(new Error('network down'));

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await waitFor(async () => {
      expect((await screen.findAllByTestId('postcard')).length).toBe(sampleTours.length);
    });
  });
});
