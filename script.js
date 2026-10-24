const $=s=>document.querySelector(s), cards=[...document.querySelectorAll('.card')];let filter='all';
function filterCards(){let term=$('#search').value.toLowerCase().trim(),n=0;cards.forEach(c=>{let show=c.dataset.name.includes(term)&&(filter==='all'||c.dataset.category===filter);c.hidden=!show;if(show)n++});$('#empty').hidden=n>0}
$('#search').addEventListener('input',filterCards);document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));filterCards()});
const modal=$('#modal'),content=$('#content');let cleanup=()=>{};
function open(title,hint){cleanup();cleanup=()=>{};$('#title').textContent=title;$('#hint').textContent=hint;content.innerHTML='';modal.hidden=false;document.body.style.overflow='hidden'}
function close(){cleanup();modal.hidden=true;document.body.style.overflow='';content.innerHTML=''}
$('#close').onclick=close;modal.onclick=e=>{if(e.target===modal)close()};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()});

document.querySelectorAll('.play').forEach(b => {
  b.onclick = () => {
    const games = {
      basket: {
        title: 'Courtside26',
        url: 'https://tikgame.org/embed/courtside26/',
        hint: 'If the game does not load, the website may block embedding.'
      },
      retro: {
        title: 'Retro Bowl',
        url: 'https://www.miniplay.com/embed/retro-bowl',
        hint: 'If the game does not load, the website may block embedding.'
    },
    headsoccer: {
      title: 'Head Soccer 2022',
      url: 'https://games.construct.net/54347/latest',
      hint: 'If the game does not load, the website may block embedding.'
    },
  slope: {
  title: 'Slope',
  url: 'https://y8.com/embed/slope',
  hint: 'If the game does not load, the website may block embedding.'
      },
      
drivemad: {
  title: 'Drive Mad',
  url: 'https://harshulmoon.github.io/iframes/drivemad.html',
  hint: 'If the game does not load, the website may block embedding.'
      },

subway: {
  title: 'Subway Surfers',
  url: 'https://www.madkidgames.com/full/subway-surfers',
  hint: 'If the game does not load, the website may block embedding.'
},

basketrandom: {
  title: 'Basket Random',
  url: 'https://harshulmoon.github.io/iframes/basket.html',
  hint: 'If the game does not load, the website may block embedding.'
},

motox3m: {
  title: 'Moto X3M',
  url: 'https://harshulmoon.github.io/iframes/motox3m.html',
  hint: 'If the game does not load, the website may block embedding.'
},

polytrack: {
  title: 'PolyTrack',
  url: 'https://harshulmoon.github.io/iframes/polytrack.html',
  hint: 'If the game does not load, the website may block embedding.'
},

geometrydash: {
  title: 'Geometry Dash',
  url: 'https://harshulmoon.github.io/iframes/geometrydash.html',
  hint: 'If the game does not load, the website may block embedding.'
},

fnaf1: {
  title: "Five Nights at Freddy's 1",
  url: 'https://harshulmoon.github.io/iframes/fnaf1.html',
  hint: 'If the game does not load, the website may block embedding.'
},

eggycar: {
  title: 'Eggy Car',
  url: 'https://harshulmoon.github.io/iframes/eggycar.html',
  hint: 'If the game does not load, the website may block embedding.'
},

    };


    if (games[b.dataset.game]) {
      embeddedGame(games[b.dataset.game]);
      return;
    }

    ({
      snake, pong, memory, space, brick, reflex
    }[b.dataset.game])?.();
  };
});


function embeddedGame(game) {
  open(game.title, game.hint);

  const frame = document.createElement('iframe');
  frame.src = game.url;
  frame.title = game.title;
  frame.allow = 'fullscreen';
  frame.allowFullscreen = true;
  frame.style.cssText =
    'width:100%;height:65vh;min-height:350px;border:0;border-radius:7px;background:#070714';

  const fullscreenButton = document.createElement('button');
  fullscreenButton.textContent = '⛶ FULL SCREEN';
  fullscreenButton.style.cssText =
    'display:block;margin:0 auto 10px;padding:10px 18px;background:#00e5ff;color:#070714;border:0;border-radius:7px;font-weight:bold;cursor:pointer';

  fullscreenButton.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await frame.requestFullscreen();
      }
    } catch (error) {
      alert('Fullscreen is not available for this game in your browser.');
    }
  });

  content.append(fullscreenButton, frame);
}


