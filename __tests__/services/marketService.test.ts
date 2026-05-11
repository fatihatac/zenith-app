import { marketRepo } from '../../services/marketService';

describe('marketService', () => {
  it('should return market assets', async () => {
    const assets = await marketRepo.getMarketAssets();
    expect(assets).toBeDefined();
    expect(Array.isArray(assets)).toBe(true);
    expect(assets.length).toBeGreaterThan(0);
    expect(assets[0]).toHaveProperty('symbol');
    expect(assets[0]).toHaveProperty('name');
    expect(assets[0]).toHaveProperty('price');
    expect(assets[0]).toHaveProperty('change');
  });
});
