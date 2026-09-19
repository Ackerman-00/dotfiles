/* ============================================
   lesson: minigrep — a real CLI
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"minigrep", nav:"minigrep — a mini tool",
title:"minigrep — <em>your first real tool</em>",
lead:"Result, files, and iterators meet here. A small grep that searches a file.",
words:[
"grep hunts for a word in a file. It prints each line with the word. We build <b>minigrep</b> — the small version — with <code class='inline'>std</code> only. No extra crates.",
"First, the program must read the command line. The words after your program live in <code class='inline'>env::args()</code>. We <code class='inline'>collect()</code> them into a Vec. Two dashes split cargo's words from yours: <code class='inline'>cargo run -- needle poem.txt</code>.",
"Then <code class='inline'>fs::read_to_string</code> reads the whole file into one big String. No file? No crash — a <b>Result</b> comes back. We open it with care: a clear message, not a crash.",
"Then the key line: <code class='inline'>contents.lines().filter(|line| line.contains(query))</code>. Three steps on one belt. Out come the lines with the word. No for-loop.",
"The pro version splits the work. <code class='inline'>Config::build</code> reads the args and can fail in a nice way. <code class='inline'>run()</code> does the job and gives back a <code class='inline'>Result</code>. Errors go to <code class='inline'>eprintln!</code> plus <code class='inline'>process::exit(1)</code>. Red text, no crash."
],
analogy:[["A librarian asked 'find lines with NEEDLE'","=","minigrep query + file"],["Reading the whole book first","=","contents.lines() — read the file"],["Keeping only matching lines","=",".filter(|line| …)"]],
coach:"Reading a whole file into memory is fine for a first tool. Big real grep reads piece by piece. The Book's own minigrep also reads it all at once. Small first, fast later.",
widget:{type:"resultplay"},
code:{
copy:`let args: Vec<String> = env::args().collect();
let query = &args[1];              // the word
let file = &args[2];               // the file

let contents = fs::read_to_string(file)
    .expect("could not read that file");

for line in contents.lines().filter(|l| l.contains(query)) {
    println!("{}", line);
}`,
lines:[
["let args: Vec<String> = env::args().collect();","the whole command line, one item per word"],
["let query = &args[1];","word #1 after the program name — borrow, don't copy"],
["let file = &args[2];","file path #2 — borrow"],
["let contents = fs::read_to_string(file)","open the file… Result&lt;string, Error&gt; comes back"],
["    .expect(\"could not read that file\");","if the box is Err, print this message and stop"],
["for line in contents.lines().filter(|l| l.contains(query))","walk only the lines that contain the word"],
["    println!(\"{}\", line);","print each winner"],
["}",""]
]},
tip:{h:"Why args[1] not args[0] — plus one setting:",b:"args[0] is always your own program name. Real words start at 1. Count them: <code class='inline'>minigrep NEEDLE poem.txt</code> → args[1] is NEEDLE, args[2] is poem.txt. And for BIG and small letters, set it outside the command: <code class='inline'>IGNORE_CASE=1 cargo run -- needle poem.txt</code>. The program reads it with <code class='inline'>env::var(\"IGNORE_CASE\").is_ok()</code>."},
why:{kick:"why this project matters",
h:"minigrep is the Book's 'it all clicks here' project. Many learners say the same: here the language starts to make sense.",
points:[
"<b>The borrow checker teaches.</b> The config change (query: &str) makes you meet lifetimes. The compiler walks you through.",
"<b>Settings live outside the command.</b> Real tools (ripgrep, git) read the air around them, not just flags.",
"<b>It ships.</b> The Book ends with 'run the tests you wrote'. This small tool is already safe to share."
]},
done:"Built a real CLI tool that reads files"
}
);