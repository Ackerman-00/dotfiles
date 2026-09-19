/* ============================================
   lesson: Building a web server (the Book's finale)
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"webserver", nav:"Building a web server",
title:"A web server — <em>with your own hands</em>",
lead:"The last build: a real listener for web lines. No framework. Plain TCP, a worker team, and real 'hello' flying over the net.",
words:[
"A web server is a host who always answers the door. <code class='inline'>TcpListener::bind(\"127.0.0.1:7878\")</code> sits at the address. <code class='inline'>.accept()</code> answers the next knock. Each knock is a new <code class='inline'>TcpStream</code> hello. Note: 7878 spells RUST on phone keys.",
"The knock follows a script: <code class='inline'>GET / HTTP/1.1</code> on the first line. We read it. We look at the path. Then we answer with an <b>HTTP answer</b>: a first line (<code class='inline'>HTTP/1.1 200 OK</code>), head lines like <code class='inline'>Content-Length</code>, and a body of HTML.",
"A 404 is just another first line plus a <i>Not Found</i> page. Browsers do not care much. You need two files next to <code class='inline'>main.rs</code> first: <code class='inline'>hello.html</code> and <code class='inline'>404.html</code>.",
"One guest at a time makes a long line. So we build a <b>worker team</b> (short name in code: <b>pool</b>). N workers share one line. The line is an <code class='inline'>mpsc</code> channel. Each worker loops: take a <i>Job</i>, run it. A Job is a <code class='inline'>Box&lt;dyn FnOnce&gt;</code> — any one-time job in the same box.",
"Last touch: <b>clean stop</b>. A Drop sends a 'go home' note to each worker. Then it waits for them. The server ends clean. And when a line drops, its door closes alone."
],
analogy:[["A host answering a ringing phone","=","TcpListener loop"],["Reading a guest's card first","=","reading GET / HTTP/1.1"],["A team sharing one job line","=","workers over an mpsc channel"]],
coach:"Box&lt;dyn FnOnce> looks big. It is just three ideas in one box. <b>dyn</b> = any job. <b>FnOnce</b> = runs one time. <b>Box</b> = the box that holds it. You met all three before. Only the mix is new.",
widget:{type:"gym", q:[
  {q:"What does TcpListener::bind() do?", hint:"takes a door, waits there",
   a:"It takes an address + port and waits there for knocks.", why:"bind gives a Result. Port taken? You see the error at once."},
  {q:"Which HTTP request line does the Book's server answer with 200?", hint:"verb / path / version",
   a:"GET / HTTP/1.1", why:"Every other request (POST, or a different path) gets the 404 response."},
  {q:"Why does the worker team use Box&lt;dyn FnOnce> for a Job?", hint:"many jobs, one box kind",
   a:"Each job is different, but the line must hold one kind — the box where any FnOnce fits.", why:"A Vec&lt;one kind> locks the line to one shape. dyn lets any one-time job in."},
  {q:"What is the clean-stop trick?", hint:"the boss says goodbye",
   a:"A Drop that sends a 'go home' note to each worker, then waits for them.", why:"It ends the line, turns no new jobs away rudely, and cleans the team instead of killing it."}
]},
code:{
copy:`let listener = TcpListener::bind("127.0.0.1:7878")?;
for stream in listener.incoming() {
    let stream = stream?;
    pool.execute(move || {
        let mut stream = stream;
        handle_connection(&mut stream);
    });
}`,
lines:[
["let listener = TcpListener::bind(\"127.0.0.1:7878\")?;","sit at the door, on port 7878"],
["for stream in listener.incoming() {","for every knock that rings…"],
["    let stream = stream?;","unwrap the handshake (or skip a noisy one)"],
["    pool.execute(move || {","give the whole guest to a free worker…"],
["        handle_connection(&mut stream);","…who reads the request and writes the response"],
["    });",""],
["}",""]
]},
tip:{h:"Two facts about 404:",b:"Browsers do not care much about 404s. The server still did its job — a right answer is worth more than a pretty page. And the real lesson: handle_connection wrote it all. First line, head lines, empty line, body. That is all of HTTP, in four lines."},
why:{kick:"why build a server by hand",
h:"After this lesson, no framework is magic. axum, actix, warp — all the same loop, nicer clothes.",
points:[
"<b>You met every std tool.</b> TcpStream = talk, Arc&lt;Mutex> = share, mpsc = notes, boxes for jobs. One project, the whole box.",
"<b>A team beats one thread per guest.</b> One thread per guest is fine for a toy. For real traffic it is too slow. This lesson shows why.",
"<b>Clean stop is pro finish.</b> Real services end lines, close doors, and log 'bye'. Now you know how."
]},
done:"Built a real TCP web server"
}
);