function canvas(){let c=document.createElement('canvas');c.className='canvas';c.width=600;c.height=400;content.append(c);return[c,c.getContext('2d')]}
function controls(text,restart){let d=document.createElement('div');d.className='controls';let s=document.createElement('span');s.textContent=text;let b=document.createElement('button');b.textContent='RESTART';b.onclick=restart;d.append(s,b);content.append(d)}
function snake(){open('Neon Snake','Arrow keys/WASD or swipe. Eat pink dots.');let[c,x]=canvas(),s,dir,nd,food,score,loop,alive;function reset(){clearInterval(loop);s=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];dir={x:1,y:0};nd=dir;food={x:20,y:10};score=0;alive=true;loop=setInterval(step,115);draw()}function draw(){x.fillStyle='#070714';x.fillRect(0,0,600,400);x.fillStyle='#ff43c6';x.fillRect(food.x*20+4,food.y*20+4,12,12);s.forEach((p,i)=>{x.fillStyle=i?'#279eac':'#42f5ef';x.shadowColor='#42f5ef';x.shadowBlur=8;x.fillRect(p.x*20+2,p.y*20+2,16,16)});x.shadowBlur=0;x.fillStyle='white';x.font='16px Arial';x.fillText('SCORE '+score,12,24);if(!alive){x.fillStyle='#ff43c6';x.font='bold 34px Arial';x.textAlign='center';x.fillText('GAME OVER',300,205);x.textAlign='left'}}function step(){dir=nd;let h={x:s[0].x+dir.x,y:s[0].y+dir.y};if(h.x<0||h.x>=30||h.y<0||h.y>=20||s.some(p=>p.x===h.x&&p.y===h.y)){alive=false;clearInterval(loop);draw();return}s.unshift(h);if(h.x===food.x&&h.y===food.y){score+=10;do{food={x:Math.random()*30|0,y:Math.random()*20|0}}while(s.some(p=>p.x===food.x&&p.y===food.y))}else s.pop();draw()}let key=e=>{let m={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]}[e.key];if(m){e.preventDefault();if(m[0]!==-dir.x||m[1]!==-dir.y)nd={x:m[0],y:m[1]}}};document.addEventListener('keydown',key);controls('Move with arrows or WASD',reset);cleanup=()=>{clearInterval(loop);document.removeEventListener('keydown',key)};reset()}
function pong(){open('Pixel Pong','Move your paddle with mouse/touch or up/down arrows.');let[c,x]=canvas(),py=160,ball,score,loop,keys={};function reset(){clearInterval(loop);py=160;ball={x:300,y:200,vx:4,vy:2.5};score=0;loop=setInterval(step,1000/60)}function draw(){x.fillStyle='#070714';x.fillRect(0,0,600,400);x.fillStyle='#ff43c6';x.fillRect(25,py,10,80);x.fillStyle='#42f5ef';x.fillRect(565,ball.y-35,10,70);x.fillStyle='white';x.fillRect(ball.x-6,ball.y-6,12,12);x.font='16px Arial';x.fillText('SCORE '+score,15,23)}function step(){if(keys.ArrowUp)py=Math.max(0,py-5);if(keys.ArrowDown)py=Math.min(320,py+5);ball.x+=ball.vx;ball.y+=ball.vy;if(ball.y<6||ball.y>394)ball.vy*=-1;if(ball.x<42&&ball.x>25&&ball.y>py&&ball.y<py+80){ball.vx=Math.abs(ball.vx);score++}if(ball.x>555&&ball.y>ball.y-35&&ball.y<ball.y+35)ball.vx=-Math.abs(ball.vx);if(ball.x<0||ball.x>600){ball={x:300,y:200,vx:ball.x<0?4:-4,vy:2}}draw()}let move=e=>{let r=c.getBoundingClientRect();py=Math.max(0,Math.min(320,(e.clientY-r.top)*400/r.height-40))},kd=e=>keys[e.key]=true,ku=e=>keys[e.key]=false;c.addEventListener('pointermove',move);document.addEventListener('keydown',kd);document.addEventListener('keyup',ku);controls('Keep the ball moving',reset);cleanup=()=>{clearInterval(loop);c.removeEventListener('pointermove',move);document.removeEventListener('keydown',kd);document.removeEventListener('keyup',ku)};reset()}
function memory(){open('Memory Flip','Tap cards and find all eight matching pairs.');let board=document.createElement('div');board.className='memory';content.append(board);let status=document.createElement('p');status.className='hint';content.append(status);let symbols=['★','◆','●','▲','☾','✿','♥','✦'],deck,openCards,matched,moves,locked,timer;function reset(){clearTimeout(timer);deck=[...symbols,...symbols].sort(()=>Math.random()-.5);openCards=[];matched=0;moves=0;locked=false;draw()}function draw(){board.innerHTML='';deck.forEach((v,i)=>{let b=document.createElement('button');b.textContent=v===null?'✓':openCards.includes(i)?v:'?';if(v===null)b.className='matched';b.disabled=locked||v===null;b.onclick=()=>flip(i);board.append(b)});status.textContent=`Pairs: ${matched}/8 · Moves: ${moves}`}function flip(i){if(locked||deck[i]===null||openCards.includes(i))return;openCards.push(i);draw();if(openCards.length===2){moves++;let[a,b]=openCards;if(deck[a]===deck[b]){deck[a]=deck[b]=null;matched++;openCards=[];draw()}else{locked=true;draw();timer=setTimeout(()=>{openCards=[];locked=false;draw()},700)}}}controls('Find all the pairs',reset);cleanup=()=>clearTimeout(timer);reset()}
function space(){open('Cosmic Blaster','Move with arrows/WASD. Hold Space to shoot. Avoid asteroids.');let[c,x]=canvas(),ship,shots,rocks,score,lives,keys={},loop,tick,alive;function reset(){clearInterval(loop);ship={x:300,y:345};shots=[];rocks=[];score=0;lives=3;tick=0;alive=true;keys={};loop=setInterval(step,1000/60)}function draw(){x.fillStyle='#070714';x.fillRect(0,0,600,400);for(let i=0;i<50;i++){x.fillStyle='#42f5ef88';x.fillRect(i*113%600,(i*47+Date.now()/80*(i%3+1))%400,2,2)}x.fillStyle='#42f5ef';x.beginPath();x.moveTo(ship.x,ship.y-15);x.lineTo(ship.x-12,ship.y+12);x.lineTo(ship.x+12,ship.y+12);x.fill();x.fillStyle='#ff43c6';shots.forEach(s=>x.fillRect(s.x-2,s.y,4,10));x.strokeStyle='#c6a4ff';rocks.forEach(r=>{x.beginPath();x.arc(r.x,r.y,r.r,0,7);x.stroke()});x.fillStyle='white';x.font='16px Arial';x.fillText('SCORE '+score,12,24);x.fillText('LIVES '+lives,500,24);if(!alive){x.font='bold 34px Arial';x.textAlign='center';x.fillStyle='#ff43c6';x.fillText('GAME OVER',300,200);x.textAlign='left'}}function step(){if(!alive)return;if(keys.ArrowLeft||keys.a)ship.x-=5;if(keys.ArrowRight||keys.d)ship.x+=5;if(keys.ArrowUp||keys.w)ship.y-=4;if(keys.ArrowDown||keys.s)ship.y+=4;ship.x=Math.max(12,Math.min(588,ship.x));ship.y=Math.max(20,Math.min(385,ship.y));shots.forEach(s=>s.y-=8);shots=shots.filter(s=>s.y>-10);if(++tick%35===0)rocks.push({x:Math.random()*580+10,y:-10,r:10+Math.random()*9,vy:2+Math.random()*2});rocks.forEach(r=>r.y+=r.vy);for(let i=rocks.length-1;i>=0;i--){let r=rocks[i],hit=shots.findIndex(s=>Math.hypot(s.x-r.x,s.y-r.y)<r.r+5);if(hit>=0){shots.splice(hit,1);rocks.splice(i,1);score+=10;continue}if(Math.hypot(ship.x-r.x,ship.y-r.y)<r.r+10){rocks.splice(i,1);if(--lives<=0){alive=false;clearInterval(loop)}}else if(r.y>420)rocks.splice(i,1)}draw()}let kd=e=>{keys[e.key]=true;if(e.code==='Space'){e.preventDefault();shots.push({x:ship.x,y:ship.y-20})}},ku=e=>keys[e.key]=false;document.addEventListener('keydown',kd);document.addEventListener('keyup',ku);controls('Move: arrows/WASD · Shoot: Space',reset);cleanup=()=>{clearInterval(loop);document.removeEventListener('keydown',kd);document.removeEventListener('keyup',ku)};reset()}
function brick(){open('Brick Breaker','Move the paddle with your mouse or left/right arrows.');let[c,x]=canvas(),paddle,ball,bricks,score,lives,keys={},loop;function reset(){clearInterval(loop);paddle=250;ball={x:300,y:320,vx:3.5,vy:-4};score=0;lives=3;keys={};bricks=[];for(let r=0;r<5;r++)for(let col=0;col<10;col++)bricks.push({x:25+col*55,y:45+r*25,w:47,h:16,on:true,color:['#42f5ef','#9b76ff','#ff43c6','#ffc857','#63f58b'][r]});loop=setInterval(step,1000/60)}function draw(){x.fillStyle='#070714';x.fillRect(0,0,600,400);bricks.forEach(b=>{if(b.on){x.fillStyle=b.color;x.fillRect(b.x,b.y,b.w,b.h)}});x.fillStyle='#42f5ef';x.fillRect(paddle,370,100,10);x.fillStyle='white';x.beginPath();x.arc(ball.x,ball.y,7,0,7);x.fill();x.fillText('SCORE '+score+'   LIVES '+lives,12,24);if(lives<=0||bricks.every(b=>!b.on)){x.fillStyle='#ff43c6';x.font='bold 32px Arial';x.textAlign='center';x.fillText(lives<=0?'GAME OVER':'YOU WIN!',300,210);x.textAlign='left'}}function step(){if(lives<=0||bricks.every(b=>!b.on))return;if(keys.ArrowLeft||keys.a)paddle-=6;if(keys.ArrowRight||keys.d)paddle+=6;paddle=Math.max(0,Math.min(500,paddle));ball.x+=ball.vx;ball.y+=ball.vy;if(ball.x<7||ball.x>593)ball.vx*=-1;if(ball.y<7)ball.vy=Math.abs(ball.vy);if(ball.vy>0&&ball.y>363&&ball.x>=paddle&&ball.x<=paddle+100){ball.vy=-Math.abs(ball.vy);ball.vx+=(ball.x-paddle-50)/45}for(let b of bricks)if(b.on&&ball.x>b.x&&ball.x<b.x+b.w&&ball.y>b.y&&ball.y<b.y+b.h){b.on=false;ball.vy*=-1;score+=10;break}if(ball.y>410){lives--;ball={x:300,y:320,vx:3.5,vy:-4}}draw()}let move=e=>{let r=c.getBoundingClientRect();paddle=Math.max(0,Math.min(500,(e.clientX-r.left)*600/r.width-50))},kd=e=>keys[e.key]=true,ku=e=>keys[e.key]=false;c.addEventListener('pointermove',move);document.addEventListener('keydown',kd);document.addEventListener('keyup',ku);controls('Mouse or arrows to move',reset);cleanup=()=>{clearInterval(loop);c.removeEventListener('pointermove',move);document.removeEventListener('keydown',kd);document.removeEventListener('keyup',ku)};reset()}
function reflex(){open('Quick Click','Press Start, wait until the panel turns green, then click quickly.');let box=document.createElement('div');box.style.cssText='min-height:220px;border-radius:8px;background:#191932;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px';let msg=document.createElement('h3');msg.textContent='READY?';msg.style.font='800 24px Orbitron';let result=document.createElement('p');result.textContent='Test your reaction time';let b=document.createElement('button');b.className='play';b.textContent='START';b.style.width='auto';box.append(msg,result,b);content.append(box);let state='ready',timeout,start;function reset(){clearTimeout(timeout);state='ready';box.style.background='#191932';msg.textContent='READY?';result.textContent='Test your reaction time';b.textContent='START'}b.onclick=()=>{if(state==='ready'){state='wait';msg.textContent='WAIT FOR GREEN…';box.style.background='#35172e';result.textContent='Do not click yet';b.textContent='WAITING';timeout=setTimeout(()=>{state='go';start=performance.now();box.style.background='#123532';msg.textContent='CLICK NOW!';result.textContent='Go!';b.textContent='CLICK'},1000+Math.random()*2500)}else if(state==='wait'){clearTimeout(timeout);state='early';msg.textContent='TOO SOON!';result.textContent='Wait for green next time';b.textContent='TRY AGAIN'}else if(state==='go'){let ms=Math.round(performance.now()-start);state='done';msg.textContent=ms+' ms';result.textContent=ms<250?'Lightning-fast!':'Try again and beat your time';b.textContent='TRY AGAIN'}else reset()};cleanup=()=>clearTimeout(timeout)}
