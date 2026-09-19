/* ============================================
   lesson: Install Rust
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"install", nav:"Install Rust",
title:"Install Rust — <em>one command</em>",
lead:"Rust comes through a tool called rustup. It brings the whole family with it.",
words:[
"One command installs all three: <b>rustup</b> (the installer), <b>rustc</b> (the checker), and <b>cargo</b> (the builder).",
"After installing, close the terminal and open it again. Then check the family is home."
],
widget:{type:"term"},
tip:{h:"The family check:",b:"Open your terminal and type <code class='inline'>cargo --version</code>. If it prints something like <code class='inline'>cargo 1.85.0</code>, cargo is ready. Also try <code class='inline'>rustc --version</code>."},
done:"Rust is installed"
}
);
