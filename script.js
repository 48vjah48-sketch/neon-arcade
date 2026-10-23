const searchInput = document.querySelector("#search");
const cards = [...document.querySelectorAll(".game-card")];
const filters = [...document.querySelectorAll(".filter")];
const noResults = document.querySelector("#no-results");
const modal = document.querySelector("#game-modal");
const gameContent = document.querySelector("#game-content");
const modalTitle = document.querySelector("#modal-title");
const modalHint = document.querySelector("#modal-hint");
let activeFilter = "all";
let cleanupGame = () => {};

function updateGames() {
  const term = searchInput.value.toLowerCase().trim();
  let visible = 0;
  cards.forEach(card => {
    const matches = card.dataset.name.includes(term) &&
      (activeFilter === "all" || card.dataset.category === activeFilter);
    card.hidden = !matches;
    if (matches) visible++;
  });
  noResults.hidden = visible !== 0;
}
searchInput.addEventListener("input", updateGames);
filters.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => item.classList.toggle("active", item === button));
  updateGames();
}));

function openGame(title, hint) {
  cleanupGame();
  cleanupGame = () => {};
  modalTitle.textContent = title;
  modalHint.textContent = hint;
  gameContent.innerHTML = "";
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeGame() {
  cleanupGame();
  cleanupGame = () => {};
  modal.hidden = true;
  document.body.style.overflow = "";
  gameContent.innerHTML = "";
}
document.querySelector("#close-modal").addEventListener("click", closeGame);
modal.addEventListener("click", e => { if (e.target === modal) closeGame(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeGame(); });
document.querySelectorAll(".play-button").forEach(button => button.addEventListener("click", () => {
  const game = button.dataset.game;
  if (game === "snake") startSnake();
  if (game === "pong") startPong();
  if (game === "memory") startMemory();
}));

function makeCanvas() {
  const canvas = document.createElement("canvas");
  canvas.className = "game-canvas";
  canvas.width = 600;
  canvas.height = 400;
  gameContent.appendChild(canvas);
  return [canvas, canvas.getContext("2d")];
}
function addControls(text, restart) {
  const controls = document.createElement("div");
  controls.className = "game-controls";
  const label = document.createElement("span");
  label.textContent = text;
  const button = document.createElement("button");
  button.textContent = "RESTART";
  button.addEventListener("click", restart);
  controls.append(label, button);
  gameContent.appendChild(controls);
}

function startSnake() {
  openGame("Neon Snake", "Use arrow keys or WASD. On a phone, swipe the game board.");
  const [canvas, ctx] = makeCanvas();
  let snake, direction, nextDirection, food, score, timer, alive;
  const size = 20, cols = 30, rows = 20;
  function reset() {
    clearInterval(timer);
    snake = [{x:10,y:10},{x:9,y:10},{x:8,y:10}];
    direction = {x:1,y:0}; nextDirection = direction;
    food = {x:20,y:10}; score = 0; alive = true;
    draw();
    timer = setInterval(step, 115);
  }
  function placeFood() {
    do { food = {x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)}; }
    while (snake.some(p => p.x===food.x && p.y===food.y));
  }
  function draw() {
    ctx.fillStyle="#070714";ctx.fillRect(0,0,600,400);
    ctx.strokeStyle="#ffffff08";
    for(let x=0;x<=600;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,400);ctx.stroke()}
    for(let y=0;y<=400;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(600,y);ctx.stroke()}
    ctx.fillStyle="#ff43c6";ctx.shadowColor="#ff43c6";ctx.shadowBlur=18;
    ctx.fillRect(food.x*size+4,food.y*size+4,12,12);ctx.shadowBlur=0;
    snake.forEach((p,i)=>{ctx.fillStyle=i===0?"#42f5ef":"#279eac";ctx.shadowColor="#42f5ef";ctx.shadowBlur=i===0?15:4;ctx.fillRect(p.x*size+2,p.y*size+2,16,16)});
    ctx.shadowBlur=0;ctx.fillStyle="#fff";ctx.font="bold 16px Arial";ctx.fillText("SCORE: "+score,12,24);
    if(!alive){ctx.fillStyle="#070714cc";ctx.fillRect(0,0,600,400);ctx.fillStyle="#ff43c6";ctx.font="bold 38px Arial";ctx.textAlign="center";ctx.fillText("GAME OVER",300,190);ctx.fillStyle="#fff";ctx.font="18px Arial";ctx.fillText("Score: "+score+" — press Restart",300,225);ctx.textAlign="left"}
  }
  function step() {
    direction = nextDirection;
    const head={x:snake[0].x+direction.x,y:snake[0].y+direction.y};
    if(head.x<0||head.x>=cols||head.y<0||head.y>=rows||snake.some(p=>p.x===head.x&&p.y===head.y)){alive=false;clearInterval(timer);draw();return}
    snake.unshift(head);
    if(head.x===food.x&&head.y===food.y){score+=10;placeFood()}else snake.pop();
    draw();
  }
  const onKey = e => {
    const keys={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};
    const v=keys[e.key];if(!v)return;
    e.preventDefault();const candidate={x:v[0],y:v[1]};
    if(candidate.x!==-direction.x||candidate.y!==-direction.y)nextDirection=candidate;
  };
  let touchX=0,touchY=0;
  const touchStart=e=>{touchX=e.changedTouches[0].clientX;touchY=e.changedTouches[0].clientY};
  const touchEnd=e=>{const dx=e.changedTouches[0].clientX-touchX,dy=e.changedTouches[0].clientY-touchY;let v=Math.abs(dx)>Math.abs(dy)?{x:Math.sign(dx),y:0}:{x:0,y:Math.sign(dy)};if(v.x!==-direction.x||v.y!==-direction.y)nextDirection=v};
  document.addEventListener("keydown",onKey);canvas.addEventListener("touchstart",touchStart,{passive:true});canvas.addEventListener("touchend",touchEnd,{passive:true});
  addControls("Score: +10 per fruit",reset);cleanupGame=()=>{clearInterval(timer);document.removeEventListener("keydown",onKey);canvas.removeEventListener("touchstart",touchStart);canvas.removeEventListener("touchend",touchEnd)};
  reset();
}

