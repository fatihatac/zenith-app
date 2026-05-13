jest.mock('@/contexts/ThemeContext', () => ({
  useThemeContext: () => {
    const { theme } = require('@/constants/theme');
    return theme;
  },
}));

jest.mock('@/store/appearanceStore', () => ({
  useAppearanceStore: () => ({ visualEffects: 'minimal' }),
}));

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn().mockResolvedValue({ type: 'success' }),
}));

import React from 'react';
import { View } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import { SignalCard } from '@/components/features/signal/SignalCard';
import { FeedItem } from '@/types/signal';

const MOCK_NOW = 1715500000000;

function createMockFeedItem(overrides: Partial<FeedItem> = {}): FeedItem {
  return {
    id: '1',
    sourceId: 'arstechnica',
    sourceName: 'Ars Technica',
    category: 'Technology',
    title: 'Test Feed Title',
    description: 'This is a test description for the feed item.',
    link: 'https://example.com/article',
    pubDate: MOCK_NOW,
    guid: 'guid-1',
    isRead: false,
    ...overrides,
  };
}

describe('SignalCard', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(MOCK_NOW);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders title, description, source name, and category', () => {
    const feed = createMockFeedItem();
    const { getByText } = render(<SignalCard signal={feed} />);

    expect(getByText('Test Feed Title')).toBeTruthy();
    expect(getByText('This is a test description for the feed item.')).toBeTruthy();
    expect(getByText('Ars Technica · Technology')).toBeTruthy();
  });

  it('renders unread dot indicator when signal.isRead is false', () => {
    const feedWithDot = createMockFeedItem({ isRead: false });
    const { UNSAFE_getAllByType: getViews1 } = render(
      <SignalCard signal={feedWithDot} />,
    );
    const viewCountWithDot = getViews1(View).length;

    const feedWithoutDot = createMockFeedItem({ isRead: true });
    const { UNSAFE_getAllByType: getViews2 } = render(
      <SignalCard signal={feedWithoutDot} />,
    );
    const viewCountWithoutDot = getViews2(View).length;

    // isRead: false renders an extra View (the unread dot)
    expect(viewCountWithDot).toBe(viewCountWithoutDot + 1);
  });

  it('does NOT render unread dot when signal.isRead is true', () => {
    const feed = createMockFeedItem({ isRead: true });
    const { getByText } = render(<SignalCard signal={feed} />);

    // Verify normal content still renders
    expect(getByText('Test Feed Title')).toBeTruthy();
    expect(getByText('Ars Technica · Technology')).toBeTruthy();
  });

  it('calls onMarkRead callback when card is pressed', async () => {
    const feed = createMockFeedItem();
    const onMarkRead = jest.fn();
    const { getByText } = render(
      <SignalCard signal={feed} onMarkRead={onMarkRead} />,
    );

    await act(async () => {
      fireEvent.press(getByText('Test Feed Title'));
    });

    expect(onMarkRead).toHaveBeenCalledTimes(1);
  });

  it('renders "Just now" for a recently published item', () => {
    const feed = createMockFeedItem({ pubDate: MOCK_NOW });
    const { getByText } = render(<SignalCard signal={feed} />);

    expect(getByText('Just now')).toBeTruthy();
  });

  it('renders relative time in hours for older items', () => {
    const feed = createMockFeedItem({ pubDate: MOCK_NOW - 2 * 60 * 60 * 1000 });
    const { getByText } = render(<SignalCard signal={feed} />);

    expect(getByText('2h ago')).toBeTruthy();
  });
});
