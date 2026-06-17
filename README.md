# Gothic Plate Solver

Решение головоломки с пластинами из игры Gothic Remake.

## Задание

Реализуйте функцию `applyMoves(n, positions, influences, moves)`, которая вычисляет итоговое положение пластин после применения серии ходов.

### Правила

- Пластины нумеруются с 0 до n-1
- Позиции пластин от 1 до 7
- При движении пластины на delta позиций, все пластины, на которые она влияет, двигаются на delta * multiplier
- Если любая пластина выходит за пределы [1, 7], функция возвращает null

### Пример

```javascript
const n = 2;
const positions = [1, 7];
const influences = [
  [{target: 1, multiplier: -1}],
  []
];
const moves = [{plate: 0, delta: 2}];

const result = applyMoves(n, positions, influences, moves);

markdown
![Test Status](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/test-and-push.yml/badge.svg?branch=source)