startGame = () => {
    const character = document.getElementById('character');
    const gamespace = document.getElementById('gamespace');
    const kratos = document.getElementById('kratos');
    const axe = document.getElementById('axe');
    const boc = document.getElementById('boc');
    const boo = document.getElementById('boo');
    const thor = document.getElementById('enemy');
    const score = document.getElementById('score');
    const kratosHP = document.getElementById('kratosHP');
    const playAgainBtn = document.getElementById('playAgain');
    const myAudio = document.getElementById('myAudio');
    const myAudio2 = document.getElementById('myAudio2');
    const myAudio3 = document.getElementById('myAudio3');
    const myAudio4 = document.getElementById('myAudio4');
    const themeMusic = document.getElementById('themeMusic');
    const muteButton = document.getElementById('muteButton');
    const unMuteButton = document.getElementById('unMuteButton');
    const goBack = document.getElementById('goBack');
    const goBack2 = document.getElementById('goBack2');
    const mybody = document.getElementById('mybody');
    const damageDiv = document.getElementById('damage');
    const mybg = document.getElementById('mybg');
    const mjolnir = document.getElementById("mjolnir");
    const coordinats = document.getElementById('coordinats');
    const kratosRageProgressBar = document.getElementById('kratosRageProgressBar')
    const kratosRage = document.getElementById('kratosRage')

    let enemyHealth = 20;
    let kratosHealth = 20;
    let direction = 'right';
    myAudio.volume = "0.05";
    myAudio2.volume = "0.05";
    myAudio3.volume = "0.05";
    myAudio4.volume = "0.1";
    let kratosRageVar = 0;
    kratosHP.textContent = kratosHealth + " / 20"
    score.textContent = enemyHealth + " / 20" 
    kratosRage.textContent = kratosRageVar + " / 10" 

    let start = 0;
    const startGameBtn = document.getElementById('startGameBtn');
    startGameBtn.addEventListener('click', () => {
        myAudio.src = "game/iwillmakeyousuffer.mp3"
        myAudio.play();
        start = 1;
        startTimer();
        startGameBtn.style.display = "none";
    });


    
    const gainRage = () =>{
        if(kratosRageVar < 10){
            kratosRageVar += 1;
        }
        if(kratosRageVar === 10){
            const newTag = document.createElement("p");
            newTag.textContent = "SPARTAN RAGE IS READY, SHOW HIM THE REAL GOD OF WAR!"
            
            // If there are already tags in the div, insert the new tag below them
            if (damageDiv.children.length > 0) {
                damageDiv.insertBefore(newTag, damageDiv.firstChild);
            } else {
                damageDiv.appendChild(newTag);
            }
            
            // Wait for 2 seconds, then remove the tag
            setTimeout(() => {
                damageDiv.removeChild(newTag);
            }, 4000);  
        }
    }

    // setInterval(() => {
    //     const characterPos = character.getBoundingClientRect();
    //     const mjPos = thor.getBoundingClientRect();
    //     coordinats.textContent = `Kratos(${parseInt(characterPos.x)}, ${parseInt(characterPos.y)}) || Thor(${parseInt(mjPos.x)}, ${parseInt(mjPos.y)})`
    // }, 200);

    // Theme music delay
    themeMusic.volume = 0.05;

    setTimeout(() => {
        themeMusic.volume = 0.05;
        themeMusic.play()
    }, 3000);

    console.log(`Ekran Boyutu: ${window.innerWidth} x ${window.innerHeight}`);
    mjolnirAttack = () => {
        myAudio4.src = "game/mj.mp3";
        myAudio4.play()
        mjolnir.style.transition = "top .4s, left .4s, bottom .4s, right .4s cubic-bezier(.78,.12,.74,.31)";
        const characterRect = character.getBoundingClientRect();

        const mjRect = thor.getBoundingClientRect();

        const kratosCurrentPositionX = characterRect.x;
        const kratosCurrentPositionY = characterRect.y;
        console.log("kratos position: ", kratosCurrentPositionX, kratosCurrentPositionY)

        const angle = Math.atan2(characterRect.y - mjRect.y, characterRect.x - mjRect.x);

        console.log(angle)
        mjolnir.style.transform = `rotate(${angle + 1.5}rad)`;

        mjolnirDestX = mjRect.x - kratosCurrentPositionX;
        mjolnirDestY = mjRect.y - kratosCurrentPositionY;

        if(mjolnirDestX + mjolnirDestY <= 400){
        mjolnir.style.transition = "top .2s, left .2s, bottom .2s, right .2s cubic-bezier(.78,.12,.74,.31)";

        } 
        mjolnir.style.visibility = "visible";
        mjolnir.style.top = -mjolnirDestY + 'px';
        mjolnir.style.right = mjolnirDestX + 'px';
        setTimeout(() => {
            const characterRect = character.getBoundingClientRect();
            console.log("kratos position2: ", characterRect.x, characterRect.y)
            if(Math.abs(kratosCurrentPositionX - characterRect.x) < 120 && Math.abs(kratosCurrentPositionY - characterRect.y) < 50){
                takeHitSound()
                gainRage();
                kratosHealth -= 2;
                if(kratosHealth <= 0){
                    endgameL();
                }
                console.log("HITTTT")
                kratosHP.textContent = `${kratosHealth} / 20`
                kratosRage.textContent = kratosRageVar + " / 10" 
                const newTag = document.createElement("p");
                newTag.style.color = "red"
                newTag.textContent = `-= You took 2 damage! =-`;
                
                // If there are already tags in the div, insert the new tag below them
                if (damageDiv.children.length > 0) {
                    damageDiv.insertBefore(newTag, damageDiv.firstChild);
                } else {
                    damageDiv.appendChild(newTag);
                }
                
                // Wait for 2 seconds, then remove the tag
                setTimeout(() => {
                    damageDiv.removeChild(newTag);
                }, 4000);
            }
            mjolnir.style.right = 0 + 'px';
            mjolnir.style.top = 0 + 'px';

            setTimeout(() => {
                mjolnir.style.visibility = "hidden";
                
            }, 600);        
        }, 600);
    };
    
    // Damage message
    const dmgMessage = (dmg) => {
        const newTag = document.createElement("p");
        newTag.textContent = `-= ${dmg} damage inflicted =-`;
        
        // If there are already tags in the div, insert the new tag below them
        if (damageDiv.children.length > 0) {
            damageDiv.insertBefore(newTag, damageDiv.firstChild);
        } else {
            damageDiv.appendChild(newTag);
        }
        
        // Wait for 2 seconds, then remove the tag
        setTimeout(() => {
            damageDiv.removeChild(newTag);
        }, 4000);   
    };


    goBack.addEventListener('click', () => {
        window.history.back();
    })    
    goBack2.addEventListener('click', () => {
        window.history.back();
    })

    themeMusic.volume = 0.1;
    muteButton.addEventListener('click', () => {
        muteButton.style.display = "none";
        themeMusic.volume = 0;
        unMuteButton.style.display = "inline-block";
    });

    unMuteButton.addEventListener('click', () => {
        themeMusic.volume = 0.1;
        muteButton.style.display = "inline-block";
        unMuteButton.style.display = "none";
    });

    playAgainBtn.addEventListener('click', () => {
        playAgain();
    })

    gamespace.addEventListener('contextmenu', event => event.preventDefault());

    // AXE ATTACK
    gamespace.addEventListener('click', () => {
        checkDistance();
        axe.style.visibility = "visible";
        console.log("I WILL MAKE YOU SUFFER")
        if (direction === 'right'){
            axe.classList.add('animateR');
            setTimeout(() => {
                axe.classList.remove('animateR');
                axe.style.visibility = "hidden";
            }, 500);
        }
        else {
            axe.classList.add('animateL');
            setTimeout(() => {
                axe.classList.remove('animateL');
                axe.style.visibility = "hidden";
        }, 500);
        }
    });
    // Blade of Chaos attack
    gamespace.addEventListener('contextmenu', () => {
        checkDistance2();
        boc.style.visibility = "visible";
        console.log("I WILL MAKE YOU SUFFER")
        if (direction === 'right'){
            boc.classList.add('animateR');
            setTimeout(() => {
                boc.classList.remove('animateR');
                boc.style.visibility = "hidden";
            }, 300);
        }
        else {
            boc.classList.add('animateL');
            setTimeout(() => {
                boc.classList.remove('animateL');
                boc.style.visibility = "hidden";
        }, 300);
        }
        
    });
            


    const keys = {};

    const progressBar = document.getElementById('thorHPprogressBar');
    const kratosHPprogressBar = document.getElementById('kratosHPprogressBar');

    const intervalId = setInterval(() => {
        // const ThorHP = 100 - ((20 - enemyHealth) * 5);
        const ThorHP = enemyHealth * 5;
        const KratosHPp = kratosHealth * 5;
        const KratosRagepercent = kratosRageVar * 10;
        progressBar.style.width = `${ThorHP}%`;
        kratosHPprogressBar.style.width = `${KratosHPp}%`;
        kratosRageProgressBar.style.width = `${KratosRagepercent}%`;
    },50);


    let seconds = 0;
    let minutes = 0;

    let interval;

    const timer = document.getElementById("timer");

    function startTimer() {
    interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
        minutes++;
        seconds = 0;
        }

        const m = minutes < 10 ? "0" + minutes : minutes;
        const s = seconds < 10 ? "0" + seconds : seconds;
        timer.innerText = `${m}:${s}`;
    }, 1000);
    }

    function stopTimer() {
        clearInterval(interval);
    }
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const endgameW = async() => {
        mjLock = 1;
        enemyHealth = 0;
        score.textContent = enemyHealth + " / 20" 
        //end game message
        const newTag = document.createElement("p");
        if(minutes > 0) {
            newTag.textContent = `-= Enemy slaughtered in ${minutes} minutes and ${seconds} seconds! =-`;
        } else {
            newTag.textContent = `-= Enemy slaughtered in ${seconds} seconds! =-`;
        }
        
        // If there are already tags in the div, insert the new tag below them
        if (damageDiv.children.length > 0) {
            damageDiv.insertBefore(newTag, damageDiv.firstChild);
        } else {
            damageDiv.appendChild(newTag);
        }
        
        // Wait for 2 seconds, then remove the tag
        setTimeout(() => {
            damageDiv.removeChild(newTag);
        }, 4000);

        stopTimer();
        progressBar.style.width = "0%";
        //score.textContent = "20 / 20" 

        thor.style.transition = "all 1s"
        thor.style.opacity = 0;
        await wait(1000);
        thor.style.transition = "all 0s"
        thor.style.display = "none";
        thor.style.opacity = 1;

        //await wait(1000)
        character.style.transition = "all 1s";
        myAudio.src = "game/I'm The God of War Kratos Sound Effect.mp3"
        myAudio.play();
        playAgainBtn.style.display = "inline-block";
        character.style.width = "15vw"
        axe.style.width = "4vw"
        boc.style.width = "6vw"
        boo.style.width = "6vw"
        mjLock = 1;
    }
    const endgameL = async() => {
        mjLock = 1;
        kratosHealth = 0;
        kratosHP.textContent = kratosHealth + " / 20" 
        //end game message
        const newTag = document.createElement("p");
        newTag.style.color = "red";
        newTag.textContent = `-= You died in ${seconds} seconds! =-`;
        
        // If there are already tags in the div, insert the new tag below them
        if (damageDiv.children.length > 0) {
            damageDiv.insertBefore(newTag, damageDiv.firstChild);
        } else {
            damageDiv.appendChild(newTag);
        }
        
        // Wait for 2 seconds, then remove the tag
        setTimeout(() => {
            damageDiv.removeChild(newTag);
        }, 4000);

        stopTimer();
        kratosHPprogressBar.style.width = "0%";
        //score.textContent = "20 / 20" 

        character.style.transition = "all 1s"
        character.style.opacity = 0;
        await wait(1000);
        character.style.transition = "all 0s"

        //await wait(1000)
        thor.style.transition = "all 1s";
        // myAudio.src = "game/I'm The God of War Kratos Sound Effect.mp3"
        // myAudio.play();
        playAgainBtn.style.display = "inline-block";
        thor.style.width = "10vw"
    }
    const playAgain = () =>{
        thor.style.width = "3.5vw"
        character.style.opacity = 1;
        character.style.transition = "all 0s";
        charge = 0;
        enemyHealth = 20;
        kratosHealth = 20;
        kratosRageVar = 0;
        lock = 0;
        thor.style.display = "inline";
        character.style.width = "6vw"
        axe.style.width = "2vw"
        boc.style.width = "3vw"
        boo.style.width = "3vw"
        score.textContent = enemyHealth + " / 20" 
        kratosRage.textContent = kratosRageVar + " / 10" 
        kratosHP.textContent = kratosHealth + " / 20" 
        playAgainBtn.style.display = "none";
        seconds = 0;
        minutes = 0;

        setTimeout(() => {
            myAudio.src = "game/iwillmakeyousuffer.mp3"
            myAudio.play();
        }, 2000);
        timer.innerText = "00:00"
        startTimer()
        mjLock = 0;
    }
    setInterval(() => {
        if(mjLock !== 1 && start ===1){
            mjolnirAttack();
        }
    }, 1500);
    let lock = 0;
    let mjLock = 0;
    const moveThor = async() => {
        mjLock = 1;
        const maxWidth = gamespace.offsetWidth - thor.offsetWidth;
        const maxHeight = gamespace.offsetHeight - thor.offsetHeight;
        const newLeft = Math.floor(Math.random() * maxWidth);
        const newTop = Math.floor(Math.random() * maxHeight);
        thor.style.transition = "all 1s"
        thor.style.opacity = 0;
        await wait(500);    
        thor.style.left = `${newLeft}px`;
        thor.style.top = `${newTop}px`;
        await wait(200);    
        thor.style.opacity = 1; 
        thor.style.transition = "all 0s"
        lock = 0
        // setTimeout(() => {
        //     mjolnirAttack();
        //     setTimeout(() => {
        //         mjLock = 0;                
        //     }, 3000);
        // }, 1000);
        mjLock = 0;                

    }
    const attackSound = () => {
        myAudio2.src = "game/attack.mp3";
        myAudio2.play();
    } 
    const takeHitSound = () => {
        myAudio.src = "game/takehit.mp3";
        myAudio.play();
    } 
    function checkDistance() {
        // const characterRect = character.getBoundingClientRect();
        // const thorRect = thor.getBoundingClientRect();
        // const distance = Math.sqrt(
        //     (characterRect.x - thorRect.x) ** 2 + (characterRect.y - thorRect.y) ** 2
        // );
        if(lock === 0 && start ===1) {
            const characterRect = character.getBoundingClientRect();
            const thorRect = thor.getBoundingClientRect();
            const axeRect = axe.getBoundingClientRect();
            console.log("*** character: ", characterRect.x, characterRect.y, "enemy: ", thorRect.x, thorRect.y)
            /*console.log("*** axe: ", axeRect.x, axeRect.y)*/
            const distance = Math.abs(characterRect.x - thorRect.x);
            const heightDiff = characterRect.y - thorRect.y;
            if (distance <= 460 && heightDiff <= 90 && heightDiff >= - 30) {
                if(direction === 'right'){
                    if(characterRect.x - thorRect.x <= 0){
                        attackSound();
                        enemyHealth -= 2;
                        gainRage();
                        dmgMessage(2);
                        lock = 1;
                        if(enemyHealth <= 0) { //game finished
                            endgameW();
                        }
                        else{
                            setTimeout(() =>{
                                moveThor();
                            }, 350)
                        }
                        kratosRage.textContent = kratosRageVar + " / 10" 
                        score.textContent = enemyHealth + " / 20" 
                    }
                }
                else if(direction === 'left'){
                    if(characterRect.x - thorRect.x >= 0){
                        attackSound();
                        enemyHealth -= 2;
                        gainRage();
                        dmgMessage(2);
                        lock = 1;
                        if(enemyHealth <= 0) { //game finished
                            endgameW();
                        }
                        else{
                            setTimeout(() =>{
                                moveThor();
                            }, 350)
                        }
                        kratosRage.textContent = kratosRageVar + " / 10" 
                        score.textContent = enemyHealth + " / 20" 
                    }
                }
            }
        }
    }   
    function checkDistance2() {
        // const characterRect = character.getBoundingClientRect();
        // const thorRect = thor.getBoundingClientRect();
        // const distance = Math.sqrt(
        //     (characterRect.x - thorRect.x) ** 2 + (characterRect.y - thorRect.y) ** 2
        // );
        if(lock === 0 && start ===1){
            const characterRect = character.getBoundingClientRect();
            const thorRect = thor.getBoundingClientRect();
            const distance = Math.abs(characterRect.x - thorRect.x);
            const heightDiff = characterRect.y - thorRect.y;
            if (distance <= 260 && heightDiff > -35 && heightDiff <= 70) {
                if(direction === 'right'){
                    if(characterRect.x - thorRect.x <= 0){
                        attackSound();
                        dmgMessage(1);
                        enemyHealth -= 1;
                        gainRage();
                        lock = 1;
                        if(enemyHealth <= 0) { //game finished
                            endgameW();
                        }
                        else{
                            setTimeout(() =>{
                                moveThor();
                            }, 100)
                        }                        
                    }
                    kratosRage.textContent = kratosRageVar + " / 10" 
                    score.textContent = enemyHealth + " / 20" 
                }
                else if(direction === 'left'){
                    if(characterRect.x - thorRect.x >= 0){
                        attackSound();
                        dmgMessage(1);
                        enemyHealth -= 1;
                        gainRage();
                        lock = 1;
                        if(enemyHealth <= 0) { //game finished
                            endgameW();
                        }
                        else{
                            setTimeout(() =>{
                                moveThor();
                            }, 100)
                        }
                        kratosRage.textContent = kratosRageVar + " / 10" 
                        score.textContent = enemyHealth + " / 20" 
                    }
                }
            }
        }
        
    }   
    const checkDistance3 = async() => {
        // const characterRect = character.getBoundingClientRect();
        // const thorRect = thor.getBoundingClientRect();
        // const distance = Math.sqrt(
        //     (characterRect.x - thorRect.x) ** 2 + (characterRect.y - thorRect.y) ** 2
        // );
        if(lock === 0 && start ===1){
            const characterRect = character.getBoundingClientRect();
            const thorRect = thor.getBoundingClientRect();
            const heightDiff = Math.abs(characterRect.y - thorRect.y);
            if (heightDiff < 70) {
                if(direction === 'right'){
                    if(characterRect.x - thorRect.x <= 0){
                        myAudio3.src = "game/rage.mp3";
                        myAudio3.play();
                        await wait(500);
                        lock = 1;
                        dmgMessage(10);
                        enemyHealth -= 10;
                        if(enemyHealth <= 0) { //game finished
                            endgameW();
                        }
                        else{
                            setTimeout(() =>{
                                moveThor();
                            }, 350)
                        }
                        score.textContent = enemyHealth + " / 20" 
                    }
                }
                else if(direction === 'left'){
                    if(characterRect.x - thorRect.x >= 0){
                        myAudio.src = "game/rage.mp3";
                        myAudio.play();
                        await wait(500);
                        lock = 1;
                        dmgMessage(10);
                        enemyHealth -= 10;
                        if(enemyHealth <= 0) { //game finished
                            endgameW();
                        }
                        else{
                            setTimeout(() =>{
                                moveThor();
                            }, 350)
                        }
                        score.textContent = enemyHealth + " / 20" 
                    }
                }
            }
        }
       
    }   
    document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    });

    document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
    });

    const specialSkill = async() =>{
        if(charge === 0){
            boo.style.visibility = 'visible';
            charge += 1;
            mybody.style.background = "rgb(74, 18, 18)"
        } else if(charge > 0) {
            if(direction === 'right'){
                await checkDistance3();
                character.style.transition = "all .5s ease"
                for (let i = 0; i < 50; i++){
                    character.style.left = `${Math.min(gamespace.offsetWidth - character.offsetWidth, character.offsetLeft + 1000)}px`;
                }
                character.style.transition = "all 0s ease"
                charge = -1;
                setTimeout(() => {
                    boo.style.visibility = 'hidden';
                }, 500)
                mybody.style.transition = "background 2s";
                mybody.style.background = "linear-gradient(135deg, #ca2a18, #ffffff, #5bc5e9)"
                kratosRageVar = 0;
                kratosRage.textContent = "0 / 0"

            } else if(direction === 'left'){
                await checkDistance3();
                character.style.transition = "all .5s ease"
                for (let i = 0; i < 50; i++){
                    character.style.left = `${Math.max(0, character.offsetLeft - 1000)}px`;
                }
                character.style.transition = "all 0s ease"
                charge = -1;
                setTimeout(() => {
                    boo.style.visibility = 'hidden';
                }, 500)
                mybody.style.transition = "background 2s";
                mybody.style.background = "linear-gradient(135deg, #ca2a18, #ffffff, #5bc5e9)"
                kratosRageVar = 0;
            }
        }
    }

    let charge = 0;
    document.addEventListener('keypress', event => {
        if(event.key === 'q'){ // Special skill
            if(kratosRageVar >= 10){
                specialSkill();
            }
        }
        
    })

    setInterval(() => {
    const speed = 2;
    //console.log(character.offsetLeft, character.offsetTop)
    if (keys['w'] || keys['ArrowUp']) {
        character.style.top = `${Math.max(0, character.offsetTop - speed)}px`;
    }
    if (keys['s'] || keys['ArrowDown']) {
        character.style.top = `${Math.min(gamespace.offsetHeight - character.offsetHeight + 50, character.offsetTop + speed)}px`;
    }
    if (keys['a'] || keys['ArrowLeft']) {
        direction = 'left';
        boo.style.transform = " translateX(-250%) translateY(-10%) rotate(-90deg)"
        axe.src = "game/axeL.png"
        boc.src = "game/bocL.png"
        kratos.src = "game/kratosL.png"
        character.style.left = `${Math.max(0, character.offsetLeft - speed)}px`;
    }
    if (keys['d'] || keys['ArrowRight']) {
        direction = 'right';
        boo.style.transform = " translateX(-70%) translateY(-10%) rotate(90deg)"
        axe.src = "game/axeR.png"
        boc.src = "game/bocR.png"
        kratos.src = "game/kratosR.png"
        character.style.left = `${Math.min(gamespace.offsetWidth - character.offsetWidth, character.offsetLeft + speed)}px`;
    }
    }, 10);
}

