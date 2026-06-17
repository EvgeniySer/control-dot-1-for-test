export function applyMoves(n, positions, influences, moves) {
    if (!Array.isArray(positions) || positions.length !== n) {
      return null;
    }
    
    const current = [...positions];
    
    for (const move of moves) {
      const { plate, delta } = move;
      
      if (plate < 0 || plate >= n) {
        return null;
      }
      
      if (delta === 0) {
        continue;
      }
      
      const newPos = current[plate] + delta;
      if (newPos < 1 || newPos > 7) {
        return null;
      }
      current[plate] = newPos;
      
      if (influences[plate]) {
        for (const influence of influences[plate]) {
          const { target, multiplier } = influence;
          if (target < 0 || target >= n) continue;
          
          const affectedDelta = delta * multiplier;
          const newAffectedPos = current[target] + affectedDelta;
          if (newAffectedPos < 1 || newAffectedPos > 7) {
            return null;
          }
          current[target] = newAffectedPos;
        }
      }
    }
    
    return current;
  }
  
  export function canApplyMove(positions, influences, move) {
    const n = positions.length;
    const { plate, delta } = move;
    
    if (plate < 0 || plate >= n) return false;
    if (delta === 0) return false;
    
    const newPos = positions[plate] + delta;
    if (newPos < 1 || newPos > 7) return false;
    
    if (influences[plate]) {
      for (const influence of influences[plate]) {
        const { target, multiplier } = influence;
        if (target < 0 || target >= n) continue;
        
        const affectedDelta = delta * multiplier;
        const newAffectedPos = positions[target] + affectedDelta;
        if (newAffectedPos < 1 || newAffectedPos > 7) return false;
      }
    }
    
    return true;
  }
  
  export function findShortestSolution(n, positions, influences) {
    const CENTER = 4;
    const startState = [...positions];
    const targetState = Array(n).fill(CENTER);
    
    if (startState.every((pos, i) => pos === targetState[i])) {
      return [];
    }
    
    const queue = [startState];
    const visited = new Set();
    const parent = new Map();
    
    visited.add(startState.join(','));
    parent.set(startState.join(','), null);
    
    while (queue.length > 0) {
      const currentState = queue.shift();
      const currentPositions = currentState;
      
      for (let plate = 0; plate < n; plate++) {
        for (let delta = -7; delta <= 7; delta++) {
          if (delta === 0) continue;
          
          const move = { plate, delta };
          
          const newPos = currentPositions[plate] + delta;
          if (newPos < 1 || newPos > 7) continue;
          
          let valid = true;
          if (influences[plate]) {
            for (const influence of influences[plate]) {
              const { target, multiplier } = influence;
              if (target < 0 || target >= n) continue;
              const affectedDelta = delta * multiplier;
              const newAffectedPos = currentPositions[target] + affectedDelta;
              if (newAffectedPos < 1 || newAffectedPos > 7) {
                valid = false;
                break;
              }
            }
          }
          if (!valid) continue;
          
          const newState = [...currentPositions];
          newState[plate] += delta;
          
          if (influences[plate]) {
            for (const influence of influences[plate]) {
              const { target, multiplier } = influence;
              if (target < 0 || target >= n) continue;
              newState[target] += delta * multiplier;
            }
          }
          
          const stateKey = newState.join(',');
          
          if (!visited.has(stateKey)) {
            visited.add(stateKey);
            parent.set(stateKey, { state: currentState.join(','), move });
            queue.push(newState);
            
            if (newState.every((pos, i) => pos === targetState[i])) {
              const path = [];
              let current = stateKey;
              while (parent.get(current) !== null) {
                const data = parent.get(current);
                path.unshift(data.move);
                current = data.state;
              }
              return path;
            }
          }
        }
      }
    }
    
    return null;
  }
  
  export function printSolution(solution) {
    if (solution === null) {
      console.log('\n❌ Решение не найдено! Задача неразрешима.');
      return;
    }
    
    if (solution.length === 0) {
      console.log('\n✅ Все пластины уже в центре (позиция 4)!');
      return;
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`НАЙДЕН КРАТЧАЙШИЙ МАРШРУТ (всего ${solution.length} ходов)`);
    console.log(`${'='.repeat(60)}`);
    
    for (let step = 0; step < solution.length; step++) {
      const { plate, delta } = solution[step];
      const direction = delta < 0 ? "ВПРАВО" : "ВЛЕВО";
      const absSteps = Math.abs(delta);
      console.log(`${String(step + 1).padStart(2)}. Пластину ${plate + 1} → перемещаем на ${absSteps} шаг(ов) ${direction}`);
    }
  }