function startPong() {
  openGame("Pixel Pong", "Move your paddle with your mouse, touch, or the up/down arrow keys.");
  const [canvas,ctx]=makeCanvas();
  let paddleY,ball,score,misses,timer;
  function reset(){clearInterval(timer);paddleY=160;ball={x:300,y:200,vx:4*(Math.random()>.5?1:-1),vy:2.7};score=0;misses=0;draw();timer=setInterval(step,1000/60)}
  function draw(){
    ctx.fillStyle="#070714";ctx.fillRect(0,0,600,400);
    ctx.setLineDash([8,12]);ctx.strokeStyle="#ffffff30";ctx.beginPath();ctx.moveTo(300,0);ctx.lineTo(300,400);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle="#ff43c6";ctx.shadowColor="#ff43c6";ctx.shadowBlur=15;ctx.fillRect(24,paddleY,10,80);
    ctx.fillStyle="#42f5ef";ctx.shadowColor="#42f5ef";ctx.fillRect(566,ball.y-38,10,76);
    ctx.fillStyle="#fff";ctx.shadowColor="#fff";ctx.shadowBlur=16;ctx.fillRect(ball.x-7,ball.y-7,14,14);ctx.shadowBlur=0;
    ctx.font="bold 18px Arial";ctx.fillStyle="#fff";ctx.fillText("SCORE "+score,22,28);ctx.fillText("MISSES "+misses,490,28);
  }
  function step(){
    ball.x+=ball.vx;ball.y+=ball.vy;
    if(ball.y<8||ball.y>392)ball.vy*=-1;
    if(ball.x<42&&ball.x>25&&ball.y>paddleY-3&&ball.y<paddleY+83){ball.vx=Math.abs(ball.vx)*1.04;ball.vy+=(ball.y-(paddleY+40))*.08;score++}
    if(ball.x>558&&ball.y>ball.y-38&&ball.y<ball.y+38){ball.vx=-Math.abs(ball.vx)}
    if(ball.x>590){misses++;ball.x=300;ball.y=200;ball.vx=-4;ball.vy=2}
    if(ball.x<0){misses++;ball.x=300;ball.y=200;ball.vx=4;ball.vy=-2}
    draw();
  }
  const move=e=>{const rect=canvas.getBoundingClientRect();paddleY=Math.max(0,Math.min(320,(e.clientY-rect.top)*400/rect.height-40))};
  const key=e=>{if(e.key==="ArrowUp")paddleY=Math.max(0,paddleY-22);if(e.key==="ArrowDown")paddleY=Math.min(320,paddleY+22)};
  canvas.addEventListener("pointermove",move);document.addEventListener("keydown",key);
  addControls("Move to bounce the ball back",reset);cleanupGame=()=>{clearInterval(timer);canvas.removeEventListener("pointermove",move);document.removeEventListener("keydown",key)};
  reset();
}

function startMemory() {
  openGame("Memory Flip", "Flip two cards at a time and find all 8 matching pairs.");
  const board=document.createElement("div");board.className="memory-board";gameContent.appendChild(board);
  const symbols=["★","◆","●","▲","☾","✿","♥","✦"];
  let deck=[],opened=[],matched=0,locked=false,moves=0,timeout;
  const status=document.createElement("div");status.className="game-controls";gameContent.appendChild(status);
  function reset(){
    clearTimeout(timeout);deck=[...symbols,...symbols].sort(()=>Math.random()-.5);opened=[];matched=0;moves=0;locked=false;render();
  }
  function render(){
    board.innerHTML="";
    deck.forEach((symbol,index)=>{
      const button=document.createElement("button");
      const isOpen=opened.includes(index)||deck[index]===null;
      button.textContent=isOpen?(symbol||"✓"):"?";
      if(isOpen)button.classList.add(deck[index]===null?"matched":"flipped");
      button.disabled=locked||deck[index]===null;
      button.addEventListener("click",()=>flip(index));
      board.appendChild(button);
    });
    status.textContent=matched===8?`You won in ${moves} moves! 🎉`:`Matches: ${matched}/8  •  Moves: ${moves}`;
  }
  function flip(index){
    if(locked||opened.includes(index)||deck[index]===null)return;
    opened.push(index);render();
    if(opened.length===2){
      moves++;
      const [a,b]=opened;
      if(deck[a]===deck[b]){deck[a]=null;deck[b]=null;matched++;opened=[];render()}
      else{locked=true;timeout=setTimeout(()=>{opened=[];locked=false;render()},750)}
    }
  }
  addControls("Find all matching pairs",reset);
  cleanupGame=()=>clearTimeout(timeout);
  reset();
}
