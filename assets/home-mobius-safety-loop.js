(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;

  const icons={
    hazard:'<circle class="node-icon" cx="-3" cy="-4" r="12"/><path class="node-icon" d="M6 5l10 10"/>',
    kosha:'<path class="node-icon" d="M0-18l14 5v11c0 11-7 18-14 22-7-4-14-11-14-22v-11z"/><path class="node-icon" d="M-6 0l4 4 8-9"/>',
    human:'<circle class="node-icon" cy="-8" r="8"/><path class="node-icon" d="M-15 17c2-10 8-15 15-15s13 5 15 15"/>',
    action:'<circle class="node-icon" r="15"/><path class="node-icon" d="M-8 0l6 6 11-13"/>',
    evidence:'<path class="node-icon" d="M-11-17h15l9 9v25h-24zM4-17v9h9M-5 1h12M-5 8h12"/>',
    residual:'<path class="node-icon" d="M0-18l14 5v11c0 11-7 18-14 22-7-4-14-11-14-22v-11z"/><path class="node-icon" d="M-7 1l5 5 9-10"/>',
    closure:'<rect class="node-icon" x="-12" y="-4" width="24" height="20" rx="3"/><path class="node-icon" d="M-7-4v-7a7 7 0 0114 0v7M0 3v6"/>'
  };

  const node=(id,x,y,title,sub,icon,delay,side='right')=>{
    const tx=side==='left'?-48:48;
    const anchor=side==='left'?'end':'start';
    return `<g class="coreon-svg-node n${id}" transform="translate(${x} ${y})" style="--node-delay:${delay}s">
      <circle class="node-halo" r="39"/><circle class="node-ring" r="31"/>${icon}
      <text class="node-title" x="${tx}" y="-2" text-anchor="${anchor}">${title}</text>
      <text class="node-sub" x="${tx}" y="19" text-anchor="${anchor}">${sub}</text>
    </g>`;
  };

  const apply=()=>{
    const stage=document.querySelector('.bx2-stage');
    if(!stage || stage.dataset.singleSvgHero==='1') return false;
    const ko=document.documentElement.lang.toLowerCase().startsWith('ko');
    const labels=ko?{
      hazard:['HAZARD','위험 발견'],kosha:['KOSHA','공식 참고근거'],human:['HUMAN REVIEW','사람 검토'],action:['ACTION','개선조치'],evidence:['EVIDENCE','증빙'],residual:['RESIDUAL RISK','잔여위험 재평가'],closure:['SAFE CLOSURE','안전한 종결']
    }:{
      hazard:['HAZARD','Risk discovery'],kosha:['KOSHA','Public reference'],human:['HUMAN REVIEW','Human control'],action:['ACTION','Corrective action'],evidence:['EVIDENCE','Verified proof'],residual:['RESIDUAL RISK','Reassessment'],closure:['SAFE CLOSURE','Verified closure']
    };

    stage.dataset.singleSvgHero='1';
    stage.className='bx2-stage coreon-single-svg-stage';
    stage.innerHTML=`<svg class="coreon-safety-loop-svg coreon-v45" viewBox="0 0 940 680" role="img" aria-label="COREON Safety AX asymmetric ribbon closed-loop execution">
      <defs>
        <linearGradient id="backRibbon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#052f72"/><stop offset=".34" stop-color="#0757b7"/><stop offset=".66" stop-color="#0d88e6"/><stop offset="1" stop-color="#063c8f"/></linearGradient>
        <linearGradient id="frontRibbon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b5fc6"/><stop offset=".22" stop-color="#168fe3"/><stop offset=".48" stop-color="#42d8ff"/><stop offset=".63" stop-color="#83f4ff"/><stop offset=".82" stop-color="#1ca6ec"/><stop offset="1" stop-color="#0748a4"/></linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#d8fdff" stop-opacity=".12"/><stop offset=".35" stop-color="#fff" stop-opacity=".98"/><stop offset=".65" stop-color="#92f5ff"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient>
        <linearGradient id="rightShade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9af7ff" stop-opacity=".22"/><stop offset=".44" stop-color="#2cc8ff" stop-opacity=".08"/><stop offset="1" stop-color="#021b3f" stop-opacity=".55"/></linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="15"/></filter>
        <filter id="nodeGlow" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="starGlow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <path id="safetyLoopPath" d="M145 360 C166 214 257 136 352 186 C417 220 454 282 480 327 C511 275 548 221 611 190 C709 143 802 211 816 344 C830 474 738 551 638 515 C568 490 519 416 485 368 C452 417 404 495 337 524 C238 567 143 493 145 360"/>
      </defs>
      <g class="galaxy-stars" opacity=".27">
        <circle class="star" cx="120" cy="126" r="2.1"/><circle class="star s2" cx="202" cy="92" r="1.4"/><circle class="star s3" cx="304" cy="130" r="1.8"/><circle class="star s4" cx="402" cy="94" r="1.5"/><circle class="star" cx="520" cy="120" r="1.8"/><circle class="star s2" cx="642" cy="93" r="2"/><circle class="star s3" cx="760" cy="126" r="1.6"/><circle class="star s4" cx="861" cy="180" r="1.4"/><circle class="star" cx="116" cy="540" r="1.6"/><circle class="star s2" cx="210" cy="604" r="2"/><circle class="star s3" cx="342" cy="574" r="1.5"/><circle class="star s4" cx="470" cy="616" r="2.1"/><circle class="star" cx="624" cy="585" r="1.5"/><circle class="star s2" cx="774" cy="602" r="1.9"/>
      </g>
      <path class="ribbon-ambient" d="M152 361 C166 216 260 131 357 183 C426 220 455 286 481 329 C513 274 550 212 617 181 C719 133 815 210 826 345 C838 486 738 568 632 524 C562 495 520 419 484 369 C451 421 403 506 331 536 C225 580 132 491 152 361Z"/>
      <path class="ribbon-back" d="M160 370 C171 248 246 177 325 194 C390 208 431 266 476 334 C522 403 567 472 628 500 C693 530 764 492 786 407 C808 321 780 237 713 205 C648 174 582 199 534 262 L486 327 C454 279 415 227 364 205 C281 170 190 238 160 370Z"/>
      <path class="ribbon-front" d="M152 377 C160 499 246 558 338 523 C408 496 449 426 486 370 C526 308 560 246 617 209 C678 169 747 188 785 246 C824 306 826 393 790 459 C756 521 687 550 626 517 C566 485 527 419 487 360 C452 310 417 258 370 229 C306 190 235 205 190 264 C166 296 154 335 152 377Z"/>
      <path class="ribbon-right-shade" d="M487 360 C531 300 563 244 617 211 C677 175 744 190 781 248 C818 306 820 389 787 453 C754 515 688 542 629 514 C570 486 529 420 487 360Z"/>
      <path class="ribbon-void" d="M223 373 C227 446 279 479 334 457 C377 440 411 394 446 345 C411 296 380 257 342 239 C289 214 234 252 223 326 C220 344 220 360 223 373Z"/>
      <path class="ribbon-void" d="M548 343 C581 295 618 256 662 242 C716 225 758 263 764 334 C772 414 725 462 665 459 C618 456 580 411 548 363 C544 356 544 350 548 343Z"/>
      <path class="cross-shadow" d="M441 311 C456 331 469 349 481 367 C494 348 509 328 528 303 C521 327 514 347 500 370 C488 390 476 401 462 399 C446 397 435 385 437 369 C439 353 450 337 460 323 C452 318 446 314 441 311Z"/>
      <path class="cross-front" d="M446 296 C462 319 476 341 487 358 C501 339 515 319 531 297 C525 317 518 336 505 356 C493 374 485 386 474 390 C463 394 451 389 445 379 C439 368 441 356 447 345 C455 331 463 320 470 311 C460 305 452 300 446 296Z"/>
      <path class="ribbon-rim" d="M172 378 C178 473 248 523 328 493 C391 469 433 400 482 329 C527 264 567 221 625 195 C689 166 751 189 785 248"/>
      <path class="ribbon-rim-secondary" d="M488 361 C531 425 571 484 633 505 C697 526 759 488 786 418"/>
      <path class="right-inner-edge" d="M553 347 C582 306 617 272 659 258 C707 242 742 276 747 337 C753 400 716 440 669 440"/>
      <g class="loop-particles"><circle r="7" class="light-dot dot1"><animateMotion dur="8.8s" repeatCount="indefinite"><mpath href="#safetyLoopPath"/></animateMotion></circle><circle r="4.5" class="light-dot dot2"><animateMotion dur="8.8s" begin="-2.9s" repeatCount="indefinite"><mpath href="#safetyLoopPath"/></animateMotion></circle><circle r="5" class="light-dot dot3"><animateMotion dur="8.8s" begin="-5.8s" repeatCount="indefinite"><mpath href="#safetyLoopPath"/></animateMotion></circle></g>
      <g class="coreon-engine-label"><text x="666" y="338">COREON</text><text x="666" y="374">Safety AX</text><text class="engine-sub" x="666" y="400">EXECUTION ENGINE</text></g>
      ${node(1,126,116,labels.hazard[0],labels.hazard[1],icons.hazard,0)}
      ${node(2,462,76,labels.kosha[0],labels.kosha[1],icons.kosha,.45)}
      ${node(3,790,122,labels.human[0],labels.human[1],icons.human,.9)}
      ${node(4,895,350,labels.action[0],labels.action[1],icons.action,1.35,'left')}
      ${node(5,742,600,labels.evidence[0],labels.evidence[1],icons.evidence,1.8)}
      ${node(6,414,610,labels.residual[0],labels.residual[1],icons.residual,2.25)}
      ${node(7,86,353,labels.closure[0],labels.closure[1],icons.closure,2.7)}
    </svg>`;
    requestAnimationFrame(()=>stage.classList.add('coreon-svg-ready'));
    document.documentElement.dataset.coreonHero='ribbon-v4-5-approved';
    return true;
  };

  let tries=0;
  const timer=setInterval(()=>{tries+=1;if(apply()||tries>70)clearInterval(timer);},30);
})();