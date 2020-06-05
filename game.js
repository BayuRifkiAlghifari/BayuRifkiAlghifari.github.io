/**
*
* GLOBAL VARIABLE
*
**/

px 		= py 	= 10
gs 		= tc 	= 20
ax 		= ay 	= 15
xv 		= yv 	= 0
trail			= []
tail 			= 5
score 			= 0
interval 		= ''
status_game 	= 1
messageBefore 	= document.getElementById('before-game')
canvas 			= document.getElementById('canvas')
message 		= document.getElementById('message')
myBtn 			= document.getElementById('myBtn')
modal 			= document.getElementById('myModal') 
myBtn 			= document.getElementById('myBtn')



function start()
{
	closeModal()


	messageBefore.innerHTML 	= 'PRESS ANY BUTTON'
	canvas.width 				= 400
  	canvas.height 				= 400

	ctx 						= canvas.getContext('2d')

	document.addEventListener('keydown', keyPush)
}



function game()
{
	px += xv
	py += yv

	if(px < 0)
	{
		px = tc - 1
	}
	
	if(px > tc - 1)
	{
		px = 0
	}
	
	if(py < 0)
	{
		py = tc - 1
	}
	
	if(py > tc - 1)
	{
		py = 0
	}


	/**
	*
	* BACKGROUND GAME
	*
	**/
	
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	


	/**
	*
	* SCORE
	*
	**/
	
	ctx.fillStyle 	= 'white'
	ctx.font 		= '25px Changa One'
	ctx.fillText('Score : ' + score, 10, 35)


	/**
	*
	* GAMBAR ULAR
	*
	**/

	ctx.fillStyle = 'lime'
	for(var i = 0; i < trail.length; i ++)
	{
		ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs - 2, gs - 2)

		/**
		*
		* IF ULAR MATI
		*
		**/

		if(trail[i].x === px && trail[i].y === py)
		{
			/**
			*
			* SET PANJANG ULAR DAN SCORE KE DAFULT
			*
			**/
			stop()
		}
	}

	trail.push({ x:px,y:py })

	while(trail.length > tail)
	{
		trail.shift()
	}

	/**
	*
	* IF ULAR MEMAKAN APPLE
	*
	**/

	if(ax == px && ay == py)
	{
		tail++
		score++

		ax = Math.floor(Math.random() * tc)
		ay = Math.floor(Math.random() * tc)
	}


	/**
	*
	* GAMBAR APPLE
	*
	**/
	
	ctx.fillStyle = 'red'
	ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2)
}



function keyPush(ev)
{
	if(status_game > 0)
	{
		interval 				= setInterval(game, 1000/15)

		messageBefore.innerHTML = ''
	}
	
	// STATUS GAME DIMULAI
	status_game					= 0

	switch(ev.keyCode)
	{
		// Kiri
		case 37:
			xv = -1; yv = 0
			break

		// Atas
		case 38:
			xv = 0;yv = -1
			break
		
		// Kanan
		case 39:
			xv = 1;yv = 0
			break

		// Bawah
		case 40:
			xv = 0;yv = 1
			break
	}
}



function stop()
{
	if(status_game == 0)
	{
		canvas.width 	= 0
	  	canvas.height 	= 0
	}

	status_game 		= 1
	message.innerHTML 	= 'Your final score is ' + score
	myBtn.innerHTML 	= 'Restart'


	/**
	*
	* SET SCORE DAN PANJANG ULAR KE DEFAULT
	*
	**/
	
	tail 				= 5
	score 				= 0

	openModal()
	clearInterval(interval)
}