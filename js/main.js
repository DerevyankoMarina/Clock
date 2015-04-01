(function() {

	var startDate;

	function getStartDate() {
		$.ajax('http://time.jsontest.com')
			.done(function(response) {
				startDate = new Date(response['milliseconds_since_epoch']);

				drawClocks();
				setInterval(function(){
					addSecondToStartDate();
					drawClocks();
				}, 1000);
			})

			.fail(function() {
				alert('error')
			});
	}

	getStartDate();

	function addSecondToStartDate() {
		startDate.setSeconds(startDate.getSeconds()+1);
	}

	function drawClocks(){
		var time = getTime();
		drawDigClock(time);
		drawAnalogClock(time);
	}

	function getTime() {
		return {
			sec: startDate.getSeconds(),
			min: startDate.getMinutes(),
			hour: startDate.getHours()
		}
	}

	function drawDigClock (time) {
		var value = formatTime(time.hour) +' : ' + formatTime(time.min) + ' : ' + formatTime(time.sec);
		document.getElementById('clock-digital').innerHTML = value;
	}

	function drawAnalogClock (time) {
		document.getElementById('seconds-arrow').style.transform = 'rotate(' + time.sec*6 + 'deg)';
		document.getElementById('minutes-arrow').style.transform = 'rotate(' + time.min*6 + 'deg)';
		document.getElementById('hours-arrow').style.transform = 'rotate(' + (time.hour*30 + time.min*6/12) + 'deg)';
	}

	function formatTime(number) {
		return number < 10
			? '0' + number
			: number;
	}
})();