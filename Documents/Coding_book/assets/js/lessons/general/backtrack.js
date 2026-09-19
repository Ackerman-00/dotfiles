/* ============================================
   lesson: Backtracking — the maze walker
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"backtrack", nav:"Backtracking",
title:"Backtracking — <em>the maze walker</em>",
lead:"Try a path. If it dead-ends, walk back to the last fork and try the next one. Exhaustively, calmly.",
words:[
"Backtracking is how you solve a maze with your finger: <b>walk forward</b> while you can, and when you hit a dead end, <b>walk back to the last fork and try the other way</b>. No magic, no map — just patience and a memory of where you've been.",
"It's depth-first search with a rule: <b>mark every cell you visit</b>. When a cell has no unvisited exits, it's a dead end — and the path behind you (the stack) remembers the way back to the fork. The finger picture has a blind spot: you can see the whole maze, the walker can't — it only knows the cell it's standing in. It never <i>sees</i> a dead end coming; it must walk in, mark it, and walk back out.",
"The word 'backtracking' means the step most searches skip: when you retreat, <b>you un-choose</b>. In puzzles you try to place something — a queen, a number, a tile. If it breaks the rules, remove it and try the next candidate. The 'remove' line is the heart of the algorithm.",
"That's the engine behind the N-Queens puzzle, Sudoku solvers, and even Rust's <code class='inline'>?</code> operator — a function that fails just walks back up the call stack to the last fork and lets the caller try another way.",
"🗣️ <b>Say it out loud:</b> <i>try, mark, dead end → walk back, un-choose, try the next. The path behind you is the stack.</i>",
"🔮 <b>Predict before you walk:</b> the explorer always tries right first. Guess which cell gets painted red first — then press Walk and check. The two red cells are the two planted traps."
],
analogy:[["Finger on the maze wall","=","Walk forward"],["Dead end → back to the last fork","=","Backtrack"],["Remove what doesn't fit, try the next","=","Sudoku, N-Queens"],["The path behind you","=","A call stack"]],
widget:{type:"backtrack"},
code:{
copy:`fn solve(maze: &mut Vec<Vec<char>>, r: usize, c: usize) -> bool {
    if r == maze.len() - 1 && c == maze[0].len() - 1 { return true; }
    for (dr, dc) in [(0, 1), (1, 0), (0, -1), (-1, 0)] {
        let (nr, nc) = (r as i32 + dr, c as i32 + dc);
        if nr < 0 || nc < 0 { continue; }
        let (nr, nc) = (nr as usize, nc as usize);
        if maze[nr][nc] != '.' { continue; }     // wall or already visited
        maze[nr][nc] = '*';                       // mark: I'm walking here
        if solve(maze, nr, nc) { return true; }   // trust the smaller maze
        maze[nr][nc] = '.';                       // dead end — UN-choose
    }
    false
}`,
lines:[
["fn solve(maze: &mut Vec<Vec<char>>, r: usize, c: usize) -> bool {","try cell (r, c) — am I at the exit yet?"],
["if r == maze.len() - 1 && c == maze[0].len() - 1 { return true; }","bottom-right corner — found it!"],
["for (dr, dc) in [(0, 1), (1, 0), (0, -1), (-1, 0)] {","try right, down, left, up"],
["if maze[nr][nc] != '.' { continue; }","wall or already visited — skip"],
["maze[nr][nc] = '*';","mark: I'm walking here"],
["if solve(maze, nr, nc) { return true; }","trust the smaller maze"],
["maze[nr][nc] = '.';","dead end — UN-choose, walk back"]
]},
tip:{h:"The backbone:",b:"<b>Try → mark → recurse → if it fails, un-mark and try the next.</b> The 'un-mark' line is what makes it backtracking. Remove it and the maze fills with wrong paths."},
done:"Backtracks with grace"
}
);
