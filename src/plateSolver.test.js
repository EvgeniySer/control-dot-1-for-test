import { applyMoves, canApplyMove } from './plateSolver.js';

describe('Gothic Plate Solver', () => {
  describe('applyMoves', () => {
    test('должна правильно применять простые ходы без влияний', () => {
      const n = 3;
      const positions = [1, 4, 7];
      const influences = [[], [], []];
      const moves = [
        { plate: 0, delta: 2 },
        { plate: 2, delta: -1 }
      ];
      
      const result = applyMoves(n, positions, influences, moves);
      expect(result).toEqual([3, 4, 6]);
    });

    test('должна правильно применять ходы с влияниями', () => {
      const n = 2;
      const positions = [1, 7];
      const influences = [
        [{ target: 1, multiplier: -1 }],
        []
      ];
      const moves = [
        { plate: 0, delta: 2 }
      ];
      
      const result = applyMoves(n, positions, influences, moves);
      expect(result).toEqual([3, 5]);
    });

    test('должна возвращать null при выходе пластины за границы', () => {
      const n = 2;
      const positions = [6, 4];
      const influences = [
        [{ target: 1, multiplier: 1 }],
        []
      ];
      const moves = [
        { plate: 0, delta: 2 }
      ];
      
      const result = applyMoves(n, positions, influences, moves);
      expect(result).toBeNull();
    });

    test('должна возвращать null при невалидном номере пластины', () => {
      const n = 2;
      const positions = [1, 4];
      const influences = [[], []];
      const moves = [
        { plate: 2, delta: 1 }
      ];
      
      const result = applyMoves(n, positions, influences, moves);
      expect(result).toBeNull();
    });

    test('должна обрабатывать множественные влияния', () => {
      const n = 3;
      const positions = [1, 4, 7];
      const influences = [
        [
          { target: 1, multiplier: 1 },
          { target: 2, multiplier: -1 }
        ],
        [],
        []
      ];
      const moves = [
        { plate: 0, delta: 2 }
      ];
      
      const result = applyMoves(n, positions, influences, moves);
      expect(result).toEqual([3, 6, 5]);
    });

    test('должна обрабатывать цепочки ходов', () => {
      const n = 3;
      const positions = [1, 2, 3];
      const influences = [
        [{ target: 1, multiplier: 1 }],
        [{ target: 2, multiplier: 1 }],
        []
      ];
      const moves = [
        { plate: 0, delta: 1 },
        { plate: 1, delta: 1 }
      ];
      
      const result = applyMoves(n, positions, influences, moves);
      expect(result).toEqual([2, 4, 4]);
    });
  });

  describe('canApplyMove', () => {
    test('должна возвращать true для валидного хода', () => {
      const positions = [1, 4, 7];
      const influences = [[], [], []];
      const move = { plate: 0, delta: 2 };
      
      expect(canApplyMove(positions, influences, move)).toBe(true);
    });

    test('должна возвращать false для невалидного номера пластины', () => {
      const positions = [1, 4, 7];
      const influences = [[], [], []];
      const move = { plate: 3, delta: 2 };
      
      expect(canApplyMove(positions, influences, move)).toBe(false);
    });
  });
});